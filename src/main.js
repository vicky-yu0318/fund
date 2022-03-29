import { createApp } from 'vue'

// 匯入 vee-validate 主套件
import { Field, Form, ErrorMessage, defineRule, configure } from 'vee-validate'

// 匯入 vee-validate 相關規則
// import { required, email, min } from '@vee-validate/rules'
import AllRules from '@vee-validate/rules'

// 匯入多國語系的功能
import { localize, setLocale } from '@vee-validate/i18n'

// 匯入繁體中文語系檔案
import zhTW from '@vee-validate/i18n/dist/locale/zh_TW.json'

// nodeModule提供的，放前方
import axios from 'axios'
import VueAxios from 'vue-axios'

// Side effect (不用啟用就可以直接使用)
// npm i @popperjs/core
import 'bootstrap'

// 寫完可去mounted測試
import $ from 'jquery'

import { toPercent, date, toDate } from './methods/filters'

// sweetalert2套件
import VueSweetalert2 from 'vue-sweetalert2'
import 'sweetalert2/dist/sweetalert2.min.css'

// c3.js套件
// import VueC3 from 'vue-c3'

// 自己寫的放後方
import App from './App.vue'
import router from './router'

// 定義驗證規則
// defineRule('required', required)
// defineRule('email', email)
// defineRule('min', min)
Object.keys(AllRules).forEach((rule) => {
  defineRule(rule, AllRules[rule])
})

// 設定 vee-validate 全域規則
configure({
  generateMessage: localize({ zh_TW: zhTW }), // 載入繁體中文語系
  validateOnInput: true // 當輸入任何內容直接進行驗證
})

// 設定預設語系
setLocale('zh_TW')

const app = createApp(App)
// 註冊 vee-validate 三個全域元件
app.component('Form', Form)
app.component('Field', Field)
app.component('ErrorMessage', ErrorMessage)
app.use(VueAxios, axios)

// jquery啟用
window.$ = $

// app.component('VueC3', VueC3)

// 加到全域屬性下
// app.config.globalProperties.foo = 'bar'
app.config.globalProperties.$filters = {
  toPercent,
  date,
  toDate
}

// Sweetalert啟用(全域樣式調整)
const options = {
  confirmButtonColor: '#aaa',
  cancelButtonColor: '#fff',
  icon: 'info'
}

app.use(VueSweetalert2, options)

app.use(router)
app.mount('#app')
