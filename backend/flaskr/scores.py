import functools

from flask import (
    Blueprint, flash, g, redirect, render_template, request, session, url_for
)
from werkzeug.security import check_password_hash, generate_password_hash

from flaskr.db import get_db
from flask_cors import CORS # comment on deployment

bp = Blueprint('scores', __name__, url_prefix='/scores')

@bp.route("/submitscores", methods=['POST'])
def submit_scores():
	if request.method == 'POST':
		content = dict(request.json)
		print(content)

		db = get_db()
		error = None

		if error is None:
			try:
				namesDict = content["names"]
				gScore = content["gScore"]

				db.execute(
					"INSERT INTO user (username, user2, user3, user4, curscore, totalscore) VALUES (?, ?, ?, ?, ?, ?)",
				(namesDict["name1"], namesDict["name2"], namesDict["name3"], namesDict["name4"], gScore["curScore"], gScore["totScore"])),
				db.commit()

				for x in content["stations"]:
					db.execute(
					"INSERT INTO stations (username, clue, station, answer1, answer2, canswer1, canswer2, score1, score2, attempt, percentError) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
					(namesDict["name1"], x["clue"], x["station"], x["answer1"], x["answer2"], x["c_answer1"], x["c_answer2"], x["score1"], x["score2"], x["attempt"], x["percent_error"])),

					# print(content["name"], x["station"], x["answer1"], x["answer2"], x["score"], x["attempt"]),

					db.commit()

				return ('', 200)

			except db.IntegrityError:
				print("got here!")
				error = "Someone with that name has already submitted!"
				return (error, 500)

