var openImageFlag=false;
//开启录入选择
function openInsertLText(path){

  if(typeof path!="undefined"&&path!=""){
      setStorage("image",path);
      openwin('fabu.html');
  }

}
$(function(){
	$(".fsb-slider").click(function(){
		$(this).hide();
	});
});
//检测图片添加图片 进行预览
function searchImages(obj){
   if(isAppType==1){ 
	   $(".fsb-slider").html("");
	   $(".fsb-slider").html($(obj).html());
	   $(".fsb-slider").show();
	   if(!Modernizr.csstransitions){
		$("#content").delay(500).animate({right:"-10px", opacity: "0.8"},3000,"easeInOutQuad");
		} 
		$('.fsb-slider').fsbslider({"animation_time":15,"animation_type":"crossfade","pattern":false}); 
   }else{
	  var paths=[],captions=[];
	  $(obj).find("img").each(function(){
		  var src=$(this).attr("src");
		  var title=$(this).attr("title");
		  if(typeof title =="undefined"){
			title="相册图片";
		  }
		  paths.push(src);
		  captions.push(title); 
	  });
	slideImages(paths,captions);
	}
}
//图片预览自动滚动
function closeslideImages(){
  if(UIScrollPicture!=null)
    UIScrollPicture.close();
    $("#closeslideImages").remove();
}
var UIScrollPicture =null;
function slideImages(paths,captions){
  if(isAppType==1){
	  return;
  }
  var height=65;
  $("body").append('<div id="closeslideImages" style="position:fixed;top:0px ;z-index:10000000;background:#000;left:0px;height:'+height+'px;width:100%;"><a href="javascript:void(0);" onclick="closeslideImages()" '
  +' style="position:absolute;right:20px;top:25px;color:#FFF;" >关闭</a></div>');
     UIScrollPicture = api.require('UIScrollPicture');

    UIScrollPicture.open({
        rect: {
            x: 0,
            y: height,
            w: api.winWidth,
            h: api.winHeight-height
        },
        data: {
            paths: paths,
            captions: captions
        },
        touchWait:true,
        styles: {
            caption: {
                height: 35,
                color: '#E0FFFF',
                size: 13,
                bgColor: '#000000',
                position: 'bottom'
            },
            indicator: {
               dot:{
                 w:20,
                 h:10,
                 r:5,
                 margin:20
              },
                align: 'center',
                color: '#FFFFFF',
                activeColor: '#DA70D6'
            }
        },
        placeholderImg: 'widget://res/timg.gif',
        contentMode: 'scaleToFill',
        interval: 3,
        fixedOn: api.frameName,
        loop: true,
        fixed: false
    }, function(ret, err) {
        if (ret) {
            //alert(JSON.stringify(ret));
        } else {
          ///  alert(JSON.stringify(err));
        }
    });
}
//网路图片下载并保存
function savePicture(url){
      ///获取文件名
      var name =url.substring(url.lastIndexOf("/")+1);
      var timestamp = new Date().getTime()
      api.download({
          url: url,
          savePath: 'fs://'+name,
          report: true,
          cache: true,
          allowResume: true
      }, function(ret, err) {
          /*if(ret){
              api.toast({
                  msg:'图片已保存到本地'
              })
          }*/
          api.saveMediaToAlbum({
              path: 'fs://'+name
          }, function(ret, err) {

          });
      });
}
//删除图片
function deleteUploadFile(obj){
  alertMsg("确定删除么？",function(){
    $(obj).parent().remove();
  })
}
//检测是否上传完成
function uploadFinish(counts){
  var lengs=$(".upic").length;
  $("#pics").val(JSON.stringify(picsList));
   if(lengs==counts){
    saveDataAlioss();
    isSubmitDataFalg=true;
  }else{ 
    uploadFormCounts();
  }
}
//保存数据
function saveDataAlioss(){
	saveData(function(data){
      alerts(data.error_msg);
      if(data.error==0){
        if(pushUserList.length>0){
		// 阿里云获取 视频封面
		//http://a-image-demo.oss-cn-qingdao.aliyuncs.com/demo.mp4?x-oss-process=video/snapshot,t_10000,m_fast
          //推送好友
          jsonPost("/sendSpaceContent.do",{uids:encodeURI(JSON.stringify(pushUserUidList)),
          content:encodeURI("您的家族成员“"+userInfo.name+"”发布了关于您的信息。"),sql:encodeURI(jsonToString(pushUserList))},function(data){
                setTimeout(function(){if(isShareFlag) openwin('./html/list_1.html?show=true&id='+data.id);winCloseFinish();},1000);
          });
        }else{
          setTimeout(function(){if(isShareFlag) openwin('./html/list_1.html?show=true&id='+data.id);winCloseFinish();},1000);
        }

      }
	  isSubmitDataFalg=true;

    });
}
//图片是否压缩
function picCompress(path,callback){
  var compress = api.require('imageOptim');
      compress.compress({ quality: 0.1, width: 600,  imgPath: path  }, function (ret, err) {
    if (ret) {
          callback(ret.imgPath);
    } else {
          callback(path);
    }
});

}
//数据保村标志
var isSubmitDataFalg=true;
//通知用户
var pushUserList=[];
var pushUserUidList=[];
//提交数据
var isShareFlag=false;
function submitSaveData(){
		if(isSubmitDataFalg){
		layer.open({
			content: '温馨提示'
			,btn: ['保存', '保存并分享' ]
			,skin: 'footer'
			,yes: function(index){
				  isShareFlag=true;
				  subTwoSaveData();
			},no:function(index){
				 isShareFlag=false;
				 subTwoSaveData();
			}
		  });
		}else{
			
			 alerts('请稍后数据保存中··');
		}
}
function subTwoSaveData(){
	//微信提交
   if(isAppType==1&&$(".progress").length>0){
	   if(isSubmitDataFalg){
		 isSubmitDataFalg=false; 
		 picsList=[];
		 aliUploadControll();
		 
	     //uploadFinish();
		 var savecl=setInterval(function(){
			 $("#pics").val(JSON.stringify(picsList));
			 if($(".progress").length==picsList.length){
				clearInterval(savecl);
				 saveDataAlioss();
			 }
			 if(MP.type==2){
				 if($(".progress").length==1&&$("#video").val()!=""){
					clearInterval(savecl);
					 saveDataAlioss();
				 }
			 }
		 },1000);
	   }else{
		 alerts('请稍后数据保存中··');
	   }
	  
	   return;
   }
  //app保存数据
  if($(".upic").length==0&&$("#content").val().length<6){
    alerts("请添加发布内容！");
    return ;
  }
  if(isSubmitDataFalg){
    isSubmitDataFalg=false;
     uploadMaxLen=0;
     picsList=[];
     uploadFormCounts();
   }else{
     alerts('请稍后数据保存中··');
   }
}
//form 提交  图片上传
var uploadMaxLen=0;
var picsList=[];
$(function(){
  //添加FIle
  //$("body").append('<div style="display:none;"><input type="file" id="myFiles" value=""></div>');
});
function uploadFormCounts(){
   var lengs=$(".upic").length;
   if(uploadMaxLen==0){
     picsList=[];
   }
   if(lengs>0){
     var pic = $($(".upic")[uploadMaxLen]);
     var data = pic.attr("data");
     var src = pic.attr("src");
     var data_src= pic.attr("data-src");
     if(data=="pic"){
       saveImgCompress(data_src,"","",function(s){
         picsList.push(s);
         if($("#stype").length>0){
           $("#stype").val(1);
         }

         uploadMaxLen++;
         uploadFinish(uploadMaxLen);
       });
     }else{
       saveVideo(data_src,"video","",function(s){
         saveImgCompress(src,"videopic","",function(s){
           uploadMaxLen++;
           if($("#isvideo").length>0){
             $("#isvideo").val(1);
           }
           uploadFinish(uploadMaxLen);
         });
       });

     }
   }else{
     uploadFinish(uploadMaxLen);
   }

}
var uploadImageCounts=9;
var uploadVideoCounts=1;
//图片最大9 视频最大 1
function CheckPic(flag){
  var picNum=0;
  var videoNum=0;
  $(".upic").each(function(){
      var data=$(this).attr("data");
      if(data=="pic"){
        picNum++;
      }else{
        videoNum++;
      }
  });
  if(flag){
     if(picNum==uploadImageCounts){
       return 0;
     }else{
       return uploadImageCounts-picNum;
     }
  }else{
    if(videoNum==uploadVideoCounts){
      return 0;
    }else{
      return uploadVideoCounts-videoNum;
    }
  }
}
//拍照
function cameras(valueId,imgId,uploadFlag,callbak){
  api.getPicture({
      sourceType : 'camera',
      encodingType : 'jpg',
      mediaValue : 'pic',
      destinationType : 'url',
      allowEdit : false,
      quality : 100,
      saveToPhotoAlbum : false
  }, function(ret, err) {
      //  alert(JSON.stringify(ret));
      if (ret) {
        if(uploadFlag){
           saveImg(ret.data,valueId,imgId,function(data){
             if(typeof callbak=="function"){
               callbak(data);
             }
           });
        }else{
           $("#"+valueId).append('<div style="float:left;margin-top:5px;position:relative;" class="images_uploadurl">'+
           '<img src="./image/del.png" style="position:absolute;right:4px;top:4px;z-index:4;width:20px" onclick="deleteUploadFile(this)"><img class="upic " onclick="deleteUploadFile(this)" data="pic" data-src="'
           +ret.data+'" src="'+ret.data+'"><input type="text" class="uploadtext" placeholder="简短描述" readonly="readonly" onclick="commentChart(this)"></div>');
        }
      } else {
          api.toast({
              msg : '图像获取失败',
              duration : 3000,
              location : 'bottom'
          });
      }
  });
}

