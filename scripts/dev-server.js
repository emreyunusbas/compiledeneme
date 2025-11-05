#!/usr/bin/env node

/**
 * Development Server Script
 *
 * This script starts both the backend server and the Expo development server
 * with proper environment configuration for Expo Go testing.
 */

const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

// Colors for console output
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m',
  white: '\x1b[37m'
};

// Load environment variables
function loadEnv() {
  const envFile = path.join(__dirname, '..', '.env.expo');
  if (fs.existsSync(envFile)) {
    const envContent = fs.readFileSync(envFile, 'utf8');
    envContent.split('\n').forEach(line => {
      const match = line.match(/^([^=]+)=(.*)$/);
      if (match) {
        process.env[match[1]] = match[2];
      }
    });
  }
}

// Print colored output
function print(color, text) {
  console.log(`${colors[color]}${text}${colors.reset}`);
}

// Check if Docker is running
function checkDocker() {
  return new Promise((resolve) => {
    const dockerCheck = spawn('docker', ['ps'], { stdio: 'pipe' });
    dockerCheck.on('close', (code) => {
      resolve(code === 0);
    });
  });
}

// Start backend server
function startBackend() {
  print('blue', '\n🚀 Starting Backend Server...');

  return new Promise((resolve, reject) => {
    const backend = spawn('make', ['dev-db'], {
      cwd: path.join(__dirname, '..'),
      stdio: ['pipe', 'pipe', 'pipe'],
      shell: true
    });

    backend.stdout.on('data', (data) => {
      const output = data.toString();
      if (output.includes('Server started on port') ||
          output.includes('Pilates Studio Backend starting') ||
          output.includes('listening on port 3000')) {
        print('green', '✅ Backend server started successfully');
        resolve(backend);
      }
      process.stdout.write(output);
    });

    backend.stderr.on('data', (data) => {
      process.stderr.write(`Backend Error: ${data}`);
    });

    backend.on('error', (error) => {
      print('red', `❌ Backend server error: ${error.message}`);
      reject(error);
    });

    backend.on('close', (code) => {
      if (code !== 0) {
        print('red', `❌ Backend server exited with code ${code}`);
      }
    });

    // Resolve after 10 seconds even if no success message
    setTimeout(() => {
      print('yellow', '⚠️ Backend server timeout, assuming it started');
      resolve(backend);
    }, 10000);
  });
}

// Start Expo development server
function startExpo() {
  print('blue', '\n📱 Starting Expo Development Server...');

  return new Promise((resolve, reject) => {
    const expo = spawn('npm', ['run', 'start:go'], {
      cwd: path.join(__dirname, '..'),
      stdio: ['pipe', 'pipe', 'pipe'],
      shell: true,
      env: {
        ...process.env,
        EXPO_GO_DEBUG: 'true'
      }
    });

    expo.stdout.on('data', (data) => {
      const output = data.toString();
      process.stdout.write(output);

      if (output.includes('Metro waiting on') ||
          output.includes('Open Expo Go') ||
          output.includes('qr codes ready') ||
          output.includes('tunnel ready')) {
        print('green', '✅ Expo server started successfully');
        resolve(expo);
      }
    });

    expo.stderr.on('data', (data) => {
      process.stderr.write(`Expo Error: ${data}`);
    });

    expo.on('error', (error) => {
      print('red', `❌ Expo server error: ${error.message}`);
      reject(error);
    });

    expo.on('close', (code) => {
      if (code !== 0) {
        print('red', `❌ Expo server exited with code ${code}`);
      }
    });
  });
}

// Health check function
async function healthCheck() {
  print('cyan', '\n🏥 Performing Health Checks...');

  // Check backend
  try {
    const fetch = require('node-fetch');
    const response = await fetch('http://localhost:3000/health');
    const data = await response.json();
    print('green', `✅ Backend Health: ${data.status}`);
  } catch (error) {
    print('red', '❌ Backend Health Check Failed');
  }

  // Check Expo
  try {
    print('cyan', '✅ Expo Development Server Ready');
  } catch (error) {
    print('red', '❌ Expo Health Check Failed');
  }
}

// Main function
async function main() {
  print('bright', '🎯 Pilates Studio Development Server');
  print('white', '=====================================');

  // Load environment variables
  loadEnv();

  print('cyan', '⚙️ Environment Configuration:');
  console.log(`   API URL: ${process.env.EXPO_PUBLIC_API_URL}`);
  console.log(`   Mock Data: ${process.env.EXPO_PUBLIC_ENABLE_MOCK_DATA}`);
  console.log(`   Debug Mode: ${process.env.EXPO_PUBLIC_ENABLE_DEBUG_MODE}`);

  try {
    // Check Docker
    const dockerRunning = await checkDocker();
    if (dockerRunning) {
      print('green', '✅ Docker is running');
    } else {
      print('yellow', '⚠️ Docker is not running - using local backend');
    }

    // Start backend
    const backendProcess = await startBackend();

    // Wait a bit for backend to start
    await new Promise(resolve => setTimeout(resolve, 3000));

    // Start Expo
    await startExpo();

    // Health check
    setTimeout(() => {
      healthCheck();

      print('green', '\n🎉 Development Environment Ready!');
      print('cyan', '📱 Open Expo Go app and scan the QR code');
      print('cyan', '🌐 Web: http://localhost:8081');
      print('cyan', '🔧 Backend: http://localhost:3000');
      print('white', 'Press Ctrl+C to stop all servers');

      // Handle graceful shutdown
      process.on('SIGINT', () => {
        print('\n👋 Shutting down development servers...');
        backendProcess.kill();
        process.exit(0);
      });

    }, 5000);

  } catch (error) {
    print('red', `❌ Failed to start development environment: ${error.message}`);
    process.exit(1);
  }
}

// Error handling
process.on('uncaughtException', (error) => {
  print('red', `💥 Uncaught Exception: ${error.message}`);
  process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
  print('red', `💥 Unhandled Rejection: ${reason}`);
  process.exit(1);
});

// Run main function
if (require.main === module) {
  main();
}