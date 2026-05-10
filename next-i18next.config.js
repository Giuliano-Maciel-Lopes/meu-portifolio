const path = require('path')

/** @type {import('next-i18next').UserConfig} */
module.exports = {
  i18n: {
    defaultLocale: 'pt-BR',
    locales: ['pt-BR', 'en', 'es', 'pt-PT'],
  },
  localePath: path.resolve('./public/locales'),
  defaultNS: 'nav',
  ns: ['nav', 'hero', 'about', 'skills', 'experience', 'projects', 'contact', 'whatsapp'],
  reloadOnPrerender: process.env.NODE_ENV === 'development',
}
