function errorHandler(err, req, res, next) {
    console.error('Error:', err.message || err);
    res.status(500).json({ message: 'Server error' });
  }
  
  module.exports = errorHandler;
  