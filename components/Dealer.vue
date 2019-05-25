<template>
  <div class="dealer">
    <div class="flex">
      <card v-for="(card, index) in getDealerHand" :key="index" :suit="card.suit" :number="card.number" :hide="card.hide"></card>
    </div>
  </div>
</template>

<script>
import Card from './Card'
import { mapGetters } from 'vuex'

export default {
  name: 'dealer',
  components: { Card },

  computed: {
    ...mapGetters([
      'getDealerHand'
    ]),
  }
}
</script>

<style scoped>
.flex {
  display: flex;
  justify-content: center;
}
</style>