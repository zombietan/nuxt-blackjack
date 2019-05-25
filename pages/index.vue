<template>
  <game/>
</template>

<script>
import Game from '~/components/Game.vue'

export default {
  components: {
    Game
  },

  fetch ({store, params}) {
    store.dispatch('pickTwoCardPlayer')
    store.dispatch('pickTwoCardDealer')
    store.commit('hideFirstCard')
  },
}
</script>
