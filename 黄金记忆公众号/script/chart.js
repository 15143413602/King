//���������
var isOpenWrite=false;
appPageTapCallback=function(){
  if(isOpenWrite){
    if(UIChatUnit!==null && typeof UIChatUnit!="undefined"){
      isOpenWrite=false;
      UIChatUnit.closeKeyboard();
      UIChatUnit.close();
    }
  }
}
var UIChatUnit = null;
var nowValueId=0;
//��ͨ�����
function commentChart(id,callback){
  UIChatUnit = api.require('UIChatBox');
  isOpenWrite=true;
  UIChatUnit.open({  chatBox: {
        placeholder: '��������',
        autoFocus: true,
        maxRows: 6
    }
    ,
    maxRows: 4,autoFocus: true, extrasBtnVisible:false,  emotionPath:'widget://res/image/emotion',
    texts: {
       sendBtn: {
           title: '���'                                                               //���Ͱ�ť�ı�
       }
     },
    placeholder: '��������'}, function(ret) {
      if (ret) {
        if(ret.eventType=="send"){
            if(typeof ret.msg!="undefined"&&ret.msg!=""){
              if($(id).length>0){
                $(id).val(ret.msg);
              }
              if(typeof callback !="undefined"){
                callback(ret.msg );
              }
              UIChatUnit.closeKeyboard();
              UIChatUnit.close();

            }

              //
        }
      }
    });
    UIChatUnit.popupKeyboard();
}
//��������Uid
var sendUid=0;
//�����б�
var showGiftList="";
function clickGifShow (num){layer.closeAll();
	returnChartMsg("",2,gifts[num]);
	
}
//�����
function showChartInput(openGiftFlag,openRecFlag,id,openToolFLag,uid){
  sendUid=uid;
  nowValueId=id;
  if(isAppType==1){
	  if(openGiftFlag){
		alertMsg(showGiftList,function(){
		    
	    },"ѡ������");  
	  }else{
	   alertMsg('<textarea id="myText" oninput="splitInputValue(this,200)" placeholder="��������������" style="width:100%;height:100px;padding:2px 4px;"></textarea>',function(){
		   if($("#myText").val()!=""){
				returnChartMsg($("#myText").val(),0,{})
		   }
	   },"��������");  
	  }
	  return;
  }
 
  var tool=[{
  icon: 'widget://res/liwu.png',
  title:'����'}];
  if(typeof openToolFLag!="undefined"&&openToolFLag==true){
    tool=[{
    icon: 'widget://res/pices.png',
    title:'���'},{
    icon: 'widget://res/paizhao.png',
    title:'����'},{
    icon: 'widget://res/video.png',
    title:'��Ƶ'},{
    icon: 'widget://res/liwu.png',
    title:'����'}
  ];
  }
  UIChatUnit = api.require('UIChatUnit');
  UIChatUnit.showRecordPanel();
  UIChatUnit.open({
    maxRows: 4,
    placeholder: '',
      chatBox: {
          placeholder: '��������',
          autoFocus: true,
          maxRows: 6
      }
      ,
      emotionPath:'widget://res/image/emotion',
      extrasBtnVisible:true,
      texts: {
         recordBtn: {                                                                    //������ť�ı�
             normalTitle: '��ס˵��',                                                     //�ɿ��ı�
             activeTitle: '�ɿ�����'                                                      //��ס�ı�
         },
         sendBtn: {
             title: '����'                                                               //���Ͱ�ť�ı�
         }
       },
      styles: {
        topDivider:{          //(��ѡ��)�����ָ�������
          width:3,          //(��ѡ��)�����ָ��ߵĴ�ϸ��Ĭ�ϣ�3
              color:'#000'      //(��ѡ��)�����ָ��ߵ���ɫ��Ĭ�ϣ���ɫ��֧��ͼƬ���ã�fs:// & widget://��
          },
          bgColor: '#FFF',   //����ѡ��ַ������ͣ�ģ�鱳��ɫ���ã�֧��rgb��rgba��#��Ĭ�ϣ�#D1D1D1
          margin: 10,           //����ѡ��������ͣ���������ұ߾ࣻĬ�ϣ�10
          topMargin:5,          //����ѡ��������ͣ��������붥���ı߾ࣻĬ�ϣ�5
          mask: {               //����ѡ�JOSN ���������������������ֲ����ã��������������ֲ�
             bgColor:'rgba(0,0,0,0.5)',//����ѡ��ַ������ͣ����ֲ㱳��ɫ���ã�֧��rgb��rgba��#��Ĭ�ϣ�rgba(0,0,0,0.5)
          },
          inputBorder:{                  //(��ѡ��)�����߿�����
               color:'#FFF5F5F5',        //(��ѡ��)�����߿���ɫ��Ĭ�ϣ�#FFF5F5F5
               width:1,                  //(��ѡ��)�����߿��ϸ��Ĭ�ϣ�1
               radius:3                  //(��ѡ��)�����߿�Բ�Ǵ�С��Ĭ�ϣ�3
          },indicator: {                                         //����͸��ӹ�������СԲ��ָʾ����ʽ������������ʾ��ָʾ��
             target: 'both',
             color: '#c4c4c4',
             activeColor: '#9e9e9e'
         },
          record:{              //(��ѡ��)¼��ҳ������
            btnSize: 120,       //(��ѡ��)¼����ť��С���ã�Ĭ�ϣ�120
            tipsColor:'#FFB0B0B0', //(��ѡ��)¼����ʾ������ɫ��Ĭ�ϣ�#FFB0B0B0
            tipsSize:20            //(��ѡ��)¼����ʾ���ִ�С��Ĭ�ϣ�20
          },
          faceBtn:{            //(��ѡ��)������Ҳ���鰴ť����
            btnSize:24,        //(��ѡ��)�������ͣ���ť��С��Ĭ�ϣ�24
            selectedImg:'widget://image/keyboard.png',//(��ѡ��)�ַ������ͣ��������򿪺�ťͼƬ����
            normalImg:'widget://image/face.png'       //(��ѡ��)�ַ������ͣ��������رպ�ͼƬ����
          },
          sendBtn:{            // ����ѡ����Ͱ�ť����
          w: 40,           // ����ѡ���ť�Ŀ�ȣ�Ĭ�ϣ�40
          h: 30,           // ����ѡ���ť�ĸ߶ȣ�Ĭ�ϣ�30
          corner:5,        // ����ѡ���ťԲ�Ǵ�С��Ĭ�ϣ�0
          titleSize:12,    // ����ѡ���ť����Ĵ�С��Ĭ�ϣ�12
          titleColor:'#000',  // ����ѡ���ť�������ɫ��Ĭ�ϣ�#000
          bg:'#f5f5f5'      // ����ѡ���ť������ɫ��Ĭ�ϣ�#f5f5f5
        },
          speechBtn: {
            normalImg: 'widget://res/shuohua.png'   //������ťͼƬ·��
        },
        recordBtn: {                                         //¼����ť��ʽ
            normalBg: '#c4c4c4',
            activeBg: '#999999',
            color: '#000',
            size: 14
        }
      },
      tools: tool
  }, function(ret) {
       if(ret.index==0){
         if(typeof openToolFLag!="undefined"&&openToolFLag==true){
           //ͼƬ���
           getPictureByAlbum(9,false,"image",function(data){
                   saveImg(data,null,null,function(pic){
                      returnChartMsg(pic,0,ret);
                      UIChatUnit.closeKeyboard();
                      UIChatUnit.close();
                   });
           });
         }else{
           //������
            showGifts(UIChatUnit);
            UIChatUnit.showGiftPanel();
         }

       }else if(ret.index==1){
         //����
          cameras(null,null,true,function(data){
            returnChartMsg(data,0,ret);
            UIChatUnit.closeKeyboard();
            UIChatUnit.close();
          });
       }else if(ret.index==2){
         recordVideo(function(data){
           //��ʼ����
           getVideoPic(data.path,function(value){
                saveVideo(data.path,null,null,function(video){
                    saveImg(value,null,null,function(pic){
                      //  ��Ƶ��ַ ����ƵͼƬ
                       returnChartMsg(video,0,pic);
                       UIChatUnit.closeKeyboard();
                       UIChatUnit.close();
                    });
                });

           });

        });
       }else if(ret.index==3){
         //������
          showGifts(UIChatUnit);
          UIChatUnit.showGiftPanel();
       }else if(ret.index==4){

       }

      if (ret) {

          if(ret.eventType=="show"){

          }
          if(ret.eventType == 'send'){                                           //���������Ƿ��Ͱ�ť
            // sendInformation(ret.msg);                                        //������Ϣ
          ///  UIChatMethod.UIChat_sendMessage(ret.msg);
                                 //������Ϣ
            returnChartMsg(ret.msg,0,ret);
            UIChatUnit.closeKeyboard();
            UIChatUnit.close();
         }
         if(ret.eventType == 'gift'){                                           //���������Ƿ��Ͱ�ť
           // sendInformation(ret.msg);                                        //������Ϣ
         ///  UIChatMethod.UIChat_sendMessage(ret.msg);
           //������Ϣ
           UIChatUnit.closeKeyboard();
           UIChatUnit.close();
        }
      }
  });
  //����¼�����
  if(openRecFlag)
    UIChatUnit.showRecordPanel();
  //¼������
  UIChatUnit.recordPanelListener(function(ret){
        //MLog(ret);
       if(ret.state=="press"){
         //��ʼ¼��
         openRecordMp3();
       }else  if(ret.state=="release"){
         //¼�����
         closeRecordMp3();
         UIChatUnit.closeKeyboard();
         UIChatUnit.close();
       }else if(ret.state=="cancel"){
         //¼������
          closeRecordMp3();
        // UIChatUnit.closeKeyboard();
      //   UIChatUnit.close();
       } else if(ret.state=="shortTime"){
         //¼������
          closeRecordMp3();
        // UIChatUnit.closeKeyboard();
      //   UIChatUnit.close();
       }

  });
  //������
  UIChatUnit.chatBoxListener({
        name:'move'
  }, function(ret){

     if(ret.chatBoxHeight<70&&ret.panelHeight==0){
    //   UIChatUnit.closeKeyboard();
    //   UIChatUnit.close();
     }
  });
  //���ݸı����
  UIChatUnit.chatBoxListener({
             name:'change'
  }, function(ret){
      // MLog(ret);
      //  MLog(ret);

  });
  UIChatUnit.chatBoxListener({
             name:'valueChanged'
  }, function(ret){
       //MLog(ret);
  });
  if(openGiftFlag){
    showGifts(UIChatUnit);
    UIChatUnit.showGiftPanel();
  }
  isOpenWrite=true;
}
//��������
function playRecord(src){
        api.startPlay({
            path: src
        }, function (ret, err) {
        });
    }
