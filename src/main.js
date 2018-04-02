// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import store from './store'
import router from './router'
import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.min.css'
import 'vue-material/dist/theme/default.css'
import firebase from 'firebase'
import VueAnalytics from 'vue-analytics'


Vue.use(VueAnalytics, {
  id: 'UA-116680815-1',
  router,
  debug: {
    sendHitTask: process.env.NODE_ENV === 'production'
  }
})

firebase.initializeApp({
  apiKey: 'AIzaSyAD1eCuH6pzqIETLPNGT_Q5m51rqHfgu3Y',
  authDomain: 'mobile-logbook.firebaseapp.com',
  projectId: 'mobile-logbook'
});

// var firestore = firebase.firestore();


Vue.use(VueMaterial)

Vue.config.productionTip = false


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})