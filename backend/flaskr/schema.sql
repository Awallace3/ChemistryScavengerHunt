DROP TABLE IF EXISTS user;
DROP TABLE IF EXISTS post;

CREATE TABLE user (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  username TEXT UNIQUE NOT NULL,
  user2 TEXT,
  user3 TEXT,
  user4 TEXT,
  curscore INTEGER,
  totalscore INTEGER
);

CREATE TABLE stations (
  username TEXT,
  clue TEXT,
  station TEXT,
  answer1 TEXT,
  answer2 TEXT,
  canswer1 TEXT,
  canswer2 REAL,
  score1 INTEGER,
  score2 INTEGER,
  attempt INTEGER,
  percentError REAL,
  FOREIGN KEY (username) REFERENCES user (username)
);