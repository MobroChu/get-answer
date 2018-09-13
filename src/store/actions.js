export default {
  addNum ({state, commit}, option) {
    commit('REMBER_ANSWER', option)
    if (state.itemNum < state.itemDetail.length) {
      commit('ADD_ITEMNUM', 1)
    }
  },
  initialData ({ commit }) {
    commit('INITIAL_DATA')
  }
}
