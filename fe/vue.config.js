module.exports = {
    publicPath: process.env.NODE_ENV === 'production'
    ? '/production-sub-path'
    : '/',
    devServer: {
     port: 8085,
     open: true,
     proxy: {
      '/api': {
        target: process.env.VUE_APP_BASE_API,
        changeOrigin: true,
        ws: true
      }
    },
    overlay: {
        warnings: true,
        errors: true
      }
    },
    outputDir: 'dist',
    assetsDir: 'assets',
    lintOnSave: process.env.NODE_ENV !== 'production',
    productionSourceMap: false,
  
    configureWebpack: config => {
      if(process.env.NODE_ENV === 'production') {
  
      } else {
  
      }
    },
   
}
  console.log(process.env.VUE_APP_BASE_API);

