module.exports = {
    presets: ['module:metro-react-native-babel-preset'],
    plugins: [
      ['module:react-native-dotenv', {
        moduleName: '@env', // Esto es importante para que lo resuelva correctamente
        path: '.env',
      }],
    ],
  };
  