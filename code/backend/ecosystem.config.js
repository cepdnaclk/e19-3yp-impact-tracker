module.exports = {
  apps: [{
    name: "impax",
    script: "./dist/index.js",
    watch: true,
    ignore_watch: ["node_modules"],
    restart_delay: 1000,
  }]
};
