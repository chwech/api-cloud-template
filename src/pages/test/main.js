import Test from "./test.vue";
import Vue from "vue";
import "../../../css/api.css";
import "../../../script/api";

window.apiready = function() {
  Vue.prototype.$api = window.$api;
  Vue.prototype._api = api;

  new Vue({
    render: h => h(Test)
  }).$mount("#app");
};
