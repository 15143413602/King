
//setStorage("isopenLoginFlag",true);

indexListExit=true;
 $(function(){

      setInterval(function(){
      var userid=getStorage("userid")+"";
      var type=getStorage("type")+"";
      var locaH=location.href;
      if(type==1){
      //  location.href="index.html";
       }
        //���ػ������
      if(userid=="0"&&firstisopenLoginFlag){
            firstisopenLoginFlag=false;
            openwin( "./html/loginU.html");
          // location.href="./index.html";

        }else   if(firstisopenLoginFlag&&typeof api =="object" &&(locaH).indexOf("reaload=true")!=-1){
         //firstisopenLoginFlag=false;
         setTimeout(function(){ apiready();},2000);
      }

      if(flagSeachLoc){
        flagSeachLoc=false;
      }
    },1000);
  });
  //��ʼ������
  var NVTabBar = null;
   callBackInit = function(){
     //����

     updateLocation(true);
      //calendar������camera�����contactsͨѶ¼��locationλ����Ϣ��microphone��˷�
   	//phone�绰��sensor���崫������sms���ţ�storage�洢�ռ䣬photos���
     confirmPer('camera,location,photos,contacts,microphone,storage,phone',function(){
    });

      loadSystemConf();
     //ע��֪ͨ
      initJGLoads();
        //��Ļ�������
     api.parseTapmode();

      //����
    /*  var agoraRtc = api.require('agoraRtc');
      agoraRtc.init({appId:'97cef1f3dec9443da50c4deac6725ba9'});
      var agoraRtc = api.require('agoraRtc');
      agoraRtc.joinChannel({
          channel:'test'
      }, function(ret) {
          if (ret.code == 0) {
              //success
          }
      });*/
    isListenerBackFlag=false;
      //���ز˵�
    NVTabBar = api.require('NVTabBar');
     //�Ƿ����صײ�����
     setInterval(function(){
       if(getStorage("hideFoot")=="true")
       {
         NVTabBar.hide();
       }else{
         NVTabBar.show();
       }
     },1000);
    NVTabBar.open({
       selectedIndex:0,
        styles: {
            bg: '#fafafb',
            //bg:"widget://res/image/NVTabBar/tabbar_bg.png",
            h: 65,
            dividingLine: {
                width: 0,
                color: '#000'
            },
            badge: {
                bgColor: '#ff0',
                numColor: '#fff',
                size: 6.0,
                centerX: 40,
                centerY: 6
            }
        },
        items: [{
            w: api.winWidth / 5.0,
            bg: {
                marginB: 0,
                image: '#fafafb'
            },
            iconRect: {
                w: 25.0,
                h: 25.0,
            },
            icon: {
                normal: 'widget://res/image/1.png',
                highlight: 'widget://res/image/11.png',
                selected: 'widget://res/image/11.png'
            },
            title: {
                text: '��ҳ',
                size: 12.0,
                normal: '#696969',
                selected: '#1296db',
                marginB: 6.0
            }
        }, {
            w: api.winWidth / 5.0,
            bg: {
                marginB: 0,
                image: '#fafafb'
            },
            iconRect: {
                w: 25.0,
                h: 25.0,
            },
            icon: {
                normal: 'widget://res/image/2.png',
                highlight: 'widget://res/image/22.png',
                selected: 'widget://res/image/22.png'
            },
            title: {
                text: '��Ϣ',
                size: 12.0,
                normal: '#696969',
                selected: '#1296db',
                marginB: 6.0
            }
        }, {
            w: api.winWidth / 5.0,
            bg: {
                marginB: 10,
                image: 'widget://res/image/33.png' //�м䱳��ͼ
            },
            iconRect: {
                w: 32,
                h: 32,
            },
            icon: {
                normal: '#FFF',
                highlight: '#FFF',
                selected: '#FFF'
            },
            title: {
                //text : '333',
                size: 0.0,
                normal: '#FFF',
                selected: '#FFF',
                marginB: 0
            }
        }, {
            w: api.winWidth / 5.0,
            bg: {
                marginB: 0,
                image: '#fafafb'
            },
            iconRect: {
                w: 25.0,
                h: 25.0,
            },
            icon: {
                normal: 'widget://res/image/list1.png',
                highlight: 'widget://res/image/list2.png',
                selected: 'widget://res/image/list2.png'
            },
            title: {
                text: '�б�',
                size: 12.0,
                normal: '#696969',
                selected: '#1296db',
                marginB: 6.0
            }
        }, {
            w: api.winWidth / 5.0,
            bg: {
                marginB: 0,
                image: '#fafafb'
            },
            iconRect: {
                w: 25.0,
                h: 25.0,
            },
            icon: {
                normal: 'widget://res/image/5.png',
                highlight: 'widget://res/image/55.png',
                selected: 'widget://res/image/55.png'
            },
            title: {
                text: '�ҵ�',
                size: 12.0,
                normal: '#696969',
                selected: '#1296db',
                marginB: 6.0
            }
        }],
        selectedIndex: 0
    }, function(ret, err) {
      var userid=getStorage("userid");
      if (ret.eventType == "click" && ret.index == 0) {
                          api.openFrame({
                              name: 'frame0'+userid,
                              url: './html/index.html',
                              rect: {
                                  x: 0,
                                  y: 0,
                                  w: 'auto',
                                  h: api.winHeight
                              },reload:false,bounces:false,vScrollBarEnabled:true,
                                animation : {
                                          type : 'movein',
                                          subType : 'from_right',
                                          duration : 400
                                  }
                          });
                      }
                      //1
                      if (ret.eventType == "click" && ret.index == 1) {
                          api.openFrame({
                              name: 'frame1'+userid,
                              url: './msg.html',
                              rect: {
                                x: 0,
                                y: 0,
                                  w: 'auto',
                                    h: api.winHeight
                              },reload:false,bounces:false,vScrollBarEnabled:true,
                                animation : {
                                          type : 'movein',
                                          subType : 'from_right',
                                          duration : 400
                                  }
                          })
                      }
                      //1
                      if (ret.eventType == "click" && ret.index == 2) {
                         openwin('fabu.html');
                      }
                      //1
                      if (ret.eventType == "click" && ret.index == 3) {
                          api.openFrame({
                              name: 'frame3'+userid,
                              url: './html/list.html',bounces:false,
                              rect: {
                                x: 0,
                                y: 0,
                                  w: 'auto',
                                    h: api.winHeight
                              },reload:false,vScrollBarEnabled:true,
                                animation : {
                                          type : 'movein',
                                          subType : 'from_right',
                                          duration : 400
                                  }
                          })
                      }
                      if (ret.eventType == "click" && ret.index == 4 ) {
                          api.openFrame({
                              name: 'frame4'+userid,bounces:true,
                              url: './html/huiyuan_hz.html',
                              rect: {
                                x: 0,
                                y: 0,
                                  w: 'auto',
                                    h: api.winHeight
                              },reload:false,bounces:false,vScrollBarEnabled:true,
                                animation : {
                                          type : 'movein',
                                          subType : 'from_right',
                                          duration : 400
                                  }
                          });
                      }
                      var NVTabBar = api.require('NVTabBar');
                      NVTabBar.bringToFront();

    });
       callBackInitFirst();
        inBackground();screenLight();
      }
      callBackInitFirst=function(){
          NVTabBar.setSelect({
            index: 0,
            selected: true,

          });

          api.openFrame({
              name: 'frame0'+getStorage("userid"),
              url: './html/index.html',
              rect: {
                  x: 0,
                  y: 0,
                  w: 'auto',
                  h: api.winHeight
              },reload:false,bounces:false,vScrollBarEnabled:true,
                animation : {
                          type : 'movein',
                          subType : 'from_right',
                          duration : 400
                  }
          });
          NVTabBar.bringToFront();

      }
var num1=0;num2=0,num3=0,num4=0;
