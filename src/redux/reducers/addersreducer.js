import {
    FETCH_ADDERS,
    FETCH_ADDERS_UPDATE,
    FETCH_ADDERS_SUCCESS,
    FETCH_ADDERS_FAILED,
  } from "../store/types";

const INITIAL_STATE = {
    info: null,
    loading: false,
    error: {
      flag: false,
      msg: null
    }
}

export const addersreducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case FETCH_ADDERS:
            return {
                ...state,
                loading: true
            };
        case FETCH_ADDERS_SUCCESS:
            return {
                ...state,
                info: action.payload,
                loading: false,
                error: {
                    flag: false,
                    msg: null
                },
            };
        case FETCH_ADDERS_FAILED:
            return {
                ...state,
                loading: false,
                error: {
                    flag: true,
                    msg: action.payload
                },
                info: null
            };
        case FETCH_ADDERS_UPDATE:
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