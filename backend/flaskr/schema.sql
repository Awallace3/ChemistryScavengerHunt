DROP TABLE IF EXISTS user;
DROP TABLE IF EXISTS post;

CREATE TABLE user (
  uuid TEXT PRIMARY KEY,
  username TEXT NOT NULL,
  user2 TEXT,
  user3 TEXT,
  user4 TEXT,
  instructor TEXT,
  curscore INTEGER,
  totalscore INTEGER,
  timestamp DATE
);

CREATE TABLE stations (
  uuid TEXT,
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
  FOREIGN KEY (uuid) REFERENCES user (uuid)
);

CREATE TABLE survey (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT,
  q1 INTEGER,
  q2 INTEGER,
  q3 INTEGER,
  improvements TEXT
);
