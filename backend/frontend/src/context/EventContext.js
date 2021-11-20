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


const eventReducer = (state, action) => {
    switch (action.type) {
        case 'randomize':
            return {...state, stations: action.payload}
        case 'answer':
            const u_stations = state.stations
            u_stations[state.position][action.payload.ansNum] = action.payload.answer
            return {...state, stations: u_stations }
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


export const { Provider, Context } = createDataContext(
    eventReducer,
    { randomize_questions, update_answer},
    { 
        stations: [], position: 0,

    }
) 
