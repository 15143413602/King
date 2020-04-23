
accessid= 'LTAI4FfRTcosX7jiEdrGWWvN';
accesskey= 'btdCBatSSDYLw7uAg3Z4tVQAkFmlE8';
host = 'https://byhome.oss-cn-hangzhou.aliyuncs.com';

g_dirname = ''
g_object_name = ''
g_object_name_type = ''
now = timestamp = Date.parse(new Date()) / 1000; 
 
var policyText = {
    "expiration": getIosTIme(), //设置该Policy的失效时间，超过这个失效时间之后，就没有办法通过这个policy上传文件了
    "conditions": [
    ["content-length-range", 0, 1048576000] // 设置上传文件的大小限制
    ]
};

var policyBase64 = Base64.encode(JSON.stringify(policyText))
message = policyBase64
var bytes = Crypto.HMAC(Crypto.SHA1, message, accesskey, { asBytes: true }) ;
var signature = Crypto.util.bytesToBase64(bytes);

function check_object_radio() {
    g_object_name_type = "random_name";
}

function get_dirname()
{
    dir = "gongzhonghao";
    if (dir != '' && dir.indexOf('/') != dir.length - 1)
    {
        dir = dir + '/'
    }
    //alert(dir)
    g_dirname = dir
}

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

function calculate_object_name(filename)
{
    if (g_object_name_type == 'local_name')
    {
        g_object_name += "${filename}"
    }
    else if (g_object_name_type == 'random_name')
    {
        suffix = get_suffix(filename)
        g_object_name = g_dirname + random_string(10) + suffix
    }
    return ''
}

function get_uploaded_object_name(filename)
{
    if (g_object_name_type == 'local_name')
    {
        tmp_name = g_object_name
        tmp_name = tmp_name.replace("${filename}", filename);
        return tmp_name
    }
    else if(g_object_name_type == 'random_name')
    {
        return g_object_name
    }
}

function set_upload_param(up, filename, ret)
{
    g_object_name = g_dirname;
    if (filename != '') {
        suffix = get_suffix(filename)
        calculate_object_name(filename)
    }
    new_multipart_params = {
        'key' : g_object_name,
        'policy': policyBase64,
        'OSSAccessKeyId': accessid, 
        'success_action_status' : '200', //让服务端返回200,不然，默认会返回204
        'signature': signature,
    };

    up.setOption({
        'url': host,
        'multipart_params': new_multipart_params
    });

    up.start();
}
// 选择文件按钮ID  容器ID  信息输入ID  文件处理上传按钮ID  文件类型
//accept="image/*" 
	//accept="video/*" 
	//accept="audio/*" 
	//accept="image/*" capture="camera" 
	//accept="video/*" capture="camera"