//图片视频录入上传选择
function uploadHeadPic(valueId,imgId,uploadFlag) {
	   
      var listM= ['拍照','相册' ];
        if(CheckPic(true)<=0){
          alerts("最大上传("+uploadImageCounts+")张照片");
          return ;
        }

        // var _this = this;
         api.actionSheet({
             title : '上传照片',
             cancelTitle : '取消',
             buttons : listM//, '手机相册'
         }, function(ret, err) {
             if (ret) {
                 if (ret.buttonIndex == 1) {
                   /*
                   all（图片和视频）
                   picture（图片）
                   video（视频）
                   */
                   if(typeof(type)=="undefined"){
               			type='picture';
               		}
                    cameras(valueId,imgId,uploadFlag);
                 } else if (ret.buttonIndex == 2) {
                   /*
                   all（图片和视频）
                   picture（图片）
                   video（视频）
                   */
                    getPictureByAlbum(CheckPic(true),false,"image",function(data){

                        // uploadHeadPic(valueId,imgId,uploadFlag)
                        if(uploadFlag){
                            saveImg(data,valueId,imgId,function(){});
                        }else{

                           $("#"+valueId).append('<div style="float:left;margin-top:5px;position:relative;" class="images_uploadurl">'+
                           '<img src="./image/del.png" style="position:absolute;z-index:4;right:4px;top:4px;width:20px" onclick="deleteUploadFile(this)">'+
                           '<img class="upic " onclick="deleteUploadFile(this)" data="pic" data-src="'+data+'" src="'+data
                           +'"><input type="text" class="uploadtext" onclick="commentChart(this)" readonly="readonly" placeholder="简短描述"></div> ');
                        }
                    });
                 }else if (ret.buttonIndex == 3) {
                 }
             }
         });
     };
     //获取视频截图
     function getVideoPic(path,callback){
       var videoScreenshots = api.require('videoScreenshots');
        videoScreenshots.screenshots({
            videoUrl:path,time:1,isAblum:true,name:"BY_"+new Date().getTime()
        }, function(ret){
            callback(ret.path);
        });
     }
     //图片视频录入上传选择
     function uploadHeadVideo(valueId,imgId,uploadFlag) {
           var listM= ['拍摄','相册' ];
           if(CheckPic(false)<=0){
             alerts("最大上传("+uploadVideoCounts+")个视频");
             return ;
           }
             // var _this = this;
              api.actionSheet({
                  title : '上传视频',
                  cancelTitle : '取消',
                  buttons : listM//, '手机相册'
              }, function(ret, err) {
                  if (ret) {
                      if (ret.buttonIndex == 1) {
                        //手机相册选图片
                         recordVideo(function(path){
                           //开始截屏

                           getVideoPic(path,function(value){
                             if(uploadFlag){
                                saveVideo(path,valueId,imgId);
                                saveImg(value,valueId+"_pic",imgId+"_pic");
                             }else{

                                $("#"+valueId).append('<div style="float:left;margin-top:5px;position:relative;" class="images_uploadurl">'+
                                '<img src="./image/del.png" style="position:absolute;z-index:4;right:4px;top:4px;width:20px" onclick="deleteUploadFile(this)">'+
                                '<img class="upic " onclick="playVideos(\''+path+'\',\'\')" data="video" data-src="'+path+'" src="'+value
                                +'">  </div> ');
                             }
                           });

                        });
                      } else if (ret.buttonIndex == 2) {
                        //选择视频
                        /*
                        all（图片和视频）
                        picture（图片）
                        video（视频）
                        */
                         getPictureByAlbum(CheckPic(false),false,"video",function(data){
                             // uploadHeadPic(valueId,imgId,uploadFlag)
                            getVideoPic(data,function(value){
                               if(uploadFlag){
                                   saveVideo(data,valueId,imgId);
                                   saveImg(value,valueId+"_pic",imgId+"_pic");
                               }else{
                                    if (api.systemType == "android") {
                                      $("#"+valueId).append('<div style="float:left;margin-top:5px;position:relative;" class="images_uploadurl">'+
                                      '<img src="./image/del.png" style="position:absolute;z-index:4;right:4px;top:4px;width:20px" onclick="deleteUploadFile(this)">'+
                                      '<img class="upic " onclick="playSysVideos(\''+data+'\',\'\')"  data="video"  data-src="'+data+'" src="'+value
                                      +'"> </div> ');
                                    }else{
                                      var UIAlbumBrowser = api.require('UIAlbumBrowser');
                                      UIAlbumBrowser.transVideoPath({
                                          path: data
                                      }, function(ret, err) {
                                        $("#"+valueId).append('<div style="float:left;margin-top:5px;position:relative;" class="images_uploadurl">'+
                                        '<img src="./image/del.png" style="position:absolute;z-index:4;right:4px;top:4px;width:20px" onclick="deleteUploadFile(this)">'+
                                        '<img class="upic " onclick="playSysVideos(\''+ret.albumVideoPath+'\',\'\')"  data="video"  data-src="'+data+'" src="'+value
                                        +'"> </div> ');
                                      });
                                    }
                               }
                             });
                         });
                      }else if (ret.buttonIndex == 3) {

                      }
                  }
              });
          };
    //压缩图片并上传
    function saveImgCompress(path,valueId,imgId ,callback){
      picCompress(path,function(data){
        saveImg(path,valueId,imgId ,function(data){callback(data);});
      })
    }

     //保存图像 上传图片
    function saveImg(path,valueId,imgId ,callback) {
         showLoad("正在上传······");
         if(startAliOssFlag){
            uploadOss(path,valueId,imgId ,callback);
         }else{
               //上传剪辑后的图像到服务器
               jsonPost(domainUrl+"/appUpload.do",{},function(ret){
                 if (ret.error != 0) {
                     api.toast({
                         msg : '上传错误',
                         duration : 3000,
                         location : 'bottom'
                     });
                  } else  {

                       if(valueId!=null&&valueId!=""){
                         $api.byId(valueId).value = ret.image;
                       }
                        if(imgId!=null&&imgId!=""){
                         $("#"+imgId).attr("src",domainUrl+ret.image);
                       }
                       if(typeof callback=="function"){
                        callback(ret.image);
                       }
                       if(typeof uploadCallback=="function"){
                        uploadCallback(ret.image);
                       }
                     //alert(domainUrl+ ret.image);
                     //picObj.src =domainUrl+ ret.image;
                  }
               },false,path);
         }

     };
	  //保存视频 上传视频
    function saveVideo(path,valueId ,imgId,callback) {
         showLoad("正在上传······");
         if(startAliOssFlag){
            uploadOss(path,valueId,imgId ,callback);
         }else{
                //上传剪辑后的图像到服务器
               jsonPost(domainUrl+"/uploadVideo.do",{},function(ret){
                 if (ret.error != 0) {
                     api.toast({
                         msg : '上传错误',
                         duration : 3000,
                         location : 'bottom'
                     });
                  } else  {

                       if(valueId!=null&&valueId!=""){
                         $api.byId(valueId).value = ret.image;
                       }
                        if(imgId!=null&&imgId!=""){
                         $("#"+imgId).attr("src",domainUrl+ret.image);
                       }
                       if(typeof callback=="function"){
                        callback(ret.image);
                       }
                       if(typeof uploadCallback=="function"){
                        uploadCallback(ret.image);
                       }
                     //alert(domainUrl+ ret.image);
                     //picObj.src =domainUrl+ ret.image;
                  }
               },false,path);
       }
  };
	 /**
	照片选择 可限制数量
	clipFlag 是否切图
	*/
	function getPictureByAlbum(num,clipFlag,type,callback){
		loadingScroll();
		if(isAppType==1){
			uploadHeadPic('aui-flex-boxhead','',true)
			return;
		}
		if(typeof(num)=="undefined"){
			num=9;
		}
    /*
    all（图片和视频）
    picture（图片）
    video（视频）
    */
    if(typeof(type)=="undefined"){
			type='image';
		}

		if(clipFlag)num=1;
	  var UIAlbumBrowser = api.require('UIAlbumBrowser');
		UIAlbumBrowser.open({
		type: type,
		column: 4,
		classify: false,
		max: num,
		sort: {
			key: 'time',
			order: 'desc'
		},
		texts: {
			stateText: '已选择*项',
			cancelText: '取消',
			finishText: '完成'
		},
    styles: {
        bg: '#fff',
        mark: {
            icon: '',
            position: 'bottom_left',
            size: 20
        },
        nav: {
            bg: 'rgba(0,0,0,0.6)',
            titleColor: '#fff',
            titleSize: 18,
            cancelColor: '#fff',
            cancelSize: 16,
            finishColor: '#fff',
            finishSize: 16
        }
    },
		/*scrollToBottom: {
			intervalTime: 3,
			anim: true
		},*/
		exchange: true,
		rotation: true
	}, function(ret) {
		if (ret) {
			if(ret.eventType=="cancel" || ret.eventType=="preview"){
          hideLoadingScroll();
			  return  false;
			}
			for(var i=0;i<ret.list.length;i++){

			  if(clipFlag){
				      clipPic(ret.list[i].path,200,function(){});
			  }else{

          if(typeof callback=="function"){
				      callback(ret.list[i].path);
          }
			  }
			}
      hideLoadingScroll();
		}
	});
  return true;
	}

	//切图 关闭按钮
    var FNImageClip;
    function cancelClip(){
      var NVTabBar = api.require('NVTabBar');
        NVTabBar.show({
          animation:false
        });
        $(".clipPic").remove();
        FNImageClip.close();
        setStorage("hideFoot","false");
    }
	//剪切头像完成
    function queClip(){
        $(".clipPic").remove();
        FNImageClip.save({
          destPath: 'fs://imageClip/result.png',
          copyToAlbum: false,
          quality: 1
      }, function(ret, err) {
          if (ret) {
              if(typeof clipFinish=="function"){
				           clipFinish(ret);
			        }
               saveImg(ret.destPath,"pic","touxiang",function(){});
          } else {
              //alert(JSON.stringify(err));
          }
          setStorage("hideFoot","false");
          FNImageClip.close();
      });
    }
    //裁图片
    function clipPic(pic,width,callback){
      setStorage("hideFoot","true");
      FNImageClip = api.require('FNImageClip');
      var x=api.winWidth/2-width;
      if(x<0){
        x=api.winWidth/2-width/2;
      }
      var y=api.winHeight/2-width;
      if(x<0){
        y=api.winHeight/2-width/2;
      }
      $("body").append('<div class="clipPic" style="position:fixed;z-index:10000;width:100%;height:40px;left:0px;bottom:0px;background:#000;">'+
      '<a href="javascript:cancelClip()" style="display:block;width:60px;float:left;line-height:40px;color:#FFF;text-align:center">取消<a>'+
      '<a href="javascript:queClip()" style="display:block;width:60px;float:right;line-height:40px;color:#FFF;text-align:center">确定<a></div>');
       FNImageClip.open({
        rect: {
            x: 0,
            y: 0,
            w: api.winWidth,
            h: api.winHeight-40
        },
        mode:"image",
        srcPath: pic,
        style: {
            mask: '#000',
            clip: {
                w: width,
                h: width,
                x: x,
                y: y,
                borderColor: '#0f0',
                borderWidth: 1,
                appearance: 'rectangle'
            }
        },
        fixedOn: api.frameName
      }, function(ret, err) {
        if (ret) {
             callback(ret);
        } else {
        }
      });
    }
    //打开录制视频
    function recordVideo(callback){
      api.getPicture({
            sourceType: 'camera',
            encodingType: 'jpg',
            mediaValue: 'video',
            destinationType: 'url',
            allowEdit: true,
            quality: 50,
            videoQuality:'high',
            targetWidth: 100,
            targetHeight: 100,
            saveToPhotoAlbum: false
        }, function(ret, err) {
            if (ret) {
                callback(ret.data)
            } else {
                alert(JSON.stringify(err));
            }
        });
        /* api.getPicture({
            sourceType : 'camera',
            mediaValue : 'video',
            destinationType : 'url',
            allowEdit : true,
            quality : 100,
            saveToPhotoAlbum : false
        }, function(ret, err) {
            MLog(err);  MLog(ret);
            //  alert(JSON.stringify(ret));


        });*/
    }
    //图片相册预览
    function showPicList(pics ){
      //测试
      var imageBrowser = api.require('imageBrowser');
      imageBrowser.openImages({
          imageUrls: pics
      });
    }
	//视频播放
	function playVideo(url){
		var alivcLivePlayer = api.require('alivcLivePlayer');
		alivcLivePlayer.initPlayer(function(ret){
			 alivcLivePlayer.prepareToPlay({url:url},function(ret){
				//alert(JSON.stringify(ret));
			 });
			 alivcLivePlayer.prepareAndPlay();
			 setTimeout(function(){alivcLivePlayer.play();},100);
		});
	}
	 //使用方法
 /*
	md5 加密
 */
 var hexcase = 1;  /* hex output format. 0 - lowercase; 1 - uppercase        */
