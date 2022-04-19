const authResolver = require('./auth');
const jobsResolver = require('./jobs');
const savedResolver = require('./saved');

const rootResolver = {
  ...authResolver,
  ...jobsResolver,
  ...savedResolver,
};

module.exports = rootResolver;
