require('dotenv').config();
const app = require('./app');
const net = require('net');

const basePort = process.env.PORT || 3000;

// Function to check if port is available
const isPortAvailable = (port) => {
  return new Promise((resolve) => {
    const server = net.createServer()
      .once('error', () => resolve(false))
      .once('listening', () => {
        server.close();
        resolve(true);
      })
      .listen(port);
  });
};

// Function to find next available port
const findAvailablePort = async (startPort) => {
  let port = startPort;
  while (port <= startPort + 100) {
    const available = await isPortAvailable(port);
    if (available) return port;
    port++;
  }
  throw new Error('No available ports found');
};

// Start server with port detection
const startServer = async () => {
  try {
    const PORT = await findAvailablePort(basePort);
    
    const server = app.listen(PORT, () => {
      console.log(`\n🚀 Server running on port ${PORT}`);
      console.log(`📍 API Base URL: http://localhost:${PORT}`);
      console.log(`📍 Health endpoint: GET http://localhost:${PORT}/health`);
      console.log(`📍 BFHL endpoint: POST http://localhost:${PORT}/bfhl\n`);
    });

    // Graceful shutdown
    process.on('SIGTERM', () => {
      console.log('SIGTERM signal received: closing HTTP server');
      server.close(() => {
        console.log('HTTP server closed');
      });
    });

  } catch (error) {
    console.error('Failed to start server:', error.message);
    process.exit(1);
  }
};

startServer();
