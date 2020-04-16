const { environment } = require('@rails/webpacker');

// enable code splitting through SplitChunks module
environment.splitChunks();

// Exclude node_modules From Being Transpiled By Babel-Loader
environment.loaders.delete('nodeModules');

// APPEND GraphQL-Tag Loader
environment.loaders.append('graphql', {
  test: /\.(graphql|gql)$/,
  exclude: /node_modules/, // dont parse gql files from 3rd party installs
  loader: 'graphql-tag/loader',
});

module.exports = environment;
