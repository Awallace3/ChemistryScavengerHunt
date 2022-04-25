from flask import Flask
from flask import request
import os
from flask_cors import CORS  # comment on deployment


def create_app(test_config=None):
    #app = Flask(__name__, instance_relative_config=True)
    app = Flask(__name__,
                static_folder='../frontend/build',
                static_url_path='/')
    # CORS(app, resources={r"/api/*": {"origins": "https://localhost:3000"}})
    CORS(app,
         origins=[
             "http://localhost:3000", "http://localhost:3000/Event",
             "http://127.0.0.1:3000", "http://127.0.0.1:3000/Event"
         ],
         support_credentials=True,
         expose_headers=["Cookie", 'set-cookie'])

    #CORS(app) # comment on deployment
    app.config.from_mapping(
        SECRET_KEY=
        '83082d56dcce4ab9f4d8c1a6952718f6df880a010a9740c0d5c747598b57230d',
        DATABASE=os.path.join(app.instance_path, 'flaskr.sqlite'),
    )

    if test_config is None:
        # load the instance config, if it exists, when not testing
        app.config.from_pyfile('config.py', silent=True)
    else:
        # load the test config if passed in
        app.config.from_mapping(test_config)

    # ensure the instance folder exists
    try:
        os.makedirs(app.instance_path)
    except OSError:
        pass

    @app.route("/")
    def hello_world():
        return "<p>Hello, World!</p>"

    from . import db
    db.init_app(app)

    from . import scores
    app.register_blueprint(scores.bp)

    return app