var b64pad  = ""; /* base-64 pad character. "=" for strict RFC compliance   */
var chrsz   = 8;  /* bits per input character. 8 - ASCII; 16 - Unicode      */
/*
 * These are the functions you'll usually want to call
 * They take string arguments and return either hex or base-64 encoded strings
 */
function hex_md5(s){ return binl2hex(core_md5(str2binl(s), s.length * chrsz));}
function b64_md5(s){ return binl2b64(core_md5(str2binl(s), s.length * chrsz));}
function str_md5(s){ return binl2str(core_md5(str2binl(s), s.length * chrsz));}
function hex_hmac_md5(key, data) { return binl2hex(core_hmac_md5(key, data)); }
function b64_hmac_md5(key, data) { return binl2b64(core_hmac_md5(key, data)); }
function str_hmac_md5(key, data) { return binl2str(core_hmac_md5(key, data)); }
/*
 * Perform a simple self-test to see if the VM is working
 */
function md5_vm_test()
{
  return hex_md5("abc") == "900150983cd24fb0d6963f7d28e17f72";
}
/*
 * Calculate the MD5 of an array of little-endian words, and a bit length
 */
function core_md5(x, len)
{
  /* append padding */
  x[len >> 5] |= 0x80 << ((len) % 32);
  x[(((len + 64) >>> 9) << 4) + 14] = len;

  var a =  1732584193;
  var b = -271733879;
  var c = -1732584194;
  var d =  271733878;

  for(var i = 0; i < x.length; i += 16)
  {
    var olda = a;
    var oldb = b;
    var oldc = c;
    var oldd = d;

    a = md5_ff(a, b, c, d, x[i+ 0], 7 , -680876936);
    d = md5_ff(d, a, b, c, x[i+ 1], 12, -389564586);
    c = md5_ff(c, d, a, b, x[i+ 2], 17,  606105819);
    b = md5_ff(b, c, d, a, x[i+ 3], 22, -1044525330);
    a = md5_ff(a, b, c, d, x[i+ 4], 7 , -176418897);
    d = md5_ff(d, a, b, c, x[i+ 5], 12,  1200080426);
    c = md5_ff(c, d, a, b, x[i+ 6], 17, -1473231341);
    b = md5_ff(b, c, d, a, x[i+ 7], 22, -45705983);
    a = md5_ff(a, b, c, d, x[i+ 8], 7 ,  1770035416);
    d = md5_ff(d, a, b, c, x[i+ 9], 12, -1958414417);
    c = md5_ff(c, d, a, b, x[i+10], 17, -42063);
    b = md5_ff(b, c, d, a, x[i+11], 22, -1990404162);
    a = md5_ff(a, b, c, d, x[i+12], 7 ,  1804603682);
    d = md5_ff(d, a, b, c, x[i+13], 12, -40341101);
    c = md5_ff(c, d, a, b, x[i+14], 17, -1502002290);
    b = md5_ff(b, c, d, a, x[i+15], 22,  1236535329);

    a = md5_gg(a, b, c, d, x[i+ 1], 5 , -165796510);
    d = md5_gg(d, a, b, c, x[i+ 6], 9 , -1069501632);
    c = md5_gg(c, d, a, b, x[i+11], 14,  643717713);
    b = md5_gg(b, c, d, a, x[i+ 0], 20, -373897302);
    a = md5_gg(a, b, c, d, x[i+ 5], 5 , -701558691);
    d = md5_gg(d, a, b, c, x[i+10], 9 ,  38016083);
    c = md5_gg(c, d, a, b, x[i+15], 14, -660478335);
    b = md5_gg(b, c, d, a, x[i+ 4], 20, -405537848);
    a = md5_gg(a, b, c, d, x[i+ 9], 5 ,  568446438);
    d = md5_gg(d, a, b, c, x[i+14], 9 , -1019803690);
    c = md5_gg(c, d, a, b, x[i+ 3], 14, -187363961);
    b = md5_gg(b, c, d, a, x[i+ 8], 20,  1163531501);
    a = md5_gg(a, b, c, d, x[i+13], 5 , -1444681467);
    d = md5_gg(d, a, b, c, x[i+ 2], 9 , -51403784);
    c = md5_gg(c, d, a, b, x[i+ 7], 14,  1735328473);
    b = md5_gg(b, c, d, a, x[i+12], 20, -1926607734);

    a = md5_hh(a, b, c, d, x[i+ 5], 4 , -378558);
    d = md5_hh(d, a, b, c, x[i+ 8], 11, -2022574463);
    c = md5_hh(c, d, a, b, x[i+11], 16,  1839030562);
    b = md5_hh(b, c, d, a, x[i+14], 23, -35309556);
    a = md5_hh(a, b, c, d, x[i+ 1], 4 , -1530992060);
    d = md5_hh(d, a, b, c, x[i+ 4], 11,  1272893353);
    c = md5_hh(c, d, a, b, x[i+ 7], 16, -155497632);
    b = md5_hh(b, c, d, a, x[i+10], 23, -1094730640);
    a = md5_hh(a, b, c, d, x[i+13], 4 ,  681279174);
    d = md5_hh(d, a, b, c, x[i+ 0], 11, -358537222);
    c = md5_hh(c, d, a, b, x[i+ 3], 16, -722521979);
    b = md5_hh(b, c, d, a, x[i+ 6], 23,  76029189);
    a = md5_hh(a, b, c, d, x[i+ 9], 4 , -640364487);
    d = md5_hh(d, a, b, c, x[i+12], 11, -421815835);
    c = md5_hh(c, d, a, b, x[i+15], 16,  530742520);
    b = md5_hh(b, c, d, a, x[i+ 2], 23, -995338651);

    a = md5_ii(a, b, c, d, x[i+ 0], 6 , -198630844);
    d = md5_ii(d, a, b, c, x[i+ 7], 10,  1126891415);
    c = md5_ii(c, d, a, b, x[i+14], 15, -1416354905);
    b = md5_ii(b, c, d, a, x[i+ 5], 21, -57434055);
    a = md5_ii(a, b, c, d, x[i+12], 6 ,  1700485571);
    d = md5_ii(d, a, b, c, x[i+ 3], 10, -1894986606);
    c = md5_ii(c, d, a, b, x[i+10], 15, -1051523);
    b = md5_ii(b, c, d, a, x[i+ 1], 21, -2054922799);
    a = md5_ii(a, b, c, d, x[i+ 8], 6 ,  1873313359);
    d = md5_ii(d, a, b, c, x[i+15], 10, -30611744);
    c = md5_ii(c, d, a, b, x[i+ 6], 15, -1560198380);
    b = md5_ii(b, c, d, a, x[i+13], 21,  1309151649);
    a = md5_ii(a, b, c, d, x[i+ 4], 6 , -145523070);
    d = md5_ii(d, a, b, c, x[i+11], 10, -1120210379);
    c = md5_ii(c, d, a, b, x[i+ 2], 15,  718787259);
    b = md5_ii(b, c, d, a, x[i+ 9], 21, -343485551);

    a = safe_add(a, olda);
    b = safe_add(b, oldb);
    c = safe_add(c, oldc);
    d = safe_add(d, oldd);
  }
  return Array(a, b, c, d);

}

