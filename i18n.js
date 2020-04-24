const NextI18Next = require('next-i18next').default
const { localeSubpaths } = require('next/config').default().publicRuntimeConfig

module.exports = new NextI18Next({
  defaultLanguage: 'ru',
  otherLanguages: ['ru','ua'],
  localeSubpaths: {
    ua: 'ua',
  }
})