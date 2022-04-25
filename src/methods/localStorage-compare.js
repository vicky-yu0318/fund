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
      return JSON.parse(localStorage.getItem('fundCompare')) || []
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
        if (this.compareGroup.length > 2) {
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
    },
    sweetAlert (message) {
      this.$swal(message)
    },
    confirmEqual (item) {
      let addFav = true
      this.compareGroup.forEach((compare) => {
        if (JSON.stringify(compare) === JSON.stringify(item)) {
          // 只要有1個同就不行
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
