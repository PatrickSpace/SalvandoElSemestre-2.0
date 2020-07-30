import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';

import VueTextareaAutosize from "vue-textarea-autosize";
Vue.use(VueTextareaAutosize);

import firebase from "firebase/app";
import "firebase/firestore";

var firebaseConfig = {
  apiKey: "AIzaSyA1FeP6be8QqjZVcFn1bnog_LxDgPeJKsA",
  authDomain: "salvando-el-semestre-acc11.firebaseapp.com",
  databaseURL: "https://salvando-el-semestre-acc11.firebaseio.com",
  projectId: "salvando-el-semestre-acc11",
  storageBucket: "salvando-el-semestre-acc11.appspot.com",
  messagingSenderId: "261823740777",
  appId: "1:261823740777:web:40c33e6fb2f486383a1bf8",
  measurementId: "G-HSY0VDN8M5"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
//firebase.analytics();

export const db = firebase.firestore();

Vue.config.productionTip = false

firebase.auth().onAuthStateChanged(function (user) {
  new Vue({
    router,
    store,
    vuetify,
    render: h => h(App)
  }).$mount('#app')
});


