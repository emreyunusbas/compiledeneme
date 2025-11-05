const { getDefaultConfig } = require('expo/metro-config');
const path = require('path');

const config = getDefaultConfig(__dirname);

// Add support for tRPC server files
config.watchFolders = [__dirname];

// Add asset resolution for images and other assets
config.resolver.alias = {
  '@': path.resolve(__dirname),
};

// Configure transformer for better compatibility
config.transformer.babelTransformerPath = require.resolve('metro-react-native-babel-transformer');

// Add support for tRPC server files
config.resolver.nodeModulesPaths = [
  path.resolve(__dirname, 'node_modules'),
  path.resolve(__dirname, 'backend/node_modules'),
];

// Add support for multiple file types
config.resolver.assetExts.push(
  // Images
  'jpg',
  'jpeg',
  'png',
  'gif',
  'webp',
  'svg',
  // Audio
  'mp3',
  'wav',
  'm4a',
  // Video
  'mp4',
  'mov',
  'avi',
  // Fonts
  'ttf',
  'otf',
  'woff',
  'woff2'
);

// Configure source extensions
config.resolver.sourceExts.push(
  'jsx',
  'js',
  'ts',
  'tsx',
  'json',
  'svg',
  'png',
  'jpg',
  'jpeg',
  'gif',
  'webp'
);

// Enable experimental features
config.resolver.enableGlobalPackages = true;

// Optimize for Expo Go
config.maxWorkers = 2;
config.resetCache = true;

// Add support for custom assets
config.assetPlugins = ['expo-asset-tools'];

module.exports = config;