import React, { useContext, useEffect, useState } from "react";
import "../styling/home.css";
import { isMobile } from "react-device-detect";
import { Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { Context as EventContext } from "../context/EventContext";
import EventQuestion from "../components/EventQuestion";

function Event() {
  const { state, final_submit_results, begin_event } = useContext(EventContext);
  const history = useHistory();
  const [isDisabled, setIsDisabled] = useState(false);
  const handleSubmitClicked = () => {
    setIsDisabled(true);
  };

  useEffect(() => {
    begin_event(state);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsDisabled(false);
    }, 5000);
    return () => clearTimeout(timer);
  }, [isDisabled]);

  useEffect(() => {
    if (state.api_status == 1) {
      console.log("completed");
      history.push("/Leaderboard");
    }
  }, [state.complete, state.api_status]);

  if (isMobile) {
    return (
      <div className="background-container">
        <div className="event-score-container">
          <p>
            Score: {state.gScore.curScore} / {state.gScore.totScore}
          </p>
        </div>
        {state.stations.length > 0 ? (
          <EventQuestion />
        ) : (
          <p>You have already completed all your questions!</p>
        )}
        {state.api_status == 1 ? (
          <p style={{ color: "green" }}>Successfully submitted results!</p>
        ) : null}
        {state.complete ? (
          <>
            <Button
              variant="primary"
              size="lg"
              style={{
                width: "60vw",
                alignSelf: "center",
                backgroundColor: "#932432",
                borderColor: "#f3f3f3",
              }}
              onClick={() => {
                final_submit_results(state);
                handleSubmitClicked();
              }}
              disabled={isDisabled}
            >
              Submit Final Results!
            </Button>
          </>
        ) : null}

        <div>
          <a href="mailto:amwalla3@go.olemiss.edu">
            <p>Issues? Email: amwalla3@go.olemiss.edu</p>
          </a>
        </div>
      </div>
    );
  } else {
    return (
      <div className="background-container">
        <div className="event-score-container">
          <p>
            Score: {state.gScore.curScore} / {state.gScore.totScore}
          </p>
        </div>

        {state.stations.length > 0 ? (
          <EventQuestion />
        ) : (
          <p>
            You have already completed all your questions! Please check the
            Leaderboard for your score!
          </p>
        )}

        {state.api_status == 1 ? (
          <p style={{ color: "green" }}>Successfully submitted results!</p>
        ) : null}
        {state.complete ? (
          <>
            <Button
              variant="primary"
              size="lg"
              style={{
                width: "60vw",
                alignSelf: "center",
                backgroundColor: "#932432",
                borderColor: "#f3f3f3",
              }}
              onClick={() => {
                final_submit_results(state);
                handleSubmitClicked();
              }}
              disabled={isDisabled}
            >
              Submit Final Results!
            </Button>
          </>
        ) : null}
        <div>
          <a href="mailto:amwalla3@go.olemiss.edu">
            <p>Issues? Email: amwalla3@go.olemiss.edu</p>
          </a>
        </div>
      </div>
    );
  }
}

export default Event;
