module.exports = {
  'env': {
    'browser': true,
    'es2021': true,
    'jest': true,
    'node': true
  },
  'extends': [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended'
  ],
  'parser': '@typescript-eslint/parser',
  'parserOptions': {
    'ecmaVersion': 12,
    'sourceType': 'module'
  },
  'plugins': [
    '@typescript-eslint',
    'unused-imports'
  ],
  'rules': {
    'indent': [
      'error',
      2
    ],
    'linebreak-style': [
      'error',
      'unix'
    ],
    'quotes': [
      'error',
      'single'
    ],
    'semi': [
      'error',
      'always'
    ],
    '@typescript-eslint/no-unused-vars': [
      'warn',
      { 
        'vars': 'all', 
        'varsIgnorePattern': '^_', 
        'args': 'after-used',
        'argsIgnorePattern': '^_' 
      }
    ],
    'unused-imports/no-unused-imports': 'error',
    'unused-imports/no-unused-vars': [
      'warn',
      { 
        'vars': 'all', 
        'varsIgnorePattern': '^_', 
        'args': 'after-used',
        'argsIgnorePattern': '^_' 
      }
    ]
  }
};