/*
 * These functions implement the four basic operations the algorithm uses.
 */
function md5_cmn(q, a, b, x, s, t)
{
  return safe_add(bit_rol(safe_add(safe_add(a, q), safe_add(x, t)), s),b);
}
function md5_ff(a, b, c, d, x, s, t)
{
  return md5_cmn((b & c) | ((~b) & d), a, b, x, s, t);
}
function md5_gg(a, b, c, d, x, s, t)
{
  return md5_cmn((b & d) | (c & (~d)), a, b, x, s, t);
}
function md5_hh(a, b, c, d, x, s, t)
{
  return md5_cmn(b ^ c ^ d, a, b, x, s, t);
}
function md5_ii(a, b, c, d, x, s, t)
{
  return md5_cmn(c ^ (b | (~d)), a, b, x, s, t);
}

/*
 * Calculate the HMAC-MD5, of a key and some data
 */
function core_hmac_md5(key, data)
{
  var bkey = str2binl(key);
  if(bkey.length > 16) bkey = core_md5(bkey, key.length * chrsz);

  var ipad = Array(16), opad = Array(16);
  for(var i = 0; i < 16; i++)
  {
    ipad[i] = bkey[i] ^ 0x36363636;
    opad[i] = bkey[i] ^ 0x5C5C5C5C;
  }

  var hash = core_md5(ipad.concat(str2binl(data)), 512 + data.length * chrsz);
  return core_md5(opad.concat(hash), 512 + 128);
}

