const { proxy } = require("http-proxy-middleware");

module.exports = (app) => {
  app.use(
    proxy("/", {
      target: "http://3.35.240.252:8080/",
      changeOrigin: true,
    })
  );
};
