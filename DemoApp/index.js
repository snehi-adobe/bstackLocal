const http = require("http");
const url = require("url");
const fs = require('fs')
const hostname = "localhost";
const port = 3000;

const server = http.createServer((req, res) => {
res.statusCode = 200
const queryObject = url.parse(req.url, true).query;
 res.end('<html><body><h1>hello world : ' + queryObject.name +'</h1></body></html>');
const content = queryObject.name;
if (content){
fs.writeFile('param.log', content, err => {
  if (err) {
    console.error(err)
    return
  }
})}
})
server.listen(port);  