module.exports = {
  head: {
    title: "Vohzd | Full Stack JS Developer",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: "vohzd | Marvellous full-stack developer!" },
      { hid: "identifier-url", name: "identifier-url", content: "https://vohzd.com" },
      { hid: "title", name: "title", content: "Vohzd.com" },
      { hid: "abstract", name: "abstract", content: "vohzd | Marvellous full-stack developer!" },
      { hid: "keywords", name: "keywords", content: "javascript, developer, vue, gaming, unreal, tournament, devops, nuxt, freelance, tutorial, ecommerce, conversion, rate, optimisation" },
      { hid: "author", name: "author", content: "vohzd" },
      { hid: "language", name: "language", content: "EN" },
      { hid: "robots", name: "robots", content: "All" }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: "canonical", href: "https://vohzd.com" }
    ]
  },
  css: [
    "~/node_modules/plyr/dist/plyr.css"
  ],
  env: {
    SERVER_ENDPOINT: process.env.SERVER_ENDPOINT ? process.env.SERVER_ENDPOINT : "http://localhost:1337"
  },
  loading: { color: '#552a3f' },
  modules: [
    "@nuxtjs/axios",
    "@nuxtjs/markdownit",
    "@nuxtjs/sitemap",
  ],
  build: {
    optimizeCSS: true
  },
  sitemap: {
    hostname: "https://vohzd.com",
    gzip: true
  },
  plugins: [
    "~/plugins/plyr.js",
    "~/plugins/date.js",
    "~/plugins/fontawesome.js"
  ],
  axios: {
    baseURL: "/",
    proxyHeaders: false,
    credentials: true
  }
}
