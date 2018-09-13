<template>
  <section>
    <header class="top_tips">
      <span v-if="fatherComponent === 'item'">{{itemDetail[itemNum-1].topic_name}}</span>
      <span v-if="fatherComponent === 'home'">{{itemDetail[itemNum-1].active_topic_phase}}</span>
    </header>
    <div class="body">
      <div v-if="fatherComponent === 'home'" class="item-container">
        <img src="../images/1-2.png" alt="aaa" />
        <router-link tag="a" class="begin home-begin" to="/item"></router-link>
      </div>
      <div class="item-container item-container-item" v-if="fatherComponent === 'item'">
        <dl>
          <dt><i>{{itemNum}}. </i><p>{{itemDetail[itemNum-1].topic_name}}</p></dt>
          <dd v-for="(item, index) in itemDetail[itemNum-1].topic_answer"
            :key="index"
            @click="choosed(item.topic_answer_id, index)"
            :class="{ 'active': choosedNum === index }"
          >
            <span>{{numToUpperCase(index)}}</span>
            <p>{{item.answer_name}}</p>
          </dd>
        </dl>
        <span :class="['begin', 'item-begin-submit']" v-if="itemNum === itemDetail.length" @click="handleNext(true)"></span>
        <span :class="['begin', 'item-begin-next']" v-else @click="handleNext()"></span>
      </div>
    </div>
  </section>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: 'itemContainer',
  props: {
    fatherComponent: {
      type: String,
      required: true
    }
  },
  computed: mapState([
    'itemNum',
    'level',
    'itemDetail',
    'answerid'
  ]),
  data () {
    return {
      itemId: null, // 题目ID
      choosedNum: null, // 选中答案索引
      choosedId: null // 选中答案id
    }
  },
  created () {
    this.initialData()
  },
  mounted () {
    // console.log(this.answerid, '------')
  },
  beforeUpdate () {

  },
  methods: {
    ...mapActions([
      'addNum',
      'initialData',
      'rightAnswerid'
    ]),
    numToUpperCase (type) {
      switch (type) {
        case 0:
          return 'A'
        case 1:
          return 'B'
        case 2:
          return 'C'
        case 3:
          return 'D'
      }
    },
    // 设置选中
    choosed (answerId, index) {
      this.choosedNum = index
      this.choosedId = answerId
    },
    handleNext (submit) {
      // this.$store.commit('REMBER_ANSWER', this.choosedId)
      if (this.choosedNum !== null) {
        this.choosedNum = null
        this.addNum(this.choosedId)
        if (submit) this.$router.push('score')
      } else {
        alert('你还没有选择答案')
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
section
  background url('../images/1-1.jpg')
  .top_tips
    background url('../images/WechatIMG2.png') no-repeat
    position absolute
    height 7.35rem
    width 3.25rem
    background-size 100% 100%
    right 1.6rem
    top -1.3rem
    > span
      position absolute
      bottom 1.1rem
      left .48rem
      height .7rem
      line-height .7rem
      width 2.5rem
      color #a57c50
      text-align center
      font-size .6rem
  .body
    width 100%
    .item-container
      width 88%
      margin 4rem auto 0
      img
        width 100%
      &.item-container-item
        background url('../images/2-1.png') no-repeat
        background-size 100% 100%
        height 13rem
        width 11.625rem
    .begin
      color #fff
      width 4.35rem
      height 2.1rem
      display block
      margin 0rem auto 0
      &.home-begin
        background url('../images/1-4.png') no-repeat
        background-size 100% 100%
      &.item-begin-next
        background url('../images/2-2.png') no-repeat
        background-size 100% 100%
      &.item-begin-submit
        background url('../images/3-1.png') no-repeat
        background-size 100% 100%
    .item-container-item
      min-height 10rem
      dl
        color #fff
        padding 2rem
      dt
        font-size .65rem
        line-height .8rem
        color #f0f0f0
        p
          font-weight bold
          display inline-block
      dd
        line-height .3rem
        font-size .6rem
        line-height .8rem
        margin-top .4rem
        span
          border 1px solid #FFF
          border-radius 50%
          font-size .5rem
          width .65rem
          height .65rem
          display inline-block
          text-align center
          line-height .6rem
        p
          display inline-block
          text-indent .2rem
          font-weight light
      dd.active span
        color #333
        background #cc0
        border-color #cc0
</style>
