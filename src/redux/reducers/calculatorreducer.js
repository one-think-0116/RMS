import {
    FETCH_CALCULATOR,
    FETCH_CALCULATOR_UPDATE,
    FETCH_CALCULATOR_SUCCESS,
    FETCH_CALCULATOR_FAILED,
  } from "../store/types";

const INITIAL_STATE = {
    info: null,
    loading: false,
    error: {
      flag: false,
      msg: null
    }
}

export const calculatorreducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case FETCH_CALCULATOR:
            return {
                ...state,
                loading: true
            };
        case FETCH_CALCULATOR_SUCCESS:
            return {
                ...state,
                info: action.payload,
                loading: false,
                error: {
                    flag: false,
                    msg: null
                },
            };
        case FETCH_CALCULATOR_FAILED:
            return {
                ...state,
                loading: false,
                error: {
                    flag: true,
                    msg: action.payload
                },
                info: null
            };
        case FETCH_CALCULATOR_UPDATE:
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