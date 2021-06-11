import {
    FETCH_USER,
    FETCH_USER_SUCCESS,
    FETCH_USER_FAILED,
    USER_SIGN_IN,
    USER_SIGN_IN_SUCCESS,
    USER_SIGN_IN_FAILED,
    USER_SIGN_OUT,
    USER_DELETED,
    UPDATE_USER_PROFILE,
    USER_CHECK,
    USER_CHECKED,
} from "../store/types";

const INITIAL_STATE = {
    info: null,
    loading: false,
    refinfo:null,
    check:false,
    error: {
        flag: false,
        msg: null
    }
}
export const authreducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case FETCH_USER:
            return {
                ...state,
                loading: true
            };
        case FETCH_USER_SUCCESS:
            return {
                ...state,
                info: action.payload,
                loading: false,
                error: {
                    flag: false,
                    msg: null
                },
            };
        case FETCH_USER_FAILED:
            return {
                ...state,
                loading: false,
                error: {
                    flag: true,
                    msg: action.payload
                },
                info: null
            };
        case USER_SIGN_IN:
            return {
                ...state,
                loading: true
            };
        case USER_SIGN_IN_SUCCESS:
            return {
                ...state,
                info: null,
                refinfo:action.payload,
                loading: false,
                error: {
                    flag: false,
                    msg: null
                },
            };
        case USER_SIGN_IN_FAILED:
            return {
                ...state,
                info: null,
                loading: false,
                error: {
                    flag: true,
                    msg: action.payload
                }
            };
        case USER_SIGN_OUT:
            return INITIAL_STATE;
        case USER_DELETED:
            return INITIAL_STATE;
        case UPDATE_USER_PROFILE:
            return {
                ...state,
                info: {...state.info, profile:action.payload},
            };
        case USER_CHECK:
            return {
                ...state,
                check: action.payload
            };
        case USER_CHECKED:
            return {
                ...state,
                check: action.payload
            };

        default:
            return state;
    }
};