/**
 * Author: Vidush H. Namah (2019)
 * 
 * Reducer for Main Screen
 */
import * as ACTIONS from '../Actions';

const INITIAL = {
    Loading: false,
    Error: {
        status: false
    },
    Data: []
};

export const AsyncCreateTask = (model) => ({
    type: ACTIONS.SAGA_CREATE_TASK,
    payload: model
});

export const AsyncCloseTask = (id) => ({
    type: ACTIONS.SAGA_CLOSE_TASK,
    payload: id
});

export const AsyncFetchData = () => ({
    type: ACTIONS.SAGA_FETCH_DATA
});

export default MainStateReducer = (state = INITIAL, action = {}) => {
    switch (action.type) {

        /* ACTION: FETCH DATA */
        case ACTIONS.SAGA_FETCH_START:
            console.log("[REDUCER] FETCH STARTED.");
            return {
                ...state,
                Loading: true
            };

        case ACTIONS.SAGA_FETCH_SUCCESS:
            console.log("[REDUCER] FETCH FINISHED.");
            return {
                Loading: false,
                Data: action.payload
            };

        case ACTIONS.SAGA_FETCH_FAILED:
            console.log("[REDUCER] FETCH FAILED - " + action.payload);
            return {
                ...state,
                Loading: false,
                Error: {
                    status: true,
                    title: "NETWORK ISSUE",
                    message: "FAILED TO FETCH TASKS",
                    log: action.payload                    
                }
            };
        /* ACTION: FETCH DATA */

        /* ACTION: CREATE DATA */
        case ACTIONS.SAGA_CREATE_START:
            console.log("[REDUCER] CREATE STARTED.")
            return state;

        case ACTIONS.SAGA_CREATE_SUCCESS:
            console.log("[REDUCER] CREATE FINISHED.");
            model = {
                ...state,
                Data: [ ...state.Data, action.payload ]
            };
            console.log(model);
            return model;

        case ACTIONS.SAGA_CREATE_FAILED:
            console.log("[REDUCER] CREATE FAILED.");
            return state;
        /* ACTION: CREATE DATA */
        
        /* ACTION: CLOSE TASK */
        case ACTIONS.SAGA_CLOSE_START:
            console.log("[REDUCER] CLOSE TASK STARTED.")
            return state;

        case ACTIONS.SAGA_CLOSE_SUCCESS:
            console.log("[REDUCER] CLOSE TASK FINISHED.");
            console.log("[OBJECT]: " + action.payload)
            var data = [...state.Data];
            var index = data.indexOf(data.find(e => e.id == action.payload.id));
            data[index] = action.payload;
            return { ...state, Data: data };

        case ACTIONS.SAGA_CLOSE_FAILED:
            console.log("[REDUCER] CREATE FAILED.");
            return state;

        /* ACTION: CLOSE TASK */
        default:
            return state;

    }
}