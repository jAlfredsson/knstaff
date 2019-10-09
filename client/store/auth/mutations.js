import { SET_AUTH, UNSET_AUTH, AUTH_LOGOUT, AUTH_REQUEST, AUTH_SUCCESS, AUTH_ERROR } from "./actions";

const mutations = {
  [AUTH_REQUEST]: (state) => {
    state.status = 'loading'
  },
  [AUTH_SUCCESS]: (state, {token, user}) => {
    state.status = 'success'
    state.token = token
    state.user = user
  },
  [AUTH_ERROR]: (state) => {
    state.status = 'error'
  },
  [AUTH_LOGOUT]: (state) => {
    state.token = null,
    state.status = ''
    state.user = null
  }
}

export default {
  ...mutations,
  [SET_AUTH](state, { user, token }) {
    state.user = user;
    state.token = token;
  },
  [UNSET_AUTH](state) {
    state.user = null;
    state.token = null;
  }
};
