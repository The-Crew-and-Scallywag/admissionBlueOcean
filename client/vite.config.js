export default {
  root: "src",
  server: {
    proxy: {
      "/api": process.env.API_URL,
    },
    port: process.env.PORT,
  },
  test: {
    environment: "jsdom",
    watch: false,
  },
  build: {
    rollupOptions: {
      external: ["./node_modules/y-monaco/src/y-monaco.js"],
    },
  },
};
