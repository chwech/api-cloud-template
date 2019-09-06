<template>
  <div class="ad dg-item-img-bg">
    <swiper v-if="list.length" class="ad-swiper" ref="adSwiper" :options="option">
      <swiper-slide class="dg-cursor-pointer" v-for="(item, index) in list" :key="index" @click.native="onJump(item)">
        <img :src="item.picture">
      </swiper-slide>
      <div v-if="list.length" class="swiper-pagination" slot="pagination"></div>
    </swiper>
  </div>
</template>
<script>
import 'swiper/dist/css/swiper.min.css'
import { swiper, swiperSlide } from 'vue-awesome-swiper'

export default {
  name: 'r-swiper',
  components: {
    swiper, // 轮播组件
    swiperSlide // 轮播组件
  },
  props: {
    list: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  data () {
    return {
      option: {
        pagination: {
          el: '.swiper-pagination'
        },
        loop: true,
        observer: true,
        observeParents: true,
        initialSlide: 0
      }
    }
  },
  computed: {
    swiper () { // 轮播对象
      return this.$refs.adSwiper.swiper
    }
  },
  methods: {
    onJump (item) {
      if (item.jump_param && item.jump_param.id) {
        let { id, type } = item.jump_param
        let name = ''
        type = type.toString()
        switch (type) {
          case '1':
            name = 'article-detail'
            break
          case '2':
            name = 'live-detail'
            break
          case '3':
            name = 'learn-detail'
            break
        }
        this.$router.push({ name, params: { id } })
      } else {
        let reg = /(http:\/\/|https:\/\/)((\w|=|\?|\.|\/|&|-)+)/g // 正则表达式判断http：// https：// 为合法
        let objExp = new RegExp(reg)
        if (item.url) {
          if (objExp.test(item.url) != true) return this.$tools.toast({ txt: '跳转地址不正确,无法跳转' })
          return window.location.href = item.url
        }
      }
    },
    // 滑动切换
    onSlideTo (index, speed = 300, runCallbacks = false) {
      this.swiper.slideTo(index, speed, runCallbacks)
    },
    // index切换
    onChangeTo (index) {
      this.$emit('on-slide', index)
    }
  }
}
</script>
<style lang="stylus" scoped>
  .ad
    wh(100%,180px)
    background-size 80px 80px
    overflow hidden
    position relative
    .ad-swiper
      wh(100%,100%)
    .swiper-container
      overflow initial
    .swiper-slide
      img
        wh(100%,100%)
        object-fit cover
    .swiper-pagination
      bottom 0
      /deep/.swiper-pagination-bullet
        background-color #fff
        opacity 0.8
      /deep/.swiper-pagination-bullet-active
        background-color $color
        opacity 1
</style>
