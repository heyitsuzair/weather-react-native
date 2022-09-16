module.exports = {
  root: true,
  extends: '@react-native-community',
  rules: {'prettier/prettier': ['error', {endOfLine: 'auto'}]}, //add this line
  'react-native/no-inline-styles': 0,
  'prettier/prettier': [
    'error',
    {
      'no-inline-styles': false,
    },
  ],
};
