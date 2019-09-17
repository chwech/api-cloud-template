<template>
  <div class="wrap">
    {{ a.b }}
  </div>
</template>
<script>
let aa = {
  b: 'lalala'
}
export default {
  data () {
    return {
      a: {

      }
    }
  },
  created () {
    this.a = {
      ...aa
    }
    debugger
  }
}
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
