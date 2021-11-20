import functools

from flask import (
    Blueprint, flash, g, redirect, render_template, request, session, url_for
)
from werkzeug.security import check_password_hash, generate_password_hash

from flaskr.db import get_db

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
				db.execute(
					"INSERT INTO user (username, total) VALUES (?, ?)",
				(content["name"], content["total"])),
				db.commit()

				for x in content["stations"]:
					db.execute(
					"INSERT INTO stations (username, station, answer1, answer2, score, attempt) VALUES (?, ?, ?, ?, ?, ?)",
					(content["name"], x["station"], x["answer1"], x["answer2"], x["score"], x["attempt"])),
					
					# print(content["name"], x["station"], x["answer1"], x["answer2"], x["score"], x["attempt"]),

					db.commit()

				return ('', 200)

			except db.IntegrityError:
				print("got here!")
				error = "Someone with that name has already submitted!"
				return (error, 500) 
				