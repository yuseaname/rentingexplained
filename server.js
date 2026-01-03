const { createServer } = require('http');
const { parse } = require('url');
const next = require('next');
const path = require('path');

// Increase memory limit for production builds
if (process.env.NODE_ENV === 'production') {
  require('v8').setFlagsFromString('--max_old_space_size=2048');
}

const dev = process.env.NODE_ENV !== 'production';
const hostname = process.env.HOSTNAME || '0.0.0.0';  // Changed to 0.0.0.0 for Hostinger
const port = parseInt(process.env.PORT || '3000', 10);

// For standalone builds, set the correct directory
const dir = process.env.NODE_ENV === 'production' ? __dirname : '.';

// Create Next.js app with proper configuration for standalone
const app = next({ 
  dev, 
  hostname, 
  port,
  dir,
  conf: {
    // Ensure static files are served correctly
    compress: true,
    generateEtags: true,
  }
});

const handle = app.getRequestHandler();

app.prepare().then(() => {
  createServer(async (req, res) => {
    try {
      // Add CORS headers for static assets
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
      
      const parsedUrl = parse(req.url, true);
      await handle(req, res, parsedUrl);
    } catch (err) {
      console.error('Error occurred handling', req.url, err);
      res.statusCode = 500;
      res.end('Internal server error');
    }
  })
    .once('error', (err) => {
      console.error('Server error:', err);
      process.exit(1);
    })
    .listen(port, hostname, () => {
      console.log(`> Ready on http://${hostname}:${port}`);
      console.log(`> Environment: ${process.env.NODE_ENV || 'development'}`);
      console.log(`> Working directory: ${dir}`);
    });
});
