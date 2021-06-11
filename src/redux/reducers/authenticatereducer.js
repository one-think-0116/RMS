import {
    AUTHENTICATE_SUCCESS,
    AUTHENTICATE_FAILED
} from "../store/types";

const INITIAL_STATE = {
    status: false,
}
export const authenticatereducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case AUTHENTICATE_SUCCESS:
            return {
                ...state,
                status: true,
            };
        case AUTHENTICATE_FAILED:
            return {
                ...state,
                status: false,
            };
        default:
            return state
    }
}