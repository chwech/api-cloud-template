<template>
  <div class="wrap">
    <header ref="header">API Cloud</header>
    <section class="flex-1"></section>
    <footer ref="footer">
      Copyright &copy;
      <span id="yeasr">{{ new Date().getFullYear() }}</span>
    </footer>
  </div>
</template>
<script>
export default {
  name: "",
  props: {},
  data() {
    return {};
  },
  methods: {},
  computed: {},
  mounted() {
    const header = this.$refs.header; // 获取 header 标签元素
    const footer = this.$refs.footer; // 获取 footer 标签元素

    // 1.修复开启沉浸式效果带来的顶部Header与手机状态栏重合的问题，最新api.js方法已支持适配iPhoneX；
    // 2.默认已开启了沉浸式效果 config.xml中 <preference name="statusBarAppearance" value="true"/>
    // 3.沉浸式效果适配支持iOS7+，Android4.4+以上版本
    const headerH = this.$api.fixStatusBar(header);
    // 最新api.js为了适配iPhoneX增加的方法，修复底部Footer部分与iPhoneX的底部虚拟横条键重叠的问题；
    const footerH = this.$api.fixTabBar(footer);

    this._api.openFrame({
      name: "main",
      url: "./test.html",
      bounces: true,
      rect: {
        // 推荐使用Margin布局，用于适配屏幕的动态变化
        marginTop: headerH, // main页面距离win顶部的高度
        marginBottom: footerH, // main页面距离win底部的高度
        w: "auto" // main页面的宽度 自适应屏幕宽度
      }
    });
  }
};
</script>
<style lang='less' scoped>
.wrap {
  height: 100%;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-flex-flow: column;
  display: flex;
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
