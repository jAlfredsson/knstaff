import client from "@client/utils/axios";

export const POST_REGISTER = "POST_REGISTER";
export const POST_FORGOT_PASSWORD = "POST_FORGOT_PASSWORD";
export const AUTH_REQUEST = "AUTH_REQUEST";
export const SET_AUTH = "SET_AUTH";
export const UNSET_AUTH = "UNSET_AUTH";
export const POST_RESET_PASSWORD = "POST_RESET_PASSWORD";
export const POST_CONFIRM_EMAIL = "POST_CONFIRM_EMAIL"
export const POST_RESEND_EMAIL_CONFIRM = "POST_RESEND_EMAIL_CONFIRM"
export const AUTH_ERROR = "AUTH_ERROR"
export const AUTH_SUCCESS = "AUTH_SUCCESS"
export const AUTH_LOGOUT = "AUTH_LOGOUT"
export const GET_OFFERS = "GET_OFFERS"

const actions = {
  [AUTH_REQUEST]: ({commit, dispatch}, user) => {
    return new Promise((resolve, reject) => { // The Promise used for router redirect in login
      commit(AUTH_REQUEST)
      client({url: 'auth/login', data: user, method: 'POST' })
        .then(resp => {
          try {
            const token = resp.data.token
            localStorage.setItem('auth', JSON.stringify(resp.data))
            client.defaults.headers.common['Authorization'] = token
            commit(AUTH_SUCCESS, {token, user: resp.data.user})
            resolve(resp)
          } catch (e) {
            reject(resp)
          }
        })
    })
  },
  [AUTH_LOGOUT]: ({commit, dispatch}) => {
    return new Promise((resolve, reject) => {
      commit(AUTH_LOGOUT)
      localStorage.removeItem('auth') // clear your user's token from localstorage
      delete client.defaults.headers.common['Authorization']
      resolve()
    })
  }
}

export default {
  ...actions,
  [GET_OFFERS]: (context, data) => client.post("auth/offers", data),
  [POST_REGISTER]: (context, data) => client.post("auth/register", data),
  // [AUTH_REQUEST]: (context, data) => client.post("auth/login", data),
  [POST_FORGOT_PASSWORD]: (context, data) =>
    client.post("auth/passwords/email", data),
  [POST_RESET_PASSWORD]: (context, data) =>
    client.post("auth/passwords/reset", data),
  [POST_CONFIRM_EMAIL]: (context, data) => client.post("auth/email/confirm", data),
  [POST_RESEND_EMAIL_CONFIRM]: (context, data) => client.post("auth/email/resendConfirm", data),
};
