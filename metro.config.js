const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

// Add support for tRPC server files
config.watchFolders = [__dirname];

module.exports = config;