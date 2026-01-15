// PM2 Configuration for Production
module.exports = {
  apps: [
    {
      name: 'healthcard-backend',
      script: 'app.js',
      instances: 'max', // Use all available CPU cores
      exec_mode: 'cluster', // Enable cluster mode for load balancing
      watch: false,
      max_memory_restart: '1G',
      env: {
        NODE_ENV: 'development',
        PORT: 3000
      },
      env_production: {
        NODE_ENV: 'production',
        PORT: 3000
      },
      // Logging
      log_file: '/var/log/healthcard/combined.log',
      out_file: '/var/log/healthcard/out.log',
      error_file: '/var/log/healthcard/error.log',
      log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
      merge_logs: true,
      
      // Restart configuration
      exp_backoff_restart_delay: 100,
      max_restarts: 10,
      min_uptime: '10s',
      
      // Health check
      listen_timeout: 8000,
      kill_timeout: 5000,
      
      // Graceful shutdown
      shutdown_with_message: true,
      wait_ready: true
    }
  ]
};
