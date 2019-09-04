<template>
  <div></div>
</template>
<script>
export default {
  name: "dgTabbar",
  props: {},
  data() {
    return {};
  },
  methods: {
    open() {
      var NVTabBar = this._api.require("NVTabBar");
      console.log(NVTabBar);
      NVTabBar.open(
        {
          styles: {
            bg: "rgba(255,255,255,1)",
            h: 54,
            dividingLine: {
              width: 0,
              color: "#000"
            },
            badge: {
              bgColor: "#f00",
              numColor: "#000",
              size: 6.0,
              centerY: 2
            }
          },
          items: [
            {
              w: api.winWidth / 3.0,
              iconRect: {
                w: 25.0,
                h: 25.0
              },
              icon: {
                normal: "widget://image/nvtabbar/guan.png",
                highlight: "widget://image/nvtabbar/guaned.png",
                selected: "widget://image/nvtabbar/guaned.png"
              },
              title: {
                text: "首页",
                size: 12.0,
                normal: "#696969",
                selected: "#eb4f38",
                marginB: 6.0
              }
            },
            {
              w: api.winWidth / 3.0,
              iconRect: {
                w: 25.0,
                h: 25.0
              },
              icon: {
                normal: "widget://image/nvtabbar/bir.png",
                highlight: "widget://image/nvtabbar/bired.png",
                selected: "widget://image/nvtabbar/bired.png"
              },
              title: {
                text: "消息",
                size: 12.0,
                normal: "#696969",
                selected: "#eb4f38",
                marginB: 6.0
              }
            },
            {
              w: api.winWidth / 3.0,
              iconRect: {
                w: 25.0,
                h: 25.0
              },
              icon: {
                normal: "widget://image/nvtabbar/fav.png",
                highlight: "widget://image/nvtabbar/faved.png",
                selected: "widget://image/nvtabbar/faved.png"
              },
              title: {
                text: "我的",
                size: 12.0,
                normal: "#696969",
                selected: "#eb4f38",
                marginB: 6.0
              }
            }
          ],
          selectedIndex: 0
        },
        function(ret, err) {
          if (ret) {
            console.log(ret);
            if (ret.eventType == "click" && ret.index == 0) {
              api.openFrame({
                name: "kong",
                url: "./index.html",
                rect: {
                  x: 0,
                  y: 70,
                  h: 200
                }
              });
            }
            if (ret.eventType == "click" && ret.index == 1) {
              api.openFrame({
                name: "kong2",
                url: "./test.html",
                rect: {
                  x: 0,
                  y: 70,
                  h: 200
                }
              });
            }
            var NVTabBar = api.require("NVTabBar");
            NVTabBar.setBadge({
              index: 4,
              badge: ""
            });
          }
        }
      );
    }
  },
  computed: {},
  mounted() {
    this.open();
  }
};
</script>
<style lang='less' scoped>
</style>
