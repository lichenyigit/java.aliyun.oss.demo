accessid = ''
accesskey = ''
host = ''
policyBase64 = ''
signature = ''
callbackbody = ''
filename = ''
key = ''
expire = 0
g_object_name = ''
g_object_name_type = ''
now = timestamp = Date.parse(new Date()) / 1000;

function send_request() {
    var xmlhttp = null;
    if (window.XMLHttpRequest) {
        xmlhttp = new XMLHttpRequest();
    }
    else if (window.ActiveXObject) {
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }

    if (xmlhttp != null) {
        serverUrl = getRootPath_web()+'/AliOSSServlet';
        xmlhttp.open("GET", serverUrl, false);
        xmlhttp.send(null);
        return xmlhttp.responseText
    }
    else {
        alert("Your browser does not support XMLHTTP.");
    }

};

function check_object_radio() {
    g_object_name_type = 'random_name';
}

function get_signature() {
    //可以判断当前expire是否超过了当前时间,如果超过了当前时间,就重新取一下.3s 做为缓冲
    now = timestamp = Date.parse(new Date()) / 1000;
    if (expire < now + 3) {
        body = send_request();
        var obj = eval("(" + body + ")");
        host = obj['host']
        policyBase64 = obj['policy']
        accessid = obj['accessid']
        signature = obj['signature']
        expire = parseInt(obj['expire'])
        callbackbody = obj['callback']
        key = obj['dir']
        return true;
    }
    return false;
};

function random_string(len) {
    len = len || 32;
    var chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';
    var maxPos = chars.length;
    var pwd = '';
    for (i = 0; i < len; i++) {
        pwd += chars.charAt(Math.floor(Math.random() * maxPos));
    }
    return pwd;
}

function get_suffix(filename) {
    pos = filename.lastIndexOf('.')
    suffix = ''
    if (pos != -1) {
        suffix = filename.substring(pos)
    }
    return suffix;
}

function calculate_object_name(filename) {
    if (g_object_name_type == 'local_name') {
        g_object_name += "${filename}"
    }
    else if (g_object_name_type == 'random_name') {
        suffix = get_suffix(filename)
        g_object_name = key + timestamp + random_string(10) + suffix;
    }
    return ''
}

function getRootPath_web() {
    //获取当前网址，如： http://localhost:8083/uimcardprj/share/meun.jsp
    var curWwwPath = window.document.location.href;
    //获取主机地址之后的目录，如： uimcardprj/share/meun.jsp
    var pathName = window.document.location.pathname;
    var pos = curWwwPath.indexOf(pathName);
    //获取主机地址，如： http://localhost:8083
    var localhostPath = curWwwPath.substring(0, pos);
    //获取带"/"的项目名，如：/uimcardprj
    var projectName = pathName.substring(0, pathName.substr(1).indexOf('/') + 1);
    if(localhostPath.indexOf("localhost") > -1){
        return localhostPath+"/";
    }
    return (localhostPath + projectName+'/');
}

function get_uploaded_object_name(filename) {
    if (g_object_name_type == 'local_name') {
        tmp_name = g_object_name
        tmp_name = tmp_name.replace("${filename}", filename);
        return tmp_name
    }
    else if (g_object_name_type == 'random_name') {
        return g_object_name
    }
}

function set_upload_param(up, filename, ret) {
    if (ret == false) {
        ret = get_signature()
    }
    g_object_name = key;
    if (filename != '') {
        suffix = get_suffix(filename)
        calculate_object_name(filename)
    }
    new_multipart_params = {
        'key': g_object_name,
        'policy': policyBase64,
        'OSSAccessKeyId': accessid,
        'success_action_status': '200', //让服务端返回200,不然，默认会返回204
        'callback': callbackbody,
        'signature': signature,
    };
    up.setOption({
        'url': host,
        'multipart_params': new_multipart_params
    });
    up.start();
}

/**
 *
 * @param triggerId
 * @param callback(fileSize,fileName,propgress,call)
 */
function bindUpload(param) {
    var uploader = new plupload.Uploader({
        runtimes: 'html5,flash,silverlight,html4',
        browse_button: '' + param.id,
        multi_selection: true,
        // container: document.getElementById(''+triggerId),
        url: 'http://oss.aliyuncs.com',
        filters: {
            max_file_size: '10mb', //最大只能上传10mb的文件
            prevent_duplicates: true //不允许选取重复文件
        },
        init: {
            PostInit: function () {
            },
            FilesAdded: function (up, files) {
                // plupload.each(files, function (file) {
                //     console.log(file.id + ":" + file.name + ":" + plupload.formatSize(file.size));
                // });
                set_upload_param(uploader, '', false);
            },
            BeforeUpload: function (up, file) {
                check_object_radio();
                set_upload_param(up, file.name, true);
            },
            UploadProgress: function (up, file) {
            },
            FileUploaded: function (up, file, info) {
                if (info.status == 200) {
                    console.log(JSON.stringify(file))
                    param.finish("http://img-wechat-xiyaoxiyao.oss-cn-shanghai.aliyuncs.com/" + get_uploaded_object_name(file.name));
                } else {
                    console.log(info.response);
                }
            },
            Error: function (up, err) {
                if (err.code == -600) {
                    alert("\n选择的文件太大了,可以根据应用情况，在upload.js 设置一下上传的最大大小");
                }
                else if (err.code == -601) {
                    alert("\n选择的文件后缀不对,可以根据应用情况，在upload.js进行设置可允许的上传文件类型");
                }
                else if (err.code == -602) {
                    alert("\n这个文件已经上传过一遍了");
                }
                else {
                    alert("\nError xml:" + err.response);
                }
            }
        }
    });
    uploader.init();
}
