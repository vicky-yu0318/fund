export default {
  methods: {
    saveOrder (order) {
      const orderString = JSON.stringify(order)
      localStorage.setItem('fundOrder', orderString)
    },
    getOrder () {
      return JSON.parse(localStorage.getItem('fundOrder'))
    },
    updateOrder (order) {
      this.saveOrder(order)
      // console.log(order)
      this.$router.push('/order')
    },
    sweetAlert (message) {
      this.$swal(message)
    }
  }
}
