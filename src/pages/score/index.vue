<template>
  <div class="score">
    <div class="mark">
      <div class="box"><span>{{scores}}</span><span>分！</span></div>
      <p class="txt">{{getTipsTxt()}}</p>
    </div>
    <div class="share" @click="share"></div>
    <div class="share-page" v-if="sharePage"></div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'score',
  data () {
    return {
      scores: 0,
      rightAnswer: [],
      tipsTxt: [
        '你说，是不是把知识都还给小学老师了？',
        '还不错，但还需要继续加油哦！',
        '不要嘚瑟还有进步的空间！',
        '智商离爆表只差一步了！',
        '你也太聪明啦，葡萄之家欢迎你！'
      ],
      sharePage: false
    }
  },
  computed: mapState([
    'answerid',
    'itemDetail'
  ]),
  methods: {
    caclScores () {
      let score = this.scores
      this.answerid.map((answer, index) => {
        this.rightAnswer[index].forEach(singleAnswer => {
          score += (singleAnswer === answer ? 20 : 0)
        })
      })
      return score
    },
    getRightAnswer () {
      return this.itemDetail.map((item, index) => {
        return item.topic_answer.map((answer, answerId) => {
          if (answer.is_standard_answer) {
            return answer.topic_answer_id
          }
        })
      })
    },
    getTipsTxt () {
      if (this.scores < 20) {
        return this.tipsTxt[0]
      } else if (this.scores < 40) {
        return this.tipsTxt[1]
      } else if (this.scores < 60) {
        return this.tipsTxt[2]
      } else if (this.scores < 80) {
        return this.tipsTxt[3]
      } else if (this.scores <= 100) {
        return this.tipsTxt[4]
      }
    },
    share () {
      this.sharePage = true
    }
  },
  mounted () {
    this.rightAnswer = this.getRightAnswer()
    this.scores = this.caclScores()
  }
}
</script>

<style lang="stylus">
body
  background url('../../images/4-1.jpg') no-repeat
  background-size contain
.score
  background url('../../images/4-2.png') no-repeat center 1rem
  background-size 9.7rem 9.1rem
  padding-top 1rem
.mark
  width 9.7rem
  height 9.1rem
  margin 0 auto
  padding-left .6rem
  text-align center
  .box
    color #f40907
    margin 0 auto
    text-align center
    font-weight bold
    font-size 1.6rem
    padding-top 4.2rem
  .txt
    font-size .6rem
    padding: 0 5px
.share
  background url('../../images/4-3.png') no-repeat center
  background-size 100% 100%
  width 7.5rem
  height 3.2rem
  margin 2rem auto 0
.share-page
  width 100%
  height 100%
  position fixed
  z-index 999
  background rgba(0, 0, 0, 0.8) url('../../images/5-1.png') no-repeat
  background-size 11rem 9.7rem
  background-position 4rem 1rem
  top 0
  left 0
</style>
