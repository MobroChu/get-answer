import { ADD_ITEMNUM, REMBER_ANSWER, INITIAL_DATA } from './type'

export default {
  [ADD_ITEMNUM] (state, num) {
    state.itemNum += num
  },
  [REMBER_ANSWER] (state, id) {
    state.answerid.push(id)
  },
  [INITIAL_DATA] (state) {
    state.itemNum = 1
    state.answerid = []
  }
}
