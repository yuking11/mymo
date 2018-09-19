<template>
  <div id="reset_password" class="p-form single">
    <h1 class="c-ttl-secondary">パスワードをお忘れの方</h1>
    <p>ご登録されたメールアドレスにパスワード再設定のご案内が送信されます。</p>
    <label for="c_email" class="p-form_input_wrap">
      <input
        v-model="email"
        id="c_email"
        type="email"
        class="p-form_input"
        placeholder=" ">
      <span class="p-form_input-label">ご登録されたメールアドレス</span>
      <span class="p-form_input-border"></span>
    </label>
    <button @click="ResetPass" class="c-btn c-btn-wide c-btn-caution">送信する</button>
    <p>
      <router-link to="/signin">ホームに戻る</router-link>
    </p>
  </div><!-- /#reset_password -->
</template>

<script>
import firebase from 'firebase'

export default {
  name: 'ResetPass',
  data () {
    return {
      email: ''
    }
  },
  methods: {
    ResetPass () {
      const protocol = location.protocol + '//'
      const redirect = {
        url: protocol + window.location.host + '/#/signin'
      }
      firebase
        .auth()
        .sendPasswordResetEmail(this.email, redirect)
        .then(() => {
          alert(this.email + 'にパスワード再設定のご案内を送信しました。')
          this.$router.push('/signin')
        })
        .catch(err => {
          alert(err.message)
        })
    }
  }
}
</script>

<style scoped lang="scss">
</style>
