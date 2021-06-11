import {
    FETCH_SELFGEN,
    FETCH_SELFGEN_UPDATE,
    FETCH_SELFGEN_SUCCESS,
    FETCH_SELFGEN_FAILED,
  } from "../store/types";

const INITIAL_STATE = {
    info: null,
    loading: false,
    error: {
      flag: false,
      msg: null
    }
}

export const selfgenreducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case FETCH_SELFGEN:
            return {
                ...state,
                loading: true
            };
        case FETCH_SELFGEN_SUCCESS:
            return {
                ...state,
                info: action.payload,
                loading: false,
                error: {
                    flag: false,
                    msg: null
                },
            };
        case FETCH_SELFGEN_FAILED:
            return {
                ...state,
                loading: false,
                error: {
                    flag: true,
                    msg: action.payload
                },
                info: null
            };
        case FETCH_SELFGEN_UPDATE:
            return {
                ...state,
                info: action.payload,
                loading: false,
                error: {
                    flag: false,
                    msg: null
                },
            };
        default:
            return state;
    }
}