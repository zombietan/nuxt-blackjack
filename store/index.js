
const deck = () => {
  const deck = [];
  ['spade', 'club', 'diamond', 'heart'].forEach(suit => {
    Array.from(Array(13), (_, i) => ++i).forEach(number => {
      deck.push({suit, number, hide: false})
    })
  })

  return deck;
}

const calc = hand => {
  if (hand.length === 0) {
    return 0
  }
  const points = hand.map(card => card.number > 10 ? 10 : card.number)
  const sum = points.reduce((ret, cur) => ret + cur)

  if (sum > 21) {
    return 'Bust'
  }
  // 合計が11以下で1(A)を含むなら+10する
  if (sum <= 11 && points.some(a => a === 1)) {
    return sum + 10
  }
  return sum
}


export const state = () => ({
  deck: deck(),

  player: {
    hand: [],
  },

  dealer: {
    hand: [],
  },

  pushStandButton: false,
})

export const actions = {
  // state初期化のアクション
  initState({commit, getters}) {
    commit('initializeState')
  },

  // プレイヤーにカードを2枚配る
  pickTwoCardPlayer({commit, getters}) {
    commit('pickCardPlayer')
    commit('pickCardPlayer')
  },
  // ディーラーにカードを2枚配る
  pickTwoCardDealer({commit, getters}) {
    commit('pickCardDealer')
    commit('pickCardDealer')
  }
}

export const getters = {
  // プレイヤーの手札
  getPlayerHand: state => state.player.hand,
  // ディーラーの手札
  getDealerHand: state => state.dealer.hand,
  // プレイヤーの点数
  getPlayerPoints: state => calc(state.player.hand),
  // ディーラーの点数
  getDealerPoints: state => calc(state.dealer.hand),
  // プレイヤーがバーストしているか
  isPlayerBust: state => 'Bust' === calc(state.player.hand),
  // ディーラーがバーストしているか
  isDealerBust: state => 'Bust' === calc(state.dealer.hand),
  // Standボタンが押されたか
  isPushStandButton: state => state.pushStandButton,
  // ボタン表示の状態の切り替え
  showButtons: (state, getters) => {
    if(getters.isPlayerBust) {
      return false
    }

    if (getters.isPushStandButton) {
      return false
    }

    return true
    
  },
  // メインメッセージの状態の切り替え
  mainMessage: (state, getters) => {
    if (getters.showButtons) {
      return 'Welcome to Black Jack'
    }

    return `Dealer : ${getters.getDealerPoints} / Player : ${getters.getPlayerPoints}`
  },
  // 勝敗結果の表示のパターン
  resultMessage: (state, getters) => {
    if (getters.showButtons) {
      return ''
    }

    if (getters.getPlayerPoints > getters.getDealerPoints || getters.isDealerBust) {
      return 'You Win'
    }

    if (getters.getPlayerPoints < getters.getDealerPoints || getters.isPlayerBust) {
      return 'You Lose'
    }

    return 'Draw'
  },

  
}

export const mutations = {
  // デッキからプレイヤーに1枚カードを配る
  pickCardPlayer(state) {
    const card = state.deck.splice(
      Math.floor(Math.random() * Math.floor(state.deck.length)), 1)[0]
    state.player.hand.push(card)
  },
  // デッキからディーラーに1枚カードを配る
  pickCardDealer(state) {
    const card = state.deck.splice(
      Math.floor(Math.random() * Math.floor(state.deck.length)), 1)[0]
    state.dealer.hand.push(card)
  },
  // ディーラーの最初のカードを裏返す
  hideFirstCard(state) {
    state.dealer.hand[0].hide = true
  },
  // ディーラーの最初のカードをオープンする
  openFirstCard(state) {
    state.dealer.hand[0].hide = false
  },
  // Standボタンが押された
  pushStandButton(state) {
    state.pushStandButton = true
  },
  // もう一度プレイする(stateの初期化)
  initializeState(state) {
    state.deck.splice(0, state.deck.length)
    deck().forEach(card => {
      state.deck.push(card)
    })
    state.player.hand.splice(0, state.player.hand.length)
    state.dealer.hand.splice(0, state.dealer.hand.length)
    state.pushStandButton = false
  }
}
