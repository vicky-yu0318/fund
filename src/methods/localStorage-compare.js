export default {
  methods: {
    // 存檔save:
    saveCompare (compare) {
      const compareString = JSON.stringify(compare)
      localStorage.setItem('fundCompare', compareString)
    },
    getCompare () {
      // 讀檔get:
      return JSON.parse(localStorage.getItem('fundCompare'))
    },
    updateCompare (fund) {
      if (this.compareGroup.length > 2) {
        // 雖是mixins於首頁的方法，但可以用首頁所有方法
        const message = { title: '最多僅能比較3檔基金', icon: 'info' }
        this.sweetAlert(message)
        return
      }
      this.compareStatus = true
      // 狀況一: 有 => 沒有
      if (this.compareGroup.includes(fund)) {
        this.compareGroup.splice(this.compareGroup.indexOf(fund), 1)
        // const status = '商品已從收藏清單中移除'
        // this.$httpSideMessageState(status, false)
      } else {
        // 狀況二: 沒有 => 有
        this.compareGroup.push(fund)
        // const status = '加入我的收藏清單'
        // this.$httpSideMessageState(status)
      }
      this.saveCompare(this.compareGroup)
      //  this.emitter.emit('update-favorite')
    //   console.log(this.myFavoriteGroup)
    }
  },
  //  inject: ['emitter'],
  watch: {
    compareGroup: {
      handler () {
        this.saveCompare(this.compareGroup)
      },
      deep: true
    }
  }
}
