module.exports = {

  'default': {
    user: {
      id: 1232341234,
      isLogged () { return true }
    },
    i18n: {
      t (s) { return s.split('').reverse().join('') }
    }
  },

  'unLogged': {
    user: {
      id: 9887,
      isLogged () { return false }
    }
  },

  'otherUser': {
    user: {
      id: 100000
    }
  }
}
