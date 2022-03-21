import mitt from 'mitt'
const emitter = mitt()

// 預設匯出=> 給Product(單一) + Navbar.vue使用 (不用放main.js給全部使用)
export default emitter
