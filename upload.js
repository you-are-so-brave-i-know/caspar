var path = require('path')
const multer = require('multer');
var config = require('./vue.config')

const upload = multer({ dest: path.join(__dirname, './src/assets/img') });
const dirPath = __dirname
const singleMidle = upload.single("head");//一次处理一张head字段名的文件，字段名一定要
module.exports = {
  singleMidle: singleMidle,
  dirPath: dirPath,
  baseUrl: `http://127.0.0.1:8080:${config.devServer.port}/img`
}

