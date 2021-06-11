import {
    FETCH_GUIDE,
    FETCH_GUIDE_UPDATE,
    FETCH_GUIDE_SUCCESS,
    FETCH_GUIDE_FAILED,
  } from "../store/types";

const INITIAL_STATE = {
    info: null,
    loading: false,
    error: {
      flag: false,
      msg: null
    }
}

export const guidereducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case FETCH_GUIDE:
            return {
                ...state,
                loading: true
            };
        case FETCH_GUIDE_SUCCESS:
            return {
                ...state,
                info: action.payload,
                loading: false,
                error: {
                    flag: false,
                    msg: null
                },
            };
        case FETCH_GUIDE_FAILED:
            return {
                ...state,
                loading: false,
                error: {
                    flag: true,
                    msg: action.payload
                },
                info: null
            };
        case FETCH_GUIDE_UPDATE:
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