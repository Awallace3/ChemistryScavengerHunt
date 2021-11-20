import createDataContext from './createDataContext';
import instance from '../api/API';

function shuffle(array) {
    let currentIndex = array.length,  randomIndex;
    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
    return array;
}

function eval_math(answer2, c_answer2, percent_error) {
    var a = parseFloat(answer2)
    var b = parseFloat(c_answer2)
    console.log("numbers", a, b)
    var plus_minus = b * percent_error
    if (a >= b-plus_minus && a <= b+plus_minus){
        return true
    } else{
        return false
    }
}

const eventReducer = (state, action) => {
    switch (action.type) {
        case 'randomize':
            return {...state, stations: action.payload}
        case 'answer':
            const u_stations = state.stations
            u_stations[state.position][action.payload.ansNum] = action.payload.answer
            return {...state, stations: u_stations }
        case 'submit':
            let a1 = false
            let a2 = false
            let u_stations2 = state.stations
            
            if (state.stations[state.position].answer1 === state.stations[state.position].c_answer1){
                a1 = true
                if (state.stations[state.position].score1 === 0){
                    switch(action.payload){
                        case 0:
                            u_stations2[state.position].score1 = 5
                            break;
                        case 1:
                            u_stations2[state.position].score1 = 3
                            break;
                        default:
                            u_stations2[state.position].score1 = 1
                    }
                }
            }
            a2 = eval_math(state.stations[state.position].answer2, state.stations[state.position].c_answer2, state.stations[state.position].percent_error)
            if (a2 && state.stations[state.position].score2 === 0){
                switch(action.payload){
                    case 0:
                        u_stations2[state.position].score2 = 10
                        break;
                    case 1:
                        u_stations2[state.position].score2 = 7
                        break;
                    case 2:
                        u_stations2[state.position].score2 = 4
                        break;
                    default:
                        u_stations2[state.position].score2 = 1

                    }
                }
                var complete = false
                if (state.position === state.stations.length - 1){
                    complete = true
                }
            // 2% error
            return {
                ...state, stations: u_stations2, 
                correct1: a1, correct2: a2, complete: complete
            }
        case 'next_question':
            let u_stations3 = state.stations
            u_stations3[state.position].attempts = action.payload.attempts
            if (state.position < state.stations.length - 1){
                return {
                    ...state, stations: u_stations3, position: (state.position+1),
                    correct1: false, correct2: false
                }
            } else {
                return {
                    ...state, stations: u_stations3, complete: true
                }
            }
        case 'count_total_score':
            var u_gScore = state.gScore
            u_gScore.curScore = 0
            for (var i=0; i<state.stations.length-1; i++ ){
                u_gScore.curScore += state.stations[i].score1
                u_gScore.curScore += state.stations[i].score2
            }
            return{...state, gScore: u_gScore}

        case 'update_names':
            var u_names = state.names
            u_names[action.payload.name_num] = action.payload.u_name
            return {...state, names: u_names}
        case 'final_submit_results':
            return {...state, final_submit_results: action.payload}
        default:
            return state;
    }
};

const randomize_questions = (dispatch) => (stations) => {
    dispatch({ type: 'randomize', payload: shuffle(stations)})
}

const update_answer = (dispatch) => (answer, ansNum) => {
    dispatch({type: 'answer', payload: {answer, ansNum}})
} 

const submit_answers = (dispatch) => (attempts) => {
    dispatch({type: 'submit', payload: attempts})
}

const next_question = (dispatch) => (attempts) => {
    dispatch({type: 'next_question', payload: attempts})
}

const count_total_score = (dispatch) => () => {
    dispatch({type: 'count_total_score'})
}

const update_names = (dispatch) => (u_name, name_num) => {
    dispatch({type: 'update_names', payload: {u_name, name_num }})
}

const final_submit_results = (dispatch) => async (state) => {
    try {
        const final_results = {
            date: state.date,
            gScore: state.gScore,
            names: state.names,
            stations: state.stations
        }
        const response = await instance.post('/scores/submitscores', final_results);
        console.log(response)
        dispatch({ type: 'final_submit_results', payload: 'Success!' })
    } catch (err) {
        console.log("Error:")
        console.log(err)
        dispatch({
            type: 'final_submit_results',
            payload: 'Error with submission. Try again.'
        })
    } 
};


