import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import axios from "axios";
axios.interceptors.request.use((config) => {
  if (store.state.token && store.state.autorizacao) {
    config.headers.Authorization = store.state.token;
    config.headers.autorizacao = store.state.autorizacao;
  }
  return config;
});
axios.interceptors.response.use(
  (res) => {
    return res;
  },
  (error) => {
    if (error.response.status === 403) {
      alert("Não autorizado!");
    }
    if (error.response.status === 404) {
      alert("Nenhum registro encontrado!");
    }
    if (error.response.status === 400) {
      alert("Requisição inválida");
    } else if (error.response.status === 401) {
      store.commit("logout");
      router.push("/login");
    }
    throw error;
  }
);
axios.defaults.baseURL = "http://localhost:8082/motoclube";
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
