var http = require("http");
var urllib = require("url");

var port = 8080;
var data = { data: "world" };

http
  .createServer(function (req, res) {
    var params = urllib.parse(req.url, true);
    console.log(req.url);
    if (params.query.callback) {
      console.log(params.query.callback);
      // jsonp
      var str = params.query.callback + "(" + JSON.stringify(data) + ")";
      res.end(str);
    } else {
      res.end();
    }
  })
  .listen(port, function () {
    console.log("jsonp server is on");
  });
