import Vue from "vue";
import "./styles/main.css";
import store from "./store";
import router from "./routes";
import Router from "vue-router";
import Main from "./pages/Main.vue";
import TextInput from "@components/TextInput.vue";
import TextInputWithValidation from "@components/TextInputWithValidation.vue";
import Button from "@components/Button.vue";
import Loader from "@components/Loader.vue";
import authMixin from "@client/mixins/auth";
import flashMixin from "@client/mixins/flash";

import { ValidationProvider, ValidationObserver, extend } from "vee-validate";
import { required, email, min } from "vee-validate/dist/rules";

extend("required", {
  ...required,
  message: "Required"
});

extend("email", {
  ...email,
  message: "Not a valid email"
});

extend("min", {
  ...min,
  message: "Too short"
});

Vue.use(Router);
Vue.mixin(authMixin);
Vue.mixin(flashMixin);

Vue.component("ValidationProvider", ValidationProvider);
Vue.component("ValidationObserver", ValidationObserver);
Vue.component("text-input", TextInput);
Vue.component("TextInputWithValidation", TextInputWithValidation);
Vue.component("btn", Button);
Vue.component("loader", Loader);

const app = new Vue({
  el: "#app",
  router,
  store,
  render: h => h(Main)
});
