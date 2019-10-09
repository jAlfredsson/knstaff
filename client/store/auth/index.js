import mutations from "./mutations";
import getters from "./getters";
import actions from "./actions";
import axios from "@client/utils/axios"

let state = null

try {
  state = JSON.parse(localStorage.getItem("auth"))
} catch (e) {
  state = {token: null, user: null, status: ''}
}
if(!state){state = {token: null, user: null, status: ''}}

if(state.token){
  axios.defaults.headers.common['Authorization'] = state.token
}

export default {
  state,
  actions,
  getters,
  mutations
};
