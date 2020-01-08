module.exports = {
  devServer: {
    proxy: {
      '/ajax': {
        target: 'http://m.maoyan.com',
        changeOrigin: true
      },
      '/api': {
        target: 'http://39.97.33.178',
        changeOrigin: true
      }
    }
  }
}