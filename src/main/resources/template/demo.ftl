<!DOCTYPE html>
<html>
<head>
	<meta http-equiv="content-type" content="text/html; charset=UTF-8"/>
	<title>OSS web直传</title>
	<link rel="stylesheet" type="text/css" href="http://oss-demo.aliyuncs.com/oss-h5-upload-js-php/style.css">
	<script src="http://lib.sinaapp.com/js/jquery/2.0.2/jquery-2.0.2.min.js"></script>
	<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">
</head>
<body>

<h2>OSS web直传---在服务端java签名,浏览器直传</h2>
<br>
<form name=theform>
	<input type="radio" name="myradio" value="local_name" /> 上传文件名字保持本地文件名字
	<input type="radio" name="myradio" value="random_name" checked=true/> 上传文件名字是随机文件名, 后缀保留
</form>

<h4>您所选择的文件列表：</h4>
<div id="ossfile">你的浏览器不支持flash,Silverlight或者HTML5！</div>
<br/>

<div id="container">
	<a id="selectfiles" href="javascript:void(0);" class='btn'>选择文件</a>
	<a id="postfiles" href="javascript:void(0);" class='btn'>开始上传</a>
</div>
<pre id="console"></pre>
     <img src="" id="uploadImg"/>
</body>
<script type="text/javascript" src="static/js/plupload.full.min.js"></script>
<script type="text/javascript" src="static/js/upload.js"></script>
</html>
