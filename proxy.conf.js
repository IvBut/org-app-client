const API_TARGET = 'http://localhost:3000';

module.exports = [
  {
    context: ['/api'],
    target: API_TARGET,
    secure: false,
    changeOrigin: true
  }
]
