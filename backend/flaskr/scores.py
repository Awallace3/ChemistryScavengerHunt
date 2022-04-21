import functools

from flask import (
    Blueprint,
    flash,
    g,
    json,
    redirect,
    render_template,
    request,
    session,
    url_for,
    jsonify,
)


import sqlite3

from flaskr.db import get_db
from flask_cors import CORS  # comment on deployment

bp = Blueprint("/api", __name__, url_prefix="/api")

# This route makes a cookie when the user begins the scavenger hunt. It will assign a UUID to the user's cookie.
@bp.route("/begin", methods=["POST"])
def start():
    import uuid
    if request.method == "POST":
        # Read request to see if the user has a cookie.
        if request.cookies.get('uuid') != None:
            uuid = request.cookies.get('uuid')
            return reload_session()

        # If not, insert data into DB and create a cookie.
        else:
            try:
                content = dict(request.json)
                namesDict = content["names"]
                
                # Generate UUID.
                uuid = str(uuid.uuid4())

                # Drop cookie onto user's browser.
                response = jsonify({"uuid": uuid})
                response.set_cookie("uuid", uuid)
                
                # Connect to database.
                db = get_db()
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

                print("got here2!")
                return response

            except db.IntegrityError:
                print("got here!")
                error = "Someone with that name has already submitted!"
                return (error, 500)

@bp.route("/submitscores", methods=["POST"])
def submit_scores():
    if request.method == "POST":
        content = dict(request.json)
        print(content)

        db = get_db()
        error = None

        if error is None:
            try:
                namesDict = content["names"]
                gScore = content["gScore"]

         
                for x in content["stations"]:
                    db.execute(
                        "INSERT INTO stations (username, clue, station, answer1, answer2, canswer1, canswer2, score1, score2, attempt, percentError) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
                        (
                            namesDict["name1"],
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

                    # print(content["name"], x["station"], x["answer1"], x["answer2"], x["score"], x["attempt"]),

                    db.commit()

                return ("", 200)

            except db.IntegrityError:
                print("got here!")
                error = "Someone with that name has already submitted!"
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


def reload_session():
    return ("already registered", 200)