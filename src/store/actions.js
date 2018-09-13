export default {
  addNum ({state, commit}, id) {
    commit('REMBER_ANSWER', id)
    if (state.itemNum < state.itemDetail.length) {
      commit('ADD_ITEMNUM', 1)
    }
  },
  initialData ({ commit }) {
    commit('INITIAL_DATA')
  }
}
