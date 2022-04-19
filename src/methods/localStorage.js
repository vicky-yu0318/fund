export default {
  methods: {
    // 存檔save:
    saveFavorite (favorite) {
      const favoriteString = JSON.stringify(favorite)
      localStorage.setItem('fundFavorite', favoriteString)
    },
    getFavorite () {
      // 讀檔get:
      return JSON.parse(localStorage.getItem('fundFavorite'))
    },
    isShowWindow () {
      const currentbreakpoint = window.matchMedia('(max-width: 575px)')
      if (currentbreakpoint.matches) { // If media query matches
        this.showUpperBody = ''
      }
    },
    updateFavorite (fund, from) {
      this.isShowWindow()
      this.showWindowFooter = true
      this.showUpperBody = 'favorite'
      // 狀況一: 有 => 沒有
      if (this.myFavoriteGroup.includes(fund)) {
        this.myFavoriteGroup.splice(this.myFavoriteGroup.indexOf(fund), 1)
        if (from !== 'search') {
          const message = { title: '商品已從收藏清單中移除', icon: 'success' }
          this.sweetAlert(message)
        }
      } else {
        // 狀況二: 沒有 => 有
        if (this.myFavoriteGroup.length > 1) {
          const message = { title: '觀察超過2檔基金請登入網銀', icon: 'info' }
          this.sweetAlert(message)
        }
        if (this.myFavoriteGroup.length > 3) {
          const message = { title: '觀察超過2檔基金請登入網銀', icon: 'info' }
          this.sweetAlert(message)
          return
        }
        this.myFavoriteGroup.push(fund)
      }
      this.saveFavorite(this.myFavoriteGroup)
    },
    deleteFavorite (fund) {
      this.myFavoriteGroup.splice(this.myFavoriteGroup.indexOf(fund), 1)
      const message = { title: '商品已從收藏清單中移除', icon: 'success' }
      this.sweetAlert(message)
      this.saveFavorite(this.myFavoriteGroup)
    },
    sweetAlert (message) {
      this.$swal(message)
    }
  },
  watch: {
    myFavoriteGroup: {
      handler () {
        this.saveFavorite(this.myFavoriteGroup)
      },
      deep: true
    }
  }
}
