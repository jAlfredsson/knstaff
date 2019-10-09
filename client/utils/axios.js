import Axios from "axios";
import store from '@store'
import router from '@client/routes'
import { AUTH_LOGOUT } from '@store/auth/actions'


const axios = Axios.create({
  baseURL: "/api/v1/"
});

axios.interceptors.response.use(response => {
   return response;
}, error => {
  if (error.response.status === 401) {
   store.dispatch(AUTH_LOGOUT)
   router.push('/login')
  }
  return error;
});



// axios.interceptors.request.use(function(config){
//   if(!!store.state.auth.user && !!store.state.auth.token){
//     config.headers = {
//       access_token: store.state.auth.token
//     }
//   }
//   return config
// })

export default axios
