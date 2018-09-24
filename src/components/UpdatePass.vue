<template>
  <div id="update_password" class="p-form single single-attn">
    <h1 class="c-ttl-secondary">パスワード変更</h1>
    <p>こちらの設定は、メールアドレス／パスワードでログインしている方のみが対象です。</p>
    <p>現在のパスワード、新しいパスワードを入力し、変更ボタンをクリックしてください。</p>
    <label for="c_pass" class="p-form_input_wrap">
      <input
        v-model="currentPassword"
        id="c_pass"
        type="password"
        class="p-form_input"
        placeholder=" ">
      <span class="p-form_input-label">現在のパスワード</span>
      <span class="p-form_input-border"></span>
    </label>
    <label for="n_pass" class="p-form_input_wrap">
      <input
        v-model="newPassword"
        id="n_pass"
        type="password"
        class="p-form_input"
        placeholder=" ">
      <span class="p-form_input-label">新しいパスワード</span>
      <span class="p-form_input-border"></span>
    </label>
    <button @click="updatePass()" class="c-btn c-btn-wide c-btn-caution" >
      送信する
    </button>
  </div><!-- /#update_password -->
</template>

<script>
import firebase from 'firebase'

export default {
  name: 'UpdatePass',
  props: ['user'],
  data () {
    return {
      currentPassword: '',
      newPassword: ''
    }
  },
  methods: {
    updatePass () {
      const cUser = firebase.auth().currentUser
      // 再認証のcredentialを取得する
      const credential = firebase.auth.EmailAuthProvider.credential(
        cUser.email,
        this.currentPassword
      )
      cUser
        .reauthenticateAndRetrieveDataWithCredential(credential)
        // 再認証に成功したらパスワードをアップデートする
        .then(() => {
          cUser
            .updatePassword(this.newPassword)
            .then(() => {
              alert('パスワードを再設定しました。再度ログインしてください。')
              this.signOut()
            })
            .catch(err => {
              if (err.code === 'auth/weak-password') {
                alert('パスワードは6文字以上入力してください。')
              } else {
                alert(err.message)
              }
            })
        })
        // 再認証に失敗したケース
        .catch(err => {
          alert('認証に失敗しました。\n現在のパスワードを確認してください。\n' + err.message)
        })
    },
    signOut () {
      firebase.auth().signOut().then(() => {
        this.$parent.isLogin = false
        this.$parent.userData = null
        this.$router.push('/signin')
      })
    }
  }
}
</script>
