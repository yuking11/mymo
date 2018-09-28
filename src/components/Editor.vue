<template>
  <div id="editor" :data-mode="mode">
    <div id="editor_ctrl" class="editor_item editor_item-ctrl">
      <ul class="editor_menu">
        <li class="menu_item menu_item-add">
          <button
            @click="addMemo"
            class="c-btn c-btn-small c-btn-secondary">新規</button>
        </li><!-- /.menu_item -->
        <li class="menu_item menu_item-save">
          <button
            @click="saveMemo"
            class="c-btn c-btn-small c-btn-tertiary">保存</button>
        </li><!-- /.menu_item -->
      </ul><!-- /.editor_menu -->
      <div
        v-if="isLoading"
        class="ttl_list is-loading"
      >
        <div class="loader">Loading...</div>
      </div><!-- /.ttl_list is-loading -->
      <ul
        v-if="!isLoading"
        class="ttl_list">
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
    <div id="editor_input" class="editor_item editor_item-input">
      <ul class="editor_menu">
        <li class="menu_item menu_item-add">
          <button
            @click="backToList"
            class="c-btn c-btn-small">一覧へ</button>
        </li><!-- /.menu_item -->
        <li class="menu_item menu_item-save">
          <button
            @click="saveMemo"
            class="c-btn c-btn-small c-btn-tertiary">保存</button>
        </li><!-- /.menu_item -->
        <li class="menu_item menu_item-del">
          <button
            v-if="memos.length > 1"
            @click="deleteMemo(selectedIndex)"
            class="c-btn c-btn-small c-btn-caution">削除</button>
        </li><!-- /.menu_item -->
      </ul><!-- /.editor_menu -->
      <textarea v-model="memos[selectedIndex].detail" class="p-form_textarea"></textarea>
    </div><!-- /#editor_input -->
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
      selectedIndex: 0,
      mode: 'select',
      isLoading: true
    }
  },
  mounted () {
    firebase
      .database()
      .ref('memos/' + this.user.uid)
      .once('value')
      .then(result => {
        if (result.val()) {
          this.isLoading = false
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
      this.mode = 'edit'
    },
    backToList () {
      this.mode = 'select'
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
