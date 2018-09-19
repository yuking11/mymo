<template>
  <div id="nav" class="l-nav">
    <input type="checkbox" id="gnav_ctrl" name="gnav_ctrl">
    <label for="gnav_ctrl" class="gnav_btn"><span class="gnav_btn_inner"></span></label>
    <label for="gnav_ctrl" class="gnav_bg"></label>
    <nav class="l-nav_inner gnav" role="navigation">
      <div v-if="user && user.displayName" class="gnav_name">
        {{ user.displayName }}
      </div>
      <div v-else class="gnav_name">
        {{ user.email }}
      </div>
      <ul class="gnav_list">
        <li class="gnav_item">
          <router-link to="/" @click.native="onClick()" class="gnav_link">
            ホーム
          </router-link>
        </li>
        <li class="gnav_item">
          <span @click="signOut" class="gnav_link">
            ログアウト
          </span>
        </li>
        <li class="gnav_item">
          <router-link to="/update_pass" @click.native="onClick()" class="gnav_link">
            パスワード変更
          </router-link>
        </li>
        <li class="gnav_item">
          <span @click="deleteAccount" class="gnav_link">
            アカウント削除
          </span>
        </li>
      </ul><!-- /.gnav_list -->
    </nav><!-- /.l-nav_inner gnav -->
  </div><!-- /.l-nav -->
</template>

<script>
import firebase from 'firebase'

export default {
  name: 'Gnav',
  props: ['user'],
  methods: {
    onClick () {
      const btn = document.getElementById('gnav_ctrl')
      btn.click()
    },
    signOut () {
      if (confirm('ログアウトします。よろしいですか？')) {
        firebase.auth().signOut().then(() => {
          this.$parent.isLogin = false
          this.$parent.userData = null
          this.$router.push('/signin')
        })
      }
    },
    deleteAccount () {
      if (confirm('アカウントを削除します。\n保存してあるデータも全て削除されます。\nよろしいですか？')) {
        firebase
          .auth()
          .currentUser
          .delete()
          .then(() => {
            alert('アカウントを削除しました。')
            firebase
              .database()
              .ref('memos/' + this.user.uid)
              .remove()
            this.$parent.isLogin = false
            this.$parent.userData = null
            this.$router.push('/signin')
          })
          .catch(err => {
            alert(err.message)
          })
      }
    }
  }
}
</script>

<style scoped lang="scss">
</style>
