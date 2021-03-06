import createDataContext from "./createDataContext";
import instance from "../api/API";
import axios from "axios";

function shuffle(array) {
  let currentIndex = array.length,
    randomIndex;
  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }
  return array;
}
//https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array

function eval_math(answer2, c_answer2, percent_error) {
  var a = parseFloat(answer2);
  var b = parseFloat(c_answer2);
  console.log("numbers", a, b);
  var plus_minus = b * percent_error;
  if (a >= b - plus_minus && a <= b + plus_minus) {
    return true;
  } else {
    return false;
  }
}

function sortByKey(array, key) {
  return array.sort(function (a, b) {
    var x = a[key];
    var y = b[key];
    return x < y ? -1 : x > y ? 1 : 0;
  });
}
// https://stackoverflow.com/questions/8837454/sort-array-of-objects-by-single-key-with-date-value/8837511

const eventReducer = (state, action) => {
  switch (action.type) {
    case "randomize":
      return { ...state, stations: action.payload };
    case "answer":
      const u_stations = state.stations;
      u_stations[state.position][action.payload.ansNum] = action.payload.answer;
      return { ...state, stations: u_stations };
    case "submit":
      let a1 = false;
      let a2 = false;
      let u_stations2 = state.stations;
      let uscores = state.gScore

      if (
        state.stations[state.position].answer1 ===
        state.stations[state.position].c_answer1
      ) {
        a1 = true;
        if (state.stations[state.position].score1 === 0) {
          switch (action.payload) {
            case 0:
              u_stations2[state.position].score1 = 5;
              break;
            case 1:
              u_stations2[state.position].score1 = 3;
              break;
            default:
              u_stations2[state.position].score1 = 1;
          }
          uscores.curScore += u_stations2[state.position].score1
        }
      }
      if (
        state.stations[state.position].answer2 ===
        state.stations[state.position].c_answer2
      ) {
        a2 = true;
        if (state.stations[state.position].score2 === 0) {
          switch (action.payload) {
            case 0:
              u_stations2[state.position].score2 = 5;
              break;
            case 1:
              u_stations2[state.position].score2 = 3;
              break;
            default:
              u_stations2[state.position].score2 = 1;
          }
          uscores.curScore += u_stations2[state.position].score2
        }

      }
      // a2 = eval_math(
      //   state.stations[state.position].answer2,
      //   state.stations[state.position].c_answer2,
      //   state.stations[state.position].percent_error
      // );
      // if (a2 && state.stations[state.position].score2 === 0) {
      //   switch (action.payload) {
      //     case 0:
      //       u_stations2[state.position].score2 = 10;
      //       break;
      //     case 1:
      //       u_stations2[state.position].score2 = 7;
      //       break;
      //     case 2:
      //       u_stations2[state.position].score2 = 4;
      //       break;
      //     default:
      //       u_stations2[state.position].score2 = 1;
      //   }
      // }
      var complete = false;
      if (state.position === state.stations.length - 1) {
        complete = true;
      }
      // 2% error

      return {
        ...state,
        stations: u_stations2,
        correct1: a1,
        correct2: a2,
        complete: complete,
      };
    case "next_question":
      let u_stations3 = state.stations;
      u_stations3[state.position].attempts = action.payload.attempts;
    //let uScore = state.gScore
    //      uScore +=
      if (state.position < state.stations.length - 1) {
        return {
          ...state,
          stations: u_stations3,
          position: state.position + 1,
          correct1: false,
          correct2: false,
        };
      } else {
        return {
          ...state,
          stations: u_stations3,
          complete: true,
        };
      }
    case "count_total_score":
      var u_gScore = state.gScore;
      u_gScore.curScore = 0;
      for (var i = 0; i < state.stations.length; i++) {
        u_gScore.curScore += state.stations[i].score1;
        u_gScore.curScore += state.stations[i].score2;
      }
      return { ...state, gScore: u_gScore };
    case  "update_total_score":
          var uscore = state.gScore
          uscore.curScore += action.payload
          return {...state, gScore: uscore}

    case "update_names":
      var u_names = state.names;
      u_names[action.payload.name_num] = action.payload.u_name;
      return { ...state, names: u_names };
    case "final_submit_results":
      return { ...state, api_status: action.payload };

    case "begin":
      console.log("d:", action.payload);
      if (Array.isArray(action.payload)) {
        var stat = [...state.stations];
        for (let i = 0; i < action.payload.length; i++) {
          const el = action.payload[i];
          var pops = [];
          for (let j = 0; j < stat.length; j++) {
            if (stat[j].station == el.station) {
              pops.splice(0, 0, j);
            }
          }
          for (let j = 0; j < pops.length; j++) {
            stat.splice(pops[j], 1);
          }
        }
        console.log("stat:", stat);
        var first = action.payload[0];
        var names = {
          name1: first.username,
          name2: first.user2,
          name3: first.user3,
          name4: first.user4,
          instructor: first.instructor,
        };
        var curscore = {
          curScore: first.curscore,
          totScore: 100,
        };
        console.log(names);
        console.log(curscore);

        return { ...state, stations: stat, names: names, gScore: curscore };
      } else {
        return { ...state, uuid: action.payload };
      }
    case "get_leaderboard":
      if (action.payload) {
        var sor = action.payload.sort((a, b) =>
          a.curscore < b.curscore ? 1 : -1
        );
        return { ...state, leaderboard: sor };
      } else {
        return { ...state };
      }
    //return {...state};
    default:
      return state;
  }
};