//上传文件数量
var uploadAliFileCount=9;
//是否增加虚拟上传位置
function addBlankSpace(){
	$("body").append('<div  id="aui-upload-pic" style="display:none;"> <div id="chose_pic_btn"> </div> </div>');
}
function isPAndroid(){ 
	var u = navigator.userAgent; 
		var flag = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; 
	return  flag;
}
function selectPhone(obj,container,accept,capture){
	$("input[type='file']").attr("accept",accept);
	if(isPAndroid()){
		
		layer.open({
			content: '选择上传方式'
			,btn: ['拍照/拍照', '相册选择' ]
			,skin: 'footer'
			,yes: function(index){
				$("input[type='file']").attr("capture",capture);
				
 				setTimeout(function(){
					$("input[type='file']").each(function(){
						var id = $(this).attr("id");
						if(typeof id!="undefined"){
							$(this).trigger("click");
						}
					});
					
				},500);
				
			  
			},no:function(index){
				$("input[type='file']").removeAttr("capture");
				setTimeout(function(){
					$("input[type='file']").each(function(){
						var id = $(this).attr("id");
						if(typeof id!="undefined"){
							$(this).trigger("click");
						}
					});
					
				},500);
			}
		  });
	}else{
		$("input[type='file']").removeAttr("capture");
		 setTimeout(function(){
			$("input[type='file']").each(function(){
				var id = $(this).attr("id");
				if(typeof id!="undefined"){
					$(this).trigger("click");
				}
			});
					
		},500);
	}
}
function addplugsUpload(selectfiles,container,ossfile,postfiles,accept,capture,count,isAuto){
	if(typeof count!="undefined")
		uploadAliFileCount=count;
	if(typeof isAuto!="undefined")
			isAutoUploadFIle=isAuto;
	//添加按钮信息
	var buttonInfo='<span id="'+selectfiles+'1" style=""  onclick="selectPhone(this,\''+container+'\',\''+accept+'\',\''+capture+'\')"> </span><span id="'+selectfiles+'" style=""  > </span><style> #'+selectfiles+'1{z-index:1000!important; position: absolute; height: 70px; width: 70px; left: 0px;}div#'+ossfile+' div { width: 100%; float: left; }div#'+ossfile+' b {  display: none; }</style>   <div id="'+ossfile+'"  style="z-index: 1000;">你的浏览器不支持flash,Silverlight或者HTML5！</div> <div id="'+container+'"> <a id="'+postfiles+'" href="javascript:void(0);" class="btn" style="display:none;">开始上传</a> </div> <pre id="console"></pre>';
	$("#"+container).html(buttonInfo);
    var uploader = new plupload.Uploader({
	runtimes : 'html5,flash,silverlight,html4',
	browse_button : selectfiles, 
    //multi_selection: false,
	container: document.getElementById(container),
	flash_swf_url : 'lib/plupload-2.1.2/js/Moxie.swf',
	silverlight_xap_url : 'lib/plupload-2.1.2/js/Moxie.xap',
    url : 'http://oss.aliyuncs.com',

	init: {
		PostInit: function() {
			document.getElementById(ossfile).innerHTML = '';
			document.getElementById(postfiles).onclick = function() {
            set_upload_param(uploader, '', false);
				return false;
			};
		},

		FilesAdded: function(up, files) {
			picsList=[];
			var i=0;
			plupload.each(files, function(file) { 
				if(uploadAliFileCount==1&&i==0){
					document.getElementById( ossfile ).innerHTML += '<div id="' + file.id + '" style="display:none;">'+file.name+'<b></b>'
				+' <div class="progress"><div class="progress-bar" style="width: 0%"></div></div>'
				+'</div>'; 
				}else{
					document.getElementById( ossfile ).innerHTML += '<div id="' + file.id + '">'+file.name+'<b></b>'
				+'<span onclick="$(\'#'+file.id+'\').remove()" style="color:red;float:right;">删除</span><div class="progress"><div class="progress-bar" style="width: 0%"></div></div>'
				+'</div>'; 
				}
				i++; 
			});
			if(isAutoUploadFIle){
				addTriggers();
			}
		},

		BeforeUpload: function(up, file) {
            check_object_radio();
            get_dirname();
            set_upload_param(up, file.name, true);
        },

		UploadProgress: function(up, file) {
			var d = document.getElementById(file.id);
			d.getElementsByTagName('b')[0].innerHTML = '<span>' + file.percent + "%</span>";
            var prog = d.getElementsByTagName('div')[0];
			var progBar = prog.getElementsByTagName('div')[0]
			progBar.style.width=  file.percent+'%';
			progBar.setAttribute('aria-valuenow', file.percent);
		},

		FileUploaded: function(up, file, info) {
			 
            if (info.status == 200)
            {
				if(accept.indexOf("video")!=-1){
					if($("#isvideo").length>0){
						$("#isvideo").val(1);
						$("#video").val(aliyunOssShowUrl+"/"+up.settings.multipart_params.key);
						$("#videopic").val(aliyunOssShowUrl+"/"+up.settings.multipart_params.key+"?x-oss-process=video/snapshot,t_2,m_fast");
					}
				}else{
					picsList.push(aliyunOssShowUrl+"/"+up.settings.multipart_params.key);
					if($("#stype").length>0)
						$("#stype").val(1);
					if($("#pic").length>0)
						$("#pic").val(aliyunOssShowUrl+"/"+up.settings.multipart_params.key);
					if($("#"+container).find(".up_img").length>0)
						$("#"+container).find(".up_img").attr("src",aliyunOssShowUrl+"/"+up.settings.multipart_params.key);
					if(uploadAliFileCount==1 ){
						$("#"+container).find("up_img").attr("src",aliyunOssShowUrl+"/"+up.settings.multipart_params.key);
					//$("#")
 						$("#"+selectfiles).css({"background-image":"url("+aliyunOssShowUrl+"/"+up.settings.multipart_params.key+")","background-size":"100%"});
				
					}
					if(typeof uploadCallback=="function")
						uploadCallback(aliyunOssShowUrl+"/"+up.settings.multipart_params.key); 
				} 
                document.getElementById(file.id).getElementsByTagName('b')[0].innerHTML = '上传成功:' + get_uploaded_object_name(file.name);
            }
            else
            {
                document.getElementById(file.id).getElementsByTagName('b')[0].innerHTML = info.response;
            } 
		}, 
		Error: function(up, err) {
			document.getElementById('console').appendChild(document.createTextNode("\nError xml:" + err.response));
		}
	}
});

  uploader.init();
  var json ={};
  json.id=container;
  json.up=postfiles;
  upFileList.push(json);
  setTimeout(function(){
	  if(typeof accept!="undefined"){
		  $("#"+container).find("input[type='file']").attr("accept",accept);
	  }
	  if(typeof accept!="undefined"){
		  $("#"+container).find("input[type='file']").attr("capture",capture);
	  }
	  $("#"+container).find("input[type='file']").attr("multiple","multiple");
	  
  },1000);  
};
var upFileList=[];
var isAutoUploadFIle=false;
//添加监听自动上传
function addTriggers(){
	$.each(upFileList,function(k,v){
		$("#"+v.up).trigger("click");
	});
}
(function ($) {
    $.extend({
      //压缩图片，参数1：file对象，参数2：压缩比例
      compress(file,scale) {
        return new Promise(function (resolve,reject) {
          let _scale=scale || 1;
          let cvs = document.createElement('canvas');
          let ctx = cvs.getContext('2d');
          let img = new window.Image();
          let imgType=file.type;
          img.src = URL.createObjectURL(file);
          img.onload=function () {
            cvs.width = img.width*_scale;
            cvs.height = img.height*_scale;
            ctx.drawImage(img, 0, 0, cvs.width, cvs.height);
            resolve(cvs.toDataURL(imgType));
          }
        });
      }
    });
    $.fn.extend({

      //复制节点
      cloneNode(num){
        let p=this.parent();
        for (let i=0;i<num;i++){
          p.append(this.clone(true))
        }
      }
    }); 
  })(jQuery)