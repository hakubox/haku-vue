let webpack = require('webpack');
let path = require('path');

module.exports = {
    devServer: {
		proxy: "http://api.taishengsys.gejinet.com/"
	},
    runtimeCompiler: true,
    configureWebpack: {
        resolve: {
            alias: {
                '@ant-design/icons/lib/dist$': path.resolve(__dirname, './src/config/icons.ts')
            }
        },
        plugins: [
            new webpack.ContextReplacementPlugin(/moment[/\\]locale$/, /zh-cn|jp/),
            // new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/)
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
