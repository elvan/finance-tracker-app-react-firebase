import { AUTH_LOGIN_START } from './constants';

export const authReducer = (state, action) => {
  switch (action.type) {
    case AUTH_LOGIN_START:
      return {
        ...state,
        user: action.payload,
      };
    default:
      return state;
  }
};
