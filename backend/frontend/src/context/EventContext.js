import createDataContext from './createDataContext';

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
            
            // 2% error
            return {
                ...state, stations: u_stations2, 
                correct1: a1, correct2: a2
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

export const { Provider, Context } = createDataContext(
    eventReducer,
    { 
        randomize_questions, update_answer,
        submit_answers, next_question,
        count_total_score, update_names
    },
    { 
        position: 0,
        correct1: false, correct2: false,
        complete: false, 
        /*
        names: {
            "name1": "",
            "name2": "",
            "name3": "",
            "name4": "",
        },
        */
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
        stations: shuffle([
            {
                "clue": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus ornare magna a risus mollis, a feugiat ligula pretium. Sed ligula augue, tincidunt pulvinar gravida in, malesuada nec tellus.eee",
                "station": "S",
                "answer1": "",
                "answer2": "",
                "c_answer1": "A",
                "c_answer2": 11.1,
                "score1": 0,
                "score2": 0,
                "attempt": 0,
                "percent_error": 0.00
            },
            {
                "clue": "Clueeeee",
                "station": "P",
                "answer1": "",
                "answer2": "",
                "c_answer1": "A",
                "c_answer2": 11.1,
                "score1": 0,
                "score2": 0,
                "attempt": 0,
                "percent_error": 0.05
            }
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