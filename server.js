/**
 * Created by glen on 2018/4/13.
 */

// express服务器
var express = require('express');
// 反向代理，跨域请求
var proxy = require('http-proxy-middleware');
var opn = require('opn')
var port = 8888;

var app = express();

// 请求路劲包含 ‘/yzlpms’
app.use('/yzlpms', proxy({target: 'http://demo.inzlink.com', changeOrigin: true}));

// 反向代理也可以这种写法：
//server.use(proxy('/yzlpms', {
//target:'http://dev.inzlink.com',
//changeOrigin: true,
//}))

// express.static('./web') 根目录
// '/web/' 在根目录反问的基础上 嵌套一层目录：
app.use(express.static('./'))

// 假设根目录为：app.use(express.static('./dist'))
// 最终访问地址为：localhost:8888/index.html
// 假设根目录为：app.use('/web/', express.static('./dist'))
// 最终访问地址为：localhost:8888/web/index.html

// 监听端口
app.listen(port, function () {
    console.log('服务器启动完成....');
    var uri = 'http://localhost:' + port + '/demo1.html';
    opn(uri);
});