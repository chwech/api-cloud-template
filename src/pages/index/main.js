import Test from "./test.vue";
import Vue from "vue";
import "../../../css/api.css";
import "../../../script/api";
import "./index.less";
import VConsole from "vconsole";

function init() {
  window.apiready = function() {
    Vue.prototype.$api = window.$api;
    Vue.prototype._api = api;

    new VConsole();
    new Vue({
      render: h => h(Test)
    }).$mount("#app");
  };
}

init();
