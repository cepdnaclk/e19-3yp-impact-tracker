module.exports = {
  apps: [{
    name: "impax",
    script: "./dist/index.js",
    watch: true,
    ignore_watch: ["node_modules"],
    restart_delay: 1000,
  }],
  deploy: {
    production: {
      user: "ubuntu",
      host: "13.235.86.1",
      ref: "origin/deploy",
      repo: "git@github.com:cepdnaclk/e19-3yp-impact-tracker.git",
      path: "/code/backend",
      "post-deploy": "npm install && npm run build && pm2 reload ecosystem.config.js --env production",
    },
};
