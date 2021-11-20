DROP TABLE IF EXISTS user;
DROP TABLE IF EXISTS post;

CREATE TABLE user (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  username TEXT UNIQUE NOT NULL,
  total INTEGER
);

CREATE TABLE stations (
  username TEXT,
  station TEXT,
  answer1 TEXT,
  answer2 TEXT,
  score INTEGER,
  attempt INTEGER,
  FOREIGN KEY (username) REFERENCES user (username)
);