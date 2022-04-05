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
      this.showWindowFooter = true
      this.showUpperBody = 'compare'
      // 狀況一: 有 => 沒有
      if (this.compareGroup.includes(fund)) {
        this.compareGroup.splice(this.compareGroup.indexOf(fund), 1)
        const message = { title: '商品已從收藏清單中移除', icon: 'success' }
        this.sweetAlert(message)
      } else {
        // 狀況二: 沒有 => 有
        if (this.compareGroup.length > 2) {
        // 雖是mixins於首頁的方法，但可以用首頁所有方法
          const message = { title: '最多僅能比較3檔基金', icon: 'info' }
          this.sweetAlert(message)
          return
        }
        this.compareGroup.push(fund)
        const message = { title: '加入我的收藏清單', icon: 'success' }
        this.sweetAlert(message)
      }
      this.saveCompare(this.compareGroup)
      //  this.emitter.emit('update-favorite')
    //   console.log(this.myFavoriteGroup)
    },
    sweetAlert (message) {
      this.$swal(message)
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
