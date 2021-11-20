import createDataContext from './createDataContext';

function shuffle(array) {
    let currentIndex = array.length,  randomIndex;
    while (currentIndex != 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
  
    return array;
}

function eval_math(answer2, c_answer2) {
    var a = parseFloat(answer2)
    var b = parseFloat(c_answer2)
    var plus_minus = b * 0.02
    if (a > b-plus_minus && a < b+plus_minus){
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
            
            if (state.stations[state.position].answer1 == state.stations[state.position].c_answer1){
                a1 = true
            }
            a2 = eval_math(state.stations[state.position].answer2, state.stations[state.position].c_answer2)
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

const submit_answers = (dispatch) => () => {
    dispatch({type: 'submit'})
}

const next_question = (dispatch) => (attempts) => {
    dispatch({type: 'next_question', payload: attempts})
}

export const { Provider, Context } = createDataContext(
    eventReducer,
    { 
        randomize_questions, update_answer,
        submit_answers, next_question,
    },
    { 
        stations: [], position: 0,
        correct1: false, correct2: false,
        complete: false
    }
) 
