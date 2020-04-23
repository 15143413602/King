
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
        stateText: '��ѡ��*��',
        cancelText: 'ȡ��',
        finishText: '���'
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

    //  �����
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
    //��ͼƬ
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
      '<a href="javascript:cancelClip()" style="display:block;width:60px;float:left;line-height:40px;color:#FFF;text-align:center">ȡ��<a>'+
      '<a href="javascript:queClip()" style="display:block;width:60px;float:right;line-height:40px;color:#FFF;text-align:center">ȷ��<a></div>');
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
    //��¼����Ƶ
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
           //·��ret.path
           callback(ret);
        });
    }
    //ͼƬ���Ԥ��
    function showPicList(pics){
      //����
      for(var i=1;i<13;i++){
        pics.push('https://www.17sucai.com/preview/11/2017-09-03/12/img/'+i+'.jpg');
      }
      var imageBrowser = api.require('imageBrowser');
      imageBrowser.openImages({
          imageUrls: pics
      });
    }
    apiready = function() {
        //���Log��Log����ʾ��APICloud Studio����̨
        console.log("Hello World! Hello APICloud!");

        var header = $api.dom('header'); // ��ȡ header ��ǩԪ��
        var footer = $api.dom('footer'); // ��ȡ footer ��ǩԪ��

        // 1.�޸���������ʽЧ�������Ķ���Header���ֻ�״̬���غϵ����⣬����api.js������֧������iPhoneX��
        // 2.Ĭ���ѿ����˳���ʽЧ�� config.xml�� <preference name="statusBarAppearance" value="true"/>
        // 3.����ʽЧ������֧��iOS7+��Android4.4+���ϰ汾
        var headerH = $api.fixStatusBar(header);
        // ����api.jsΪ������iPhoneX���ӵķ������޸��ײ�Footer������iPhoneX�ĵײ�����������ص������⣻
        var footerH = $api.fixTabBar(footer);

    };

