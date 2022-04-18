import emitter from '@/methods/eventBus'
export default {
  data () {
    return {
      ActiveCompareGroup: []
    }
  },
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
    isShowWindow () {
      const currentbreakpoint = window.matchMedia('(max-width: 575px)')
      if (currentbreakpoint.matches) { // If media query matches
        this.showUpperBody = ''
      }
    },
    updateCompare (fund, from) {
      this.showWindowFooter = true
      this.showUpperBody = 'compare'
      this.isShowWindow()
      // 狀況一: 有 => 沒有
      if (this.compareGroup.includes(fund)) {
        this.compareGroup.splice(this.compareGroup.indexOf(fund), 1)
        if (from !== 'search') {
          const message = { title: '商品已從比較清單中移除', icon: 'success' }
          this.sweetAlert(message)
        }
      } else {
        // 狀況二: 沒有 => 有
        // console.log(fund, typeof fund)
        if (this.compareGroup.length > 2) {
        // 雖是mixins於首頁的方法，但可以用首頁所有方法
          const message = { title: '最多僅能比較3檔基金', icon: 'info' }
          this.sweetAlert(message)
          return
        }
        this.compareGroup.push(fund)
        if (from !== 'search') {
          const message = { title: '加入我的比較清單', icon: 'success' }
          this.sweetAlert(message)
        }
      }
      this.saveCompare(this.compareGroup)
      //  this.emitter.emit('update-favorite')
    //   console.log(this.myFavoriteGroup)
    },
    sweetAlert (message) {
      this.$swal(message)
    },
    // 檢查物件的“值相等”我們基本上是要遍歷的物件的每個屬性
    // https://www.delftstack.com/zh-tw/howto/javascript/compare-objects-javascript/
    confirmEqual (item) {
      let addFav = true
      this.compareGroup.forEach((compare) => {
        if (JSON.stringify(compare) === JSON.stringify(item)) {
          // 只要有1個就不行
          addFav = false
          this.compareGroup.splice(this.compareGroup.indexOf(compare), 1)
          const message = { title: '商品已從比較清單中移除', icon: 'success' }
          this.sweetAlert(message)
        }
      })
      if (addFav) {
        if (this.compareGroup.length > 2) {
          const message = { title: '最多僅能比較3檔基金', icon: 'info' }
          this.sweetAlert(message)
          return
        }
        this.compareGroup.push(item)
        const message = { title: '加入我的比較清單', icon: 'success' }
        this.sweetAlert(message)
      }
    }
  },
  //  inject: ['emitter'],
  watch: {
    compareGroup: {
      handler () {
        this.saveCompare(this.compareGroup)
        emitter.emit('updateComareGroup')
      },
      deep: true
    }
  }
}
