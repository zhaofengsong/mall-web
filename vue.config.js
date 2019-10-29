module.exports = {
	devServer: {
		proxy: {
			'/api': {
				target: 'http://127.0.0.1:3000',
				changeOrigin: true, //虚拟服务器收发请求，解决跨域
			},
			'/images': {
				target: 'http://127.0.0.1:3000',
				changeOrigin: true, //虚拟服务器收发请求，解决跨域
			},
		}
	}
}
