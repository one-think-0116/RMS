import {
    FETCH_USERS,
    FETCH_USERS_UPDATE,
    FETCH_USERS_SUCCESS,
    FETCH_USERS_FAILED,
  } from "../store/types";

const INITIAL_STATE = {
    info: null,
    loading: false,
    error: {
      flag: false,
      msg: null
    }
}

export const usersreducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case FETCH_USERS:
            return {
                ...state,
                loading: true
            };
        case FETCH_USERS_SUCCESS:
            return {
                ...state,
                info: action.payload,
                loading: false,
                error: {
                    flag: false,
                    msg: null
                },
            };
        case FETCH_USERS_FAILED:
            return {
                ...state,
                loading: false,
                error: {
                    flag: true,
                    msg: action.payload
                },
                info: null
            };
        case FETCH_USERS_UPDATE:
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