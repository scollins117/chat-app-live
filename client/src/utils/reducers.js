import { useReducer } from "react";

import {
  TOGGLE_CHAT,
  TOGGLE_SHOW,
  UPDATE_CURRENT_SEARCH,
  UPDATE_CURRENT_FRIEND,
  UPDATE_ME,
  ADD_FRIEND,
  UPDATE_CURRENT_CHAT,
  UPDATE_CHAT,
  UPDATE_FRIENDS
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

    case UPDATE_ME:
      return {
        ...state,
        me: action.me,
      };

    case ADD_FRIEND:
      console.log("state: ", state, "action: ", action);
      return {
        ...state,
        friends: [...state.friends, action.friend],
      };

    case UPDATE_FRIENDS:
      console.log("state: ", state, "action: ", action);
      return {
        ...state,
        friends: [action.friend],
      };

    case UPDATE_CURRENT_CHAT:
      return {
        ...state,
        currentChat: action.currentChat,
      };

    case UPDATE_CHAT:
      console.log("action: ", action);
      return {
        ...state,
        chat: action.chat,
      };

    default:
      return state;
  }
};

export function useChatReducer(initialState) {
  return useReducer(reducer, initialState);
}
