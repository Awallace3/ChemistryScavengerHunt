import createDataContext from './createDataContext';
import instance from '../api/API';

const eventReducer = (state, action) => {
    switch (action.type) {
        case "survey_name":
            return {...state, name: action.payload}
        case "u_q":
            let u_qs = state.qs
            u_qs[action.payload.pos] = parseInt(action.payload.q)
            return {...state, qs: u_qs }
        case "u_improvements":
            return {...state, improvements: action.payload}
        case "submit_survey":
            return {...state, api_status: action.payload}
        default:
            return state;
    }
};

const u_q = (dispatch) => (q, pos) => {
    dispatch({ type: 'u_q', payload: {q, pos} })
}

const u_name = (dispatch) => (name) => {
    dispatch({ type: 'survey_name', payload: name })
}

const u_improvements = (dispatch) => (name) => {
    dispatch({ type: 'u_improvements', payload: name })
}

const submit_survey = (dispatch) => async (state) => {
    try {
        const final_results = {
            name: state.name ,
            qs: state.qs,
            improvements: state.improvements
        }
        const response = await instance.post('/api/submitsurvey', final_results);
        console.log(response)
        dispatch({ type: "submit_survey", payload: 1})
    } catch (err) {
        console.log('error survey')
        console.log(err)
        dispatch({ type: 'submit_survey', payload: 2})
    }
}

export const { Provider, Context } = createDataContext(
    eventReducer,
    {
        u_name,
        u_q,
        u_improvements,
        submit_survey
    },
    {
        api_status: 0,
        name: "",
        qs: {
            q1: 3,
            q2: 3,
            q3: 3,
        },
        improvements: ""
    }
)

