const { environment } = require('@rails/webpacker');

// APPEND GraphQL-Tag Loader
environment.loaders.append('graphql', {
  test: /\.(graphql|gql)$/,
  exclude: /node_modules/, // dont parse gql files from 3rd party installs
  loader: 'graphql-tag/loader',
});

module.exports = environment;
