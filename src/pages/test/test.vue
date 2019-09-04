<template>
  <div>
    <label>你好，世界</label>
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
  </div>
</template>
<script>
export default {
  name: "",
  props: {},
  data() {
    return {
      device: {
        ver: ""
      }
    };
  },
  methods: {},
  computed: {},
  mounted() {
    this.device.ver = this._api.version;
    this.device.sType = this._api.systemType;
    this.device.sVer = this._api.systemVersion;
    this.device.id = this._api.deviceId;
    this.device.model = this._api.deviceModel;
    this.device.name = this._api.deviceName;
    this.device.cType = this._api.connectionType;
    this.device.winName = this._api.winName;
    this.device.winWidth = this._api.winWidth;
    this.device.winHeight = this._api.winHeight;
    this.device.frameName = this._api.frameName || "";
    this.device.frameWidth = this._api.frameWidth || "";
    this.device.frameHeight = this._api.frameHeight || "";
  }
};
</script>
<style lang='less' scoped>
label {
  margin: 10px;
  font-size: 24px;
}

ul {
  margin-bottom: 10px;
}

ul li {
  margin: 5px 10px;
  padding: 5px;
  color: #000;
  word-wrap: break-word;
}
</style>
