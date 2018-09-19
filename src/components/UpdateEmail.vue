<template>
  <div class="signup">
    <h2>メールアドレス変更</h2>
    現在のメールアドレス： {{ user.email }}
    <input type="email" placeholder="new e-mail" v-model="newemail">
    <button @click="updateEmail">変更する</button>
  </div>
</template>

<script>
import firebase from 'firebase'

export default {
  name: 'UpdateEmail',
  props: ['user'],
  data () {
    return {
      newemail: ''
    }
  },
  methods: {
    updateEmail () {
      firebase.auth().currentUser.updateEmail(this.newemail)
        .then(user => {
          alert('メールアドレスを変更しました。\n新しいアドレス： ' + this.newemail)
          this.$router.push('/')
        })
        .catch(err => {
          alert(err.message)
        })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
  li {
    display: inline-block;
    margin: 0 10px;
  }
}
a {
  color: #42b983;
}
.signup {
  margin-top: 20px;

  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center
}
input {
  margin: 10px 0;
  padding: 10px;
}
</style>
