//this is an example on how to export the MONGO_URI , 
//this mongoURI is stored on the real server enviroment in production
module.exports = {
    mongoURI: process.env.MONGO_URI,
  };