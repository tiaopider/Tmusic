module.exports = {
	devServer:{                //记住，别写错了devServer
		proxy:{                 //设置代理，必须填
			'/api':{              //设置拦截器  拦截器格式   斜杠+拦截器名字，名字可以自己定
				target:'https://autumnfish.cn',     //代理的目标地址，这是接口地址网址
				changeOrigin:true,              //是否设置同源，输入是的
				ws: true,
				pathRewrite:{                   //路径重写
					'/api':''                     //选择忽略拦截器里面的单词
				}
			}
		}
	}
}