/*
 * Add integers, wrapping at 2^32. This uses 16-bit operations internally
 * to work around bugs in some JS interpreters.
 */
function safe_add(x, y)
{
  var lsw = (x & 0xFFFF) + (y & 0xFFFF);
  var msw = (x >> 16) + (y >> 16) + (lsw >> 16);
  return (msw << 16) | (lsw & 0xFFFF);
}

/*
 * Bitwise rotate a 32-bit number to the left.
 */
function bit_rol(num, cnt)
{
  return (num << cnt) | (num >>> (32 - cnt));
}

/*
 * Convert a string to an array of little-endian words
 * If chrsz is ASCII, characters >255 have their hi-byte silently ignored.
 */
function str2binl(str)
{
  var bin = Array();
  var mask = (1 << chrsz) - 1;
  for(var i = 0; i < str.length * chrsz; i += chrsz)
    bin[i>>5] |= (str.charCodeAt(i / chrsz) & mask) << (i%32);
  return bin;
}

/*
 * Convert an array of little-endian words to a string
 */
function binl2str(bin)
{
  var str = "";
  var mask = (1 << chrsz) - 1;
  for(var i = 0; i < bin.length * 32; i += chrsz)
    str += String.fromCharCode((bin[i>>5] >>> (i % 32)) & mask);
  return str;
}

