<template>
  <div class="game">
    <dealer/>
    <div class="message">{{ mainMessage }}</div>
    <player/>
    <div class="message result">{{ resultMessage }}</div>
    <div class="flex" v-show="!showButtons">
      <v-btn rounded large color="purple" @click="reset">Again</v-btn>
    </div>
  </div>
</template>

<script>
import Dealer from "./Dealer";
import Player from "./Player";
import { mapGetters } from "vuex";

export default {
  name: "game",
  components: { Dealer, Player },

  computed: {
    ...mapGetters(["showButtons", "resultMessage", "mainMessage"])
  },

  methods: {
    reset() {
      this.$store.dispatch("initState");
      this.$store.dispatch("pickTwoCardPlayer");
      this.$store.dispatch("pickTwoCardDealer");
      this.$store.commit("hideFirstCard");
    }
  }
};
</script>

<style scoped>
.game {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 70vh;
}
.message {
  font-size: 1.5rem;
  font-weight: bold;
  margin: 2rem;
}
.result {
  font-size: 3rem;
  color: orangered;
}

.flex {
  display: flex;
  justify-content: center;
}
.v-btn {
  font-size: 1.5rem;
  font-weight: bold;
  width: 120px;
}
</style>