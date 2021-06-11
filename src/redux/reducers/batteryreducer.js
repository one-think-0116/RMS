import {
    FETCH_BATTERY,
    FETCH_BATTERY_UPDATE,
    FETCH_BATTERY_SUCCESS,
    FETCH_BATTERY_FAILED,
  } from "../store/types";

  const INITIAL_STATE = {
    info: null,
    loading: false,
    error: {
      flag: false,
      msg: null
    }
}

export const batteryreducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case FETCH_BATTERY:
            return {
                ...state,
                loading: true
            };
        case FETCH_BATTERY_SUCCESS:
            return {
                ...state,
                info: action.payload,
                loading: false,
                error: {
                    flag: false,
                    msg: null
                },
            };
        case FETCH_BATTERY_FAILED:
            return {
                ...state,
                loading: false,
                error: {
                    flag: true,
                    msg: action.payload
                },
                info: null
            };
        case FETCH_BATTERY_UPDATE:
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