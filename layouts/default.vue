<template lang="pug">
v-app(light)
  v-app-bar(fixed, app)
    v-toolbar-title {{ $t("title") }}
    v-spacer
    v-btn(icon)
      v-icon(@click.stop='isDark = !isDark') {{ themeIcon }}
    v-btn(icon)
      v-icon(@click.stop='rightDrawer = !rightDrawer') mdi-translate
  v-main
    v-container
      nuxt
  v-card
    v-footer(:padless="true")
      v-card(flat tile width="100%" class="text-center blue-grey darken-3")
        v-card-text(class="white--text")
          span &copy; {{ new Date().getFullYear() }} mktia.
  v-navigation-drawer(v-model='rightDrawer', :right='right', temporary, fixed, dark)
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
      isDark: false,
      right: true,
      rightDrawer: false,
    }
  },
  computed: {
    availableLocales() {
      return this.$i18n.locales.filter((i) => i.code !== this.$i18n.locale)
    },
    themeIcon() {
      this.$vuetify.theme.dark = this.isDark
      return this.isDark ? 'mdi-brightness-4' : 'mdi-brightness-6'
    },
  },
}
</script>
