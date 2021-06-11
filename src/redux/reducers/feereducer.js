import {
    FETCH_FEE,
    FETCH_FEE_UPDATE,
    FETCH_FEE_SUCCESS,
    FETCH_FEE_FAILED,
  } from "../store/types";

const INITIAL_STATE = {
    info: null,
    loading: false,
    error: {
      flag: false,
      msg: null
    }
}

export const feereducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case FETCH_FEE:
            return {
                ...state,
                loading: true
            };
        case FETCH_FEE_SUCCESS:
            return {
                ...state,
                info: action.payload,
                loading: false,
                error: {
                    flag: false,
                    msg: null
                },
            };
        case FETCH_FEE_FAILED:
            return {
                ...state,
                loading: false,
                error: {
                    flag: true,
                    msg: action.payload
                },
                info: null
            };
        case FETCH_FEE_UPDATE:
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