<template>
  <header id="header" class="l-header l-header-fixed">
    <div class="l-inner">
      <div class="logo">
        <img src="../assets/img/logo.png" alt="MyMo" class="logo_img">
      </div><!-- /.logo -->
      <template v-if="user">
        <div v-if="user.displayName" class="user_name">
          {{ user.displayName }}
        </div>
        <div v-else class="user_name">
          {{ user.email }}
        </div>
      </template>
    </div><!-- /.l-inner -->
  </header><!-- /.l-header -->
</template>

<script>
export default {
  name: 'Head',
  props: ['user'],
  methods: {}
}
</script>

<style scoped lang="scss">
</style>
