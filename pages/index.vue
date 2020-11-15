<template lang="pug">
.index
  v-row(justify='center', align='center')
    v-col(cols='12', sm='10', md='8')
      v-img(
        lazy-src='https://placehold.jp/505050/505050/1200x630.png',
        :srcset='require(`../static/ogp${isAvailableWebp() ? ".webp" : ".png"}`)',
        :src='require(`../static/ogp${isAvailableWebp() ? ".webp" : ".png"}`)'
      )
  v-row(justify='center', align='center')
    v-col(cols='12', sm='10', md='8')
      .description
        p(v-for='sentence in $t("top_description")') {{ sentence }}
  v-row(justify='center', align='center')
    v-col(cols='12', sm='10', md='8')
      adsbygoogle(data-ad-slot='3806743874', data-ad-format='auto')
  v-row(justify='center', align='center')
    v-col(cols='12', sm='10', md='8')
      p * {{ $t("form.attention") }}
      v-form
        v-container
          v-text-field(
            v-model='properties.pageTitle',
            :rules='rules.title',
            :label='"*" + this.$t("form.properties.page_title")'
          )
          v-text-field(
            v-model='properties.siteName',
            :label='this.$t("form.properties.site_name")',
            required
          )
          v-text-field(
            v-model='properties.description',
            :label='this.$t("form.properties.description")'
          )
          v-text-field(
            v-model='properties.url',
            :rules='rules.url',
            :label='"*" + this.$t("form.properties.url")',
            required
          )
          v-text-field(
            v-model='properties.imagePath',
            :rules='rules.imagePath',
            :label='"*" + this.$t("form.properties.image_path")',
            required
          )
          v-select(
            v-model='properties.contentType',
            :items='this.$t("content_types")',
            :rules='rules.contentType',
            :label='"*" + this.$t("form.properties.content_type")',
            required
          )
          v-text-field(
            v-model='twitter.userName',
            :label='$t("form.twitter.user_name")'
          )
          v-select(
            v-model='twitter.cardType',
            :items='this.$t("twitter_card_types")',
            :label='this.$t("form.twitter.card_type")'
          )
      v-btn(@click='generateOgp') {{ $t("button") }}
  v-row(justify='center', align='center')
    v-col(cols='12', sm='10', md='8')
      adsbygoogle(data-ad-slot='3806743874', data-ad-format='auto')
  v-row.mt-5(v-if='code != ""', justify='center', align='center')
    v-col(cols='12', sm='10', md='8')
      p.description {{ $t("about_prefix") }}
      pre.ogp.pa-3
        code {{ code }}
</template>

<script>
export default {
  data() {
    return {
      properties: {
        pageTitle: '',
        siteName: '',
        description: '',
        url: '',
        imagePath: '',
        contentType: '',
      },
      twitter: {
        userName: '',
        cardType: '',
      },
      rules: {
        title: [(v) => !!v || this.$t('form.rules.title.null')],
        url: [
          (v) => !!v || this.$t('form.rules.url.null'),
          (v) => /https?:\/\//.test(v) || this.$t('form.rules.url.attention'),
        ],
        imagePath: [
          (v) => !!v || this.$t('form.rules.image_path.null'),
          (v) => /https?:\/\//.test(v) || this.$t('form.rules.url.attention'),
        ],
        contentType: [(v) => !!v || this.$t('form.rules.content_type.null')],
      },
      code:
        '<head prefix="og: https://ogp.me/ns#">\n\n<!-- Open Graph Protocol -->\n',
    }
  },
  head() {
    return {
      title: this.$t('title'),
      meta: [
				{
					hid: 'description',
					name: 'description',
					content: this.$t('meta.description'),
				},
        { hid: 'og:title', property: 'og:title', content: this.$t('title') },
        {
          hid: 'og:description',
          property: 'og:description',
          content: this.$t('meta.description'),
        },
        { hid: 'og:url', property: 'og:url', content: this.$t('meta.url') },
        { hid: 'og:type', property: 'og:type', content: 'website' },
        {
          hid: 'og:image',
          property: 'og:image',
          content: 'https://ogp.mktia.com/ogp.png',
        },
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:site', content: '@mktia' },
        { name: 'twitter:creator', content: '@mktia' },
      ],
    }
  },
  methods: {
    isAvailableWebp() {
      if (process.browser) {
        var userAgent = window.navigator.userAgent.toLowerCase()
        if (
          userAgent.indexOf('msie') !== -1 ||
          userAgent.indexOf('trident') !== -1
        ) {
          return false
        } else if (userAgent.indexOf('edge') !== -1) {
          return true
        } else if (userAgent.indexOf('chrome') !== -1) {
          return true
        } else if (userAgent.indexOf('safari') !== -1) {
          return false
        } else if (userAgent.indexOf('firefox') !== -1) {
          return true
        }
      }
    },
    generateOgp() {
      if (this.properties.pageTitle !== '') {
        this.code +=
          `<meta property="og:title" content="${this.properties.pageTitle}" />` +
          '\n'
      }
      if (this.properties.siteName !== '') {
        this.code +=
          `<meta property="og:site_name" content="${this.properties.siteName}" />` +
          '\n'
      }
      if (this.properties.description !== '') {
        this.code +=
          `<meta property="og:description" content="${this.properties.description}" />` +
          '\n'
      }
      if (this.properties.url !== '') {
        this.code +=
          `<meta property="og:url" content="${this.properties.url}" />` + '\n'
      }
      if (this.properties.imagePath !== '') {
        this.code +=
          `<meta property="og:image" content="${this.properties.imagePath}" />` +
          '\n'
      }
      if (this.properties.contentType !== '') {
        this.code +=
          `<meta property="og:type" content="${this.properties.contentType}" />` +
          '\n'
      }
      if (this.twitter.userName !== '') {
        this.code +=
          `<meta name="twitter:site" content="@${this.twitter.userName}" />` +
          '\n' +
          `<meta name="twitter:creator" content="@${this.twitter.userName}" />` +
          '\n'
      }
      if (this.twitter.cardType !== '') {
        this.code +=
          `<meta name="twitter:card" content="${this.twitter.cardType}" />` +
          '\n'
      }
    },
  },
}
</script>

<style lang="sass" scoped>
.description
  text-align: justify

.ogp
  background-color: #fcfcfc
  border: solid 1px #ccc
  border-radius: 4px
  font-family: SFMono-Regular,Menlo,Monaco,Consolas,"Liberation Mono","Courier New",monospace
  font-size: 1rem
  font-weight: 500

  code
    background-color: transparent
    color: #777
    padding: initial
</style>
