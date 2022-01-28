import { AUTH_IS_READY, AUTH_LOGIN, AUTH_LOGOUT } from './constants';

export const authReducer = (state, action) => {
  switch (action.type) {
    case AUTH_LOGIN:
      return {
        ...state,
        user: action.payload,
      };
    case AUTH_LOGOUT:
      return {
        ...state,
        user: null,
      };
    case AUTH_IS_READY:
      return {
        ...state,
        user: action.payload,
        authIsReady: true,
      };
    default:
      return state;
  }
};
