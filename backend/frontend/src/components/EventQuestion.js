import React, { useContext, useState } from "react";
import "../styling/home.css";
import { Context as EventContext } from "../context/EventContext";
import { isMobile } from "react-device-detect";
import { Button } from "react-bootstrap";
import Atom from "../assets/atom.png";

const eval_to_user = (attempt, err) => {
  if (attempt > 0) {
    if (!err) {
      return <p style={{ color: "#de354c" }}> Incorrect. Try again! </p>;
    } else {
      return <p style={{ color: "green" }}> Correct! </p>;
    }
  } else {
    return null;
  }
};

const EventQuestion = () => {
  const [attempts, setAttempts] = useState(0);
  const [textInput, setTextInput] = useState("");
  const {
    state,
    update_answer,
    submit_answers,
    next_question,
    count_total_score,
  } = useContext(EventContext);

  const station = state.stations[state.position];
  function submission() {
    setAttempts(attempts + 1);
    submit_answers(attempts);
    count_total_score();
  }

  if (isMobile) {
    return (
      <div className="big-event-container">
        <div className="event-container">
          <img
            src={Atom}
            alt="AtomImage"
            style={{ alignSelf: "center", width: "100px", heiht: "auto" }}
          />

          <div className="event-header-container">
            <p className="event-header-container-p">
              Station: {station.station}
            </p>
            <p className="p1">Clue: {station.clue}</p>
          </div>

          <div className="event-container-bottom">
            <p className="event-header-container-p">Multiple Choice Answer</p>
            <form className={"radio-form"}>
              <label>
                <input
                  type="radio"
                  value="A"
                  checked={station.answer1 === "A"}
                  onChange={(answer) =>
                    update_answer(answer.target.value, "answer1")
                  }
                />
                A
              </label>

              <label>
                <input
                  type="radio"
                  value="B"
                  checked={station.answer1 === "B"}
                  onChange={(answer) =>
                    update_answer(answer.target.value, "answer1")
                  }
                />
                B
              </label>

              <label>
                <input
                  type="radio"
                  value="C"
                  checked={station.answer1 === "C"}
                  onChange={(answer) =>
                    update_answer(answer.target.value, "answer1")
                  }
                />
                C
              </label>

              <label>
                <input
                  type="radio"
                  value="D"
                  checked={station.answer1 === "D"}
                  onChange={(answer) =>
                    update_answer(answer.target.value, "answer1")
                  }
                />
                D
              </label>

              <label>
                <input
                  type="radio"
                  value="E"
                  checked={station.answer1 === "E"}
                  onChange={(answer) =>
                    update_answer(answer.target.value, "answer1")
                  }
                />
                E
              </label>

              {eval_to_user(attempts, state.correct1)}

              <div></div>
            </form>
            <p className="event-header-container-p">
              B. Multiple Choice Answer
            </p>
            <form className={"radio-form"}>
              <label>
                <input
                  type="radio"
                  value="A"
                  checked={station.answer2 === "A"}
                  onChange={(answer) =>
                    update_answer(answer.target.value, "answer2")
                  }
                />
                A
              </label>
              <label>
                <input
                  type="radio"
                  value="B"
                  checked={station.answer2 === "B"}
                  onChange={(answer) =>
                    update_answer(answer.target.value, "answer2")
                  }
                />
                B
              </label>

              <label>
                <input
                  type="radio"
                  value="C"
                  checked={station.answer2 === "C"}
                  onChange={(answer) =>
                    update_answer(answer.target.value, "answer2")
                  }
                />
                C
              </label>
              <label>
                <input
                  type="radio"
                  value="D"
                  checked={station.answer2 === "D"}
                  onChange={(answer) =>
                    update_answer(answer.target.value, "answer2")
                  }
                />
                D
              </label>
              <label>
                <input
                  type="radio"
                  value="E"
                  checked={station.answer2 === "E"}
                  onChange={(answer) =>
                    update_answer(answer.target.value, "answer2")
                  }
                />
                E
              </label>
              {eval_to_user(attempts, state.correct1)}
              <div></div>
            </form>
            {/*
                <div style={{flexDirection: 'row'}}>
                <p className="event-header-container-p">Free Response Answer:</p>
                <input
                type="text"
                onChange={(answer) => {
                    update_answer(answer.target.value, 'answer2')
                    setTextInput(answer.target.value)
                }
                }
                value={textInput}

                />
                {eval_to_user(attempts, state.correct2)}
              </div>
            */}

            {attempts > 0 ? (
              <p className="event-header-container-p">
                Attempts Submitted: {attempts}
              </p>
            ) : null}
          </div>
          <Button
            variant="btn btn-success"
            style={{
              marginTop: "5%",
              width: "75%",
              alignSelf: "center",
              backgroundColor: "#3c1874",
            }}
            onClick={(e) => submission()}
          >
            Submit Answers!
          </Button>

          {state.correct1 &&
          state.correct2 &&
          attempts > 0 &&
          state.position < state.stations.length - 1 ? (
            <Button
              variant="btn btn-success"
              style={{
                marginTop: "2%",
                width: "75%",
                alignSelf: "center",
                backgroundColor: "#3c1874",
              }}
              onClick={() => {
                next_question(attempts, state);
                setTextInput("");
                setAttempts(0);
              }}
            >
              Next Question!
            </Button>
          ) : null}

          {(!state.correct1 || !state.correct2) &&
          attempts > 3 &&
          !state.complete ? (
            <Button
              variant="btn btn-success"
              style={{
                marginTop: "2%",
                width: "75%",
                alignSelf: "center",
                backgroundColor: "#3c1874",
              }}
              onClick={() => {
                next_question(attempts, state);
                setTextInput("");
                setAttempts(0);
              }}
            >
              Give up
            </Button>
          ) : null}
        </div>
      </div>
    );
  } else {
    return (
      <div className="big-event-container">
        <div className="event-container-full">
          <img
            src={Atom}
            alt="AtomImage"
            style={{ alignSelf: "center", width: "200px", heiht: "auto" }}
          />

          <div className="event-header-container">
            <p className="event-header-container-p">
              Station: {station.station}
            </p>
            <p className="p1">Clue: {station.clue}</p>
          </div>

          <div className="event-container-bottom">
            <p className="event-header-container-p">
              A. Multiple Choice Answer
            </p>
            <form className={"radio-form"}>
              <label>
                <input
                  type="radio"
                  value="A"
                  checked={station.answer1 === "A"}
                  onChange={(answer) =>
                    update_answer(answer.target.value, "answer1")
                  }
                />
                A
              </label>

              <label>
                <input
                  type="radio"
                  value="B"
                  checked={station.answer1 === "B"}
                  onChange={(answer) =>
                    update_answer(answer.target.value, "answer1")
                  }
                />
                B
              </label>

              <label>
                <input
                  type="radio"
                  value="C"
                  checked={station.answer1 === "C"}
                  onChange={(answer) =>
                    update_answer(answer.target.value, "answer1")
                  }
                />
                C
              </label>

              <label>
                <input
                  type="radio"
                  value="D"
                  checked={station.answer1 === "D"}
                  onChange={(answer) =>
                    update_answer(answer.target.value, "answer1")
                  }
                />
                D
              </label>

              <label>
                <input
                  type="radio"
                  value="E"
                  checked={station.answer1 === "E"}
                  onChange={(answer) =>
                    update_answer(answer.target.value, "answer1")
                  }
                />
                E
              </label>

              {eval_to_user(attempts, state.correct1)}

              <div></div>
            </form>

            {/*
              <div style={{flexDirection: 'row'}}>
                <p className="event-header-container-p">Free Response Answer:</p>
                <input
                    type="text"
                    onChange={(answer) => {
                        update_answer(answer.target.value, 'answer2')
                        setTextInput(answer.target.value)
                    }
                    }
                    value={textInput}

                    />
                {eval_to_user(attempts, state.correct2)}
              </div>
                */}

            <p className="event-header-container-p">
              B. Multiple Choice Answer
            </p>
            <form className={"radio-form"}>
              <label>
                <input
                  type="radio"
                  value="A"
                  checked={station.answer2 === "A"}
                  onChange={(answer) =>
                    update_answer(answer.target.value, "answer2")
                  }
                />
                A
              </label>

              <label>
                <input
                  type="radio"
                  value="B"
                  checked={station.answer2 === "B"}
                  onChange={(answer) =>
                    update_answer(answer.target.value, "answer2")
                  }
                />
                B
              </label>

              <label>
                <input
                  type="radio"
                  value="C"
                  checked={station.answer2 === "C"}
                  onChange={(answer) =>
                    update_answer(answer.target.value, "answer2")
                  }
                />
                C
              </label>

              <label>
                <input
                  type="radio"
                  value="D"
                  checked={station.answer2 === "D"}
                  onChange={(answer) =>
                    update_answer(answer.target.value, "answer2")
                  }
                />
                D
              </label>

              <label>
                <input
                  type="radio"
                  value="E"
                  checked={station.answer2 === "E"}
                  onChange={(answer) =>
                    update_answer(answer.target.value, "answer2")
                  }
                />
                E
              </label>

              {eval_to_user(attempts, state.correct1)}

              <div></div>
            </form>
            {attempts > 0 ? (
              <p className="event-header-container-p">
                Attempts Submitted: {attempts}
              </p>
            ) : null}
          </div>
          <Button
            variant="btn btn-success"
            style={{
              marginTop: "5%",
              width: "75%",
              alignSelf: "center",
              backgroundColor: "#3c1874",
            }}
            onClick={(e) => submission()}
          >
            Submit Answers!
          </Button>

          {state.correct1 &&
          state.correct2 &&
          attempts > 0 &&
          state.position < state.stations.length - 1 ? (
            <Button
              variant="btn btn-success"
              style={{
                marginTop: "2%",
                width: "75%",
                alignSelf: "center",
                backgroundColor: "#3c1874",
              }}
              onClick={() => {
                next_question(attempts, state);
                setTextInput("");
                setAttempts(0);
              }}
            >
              Next Question!
            </Button>
          ) : null}

          {(!state.correct1 || !state.correct2) &&
          attempts > 3 &&
          !state.complete ? (
            <Button
              variant="btn btn-success"
              style={{
                marginTop: "2%",
                width: "75%",
                alignSelf: "center",
                backgroundColor: "#3c1874",
              }}
              onClick={() => {
                next_question(attempts, state);
                setTextInput("");
                setAttempts(0);
              }}
            >
              Give up
            </Button>
          ) : null}
        </div>
      </div>
    );
  }
};
export default EventQuestion;
