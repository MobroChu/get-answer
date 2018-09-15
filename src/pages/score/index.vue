<template>
  <div class="score">
    <div class="mark">
      <div class="box"><span>{{scores}}</span><span>分！</span></div>
      <p class="txt">{{getTipsTxt()}}</p>
    </div>
    <div class="share" @click="share"></div>
    <div class="share-page" @click="sharePage = !sharePage" v-if="sharePage"></div>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
export default {
  name: 'score',
  data () {
    return {
      scores: 0,
      tipsTxt: [
        '你说，是不是把知识都还给小学老师了？',
        '还不错，但还需要继续加油哦！',
        '不要嘚瑟还有进步的空间！',
        '智商离爆表只差一步了！',
        '你也太聪明啦，葡萄之家欢迎你！'
      ],
      sharePage: false,
      totalScores: 0 // 试卷总分
    }
  },
  computed: {
    ...mapState([
      'answerid',
      'itemDetail'
    ]),
    ...mapGetters([
      'rightAnswerid'
    ])
  },
  methods: {
    caclScores () {
      let score = this.scores
      let totalScores = this.totalScores
      this.answerid.map((answer, index) => {
        let rightAnswerid = this.rightAnswerid[index].rightAnswer // 标准答案
        let singleScore = this.rightAnswerid[index].singleScore // 当前题目的分数
        totalScores += singleScore
        // 将用户选择的答案格式化
        let answerContain = []
        answer.forEach(element => {
          if (element.index > -1) {
            answerContain.push(element.answerId)
          }
        })
        switch (this.isAContainB(answerContain, rightAnswerid)) {
          default:
          case 0: score += 0
            break
          case 1: score += singleScore / 2
            break
          case 2: score += singleScore
            break
        }
      })
      this.totalScores = totalScores
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
      let len = this.tipsTxt.length
      let index = Math.floor(this.scores / (this.totalScores / len))
      index = index === len ? len - 1 : isNaN(index) ? 0 : index
      return this.tipsTxt[index]
    },
    share () {
      this.sharePage = true
    },
    // 用户答案 a 是否包含在标准答案 b 内
    isAContainB (a, b) {
      if (a.length > b.length) {
        return 0
      } else if (a.length === b.length) {
        return (JSON.stringify(a) === JSON.stringify(b)) ? 2 : 0
      } else if (a.length < b.length) {
        let aa = a.every(item => {
          return b.some(bb => bb === item)
        })
        return aa ? 1 : 0
      }
    }
  },
  mounted () {
    this.scores = this.caclScores()
  }
}
</script>

<style lang="stylus">
body
  background url('../../images/4-1.jpg') no-repeat
  background-size 100% 100%
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
