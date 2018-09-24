<template>
  <div id="app" class="l-body_inner">

    <div class="c-overlay is-loading" v-if="!isLoginState">
      <div class="loader">Loading...</div>
    </div><!-- /.c-overlay is-loading -->

    <Head :user="userData"></Head>
    <Gnav v-if="userData" :user="userData"></Gnav>

    <div class="l-container" v-bind:class="{ 'l-container-login': isLogin }">

      <router-view
        v-bind:user="userData"
      ></router-view>

    </div><!-- /.l-container -->

    <Foot/>

  </div>
</template>

<script>
import firebase from 'firebase'
import Head from './components/Head'
import Gnav from './components/Gnav'
import Foot from './components/Foot'
import './assets/sass/app.scss'

export default {
  name: 'App',
  data () {
    return {
      isLogin: false,
      isLoginState: false,
      userData: null
    }
  },
  mounted () {
    firebase.auth().onAuthStateChanged(user => {
      this.isLoginState = true
      // console.log(this.userData)
      if (user) {
        const cUser = firebase.auth().currentUser
        // console.log(cUser.emailVerified)
        if (!cUser.emailVerified) {
          this.isLogin = false
          this.userData = null
          // this.$router.push('/email_verified')
        } else {
          this.isLogin = true
          this.userData = user
        }
      } else {
        this.isLogin = false
        this.userData = null
      }
    })
  },
  components: {
    'Head': Head,
    'Gnav': Gnav,
    'Foot': Foot
  }
}
</script>

<style lang="scss">
</style>
