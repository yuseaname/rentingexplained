module.exports = {
  apps: [{
    name: 'rentingexplained',
    script: 'server.js',
    instances: 1,
    exec_mode: 'cluster',
    env: {
      NODE_ENV: 'development',
      PORT: 3000
    },
    env_production: {
      NODE_ENV: 'production',
      PORT: process.env.PORT || 3000
    },
    // Memory and CPU settings
    max_memory_restart: '2G',
    
    // Logging
    error_file: './logs/error.log',
    out_file: './logs/output.log',
    log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
    merge_logs: true,
    
    // Restart settings
    autorestart: true,
    watch: false,
    max_restarts: 10,
    min_uptime: '10s',
    
    // Advanced features
    kill_timeout: 5000,
    wait_ready: true,
    listen_timeout: 10000
  }]
};
