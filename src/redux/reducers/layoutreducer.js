import {
    SIDEBAR_OPEN,
    SEARCH_OPEN,
    TOGGLE_SIDEBAR
  } from "../store/types";

const INITIAL_STATE = {
    isSidebarOpened: true,
    isSearchOpen:false
}

export const layoutreducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SIDEBAR_OPEN:
            return {
                ...state,
                isSidebarOpened: true
            };
        case SEARCH_OPEN:
            return {
                ...state,
                isSearchOpen: true
            };
        case TOGGLE_SIDEBAR:
            return {
                ...state,
                isSidebarOpened: action.payload
            };
        default:
            return state;
    }
}