//¼������
var recMp3 = null;
var recordFlagRec=true;
function openRecordMp3(){
  if(recordFlagRec){
     api.startRecord({
        path: 'fs://a.amr'
    });
  }


}
//����¼��
function closeRecordMp3(){
if(!recordFlagRec){
  api.stopRecord(function(ret, err) {
    if (ret) {
        var path = ret.path;
        var duration = ret.duration;
        recordFlagRec=true;
      //  alert(ret.message+", ʱ����"+duration+",·����"+path);
        returnChartMsg(path,1,ret);
    }
  });
}
}
//������巵����Ϣ
function returnChartMsg(msgOrUrl,types,ret){
	
   var param={"tb_noform":"boyun_home_quan_pl"};
   param.uid=getStorage("userid");
   param.mobile=userInfo.username;
   param.stime=new Date().getTime();
   param.hid=nowValueId;
   param.puid=sendUid;
   if(types==0){
    //������Ϣ
      msgOrUrl=getEmotionsPaths(msgOrUrl);
      param.content=msgOrUrl;
   }else if(types==1){
    //������Ϣ ret.duration  ret.message
      param.voice=ret.message;
   }else if(types==2){
    //������Ϣ  
     param.content='<img src="'+ret.pic+'"><p>�������'+ret.title+'����'+ret.prize+'��</p>';
  }else if(types==3){
    //ͼƬ
      param.content='<img src="'+msgOrUrl+'">';
  }else if(types==4){
    //��Ƶ
      param.content='<img onclick="playVideos(\''+msgOrUrl+'\',\'���ſռ���Ƶ\')" src="'+ret+'">';
  }
   param.content = encodeURI(param.content);
  
  if(isAppType==1){
	  
	  alertMsg("��"+ret.title+"����Ҫ֧��"+ret.prize+"Ԫ,���й���?",function(){
		  pay(parseFloat(ret.prize),function(data){
			saveTables(param,function(data){
				chargeMoney(ret.prize);
			  alerts('�����ɹ�!');
			  addClickCount(nowValueId,'boyun_home_quan','gcount','nolimit','.gcount'+nowValueId);
			});
		  });
		});
  }else{
	  if(types==2){
		alertMsg("��"+ret.title+"����Ҫ֧��"+ret.prize+"Ԫ,���й���?",function(){
		  pay(parseFloat(ret.prize),function(data){
			saveTables(param,function(data){
			  alerts('�����ɹ�!');chargeMoney(ret.prize);
			  addClickCount(nowValueId,'boyun_home_quan','gcount','nolimit','.gcount'+nowValueId);
			});
		  });
		});

	  }else{
		  saveTables(param,function(data){
			  alerts('�����ɹ�!');
			  addClickCount(nowValueId,'boyun_home_quan','pcount','nolimit','.pcount'+nowValueId);
			});
	  }
  }
 
  
}
var gifts=[];
//������ʾ
function showGifts(UIChatUnit){
   if(UIChatUnit==null){
    UIChatUnit = api.require('UIChatUnit');
  }
  UIChatUnit.setGiftDatas({
      styles: {
          row: 2,
          column: 4,
          iconSize: 60,
          titleSize: 13,
          titleColor: '#333'
      },
      buttons:  gifts
  }, function(ret) {
     var obj = gifts[ret.index];
     returnChartMsg(obj.pic,2,obj);
     //{"pic":"/upload/users/images/2020-02-28/801582857405936.png","normal":"fs://801582857405936.png","highlight":"fs://801582857405936.png","giftName":"��Ʒ��","price":"2.00","title":"��Ʒ��","prize":"2.00"} at commen.js : 1111
     UIChatUnit.closeKeyboard();
     UIChatUnit.close();
  });
}

