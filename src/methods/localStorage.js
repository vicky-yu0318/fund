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
    updateFavorite (fund) {
      // console.log(this.myFavoriteGroup)
      this.compareStatus = false
      // 狀況一: 有 => 沒有
      if (this.myFavoriteGroup.includes(fund)) {
        this.myFavoriteGroup.splice(this.myFavoriteGroup.indexOf(fund), 1)
        const message = { title: '商品已從收藏清單中移除', icon: 'success' }
        this.sweetAlert(message)
      } else {
        // 狀況二: 沒有 => 有
        this.myFavoriteGroup.push(fund)
        if (this.myFavoriteGroup.length > 2) {
          const message = { title: '觀察超過2檔基金請登入網銀', icon: 'info' }
          this.sweetAlert(message)
          // return
        } else {
          const message = { title: '已加入收藏清單', icon: 'success' }
          this.sweetAlert(message)
        }
        // const status = '加入我的收藏清單'
        // this.$httpSideMessageState(status)
      }
      this.saveFavorite(this.myFavoriteGroup)
      //  this.emitter.emit('update-favorite')
    //   console.log(this.myFavoriteGroup)
    },
    sweetAlert (message) {
      this.$swal(message)
    }
  },
  //  inject: ['emitter'],
  watch: {
    myFavoriteGroup: {
      handler () {
        this.saveFavorite(this.myFavoriteGroup)
      },
      deep: true
    }
  }
}