export const { Provider, Context } = createDataContext(
    eventReducer,
    { 
        randomize_questions, update_answer,
        submit_answers, next_question,
        count_total_score, update_names,
        final_submit_results
    },
    { 
        position: 0,
        correct1: false, correct2: false,
        complete: false, 
        final_results_submit: '',
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
        date: "2021-12-02",
        gScore: {
            curScore: 0, 
            totScore: 150
        },
        names: {
            "name1": "a",
            "name2": "b",
            "name3": "c",
            "name4": "d",
        },
        // stations: shuffle([
        //     {
        //         "clue": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus ornare magna a risus mollis, a feugiat ligula pretium. Sed ligula augue, tincidunt pulvinar gravida in, malesuada nec tellus.eee",
        //         "station": "S",
        //         "answer1": "",
        //         "answer2": "",
        //         "c_answer1": "A",
        //         "c_answer2": 11.1,
        //         "score1": 0,
        //         "score2": 0,
        //         "attempt": 0,
        //         "percent_error": 0.00
        //     },
        //     {
        //         "clue": "Clueeeee",
        //         "station": "P",
        //         "answer1": "",
        //         "answer2": "",
        //         "c_answer1": "A",
        //         "c_answer2": 11.1,
        //         "score1": 0,
        //         "score2": 0,
        //         "attempt": 0,
        //         "percent_error": 0.05
        //     }
        //   ]),
          stations: shuffle([
            {
                "clue": "Where would you go to print a poster before a conference or to use a desktop computer while looking out the window toward the Thad Cochran Center? ",
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
                "clue": "Where could you perform an overnight reaction at cold temperature? You might run into Dr. Wadkins or Dr. Pedigo on your way to this location!",
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
                "clue": "Where should you go if you want to determine the structure of a new molecule based on nuclear spin using an NMR spectrometer? Hint: Dr. Emily Rowland manages this facility.",
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
                "clue": "Where might you go to see some ancient chemistry artifacts and reminisce about the days before modern quantum mechanics?",
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
                "clue": "It’s a rainy day, and you need to make a quick trip over to the Thad Cochran Center to visit the Science Library. Where would you go in Coulter to get to the Thad Cochran Center without having to brave the rain?",
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
                "clue": "Where should you go if you need to submit paperwork to the department, such as travel forms or undergraduate TA applications? The lovely staff in the office are always willing to help!",
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
                "clue": "Whenever you have questions about general chemistry and your professor cannot be found, where can you generally find a graduate student on duty, ready to help you unravel the mysteries of general chemistry?",
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
                "clue": "It’s late afternoon, and you’re finishing a lab report in the lobby with your lab partners. Everyone is getting hungry, but Starbucks has already closed! Where else in Coulter can you find sustenance to carry you through to the end of your report?",
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
          ])
          //
    }
) 


/*
 stations: shuffle([
            {
                "clue": "Clueeeee",
                "station": "S",
                "answer1": "",
                "answer2": "",
                "c_answer1": "A",
                "c_answer2": 11.1,
                "score1": 0,
                "score2": 0,
                "attempt": 0,
            },
            {
                "clue": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus ornare magna a risus mollis, a feugiat ligula pretium. Sed ligula augue, tincidunt pulvinar gravida in, malesuada nec tellus.eee",
                "station": "P",
                "answer1": "",
                "answer2": "",
                "c_answer1": "A",
                "c_answer2": 11.1,
                "score1": 0,
                "score2": 0,
                "attempt": 0,
            },
            {
                "clue": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus ornare magna a risus mollis, a feugiat ligula pretium. Sed ligula augue, tincidunt pulvinar gravida in, malesuada nec tellus.eee",
                "station": "D",
                "answer1": "",
                "answer2": "",
                "c_answer1": "A",
                "c_answer2": 11.1,
                "score1": 0,
                "score2": 0,
                "attempt": 0,
            },
            {
                "clue": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus ornare magna a risus mollis, a feugiat ligula pretium. Sed ligula augue, tincidunt pulvinar gravida in, malesuada nec tellus.eee",
                "station": "F",
                "answer1": "",
                "answer2": "",
                "c_answer1": "A",
                "c_answer2": 11.1,
                "score1": 0,
                "score2": 0,
                "attempt": 0,
            },
            {
                "clue": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus ornare magna a risus mollis, a feugiat ligula pretium. Sed ligula augue, tincidunt pulvinar gravida in, malesuada nec tellus.eee",
                "station": "G",
                "answer1": "",
                "answer2": "",
                "c_answer1": "A",
                "c_answer2": 11.1,
                "score1": 0,
                "score2": 0,
                "attempt": 0,
            },
            {
                "clue": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus ornare magna a risus mollis, a feugiat ligula pretium. Sed ligula augue, tincidunt pulvinar gravida in, malesuada nec tellus.eee",
                "station": "H",
                "answer1": "",
                "answer2": "",
                "c_answer1": "A",
                "c_answer2": 11.1,
                "score1": 0,
                "score2": 0,
                "attempt": 0,
            },
            {
                "clue": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus ornare magna a risus mollis, a feugiat ligula pretium. Sed ligula augue, tincidunt pulvinar gravida in, malesuada nec tellus.eee",
                "station": "I",
                "answer1": "",
                "answer2": "",
                "c_answer1": "A",
                "c_answer2": 11.1,
                "score1": 0,
                "score2": 0,
                "attempt": 0,
            },
            {
                "clue": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus ornare magna a risus mollis, a feugiat ligula pretium. Sed ligula augue, tincidunt pulvinar gravida in, malesuada nec tellus.eee",
                "station": "J",
                "answer1": "",
                "answer2": "",
                "c_answer1": "A",
                "c_answer2": 11.1,
                "score1": 0,
                "score2": 0,
                "attempt": 0,
            },
            {
                "clue": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus ornare magna a risus mollis, a feugiat ligula pretium. Sed ligula augue, tincidunt pulvinar gravida in, malesuada nec tellus.eee",
                "station": "K",
                "answer1": "",
                "answer2": "",
                "c_answer1": "A",
                "c_answer2": 11.1,
                "score1": 0,
                "score2": 0,
                "attempt": 0,
            },
            {
              "clue": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus ornare magna a risus mollis, a feugiat ligula pretium. Sed ligula augue, tincidunt pulvinar gravida in, malesuada nec tellus.eee",
              "station": "L",
              "answer1": "",
              "answer2": "",
              "c_answer1": "A",
              "c_answer2": 11.1,
              "score1": 0,
              "score2": 0,
              "attempt": 0,
          },
          ])
*/