const randomize_questions = (dispatch) => (stations) => {
  dispatch({ type: "randomize", payload: shuffle(stations) });
};

const update_answer = (dispatch) => (answer, ansNum) => {
  dispatch({ type: "answer", payload: { answer, ansNum } });
};

const submit_answers = (dispatch) => (attempts) => {
  dispatch({ type: "submit", payload: attempts });
};

const next_question = (dispatch) => async (attempts, state) => {
  console.log(state);
  try {
    // const response = await instance.post('/api/end/point', progress);
    const step = {
      stations: [state.stations[state.position]],
    };
    console.log("step\n", step);

    let headersList = {
      Accept: "*/*",
      "Content-Type": "application/json",
      credentials: "same-origin",
    };

    let bodyContent = JSON.stringify(step);
    const response = fetch("/api/submitscores", {
      method: "POST",
      body: bodyContent,
      headers: headersList,
    });
    console.log("res", response);
  } catch (error) {
    console.log(error);
  }
  dispatch({ type: "next_question", payload: attempts });
};

const count_total_score = (dispatch) => () => {
  dispatch({ type: "count_total_score" });
};

const update_total_score = (dispatch) => (new_pts) => {
    dispatch({type: "update_total_score", payload: new_pts})
}

const update_names = (dispatch) => (u_name, name_num) => {
  dispatch({ type: "update_names", payload: { u_name, name_num } });
};

const final_submit_results = (dispatch) => async (state) => {
  try {
    // const final_results = {
    //   // date: state.date,
    //   // gScore: state.gScore,
    //   // names: state.names,
    //   stations: state.stations,
    // };
    // console.log("final_results\n", final_results);
    // const config = {
    //   headers: {
    //     uuid: state.uuid,
    //   },
    // };
    // const response = await instance.post(
    //   "/api/submitscores",
    //   final_results,
    //   config
    // );
    // console.log(response);
    const final_results = {
      // date: state.date,
      // gScore: state.gScore,
      // names: state.names,
      stations: [state.stations[state.position]],
    };
    let headersList = {
      Accept: "*/*",
      "Content-Type": "application/json",
      credentials: "same-origin",
      // mode: "include",
    };

    let bodyContent = JSON.stringify(final_results);
    const response = fetch("/api/submitscores", {
      method: "POST",
      body: bodyContent,
      headers: headersList,
    });
    console.log("res", response);
    dispatch({ type: "final_submit_results", payload: 1 });
  } catch (err) {
    console.log("Error:");
    console.log(err);
    dispatch({
      type: "final_submit_results",
      payload: 2,
    });
  }
};

