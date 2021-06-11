import {
    SIDEBAR_OPEN,
    SEARCH_OPEN,
    TOGGLE_SIDEBAR
  } from "../store/types";
import { store } from '../store';
export const toggleSidebar = () => (dispatch) => (firebase) => {
    dispatch({
        type: TOGGLE_SIDEBAR,
        payload:!store.getState().layout.isSidebarOpened
    });
}
