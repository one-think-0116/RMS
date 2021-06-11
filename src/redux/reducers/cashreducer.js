import {
    FETCH_CASH,
    FETCH_CASH_UPDATE,
    FETCH_CASH_SUCCESS,
    FETCH_CASH_FAILED,
  } from "../store/types";

const INITIAL_STATE = {
    info: null,
    loading: false,
    error: {
      flag: false,
      msg: null
    }
}

export const cashreducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case FETCH_CASH:
            return {
                ...state,
                loading: true
            };
        case FETCH_CASH_SUCCESS:
            return {
                ...state,
                info: action.payload,
                loading: false,
                error: {
                    flag: false,
                    msg: null
                },
            };
        case FETCH_CASH_FAILED:
            return {
                ...state,
                loading: false,
                error: {
                    flag: true,
                    msg: action.payload
                },
                info: null
            };
        case FETCH_CASH_UPDATE:
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