import App from "./index.vue";
import Vue from "vue";
import "../../../css/api.css";
import "../../../script/api";
import "./index.less";
import VConsole from "vconsole";

function init() {
  window.apiready = function() {
    Vue.prototype.$api = window.$api;
    Vue.prototype._api = window.api;

    new Vue({
      render: h => h(App)
    }).$mount("#app");
  };
  if (process.env.NODE_ENV === 'development') {
    new VConsole();
  }
}

init();
