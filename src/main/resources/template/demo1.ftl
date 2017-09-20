<!DOCTYPE html>
<html>
<head>
	<meta http-equiv="content-type" content="text/html; charset=UTF-8"/>
	<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">
	<title>OSS web直传</title>
	<link rel="stylesheet" type="text/css" href="http://oss-demo.aliyuncs.com/oss-h5-upload-js-php/style.css">
	<script src="http://lib.sinaapp.com/js/jquery/2.0.2/jquery-2.0.2.min.js"></script>
</head>
<body>

<h2>OSS web直传---在服务端java签名,浏览器直传,直接点击图片，自动上传</h2>
<br>
<img id="aa"  width="200px" height="100px" border="5"/>

<br/>
</body>
<script type="text/javascript" src="static/js/plupload.full.min.js"></script>
<script type="text/javascript" src="static/js/uploadme.js"></script>
<script>
     $(function () {
         var imgId = "aa";
	     bindUpload({
		     id: imgId,
		     multi: false,
		     finish: function (file) {
			     $("#" + imgId).attr('src', file);
		     }
	     });
     });
</script>
</html>
