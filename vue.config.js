const path = require('path')
// const autoprefixer = require('autoprefixer');
// const px2rem = require('postcss-pxtorem');
// const postcss = px2rem({
// 	remUnit: 16   //基准大小 baseSize，需要和rem.js中相同
// })

const webpack = require('webpack')
// 构建配置参数
const envConfig = require('./build/envConfig.js')

module.exports = {
	outputDir: 'dist',
	publicPath: './',
	css: {
		loaderOptions: {
			// postcss: {
			// 	plugins: [
			// 		autoprefixer(),
			// 		postcss
			// 	]
			// }
		}
	},
	chainWebpack: config => {
		// 配置全局可访问 process.env.ENV
		config.plugin('define').tap(args => {
			args[0]['process.env'].ENV = JSON.stringify(envConfig.HOST_ENV)
			return args
		})
		// 配置解析别名
		config.resolve.alias
			.set('@', path.resolve(__dirname, 'src'))
			.set('@components', path.resolve(__dirname, 'src/components'))
	},
}
