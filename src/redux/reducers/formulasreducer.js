import {
    FETCH_FORMULAS,
    FETCH_FORMULAS_UPDATE,
    FETCH_FORMULAS_SUCCESS,
    FETCH_FORMULAS_FAILED,
  } from "../store/types";

const INITIAL_STATE = {
    info: null,
    loading: false,
    error: {
      flag: false,
      msg: null
    }
}

export const formulasreducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case FETCH_FORMULAS:
            return {
                ...state,
                loading: true
            };
        case FETCH_FORMULAS_SUCCESS:
            return {
                ...state,
                info: action.payload,
                loading: false,
                error: {
                    flag: false,
                    msg: null
                },
            };
        case FETCH_FORMULAS_FAILED:
            return {
                ...state,
                loading: false,
                error: {
                    flag: true,
                    msg: action.payload
                },
                info: null
            };
        case FETCH_FORMULAS_UPDATE:
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