<template>
  <div class="wrap">
    <dg-home-ad :list="ad"/>
    <!-- <header ref="header">API Cloud</header> -->
    <section class="flex-1">
      <label>你好，世界123</label>
      <div id="sys-info">
        <ul>
          <li>引擎版本信息: {{ device.ver }}</li>
          <li>系统类型: {{ device.sType }}</li>
          <li>系统版本: {{ device.sVer }}</li>
          <li>设备标识: {{ device.id }}</li>
          <li>设备型号: {{ device.model }}</li>
          <li>设备名称: {{ device.name }}</li>
          <li>网络状态: {{ device.cType }}</li>
          <li>主窗口名字: {{ device.winName }}</li>
          <li>主窗口宽度: {{ device.winWidth }}</li>
          <li>主窗口高度: {{ device.winHeight }}</li>
          <li>子窗口名字: {{ device.frameName }}</li>
          <li>子窗口宽度: {{ device.frameWidth }}</li>
          <li>子窗口高度: {{ device.frameHeight }}</li>
        </ul>
      </div>
    </section>
    <footer ref="footer">
      Copyright &copy;
      <span id="yeasr">{{ new Date().getFullYear() }}</span>
    </footer>
    <dg-tabbar></dg-tabbar>
  </div>
</template>
<script>
import dgTabbar from "@/components/dgTabbar.vue";
// import dgHomeAd from "./Ad.vue"
// import { adv } from '@/api/api'
import("./Ad.vue")
  .then(ad => {
    console.log(ad);
  })
export default {
  name: "",
  components: {
    dgTabbar,
    // dgHomeAd
  },
  props: {},
  data() {
    return {
      device: {
        ver: ""
      },
      ad: []
    };
  },
  methods: {
    // async getAdv () { // 获取广告
    //   try {
    //     let { data: list } = await adv({ position_id: 1 })
    //     this.ad = list
    //   } catch (err) {
    //     this.$tools.toast({ txt: err.msg || '获取获取广告失败' })
    //   }
    // },
  },
  computed: {},
  mounted() {
    console.log(process.env.NODE_ENV)
    console.log(process.env.VUE_APP_API_BASE)
    // this.getAdv()
    // this.device.ver = this._api.version;
    // this.device.sType = this._api.systemType;
    // this.device.sVer = this._api.systemVersion;
    // this.device.id = this._api.deviceId;
    // this.device.model = this._api.deviceModel;
    // this.device.name = this._api.deviceName;
    // this.device.cType = this._api.connectionType;
    // this.device.winName = this._api.winName;
    // this.device.winWidth = this._api.winWidth;
    // this.device.winHeight = this._api.winHeight;
    // this.device.frameName = this._api.frameName || "";
    // this.device.frameWidth = this._api.frameWidth || "";
    // this.device.frameHeight = this._api.frameHeight || "";

    // const header = this.$refs.header; // 获取 header 标签元素
    // const footer = this.$refs.footer; // 获取 footer 标签元素

    // // 1.修复开启沉浸式效果带来的顶部Header与手机状态栏重合的问题，最新api.js方法已支持适配iPhoneX；
    // // 2.默认已开启了沉浸式效果 config.xml中 <preference name="statusBarAppearance" value="true"/>
    // // 3.沉浸式效果适配支持iOS7+，Android4.4+以上版本
    // const headerH = this.$api.fixStatusBar(header);
    // // 最新api.js为了适配iPhoneX增加的方法，修复底部Footer部分与iPhoneX的底部虚拟横条键重叠的问题；
    // const footerH = this.$api.fixTabBar(footer);

    // this._api.openFrame({
    //   name: "main",
    //   url: "./test.html",
    //   bounces: true,
    //   rect: {
    //     // 推荐使用Margin布局，用于适配屏幕的动态变化
    //     marginTop: headerH, // main页面距离win顶部的高度
    //     marginBottom: footerH, // main页面距离win底部的高度
    //     w: "auto" // main页面的宽度 自适应屏幕宽度
    //   }
    // });
  }
};
</script>
<style lang='less' scoped>
.wrap {
  height: 100%;
  display: flex;
  flex-direction: column;
}

header {
  height: 44px;
  width: 100%;
  text-align: center;
  background-color: #81a9c3;
  color: #fff;
  line-height: 44px;
  font-size: 20px;
}

.flex-1 {
  -webkit-box-flex: 1;
  -webkit-flex: 1;
  flex: 1;
}

footer {
  height: 30px;
  width: 100%;
  background-color: #81a9c3;
  color: white;
  line-height: 30px;
  text-align: center;
}
</style>
