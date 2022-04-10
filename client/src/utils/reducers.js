import { useReducer } from 'react';

import {
  TOGGLE_CHAT,
  UPDATE_CURRENT_SEARCH,
  CURRENT_USER,
  TOGGLE_SHOW,
} from "./actions";

export const reducer = (state, action) => {
  switch (action.type) {
    // if action type value is the value of `UPDATE_PRODUCTS`, return a new state object with an updated products array
    case TOGGLE_CHAT:
      return {
        ...state,
        chatOpen: !state.chatOpen
      };
    // if action type value is the value of `UPDATE_CATEGORIES`, return a new state object with an updated categories array
    case TOGGLE_SHOW:
      return {
        ...state,
        showOpen: !state.showOpen
      };

    case UPDATE_CURRENT_SEARCH:
      return {
        ...state,
        currentSearch: action.currentSearch,
      };

    default:
      return state;
  }
};

export function useChatReducer(initialState) {
  return useReducer(reducer, initialState);
}