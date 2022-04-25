import React, { useContext, useEffect } from "react";
import "../styling/home.css";
import { isMobile } from "react-device-detect";
import { Context as EventContext } from "../context/EventContext";
import "bootstrap/dist/css/bootstrap.min.css";
import Trophy from "../assets/trophy.png";

function Leaderboard() {
  const { state, get_leaderboard } = useContext(EventContext);

  useEffect(() => {
    get_leaderboard();
    console.log(state.leaderboard);
  }, []);
    console.log('leaders unite', state.leaderboard)
    console.log("names:", state.names)


  const listLeaderboard = () =>
    state.leaderboard.map((group) => (
      <div className="leaderboard-container" key={group.uuid + Math.random().toString()}>
        <div>
          <p className="score-container">
            {group.username} <br /> {group.user2} <br /> {group.user3} <br />{" "}
            {group.user4}{" "}
          </p>
        </div>
        <p className="score-container">
          Final Score: <br /> {group.curscore} / {group.totalscore}
        </p>
      </div>
    ));

  if (isMobile) {
    return (
      <div className="background-container">
        <div className="home-text">
          <div className="home-text-border-box">
            <img className="leaderboard-img" src={Trophy} alt="beaker" />
          </div>
          <h1 style={{ fontSize: "2rem", margin: "0" }}> Your Final Score: </h1>

          <div className="leaderboard-container">
            <div>
              <p className="score-container">
                {state.names.name1} <br /> {state.names.name2} <br />{" "}
                {state.names.name3} <br /> {state.names.name4}{" "}
              </p>
            </div>
            <p className="score-container">
              Final Score: <br /> {state.gScore.curScore} /{" "}
              {state.gScore.totScore}
            </p>
          </div>
          <h1 style={{ fontSize: "2rem", marginTop: "5%" }}> Leaderboard </h1>
          {state.leaderboard.length > 0 ? listLeaderboard() : null}
        </div>
      </div>
    );
  } else {
    return (
      <div className="background-container">
        <div className="home-text-full">
          <div className="home-text-border-box-full">
            <img className="leaderboard-img-large" src={Trophy} alt="beaker" />
          </div>
          <h1 style={{ fontSize: "2rem", margin: "0" }}> Your Final Score: </h1>

          <div className="leaderboard-container-full">
            <div>
              <p className="score-container">
                {state.names.name1} <br /> {state.names.name2} <br />{" "}
                {state.names.name3} <br /> {state.names.name4}{" "}
              </p>
            </div>
            <p className="score-container">
              Final Score: <br /> {state.gScore.curScore} /{" "}
              {state.gScore.totScore}
            </p>
          </div>
          <h1 style={{ fontSize: "2rem", marginTop: "5%" }}> Leaderboard </h1>
          {state.leaderboard.length > 0 ? listLeaderboard() : null}
        </div>
      </div>
    );
  }
}

export default Leaderboard;
