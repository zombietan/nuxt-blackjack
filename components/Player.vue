<template>
  <div class="player">
    <div class="flex">
      <card v-for="(card, index) in getPlayerHand" :key="index" :suit="card.suit" :number="card.number" :hide="card.hide"></card>
    </div>
    <div class="flex" v-show="showButtons">
      <v-btn large round color="orange" @click="hit">Hit</v-btn>
      <v-btn large round color="green" @click="stand">Stand</v-btn>
    </div>

  </div>
</template>

<script>
import Card from './Card'
import { mapGetters } from 'vuex';

export default {
  name: 'player',
  components: { Card },

  computed: {
    ...mapGetters([
      'getPlayerHand',
      'getDealerPoints',
      'isDealerBust',
      'isPlayerBust',
      'showButtons',
    ])
  },

  methods: {
    hit () {
      this.$store.commit('pickCardPlayer')
      if (this.isPlayerBust) {
        this.$store.commit('openFirstCard')
      }
    },

    stand () {
      this.$store.commit('openFirstCard')
      while (!this.isDealerBust && this.getDealerPoints < 17) {
        this.$store.commit('pickCardDealer')
      }
      this.$store.commit('pushStandButton')
    }
  },
}
</script>

<style scoped>
.flex {
  display: flex;
  justify-content: center;
}
button {
  font-size: 1.5rem;
  font-weight: bold;
  width: 120px;
}

</style>