<template>
  <div id="editor">
    <div class="editor_item editor_item-ctrl">
      <ul class="editor_menu">
        <li class="menu_item">
          <button @click="addMemo" class="c-btn c-btn-small c-btn-secondary">新規</button>
        </li><!-- /.menu_item -->
        <li class="menu_item">
          <button @click="saveMemo" class="c-btn c-btn-small c-btn-tertiary">保存</button>
        </li><!-- /.menu_item -->
      </ul><!-- /.editor_menu -->
      <ul class="ttl_list">
        <li
          v-for="(memo, index) in memos"
          :data-selected="index == selectedIndex"
          :key="index"
          class="ttl_item"
        >
          <span
            @click="selectMemo(index)"
            class="ttl_name"
          >{{ dispTitle(memo.detail) }}</span>
          <button
            v-if="memos.length > 1"
            @click="deleteMemo(index)"
            class="c-btn c-btn-del"
          >×</button>
        </li><!-- /.ttl_item -->
      </ul><!-- /.ttl_list -->
    </div><!-- /.editor_item editor_item-ctrl -->
    <textarea
      v-model="memos[selectedIndex].detail"
      class="editor_item editor_item-input"
    >
    </textarea><!-- /.editor_item editor_item-input -->
  </div><!-- /#editor -->
</template>

<script>
import firebase from 'firebase'
import initial from '../assets/initial'

export default {
  name: 'Editor',
  props: ['user'],
  data () {
    return {
      memos: [{
        detail: initial
      }],
      selectedIndex: 0
    }
  },
  created () {
    firebase
      .database()
      .ref('memos/' + this.user.uid)
      .once('value')
      .then(result => {
        if (result.val()) {
          this.memos = result.val()
        }
      })
      .catch(err => {
        alert(err.message)
      })
  },
  methods: {
    addMemo () {
      this.memos.push({
        detail: ''
      })
      this.selectedIndex = this.memos.length - 1
      // console.log('add')
    },
    saveMemo () {
      firebase
        .database()
        .ref('memos/' + this.user.uid)
        .set(this.memos)
        .then(res => {
          alert('保存しました')
        })
        .catch(err => {
          alert(err.message)
        })
      // console.log('save')
    },
    selectMemo (index) {
      this.selectedIndex = index
      // console.log('selected')
    },
    deleteMemo (index) {
      const ttl = this.dispTitle(this.memos[index].detail)
      const length = this.memos.length - 1
      const selected = this.selectedIndex
      if (confirm(ttl + 'を削除しますか？')) {
        this.memos.splice(index, 1)
        if ((index === length && index === selected) || index < selected) {
          this.selectedIndex--
        }
        // console.log('delete')
      }
    },
    dispTitle (text) {
      return text.split(/\n/)[0].replace(/#+\s/, '') || 'no title'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