//�������
var emotions= [
                    {"src": "<img width='20' class='aui-inline' src='/by/image/emotion/Expression_1.png'>","text": "[΢Ц]"},
                    {"src": "<img width='20' class='aui-inline' src='/by/image/emotion/Expression_2.png'>","text": "[Ʋ��]"},
                    {"src": "<img width='20' class='aui-inline' src='/by/image/emotion/Expression_3.png'>","text": "[ɫ]"},
                    {"src": "<img width='20' class='aui-inline' src='/by/image/emotion/Expression_4.png'>","text": "[����]"},
                    {"src": "<img width='20' class='aui-inline' src='/by/image/emotion/Expression_5.png'>","text": "[����]"},
                    {"src": "<img width='20' class='aui-inline' src='/by/image/emotion/Expression_6.png'>","text": "[����]"},
                    {"src": "<img width='20' class='aui-inline' src='/by/image/emotion/Expression_7.png'>","text": "[����]"},
                    {"src": "<img width='20' class='aui-inline' src='/by/image/emotion/Expression_8.png'>","text": "[����]"},
                    {"src": "<img width='20' class='aui-inline' src='/by/image/emotion/Expression_9.png'>","text": "[˯]"},
                    {"src": "<img width='20' class='aui-inline' src='/by/image/emotion/Expression_10.png'>","text": "[���]"},
                    {"src": "<img width='20' class='aui-inline' src='/by/image/emotion/Expression_11.png'>","text": "[����]"},
                    {"src": "<img width='20' class='aui-inline' src='/by/image/emotion/Expression_12.png'>","text": "[��ŭ]"},
                    {"src": "<img width='20' class='aui-inline' src='/by/image/emotion/Expression_13.png'>","text": "[��Ƥ]"},
                    {"src": "<img width='20' class='aui-inline' src='/by/image/emotion/Expression_14.png'>","text": "[����]"},
                    {"src": "<img width='20' class='aui-inline' src='/by/image/emotion/Expression_15.png'>","text": "[����]"},
                    {"src": "<img width='20' class='aui-inline' src='/by/image/emotion/Expression_16.png'>","text": "[�ѹ�]"},
                    {"src": "<img width='20' class='aui-inline' src='/by/image/emotion/Expression_17.png'>","text": "[��]"},
                    {"src": "<img width='20' class='aui-inline' src='/by/image/emotion/Expression_18.png'>","text": "[�亹]"},
                    {"src": "<img width='20' class='aui-inline' src='/by/image/emotion/Expression_19.png'>","text": "[ץ��]"},
                    {"src": "<img width='20' class='aui-inline' src='/by/image/emotion/Expression_20.png'>","text": "[��]"},
                    {"src": "<img width='20' class='aui-inline' src='/by/image/emotion/Expression_21.png'>","text": "[͵Ц]"},
                    {"src": "<img width='20' class='aui-inline' src='/by/image/emotion/Expression_22.png'>","text": "[���]"},
                    {"src": "<img width='20' class='aui-inline' src='/by/image/emotion/Expression_23.png'>","text": "[����]"},
                    {"src": "<img width='20' class='aui-inline' src='/by/image/emotion/Expression_24.png'>","text": "[����]"},
                    {"src": "<img width='20' class='aui-inline' src='/by/image/emotion/Expression_25.png'>","text": "[����]"},
                    {"src": "<img width='20' class='aui-inline' src='/by/image/emotion/Expression_26.png'>","text": "[��]"},
                    {"src": "<img width='20' class='aui-inline' src='/by/image/emotion/Expression_27.png'>","text": "[�־�]"},
                    {"src": "<img width='20' class='aui-inline' src='/by/image/emotion/Expression_28.png'>","text": "[����]"},
                    {"src": "<img width='20' class='aui-inline' src='/by/image/emotion/Expression_29.png'>","text": "[��Ц]"},
                    {"src": "<img width='20' class='aui-inline' src='/by/image/emotion/Expression_30.png'>","text": "[����]"},
                    {"src": "<img width='20' class='aui-inline' src='/by/image/emotion/Expression_31.png'>","text": "[�ܶ�]"},
                    {"src": "<img width='20' class='aui-inline' src='/by/image/emotion/Expression_32.png'>","text": "[����]"},
                    {"src": "<img width='20' class='aui-inline' src='/by/image/emotion/Expression_33.png'>","text": "[����]"},
                    {"src": "<img width='20' class='aui-inline' src='/by/image/emotion/Expression_34.png'>","text": "[��]"},
                    {"src": "<img width='20' class='aui-inline' src='/by/image/emotion/Expression_35.png'>","text": "[��]"},
                    {"src": "<img width='20' class='aui-inline' src='/by/image/emotion/Expression_36.png'>","text": "[����]"},
                    {"src": "<img width='20' class='aui-inline' src='/by/image/emotion/Expression_37.png'>","text": "[˥]"},
                    {"src": "<img width='20' class='aui-inline' src='/by/image/emotion/Expression_38.png'>","text": "[����]"},
                    {"src": "<img width='20' class='aui-inline' src='/by/image/emotion/Expression_39.png'>","text": "[�ô�]"},
                    {"src": "<img width='20' class='aui-inline' src='/by/image/emotion/Expression_40.png'>","text": "[�ټ�]"},
                    {"src": "<img width='20' class='aui-inline' src='/by/image/emotion/Expression_41.png'>","text": "[����]"},
                    {"src": "<img width='20' class='aui-inline' src='/by/image/emotion/Expression_42.png'>","text": "[�ٱ�]"},
                    {"src": "<img width='20' class='aui-inline' src='/by/image/emotion/Expression_43.png'>","text": "[����]"},
                    {"src": "<img width='20' class='aui-inline' src='/by/image/emotion/Expression_44.png'>","text": "[�ܴ���]"},
                    {"src": "<img width='20' class='aui-inline' src='/by/image/emotion/Expression_45.png'>","text": "[��Ц]"},
                    {"src": "<img width='20' class='aui-inline' src='/by/image/emotion/Expression_46.png'>","text": "[��ߺ�]"},
                    {"src": "<img width='20' class='aui-inline' src='/by/image/emotion/Expression_47.png'>","text": "[�Һߺ�]"},
                    {"src": "<img width='20' class='aui-inline' src='/by/image/emotion/Expression_48.png'>","text": "[��Ƿ]"},
                    {"src": "<img width='20' class='aui-inline' src='/by/image/emotion/Expression_49.png'>","text": "[����]"},
                    {"src": "<img width='20' class='aui-inline' src='/by/image/emotion/Expression_50.png'>","text": "[ί��]"},
                    {"src": "<img width='20' class='aui-inline' src='/by/image/emotion/Expression_51.png'>","text": "[�����]"},
                    {"src": "<img width='20' class='aui-inline' src='/by/image/emotion/Expression_52.png'>","text": "[����]"},
                    {"src": "<img width='20' class='aui-inline' src='/by/image/emotion/Expression_53.png'>","text": "[����]"},
                    {"src": "<img width='20' class='aui-inline' src='/by/image/emotion/Expression_54.png'>","text": "[��]"},
                    {"src": "<img width='20' class='aui-inline' src='/by/image/emotion/Expression_55.png'>","text": "[����]"},
                    {"src": "<img width='20' class='aui-inline' src='/by/image/emotion/Expression_56.png'>","text": "[�˵�]"},
                    {"src": "<img width='20' class='aui-inline' src='/by/image/emotion/Expression_57.png'>","text": "[����]"},
                    {"src": "<img width='20' class='aui-inline' src='/by/image/emotion/Expression_58.png'>","text": "[ơ��]"},
                    {"src": "<img width='20' class='aui-inline' src='/by/image/emotion/Expression_59.png'>","text": "[����]"},
                    {"src": "<img width='20' class='aui-inline' src='/by/image/emotion/Expression_60.png'>","text": "[ƹ��]"},
                    {"src": "<img width='20' class='aui-inline' src='/by/image/emotion/Expression_61.png'>","text": "[����]"},
                    {"src": "<img width='20' class='aui-inline' src='/by/image/emotion/Expression_62.png'>","text": "[��]"},
                    {"src": "<img width='20' class='aui-inline' src='/by/image/emotion/Expression_63.png'>","text": "[��ͷ]"},
                    {"src": "<img width='20' class='aui-inline' src='/by/image/emotion/Expression_64.png'>","text": "[õ��]"},
                    {"src": "<img width='20' class='aui-inline' src='/by/image/emotion/Expression_65.png'>","text": "[��л]"},
                    {"src": "<img width='20' class='aui-inline' src='/by/image/emotion/Expression_66.png'>","text": "[�촽]"},
                    {"src": "<img width='20' class='aui-inline' src='/by/image/emotion/Expression_67.png'>","text": "[����]"},
                    {"src": "<img width='20' class='aui-inline' src='/by/image/emotion/Expression_68.png'>","text": "[����]"},
                    {"src": "<img width='20' class='aui-inline' src='/by/image/emotion/Expression_69.png'>","text": "[����]"},
                    {"src": "<img width='20' class='aui-inline' src='/by/image/emotion/Expression_70.png'>","text": "[����]"},
                    {"src": "<img width='20' class='aui-inline' src='/by/image/emotion/Expression_71.png'>","text": "[ը��]"},
                    {"src": "<img width='20' class='aui-inline' src='/by/image/emotion/Expression_72.png'>","text": "[��]"},
                    {"src": "<img width='20' class='aui-inline' src='/by/image/emotion/Expression_73.png'>","text": "[����]"},
                    {"src": "<img width='20' class='aui-inline' src='/by/image/emotion/Expression_74.png'>","text": "[ư��]"},
                    {"src": "<img width='20' class='aui-inline' src='/by/image/emotion/Expression_75.png'>","text": "[���]"},
                    {"src": "<img width='20' class='aui-inline' src='/by/image/emotion/Expression_76.png'>","text": "[����]"},
                    {"src": "<img width='20' class='aui-inline' src='/by/image/emotion/Expression_77.png'>","text": "[̫��]"},
                    {"src": "<img width='20' class='aui-inline' src='/by/image/emotion/Expression_78.png'>","text": "[����]"},
                    {"src": "<img width='20' class='aui-inline' src='/by/image/emotion/Expression_79.png'>","text": "[ӵ��]"},
                    {"src": "<img width='20' class='aui-inline' src='/by/image/emotion/Expression_80.png'>","text": "[ǿ]"},
                    {"src": "<img width='20' class='aui-inline' src='/by/image/emotion/Expression_81.png'>","text": "[��]"},
                    {"src": "<img width='20' class='aui-inline' src='/by/image/emotion/Expression_82.png'>","text": "[����]"},
                    {"src": "<img width='20' class='aui-inline' src='/by/image/emotion/Expression_83.png'>","text": "[ʤ��]"},
                    {"src": "<img width='20' class='aui-inline' src='/by/image/emotion/Expression_84.png'>","text": "[��ȭ]"},
                    {"src": "<img width='20' class='aui-inline' src='/by/image/emotion/Expression_85.png'>","text": "[����]"},
                    {"src": "<img width='20' class='aui-inline' src='/by/image/emotion/Expression_86.png'>","text": "[ȭͷ]"},
                    {"src": "<img width='20' class='aui-inline' src='/by/image/emotion/Expression_87.png'>","text": "[�]"},
                    {"src": "<img width='20' class='aui-inline' src='/by/image/emotion/Expression_88.png'>","text": "[����]"},
                    {"src": "<img width='20' class='aui-inline' src='/by/image/emotion/Expression_89.png'>","text": "[NO]"},
                    {"src": "<img width='20' class='aui-inline' src='/by/image/emotion/Expression_90.png'>","text": "[OK]"},
                    {"src": "<img width='20' class='aui-inline' src='/by/image/emotion/Expression_91.png'>","text": "[����]"},
                    {"src": "<img width='20' class='aui-inline' src='/by/image/emotion/Expression_92.png'>","text": "[����]"},
                    {"src": "<img width='20' class='aui-inline' src='/by/image/emotion/Expression_93.png'>","text": "[����]"},
                    {"src": "<img width='20' class='aui-inline' src='/by/image/emotion/Expression_94.png'>","text": "[����]"},
                    {"src": "<img width='20' class='aui-inline' src='/by/image/emotion/Expression_95.png'>","text": "[���]"},
                    {"src": "<img width='20' class='aui-inline' src='/by/image/emotion/Expression_96.png'>","text": "[תȦ]"},
                    {"src": "<img width='20' class='aui-inline' src='/by/image/emotion/Expression_97.png'>","text": "[��ͷ]"},
                    {"src": "<img width='20' class='aui-inline' src='/by/image/emotion/Expression_98.png'>","text": "[��ͷ]"},
                    {"src": "<img width='20' class='aui-inline' src='/by/image/emotion/Expression_99.png'>","text": "[����]"},
                    {"src": "<img width='20' class='aui-inline' src='/by/image/emotion/Expression_100.png'>","text": "[Ͷ��]"},
                    {"src": "<img width='20' class='aui-inline' src='/by/image/emotion/Expression_101.png'>","text": "[����]"},
                    {"src": "<img width='20' class='aui-inline' src='/by/image/emotion/Expression_102.png'>","text": "[����]"},
                    {"src": "<img width='20' class='aui-inline' src='/by/image/emotion/Expression_103.png'>","text": "[����]"},
                    {"src": "<img width='20' class='aui-inline' src='/by/image/emotion/Expression_104.png'>","text": "[��̫��]"},
                    {"src": "<img width='20' class='aui-inline' src='/by/image/emotion/Expression_105.png'>","text": "[��̫��]"}
        ]
function getEmotionsPaths(contents) {
        var pattern1 = /\[[\u4e00-\u9fa5]+\]/g;
        var pattern2 = /\[[\u4e00-\u9fa5]+\]/;
        var content = contents.match(pattern1);
        var str = contents;
        if (content == null)
                return str;
        for ( i = 0; i < content.length; i++) {
                var src = "";
                for ( j = 0; j < emotions.length; j++) {
                        if (emotions[j].text == content) {
                                src = emotions[j].src;
                                break;
                        }
                }
                str = str.replace(pattern2, src);
        }
        return str;
}
