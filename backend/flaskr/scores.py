from tkinter import N
from flask import (Blueprint, flash, g, json, redirect, render_template,
                   request, session, url_for, jsonify, make_response)

import sqlite3

from flaskr.db import get_db
from flask_cors import CORS  # comment on deployment

bp = Blueprint("/api", __name__, url_prefix="/api")
CORS(bp,
         origins=[
             "http://localhost:3000", "http://localhost:3000/Event",
             "http://127.0.0.1:3000", "http://127.0.0.1:3000/Event"
             "http://chemscav.com", "http://chemscav.com/Event"
             "http://194.195.211.203:443", "http://194.195.211.203:443"
         ],
     support_credentials=True,
     expose_headers=["Cookie", 'set-cookie'])
# CORS(bp,
#          origins=["http://localhost:3000", "http://localhost:3000/Event",
#              "http://127.0.0.1:3000", "http://127.0.0.1:3000/Event"
#              ],
#      support_credentials=True,
#      expose_headers="Cookie")

# NEED TESTS.


# This route makes a cookie when the user begins the scavenger hunt. It will assign a UUID to the user's cookie.
@bp.route("/begin", methods=["POST"])
def start():
    if request.method == "POST":
        # Read request to see if the user has a cookie.
        if request.cookies.get('uuid') != None:
            user_uuid = request.cookies.get('uuid')
            resp = reload_session(user_uuid)
            if type(resp) == tuple:
                return make_cookie(request)
            else:
                return resp

        # If not, insert data into DB and create a cookie.
        else:
            return make_cookie(request)

def make_cookie(request):
    import uuid
    db = get_db()
    try:
        content = dict(request.json)
        namesDict = content["names"]

        # Generate UUID.
        uuid = str(uuid.uuid4())

        # Drop cookie onto user's browser.
        # response = jsonify({"uuid": uuid})
        response = make_response(jsonify({"uuid": uuid}))
        response.set_cookie("uuid", uuid)
        # response.headers.add('Access-Control-Allow-Origin', '*')

        # Connect to database.
        # Insert UUID into database.
        db.execute(
            "INSERT INTO user (uuid, username, user2, user3, user4, instructor, timestamp) VALUES (?, ?, ?, ?, ?, ?, ?)",
            (
                uuid,
                namesDict["name1"],
                namesDict["name2"],
                namesDict["name3"],
                namesDict["name4"],
                namesDict["instructor"],
                content["date"],
            ),
        ),

        db.commit()

        # print("got here2!")
        return response

    except db.IntegrityError:
        # print("got here!")
        error = "Someone with that name has already submitted!"
        return (error, 500)



def return_station_data(db, user_uuid):
    response = []

    stations = db.execute("SELECT * FROM stations WHERE uuid = '{}'".format(
        user_uuid)).fetchall()

    # Convert to list of dictionaries for each station.
    for item in stations:
        response.append({k: item[k] for k in item.keys()})

    return response


def calculate_score(db, user_uuid):
    score = 0.0
    stations = return_station_data(db, user_uuid)
    for s in stations:
        score += (s["score1"] + s["score2"])

    # Each question submitted is worth 15 points.
    total = len(stations) * 10

    return score, total


# I don't remember what the SQL command to update a field is.
def update_scores(db, user_uuid):
    score, tot = calculate_score(db, user_uuid)

    # insert SQL push
    db.execute(
        "UPDATE user SET curscore = {}, totalscore = {} WHERE uuid = '{}'".
        format(score, tot, user_uuid))


# This should take the submissions, one at a time. Though, it can take more than
# one at a time, if necessary.
@bp.route("/submitscores", methods=["POST"])
def submit_scores():
    if request.method == "POST":
        # You need a cookie.
        print(request.json)
        print(request.headers)
        if request.cookies.get('uuid') == None:
            return ("", 405)

        user_uuid = request.cookies.get('uuid')
        content = dict(request.json)
        print(content)

        db = get_db()
        error = None

        if error is None:
            try:
                for x in content["stations"]:
                    db.execute(
                        "INSERT INTO stations (uuid, clue, station, answer1, answer2, canswer1, canswer2, score1, score2, attempt, percentError) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
                        (
                            user_uuid,
                            x["clue"],
                            x["station"],
                            x["answer1"],
                            x["answer2"],
                            x["c_answer1"],
                            x["c_answer2"],
                            x["score1"],
                            x["score2"],
                            x["attempt"],
                            x["percent_error"],
                        ),
                    ),

                    # Check for edge case where same station is submitted twice?
                    # Austin shouldn't render it in such a case.

                    # print(content["name"], x["station"], x["answer1"], x["answer2"], x["score"], x["attempt"]),

                    update_scores(db, user_uuid)

                    db.commit()

                # return resp
                # TODO: return resp was causing error so returned string200. I might have did something wrong with the merge
                return ('success', 200)

            except db.IntegrityError:
                print("got here!")
                error = "You have already submitted!"
                return (error, 500)


@bp.route("/getscores", methods=["GET"])
def get_score():
    db = get_db()
    error = None

    if error is None:
        try:
            data = []

            db.row_factory = sqlite3.Row

            rows = db.execute("SELECT * FROM user;").fetchall()

            for item in rows:
                data.append({k: item[k] for k in item.keys()})

            # have to iterate over each row and convert it to a list.
            print(data)

            return jsonify(data)

        except db.IntegrityError:
            print("got here!")
            error = "Someone with that name has already submitted!"
            return (error, 500)


@bp.route("/submitsurvey", methods=["POST"])
def submit():
    if request.method == "POST":
        content = dict(request.json)

        db = get_db()
        error = None
        print(request.json)

        if error is None:
            try:
                questions = content["qs"]

                db.execute(
                    "INSERT INTO survey (name, q1, q2, q3, improvements) VALUES (?, ?, ?, ?, ?)",
                    (
                        content["name"],
                        questions["q1"],
                        questions["q2"],
                        questions["q3"],
                        content["improvements"],
                    ),
                )
                db.commit()

                return ("", 200)

            except db.IntegrityError:
                error = "Someone with that name has already submitted!"
                return (error, 500)


# The user has already started the scavenger hunt.
def reload_session(user_uuid):
    # Check the database for the user's information.
    try:
        data = []

        db = get_db()

        db.row_factory = sqlite3.Row

        # There should only be one entry per uuid...
        res = db.execute("SELECT * FROM user WHERE uuid = '{}'".format(
            user_uuid)).fetchone()

        if res == None:
            return ("no cookie", 405)

        # Convert result to dictionary. Append to data list.
        data.append(dict(res))

        # Now, we can get the stations data.

        stations = return_station_data(db, user_uuid)
        for s in stations:
            data.append(s)

        return jsonify(data)

    except db.DatabaseError:
        error = "Could not find the entry in the database!"
        return (error, 500)
