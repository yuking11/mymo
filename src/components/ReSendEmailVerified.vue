<template>
  <div id="provisional_registration" class="p-form single single-attn">
    <h1 class="c-ttl-secondary">仮登録中</h1>
    <p>ご入力いただいたアカウントは現在仮登録状態です。</p>
    <p>初回登録時に「メールアドレスの確認」メールを送信しておりますので、そちらから本登録を完了してください。</p>
    <p>メールが届いていない方は、下記ボタンをクリックし、本登録をお願いいたします。</p>
    <p class="long">
      <button @click="reSendVerified" class="c-btn c-btn-wide c-btn-caution">再送信する</button>
    </p>
    <p>
      <router-link to="/signin">ホームに戻る</router-link>
    </p>
  </div><!-- /#provisional_registration -->
</template>

<script>
import firebase from 'firebase'

export default {
  name: 'ReSendEmailVerified',
  props: ['user'],
  data () {
    return {
    }
  },
  mounted () {
    firebase.auth().onAuthStateChanged(user => {
      this.isLoginState = true
      if (user) {
        const cUser = firebase.auth().currentUser
        if (cUser.emailVerified) {
          this.$router.push('/')
        }
      }
    })
  },
  methods: {
    reSendVerified () {
      const protocol = location.protocol + '//'
      const redirect = {
        url: protocol + window.location.host + '/#/signin'
      }
      const cUser = firebase.auth().currentUser
      cUser
        .sendEmailVerification(redirect)
        .then(() => {
          alert(cUser.email + 'に登録確認メールを送信しました。')
          this.$router.push('/signin')
        })
        .catch(err => {
          alert(err.code, err.message)
        })
    }
  }
}
</script>
