export default {
  methods: {
    // 存檔save:
    save (favorite) {
      const favoriteString = JSON.stringify(favorite)
      localStorage.setItem('fundFavorite', favoriteString)
    },
    get () {
      // 讀檔get:
      return JSON.parse(localStorage.getItem('fundFavorite'))
    },
    updateFavorite (fund) {
      this.compareStatus = false
      // 狀況一: 有 => 沒有
      if (this.myFavoriteGroup.includes(fund)) {
        this.myFavoriteGroup.splice(this.myFavoriteGroup.indexOf(fund), 1)
        // const status = '商品已從收藏清單中移除'
        // this.$httpSideMessageState(status, false)
      } else {
        // 狀況二: 沒有 => 有
        this.myFavoriteGroup.push(fund)
        // const status = '加入我的收藏清單'
        // this.$httpSideMessageState(status)
      }
      this.save(this.myFavoriteGroup)
      //  this.emitter.emit('update-favorite')
    //   console.log(this.myFavoriteGroup)
    }
  },
  //  inject: ['emitter'],
  watch: {
    myFavoriteGroup: {
      handler () {
        this.save(this.myFavoriteGroup)
      },
      deep: true
    }
  }
}
