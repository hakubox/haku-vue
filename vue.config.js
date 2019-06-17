let webpack = require('webpack');

module.exports = {
    runtimeCompiler: true,
    configureWebpack: {
        plugins: [
            new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/)
        ]
    },
    css: {
        sourceMap: true,
        loaderOptions: {
            less: {
                javascriptEnabled: true
            },
            sass: {
                data: `@import "~@/assets/scss/variables.scss";`
            }
        }
    },

    pwa: {
        name: "demo",
        msTileColor: "#42B983"
    },

    pluginOptions: {
        webpackBundleAnalyzer: { 
            openAnalyzer: false 
        }
    }
};