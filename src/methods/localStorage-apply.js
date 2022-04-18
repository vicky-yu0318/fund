export default {
  methods: {
    saveApply (apply) {
      const applyString = JSON.stringify(apply)
      localStorage.setItem('fundApply', applyString)
    },
    getApply () {
      return JSON.parse(localStorage.getItem('fundApply'))
    },
    updateApply (apply) {
      this.saveApply(apply)
      this.$router.push('/apply')
    },
    sweetAlert (message) {
      this.$swal(message)
    }
  }
}