const get_leaderboard = (dispatch) => async () => {
  try {
    // const response = await instance.get("/api/getscores");
    // console.log(response);
    // var data = response.data;
    // //data = sortByKey(data, 'curscore')
    // data = sortByKey(data, "curscore").reverse();

    let headersList = {
      Accept: "*/*",
      "Content-Type": "application/json",
      credentials: "same-origin",
      mode: "same-origin",
    };
    //const response =
    await fetch("/api/getscores", {
      method: "GET",
      headers: headersList,
    })
      .then((response) => response.json())
      .then((data) => dispatch({ type: "get_leaderboard", payload: data }));
    //dispatch({ type: "get_leaderboard", payload: ""});
  } catch (err) {
    console.log("Error:");
    console.log(err);
    dispatch({
      type: "get_leaderboard",
    });
  }
};

const survey_name = (dispatch) => (name) => {
  dispatch({ type: "survey_name", payload: name });
};

const begin_event = (dispatch) => async (state) => {
  // check response, if stations returned then pop off matching from array
  try {
    const bodyContent = JSON.stringify({
      names: state.names,
      date: state.date,
    });
    let headersList = {
      Accept: "*/*",
      "Content-Type": "application/json",
      credentials: "same-origin",
      mode: "same-origin",
    };
    //const response =
    await fetch("/api/begin", {
      method: "POST",
      body: bodyContent,
      headers: headersList,
    })
      .then((response) => response.json())
      .then((data) => dispatch({ type: "begin", payload: data }));
    // dispatch({ type: "begin", payload: "" });
    // console.log('res', response)
    // .then((res) => {
    //   //let cookie = res.headers;
    //   return res;
    // });
    //.then(function (data) {
    //  console.log(data);
    //});
    // .then(function (response) {
    //     console.log(response.text());
    // })
    // .then(function (data) {
    //   console.log(data);
    // });

    // const axiosConfig = {
    //   headers: {
    //     "content-Type": "application/json",
    //     Accept: "/",
    //     "Cache-Control": "no-cache",
    //     Cookie: "uuid=" + state.uuid,
    //   },
    //   // credentials: "same-origin",
    // };
    // const response = await instance.post("/api/begin", begin_data, axiosConfig);
    //console.log(response.data);
    //const response = await fetch("http://localhost:5000/api/begin", {
    //  method: "POST",
    //  body: JSON.stringify(begin_data),
    //  headers: {
    //    "Content-Type": "application/json",
    //  },
    //  credentials: "same-origin",
    //});
    //
    // const response = await fetch("http://localhost:5000/api/begin", {
    //   method: "POST",
    //   headers: {
    //     Accept: "application/json",
    //     "Content-Type": "application/json",
    //     //"Access-Control-Allow-Origin": "localhost:3000",
    //   },
    //   credentials: "same-origin",
    //   body: JSON.stringify(begin_data),
    // })
    // console.log("begin_response", response);
  } catch (err) {
    console.log(err);
  }
};

