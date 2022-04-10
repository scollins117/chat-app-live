import { useReducer } from "react";

import {
  TOGGLE_CHAT,
  TOGGLE_SHOW,
  UPDATE_CURRENT_SEARCH,
  UPDATE_CURRENT_FRIEND,
  UPDATE_FRIENDS,
  ADD_FRIEND,
} from "./actions";

export const reducer = (state, action) => {
  switch (action.type) {
    // if action type value is the value of `UPDATE_PRODUCTS`, return a new state object with an updated products array
    case TOGGLE_CHAT:
      return {
        ...state,
        chatOpen: !state.chatOpen,
      };
    // if action type value is the value of `UPDATE_CATEGORIES`, return a new state object with an updated categories array
    case TOGGLE_SHOW:
      return {
        ...state,
        showOpen: !state.showOpen,
      };

    case UPDATE_CURRENT_SEARCH:
      return {
        ...state,
        currentSearch: action.currentSearch,
      };

    case UPDATE_CURRENT_FRIEND:
      return {
        ...state,
        currentFriend: action.currentFriend,
      };

    case UPDATE_FRIENDS:
      return {
        ...state,
        friends: [...action.friends],
      };

    case ADD_FRIEND:
      return {
        ...state,
        friends: [...state.friends, action.friend],
      };

    default:
      return state;
  }
};

export function useChatReducer(initialState) {
  return useReducer(reducer, initialState);
}