/*
 * Convert an array of little-endian words to a hex string.
 */
function binl2hex(binarray)
{
  var hex_tab = hexcase ? "0123456789ABCDEF" : "0123456789abcdef";
  var str = "";
  for(var i = 0; i < binarray.length * 4; i++)
  {
    str += hex_tab.charAt((binarray[i>>2] >> ((i%4)*8+4)) & 0xF) +
           hex_tab.charAt((binarray[i>>2] >> ((i%4)*8  )) & 0xF);
  }
  return str;
}

/*
 * Convert an array of little-endian words to a base-64 string
 */
function binl2b64(binarray)
{
  var tab = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
  var str = "";
  for(var i = 0; i < binarray.length * 4; i += 3)
  {
    var triplet = (((binarray[i   >> 2] >> 8 * ( i   %4)) & 0xFF) << 16)
                | (((binarray[i+1 >> 2] >> 8 * ((i+1)%4)) & 0xFF) << 8 )
                |  ((binarray[i+2 >> 2] >> 8 * ((i+2)%4)) & 0xFF);
    for(var j = 0; j < 4; j++)
    {
      if(i * 8 + j * 6 > binarray.length * 32) str += b64pad;
      else str += tab.charAt((triplet >> 6*(3-j)) & 0x3F);
    }
  }
  return str;
}
