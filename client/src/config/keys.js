// ./prod and ./dev are not commited to github so make your one following the examples
if (process.env.NODE_ENV === 'production') {
    module.exports = require('./prod');
  } else {
    module.exports = require('./dev'); 
  }
  