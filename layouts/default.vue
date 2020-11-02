<template lang="pug">
v-app(light)
  v-app-bar(fixed, app)
    v-toolbar-title {{ $t("title") }}
    v-spacer
    v-btn(icon)
      v-icon(@click.stop='rightDrawer = !rightDrawer') mdi-translate
  v-main
    v-container
      nuxt
  v-navigation-drawer(v-model='rightDrawer', :right='right', temporary, fixed)
    v-list
      v-list-item(
        v-for='locale in availableLocales',
        :key='locale.code',
        :to='switchLocalePath(locale.code)'
      ) {{ locale.name }}
</template>

<script>
export default {
  data() {
    return {
      right: true,
      rightDrawer: false,
    }
  },
  computed: {
    availableLocales() {
      return this.$i18n.locales.filter((i) => i.code !== this.$i18n.locale)
    },
  },
}
</script>