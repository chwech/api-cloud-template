import Test from "./test.vue";
import Vue from "vue";
import "../../../css/api.css";
import "../../../script/api";
import VConsole from "vconsole";

function init(params) {
  window.apiready = function() {
    Vue.prototype.$api = window.$api;
    Vue.prototype._api = window.api;

    new VConsole();
    new Vue({
      render: h => h(Test)
    }).$mount("#app");
  };

  if (process.env.NODE_ENV === 'development') {
    apiready()
  }
}

init();
