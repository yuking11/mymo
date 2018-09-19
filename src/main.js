// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import firebase from 'firebase'

Vue.config.productionTip = false

// Initialize Firebase
const config = {
  apiKey: 'AIzaSyBY4rT72npQjoNozFfsuBm3SmDMFgsIAFw',
  authDomain: 'mymo-cloud.firebaseapp.com',
  databaseURL: 'https://mymo-cloud.firebaseio.com',
  projectId: 'mymo-cloud',
  storageBucket: 'mymo-cloud.appspot.com',
  messagingSenderId: '895789270028'
}
firebase.initializeApp(config)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