export const { Provider, Context } = createDataContext(
  eventReducer,
  {
    randomize_questions,
    update_answer,
    submit_answers,
    next_question,
    count_total_score,
    update_names,
    final_submit_results,
    get_leaderboard,
    begin_event,
    update_total_score
  },
  {
    position: 0,
    correct1: false,
    correct2: false,
    complete: false,
    api_status: 0,
    final_results_submit: "",
    /*
        names: {
            "name1": "",
            "name2": "",
            "name3": "",
            "name4": "",
        },
        */
    // date: "YYYY-MM-DD",
    // date: "2021-12-03",
    date: "2022-04-25",
    leaderboard: [],
    gScore: {
      curScore: 0,
      totScore: 100,
    },
    uuid: "",
    names: {
      name1: "",
      name2: "",
      name3: "",
      name4: "",
      instructor: "",
    },
    stations: shuffle([
      {
        clue: "Where would you go to print a poster before a conference or to use a desktop computer while looking out the window toward the Thad Cochran Center? (4th floor)",
        station: "S",
        answer1: "",
        answer2: "",
        c_answer1: "C",
        c_answer2: "A",
        score1: 0,
        score2: 0,
        attempt: 0,
        percent_error: 0.02,
      },
      {
        clue: "Where could you perform an overnight reaction at cold temperature? You might run into Dr. Wadkins or Dr. Pedigo on your way to this location! (4th floor)",
        station: "P",
        answer1: "",
        answer2: "",
        c_answer1: "C",
        c_answer2: "D",
        score1: 0,
        score2: 0,
        attempt: 0,
        percent_error: 0.02,
      },
      {
        clue: "Where should you go if you want to determine the structure of a new molecule based on nuclear spin using an NMR spectrometer? Hint: Dr. Emily Rowland manages this facility. (1st floor)",
        station: "D",
        answer1: "",
        answer2: "",
        c_answer1: "B",
        c_answer2: "B",
        score1: 0,
        score2: 0,
        attempt: 0,
        percent_error: 0.0,
      },
      {
        clue: "Where might you go to see some ancient chemistry artifacts and reminisce about the days before modern quantum mechanics? (2nd floor)",
        station: "F",
        answer1: "",
        answer2: "",
        c_answer1: "D",
        c_answer2: "A",
        score1: 0,
        score2: 0,
        attempt: 0,
        percent_error: 0.02,
      },
      {
        clue: "It???s a rainy day, and you need to make a quick trip over to the Thad Cochran Center to visit the Science Library. Where would you go in Coulter to get to the Thad Cochran Center without having to brave the rain? (4th floor)",
        station: "G",
        answer1: "",
        answer2: "",
        c_answer1: "E",
        c_answer2: "C",
        score1: 0,
        score2: 0,
        attempt: 0,
        percent_error: 0.1,
      },
      {
        clue: "Where should you go if you need to submit paperwork to the department, such as travel forms or undergraduate TA applications? The lovely staff in the office are always willing to help! (3rd floor)",
        station: "H",
        answer1: "",
        answer2: "",
        c_answer1: "A",
        c_answer2: "B",
        score1: 0,
        score2: 0,
        attempt: 0,
        percent_error: 0.05,
      },
      {
        clue: "Whenever you have questions about general chemistry and your professor cannot be found, where can you generally find a graduate student on duty, ready to help you unravel the mysteries of general chemistry? (1st fLoor)",
        station: "I",
        answer1: "",
        answer2: "",
        c_answer1: "C",
        c_answer2: "C",
        score1: 0,
        score2: 0,
        attempt: 0,
        percent_error: 0.0,
      },
      {
        clue: "It???s late afternoon, and you???re finishing a lab report in the lobby with your lab partners. Everyone is getting hungry, but Starbucks has already closed! Where else in Coulter can you find sustenance to carry you through to the end of your report? (2nd floor)",
        station: "J",
        answer1: "",
        answer2: "",
        c_answer1: "E",
        c_answer2: "A",
        score1: 0,
        score2: 0,
        attempt: 0,
        percent_error: 0.0,
      },
      {
        clue: "If you wanted to become a chemist but trade in your lab coat for a computer, where might you go to find a research advisor? Hint: you might have tried to enter here before, but the doors are always locked! (2nd floor)",
        station: "L",
        answer1: "",
        answer2: "",
        c_answer1: "A",
        c_answer2: "C",
        score1: 0,
        score2: 0,
        attempt: 0,
        percent_error: 0.0,
      },
      {
        clue: "If you wanted to have an invigorating conversation about metal catalysts directly followed by a discussion about the environmental impact of microplastics in the ocean, where might you go to find experts on these subjects? (3rd floor)",
        station: "K",
        answer1: "",
        answer2: "",
        c_answer1: "B",
        c_answer2: "D",
        score1: 0,
        score2: 0,
        attempt: 0,
        percent_error: 0.02,
      },
    ]),

    /*
          stations: shuffle([
            {
                "clue": "Where would you go to print a poster before a conference or to use a desktop computer while looking out the window toward the Thad Cochran Center? (4th floor)",
                "station": "S",
                "answer1": "",
                "answer2": "",
                "c_answer1": "C",
                "c_answer2": 2.2,
                "score1": 0,
                "score2": 0,
                "attempt": 0,
                "percent_error": 0.02
            },
            {
                "clue": "Where could you perform an overnight reaction at cold temperature? You might run into Dr. Wadkins or Dr. Pedigo on your way to this location! (4th floor)",
                "station": "P",
                "answer1": "",
                "answer2": "",
                "c_answer1": "B",
                "c_answer2": 299,
                "score1": 0,
                "score2": 0,
                "attempt": 0,
                "percent_error": 0.02
            },
            {
                "clue": "Where should you go if you want to determine the structure of a new molecule based on nuclear spin using an NMR spectrometer? Hint: Dr. Emily Rowland manages this facility. (1st floor)",
                "station": "D",
                "answer1": "",
                "answer2": "",
                "c_answer1": "A",
                "c_answer2": 222821,
                "score1": 0,
                "score2": 0,
                "attempt": 0,
                "percent_error": 0.00
            },
            {
                "clue": "Where might you go to see some ancient chemistry artifacts and reminisce about the days before modern quantum mechanics? (2nd floor)",
                "station": "F",
                "answer1": "",
                "answer2": "",
                "c_answer1": "A",
                "c_answer2": 0.6,
                "score1": 0,
                "score2": 0,
                "attempt": 0,
                "percent_error": 0.02
            },
            {
                "clue": "It???s a rainy day, and you need to make a quick trip over to the Thad Cochran Center to visit the Science Library. Where would you go in Coulter to get to the Thad Cochran Center without having to brave the rain? (4th floor)",
                "station": "G",
                "answer1": "",
                "answer2": "",
                "c_answer1": "D",
                "c_answer2": 9996600000,
                "score1": 0,
                "score2": 0,
                "attempt": 0,
                "percent_error": 0.10
            },
            {
                "clue": "Where should you go if you need to submit paperwork to the department, such as travel forms or undergraduate TA applications? The lovely staff in the office are always willing to help! (3rd floor)",
                "station": "H",
                "answer1": "",
                "answer2": "",
                "c_answer1": "C",
                "c_answer2": 2337,
                "score1": 0,
                "score2": 0,
                "attempt": 0,
                "percent_error": 0.05
            },
            {
                "clue": "Whenever you have questions about general chemistry and your professor cannot be found, where can you generally find a graduate student on duty, ready to help you unravel the mysteries of general chemistry? (1st fLoor)",
                "station": "I",
                "answer1": "",
                "answer2": "",
                "c_answer1": "A",
                "c_answer2": 3,
                "score1": 0,
                "score2": 0,
                "attempt": 0,
                "percent_error": 0.00
            },
            {
                "clue": "It???s late afternoon, and you???re finishing a lab report in the lobby with your lab partners. Everyone is getting hungry, but Starbucks has already closed! Where else in Coulter can you find sustenance to carry you through to the end of your report? (2nd floor)",
                "station": "J",
                "answer1": "",
                "answer2": "",
                "c_answer1": "C",
                "c_answer2": 63724,
                "score1": 0,
                "score2": 0,
                "attempt": 0,
                "percent_error": 0.00
            },
            {
                "clue": "If you wanted to become a chemist but trade in your lab coat for a computer, where might you go to find a research advisor? Hint: you might have tried to enter here before, but the doors are always locked! (2nd floor)",
                "station": "L",
                "answer1": "",
                "answer2": "",
                "c_answer1": "A",
                "c_answer2": 7.21,
                "score1": 0,
                "score2": 0,
                "attempt": 0,
                "percent_error": 0.00
            },
            {
                "clue": "If you wanted to have an invigorating conversation about metal catalysts directly followed by a discussion about the environmental impact of microplastics in the ocean, where might you go to find experts on these subjects? (3rd floor)",
                "station": "K",
                "answer1": "",
                "answer2": "",
                "c_answer1": "C",
                "c_answer2": 32321,
                "score1": 0,
                "score2": 0,
                "attempt": 0,
                "percent_error": 0.02
            },
          ]),
        */
    //
  }
);
