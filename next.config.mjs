const nextConfig = {
  /* config options here */
  webpack: (config) => {
    config.module.rules.push({
      test: /HeartbeatWorker.*\.js$/,
      type: 'javascript/auto',
    });
    return config;
  },
};

export default nextConfig; 