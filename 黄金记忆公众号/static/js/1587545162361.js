
function getPictureByAlbum(){
  var UIMediaScanner = api.require('UIMediaScanner');
UIMediaScanner.open({
    type: 'picture',
    column: 4,
    classify: true,
    max: 4,
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
            bg: '#eee',
            stateColor: '#000',
            stateSize: 18,
            cancelBg: 'rgba(0,0,0,0)',
            cancelColor: '#000',
            cancelSize: 18,
            finishBg: 'rgba(0,0,0,0)',
            finishColor: '#000',
            finishSize: 18
        }
    },
    scrollToBottom: {
        intervalTime: 3,
        anim: true
    },
    exchange: true,
    rotation: true
}, function(ret) {
    if (ret) {
        if(ret.eventType=="cancel" || ret.eventType=="preview"){
          return false;
        }
        for(var i=0;i<ret.list.length;i++){
          clipPic(ret.list[i].path,200,function(){});
        }
    }
});
}

    //  打开相册
    function openImages(){

    }
    var FNImageClip;
    function cancelClip(){
        $(".clipPic").remove();
        FNImageClip.close();
    }
    function queClip(){
        $(".clipPic").remove();
        FNImageClip.save({
          destPath: 'fs://imageClip/result.png',
          copyToAlbum: false,
          quality: 1
      }, function(ret, err) {
          if (ret) {
              alert(JSON.stringify(ret));
          } else {
              alert(JSON.stringify(err));
          }
      });
    }
    //裁图片
    function clipPic(pic,width,callback){

      FNImageClip = api.require('FNImageClip');
      var x=api.winWidth/2-width;
      if(x<0){
        x=api.winWidth/2-width/2;
      }
      var y=api.winHeight/2-width;
      if(x<0){
        y=api.winHeight/2-width/2;
      }
      $("body").append('<div class="clipPic" style="position:fixed;z-index:10000;width:100%;height:40px;left:0px;bottom:0px;background:#FFF;">'+
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
            //alert((api.winWidth/2 -100));
        } else {
        }
      });
    }
    //打开录制视频
    function recordVideo(callback){
      var apsaraShortVideoBase = api.require('apsaraShortVideoBase');
        apsaraShortVideoBase.openRecordView({
           recordConfig:{
            position:0,
            torchMode:0,
            beautifyStatus:true,
            beautifyValue:60,
            outputPath:'fs://apsaraShortVideoBase/video.mp4',
            size:3,
            ratio:0,
            minDuration:5,
            maxDuration:30,
            videoQuality:0,
            encodeMode:0,
            fps:20,
            gop:5,
        },
        UIConfig:{
            backgroundColor:'',
            timelineTintColor:'',
            timelineBackgroundCollor:'',
            timelineDeleteColor:'',
            durationLabelTextColor:'',
            cutBottomLineColor:'',
            cutTopLineColor:'',
            hiddenDurationLabel: false,
            hiddenBeautyButton: false,
            hiddenCameraButton: false,
            hiddenFlashButton: false,
            hiddenImportButton: false,
            hiddenDeleteButton: false,
            hiddenFinishButton: false,
            recordOnePart: false,
            showCameraButton: true,
            recordType:0,
            noneFilterText:'',
        }
        }, function(ret){
           //路径ret.path
           callback(ret);
        });
    }
    //图片相册预览
    function showPicList(pics){
      //测试
      for(var i=1;i<13;i++){
        pics.push('https://www.17sucai.com/preview/11/2017-09-03/12/img/'+i+'.jpg');
      }
      var imageBrowser = api.require('imageBrowser');
      imageBrowser.openImages({
          imageUrls: pics
      });
    }
    apiready = function() {
        //输出Log，Log将显示在APICloud Studio控制台
        console.log("Hello World! Hello APICloud!");

        var header = $api.dom('header'); // 获取 header 标签元素
        var footer = $api.dom('footer'); // 获取 footer 标签元素

        // 1.修复开启沉浸式效果带来的顶部Header与手机状态栏重合的问题，最新api.js方法已支持适配iPhoneX；
        // 2.默认已开启了沉浸式效果 config.xml中 <preference name="statusBarAppearance" value="true"/>
        // 3.沉浸式效果适配支持iOS7+，Android4.4+以上版本
        var headerH = $api.fixStatusBar(header);
        // 最新api.js为了适配iPhoneX增加的方法，修复底部Footer部分与iPhoneX的底部虚拟横条键重叠的问题；
        var footerH = $api.fixTabBar(footer);

    };

