//聊天输入框
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
//普通输入框
function commentChart(id,callback){
  UIChatUnit = api.require('UIChatBox');
  isOpenWrite=true;
  UIChatUnit.open({  chatBox: {
        placeholder: '输入内容',
        autoFocus: true,
        maxRows: 6
    }
    ,
    maxRows: 4,autoFocus: true, extrasBtnVisible:false,  emotionPath:'widget://res/image/emotion',
    texts: {
       sendBtn: {
           title: '完成'                                                               //发送按钮文本
       }
     },
    placeholder: '输入描述'}, function(ret) {
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
//被评论人Uid
var sendUid=0;
//礼物列表
var showGiftList="";
function clickGifShow (num){layer.closeAll();
	returnChartMsg("",2,gifts[num]);
	
}
//输入框
function showChartInput(openGiftFlag,openRecFlag,id,openToolFLag,uid){
  sendUid=uid;
  nowValueId=id;
  if(isAppType==1){
	  if(openGiftFlag){
		alertMsg(showGiftList,function(){
		    
	    },"选择礼物");  
	  }else{
	   alertMsg('<textarea id="myText" oninput="splitInputValue(this,200)" placeholder="请输入评论内容" style="width:100%;height:100px;padding:2px 4px;"></textarea>',function(){
		   if($("#myText").val()!=""){
				returnChartMsg($("#myText").val(),0,{})
		   }
	   },"发布评论");  
	  }
	  return;
  }
 
  var tool=[{
  icon: 'widget://res/liwu.png',
  title:'礼物'}];
  if(typeof openToolFLag!="undefined"&&openToolFLag==true){
    tool=[{
    icon: 'widget://res/pices.png',
    title:'相册'},{
    icon: 'widget://res/paizhao.png',
    title:'拍照'},{
    icon: 'widget://res/video.png',
    title:'视频'},{
    icon: 'widget://res/liwu.png',
    title:'礼物'}
  ];
  }
  UIChatUnit = api.require('UIChatUnit');
  UIChatUnit.showRecordPanel();
  UIChatUnit.open({
    maxRows: 4,
    placeholder: '',
      chatBox: {
          placeholder: '输入内容',
          autoFocus: true,
          maxRows: 6
      }
      ,
      emotionPath:'widget://res/image/emotion',
      extrasBtnVisible:true,
      texts: {
         recordBtn: {                                                                    //语音按钮文本
             normalTitle: '按住说话',                                                     //松开文本
             activeTitle: '松开结束'                                                      //按住文本
         },
         sendBtn: {
             title: '发送'                                                               //发送按钮文本
         }
       },
      styles: {
        topDivider:{          //(可选项)顶部分割线配置
          width:3,          //(可选项)顶部分割线的粗细，默认：3
              color:'#000'      //(可选项)顶部分割线的颜色；默认：黑色，支持图片设置（fs:// & widget://）
          },
          bgColor: '#FFF',   //（可选项）字符串类型；模块背景色配置，支持rgb、rgba、#；默认：#D1D1D1
          margin: 10,           //（可选项）数字类型；输入框左右边距；默认：10
          topMargin:5,          //（可选项）数字类型；输入框距离顶部的边距；默认：5
          mask: {               //（可选项）JOSN 对象；聊天框以外区域的遮罩层配置，若不传则无遮罩层
             bgColor:'rgba(0,0,0,0.5)',//（可选项）字符串类型；遮罩层背景色配置，支持rgb、rgba、#；默认：rgba(0,0,0,0.5)
          },
          inputBorder:{                  //(可选项)输入框边框设置
               color:'#FFF5F5F5',        //(可选项)输入框边框颜色；默认：#FFF5F5F5
               width:1,                  //(可选项)输入框边框粗细；默认：1
               radius:3                  //(可选项)输入框边框圆角大小；默认：3
          },indicator: {                                         //表情和附加功能面板的小圆点指示器样式，若不传则不显示该指示器
             target: 'both',
             color: '#c4c4c4',
             activeColor: '#9e9e9e'
         },
          record:{              //(可选项)录音页面设置
            btnSize: 120,       //(可选项)录音按钮大小设置；默认：120
            tipsColor:'#FFB0B0B0', //(可选项)录音提示文字颜色；默认：#FFB0B0B0
            tipsSize:20            //(可选项)录音提示文字大小：默认：20
          },
          faceBtn:{            //(可选项)输入框右侧表情按钮配置
            btnSize:24,        //(可选项)数字类型；按钮大小，默认：24
            selectedImg:'widget://image/keyboard.png',//(可选项)字符串类型；表情面板打开后按钮图片设置
            normalImg:'widget://image/face.png'       //(可选项)字符串类型；表情面板关闭后图片设置
          },
          sendBtn:{            // （可选项）发送按钮设置
          w: 40,           // （可选项）按钮的宽度，默认：40
          h: 30,           // （可选项）按钮的高度，默认：30
          corner:5,        // （可选项）按钮圆角大小，默认：0
          titleSize:12,    // （可选项）按钮标题的大小，默认：12
          titleColor:'#000',  // （可选项）按钮标题的颜色，默认：#000
          bg:'#f5f5f5'      // （可选项）按钮背景颜色，默认：#f5f5f5
        },
          speechBtn: {
            normalImg: 'widget://res/shuohua.png'   //语音按钮图片路径
        },
        recordBtn: {                                         //录音按钮样式
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
           //图片相册
           getPictureByAlbum(9,false,"image",function(data){
                   saveImg(data,null,null,function(pic){
                      returnChartMsg(pic,0,ret);
                      UIChatUnit.closeKeyboard();
                      UIChatUnit.close();
                   });
           });
         }else{
           //打开礼物
            showGifts(UIChatUnit);
            UIChatUnit.showGiftPanel();
         }

       }else if(ret.index==1){
         //拍照
          cameras(null,null,true,function(data){
            returnChartMsg(data,0,ret);
            UIChatUnit.closeKeyboard();
            UIChatUnit.close();
          });
       }else if(ret.index==2){
         recordVideo(function(data){
           //开始截屏
           getVideoPic(data.path,function(value){
                saveVideo(data.path,null,null,function(video){
                    saveImg(value,null,null,function(pic){
                      //  视频地址 和视频图片
                       returnChartMsg(video,0,pic);
                       UIChatUnit.closeKeyboard();
                       UIChatUnit.close();
                    });
                });

           });

        });
       }else if(ret.index==3){
         //打开礼物
          showGifts(UIChatUnit);
          UIChatUnit.showGiftPanel();
       }else if(ret.index==4){

       }

      if (ret) {

          if(ret.eventType=="show"){

          }
          if(ret.eventType == 'send'){                                           //如果点击的是发送按钮
            // sendInformation(ret.msg);                                        //发送消息
          ///  UIChatMethod.UIChat_sendMessage(ret.msg);
                                 //发送消息
            returnChartMsg(ret.msg,0,ret);
            UIChatUnit.closeKeyboard();
            UIChatUnit.close();
         }
         if(ret.eventType == 'gift'){                                           //如果点击的是发送按钮
           // sendInformation(ret.msg);                                        //发送消息
         ///  UIChatMethod.UIChat_sendMessage(ret.msg);
           //发送消息
           UIChatUnit.closeKeyboard();
           UIChatUnit.close();
        }
      }
  });
  //开启录音面板
  if(openRecFlag)
    UIChatUnit.showRecordPanel();
  //录音监听
  UIChatUnit.recordPanelListener(function(ret){
        //MLog(ret);
       if(ret.state=="press"){
         //开始录音
         openRecordMp3();
       }else  if(ret.state=="release"){
         //录音完成
         closeRecordMp3();
         UIChatUnit.closeKeyboard();
         UIChatUnit.close();
       }else if(ret.state=="cancel"){
         //录音结束
          closeRecordMp3();
        // UIChatUnit.closeKeyboard();
      //   UIChatUnit.close();
       } else if(ret.state=="shortTime"){
         //录音结束
          closeRecordMp3();
        // UIChatUnit.closeKeyboard();
      //   UIChatUnit.close();
       }

  });
  //面板监听
  UIChatUnit.chatBoxListener({
        name:'move'
  }, function(ret){

     if(ret.chatBoxHeight<70&&ret.panelHeight==0){
    //   UIChatUnit.closeKeyboard();
    //   UIChatUnit.close();
     }
  });
  //内容改变监听
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
//播放声音
function playRecord(src){
        api.startPlay({
            path: src
        }, function (ret, err) {
        });
    }
//录音功能
var recMp3 = null;
var recordFlagRec=true;
function openRecordMp3(){
  if(recordFlagRec){
     api.startRecord({
        path: 'fs://a.amr'
    });
  }


}
//结束录音
function closeRecordMp3(){
if(!recordFlagRec){
  api.stopRecord(function(ret, err) {
    if (ret) {
        var path = ret.path;
        var duration = ret.duration;
        recordFlagRec=true;
      //  alert(ret.message+", 时长："+duration+",路径："+path);
        returnChartMsg(path,1,ret);
    }
  });
}
}
//控制面板返回信息
function returnChartMsg(msgOrUrl,types,ret){
	
   var param={"tb_noform":"boyun_home_quan_pl"};
   param.uid=getStorage("userid");
   param.mobile=userInfo.username;
   param.stime=new Date().getTime();
   param.hid=nowValueId;
   param.puid=sendUid;
   if(types==0){
    //内容消息
      msgOrUrl=getEmotionsPaths(msgOrUrl);
      param.content=msgOrUrl;
   }else if(types==1){
    //语音消息 ret.duration  ret.message
      param.voice=ret.message;
   }else if(types==2){
    //礼物消息  
     param.content='<img src="'+ret.pic+'"><p>赠送礼物：'+ret.title+'【￥'+ret.prize+'】</p>';
  }else if(types==3){
    //图片
      param.content='<img src="'+msgOrUrl+'">';
  }else if(types==4){
    //视频
      param.content='<img onclick="playVideos(\''+msgOrUrl+'\',\'播放空间视频\')" src="'+ret+'">';
  }
   param.content = encodeURI(param.content);
  
  if(isAppType==1){
	  
	  alertMsg("”"+ret.title+"“需要支付"+ret.prize+"元,进行购买?",function(){
		  pay(parseFloat(ret.prize),function(data){
			saveTables(param,function(data){
				chargeMoney(ret.prize);
			  alerts('发布成功!');
			  addClickCount(nowValueId,'boyun_home_quan','gcount','nolimit','.gcount'+nowValueId);
			});
		  });
		});
  }else{
	  if(types==2){
		alertMsg("”"+ret.title+"“需要支付"+ret.prize+"元,进行购买?",function(){
		  pay(parseFloat(ret.prize),function(data){
			saveTables(param,function(data){
			  alerts('发布成功!');chargeMoney(ret.prize);
			  addClickCount(nowValueId,'boyun_home_quan','gcount','nolimit','.gcount'+nowValueId);
			});
		  });
		});

	  }else{
		  saveTables(param,function(data){
			  alerts('发布成功!');
			  addClickCount(nowValueId,'boyun_home_quan','pcount','nolimit','.pcount'+nowValueId);
			});
	  }
  }
 
  
}
var gifts=[];
//礼物显示
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
     //{"pic":"/upload/users/images/2020-02-28/801582857405936.png","normal":"fs://801582857405936.png","highlight":"fs://801582857405936.png","giftName":"礼品盒","price":"2.00","title":"礼品盒","prize":"2.00"} at commen.js : 1111
     UIChatUnit.closeKeyboard();
     UIChatUnit.close();
  });
}

//表情过滤
var emotions= [
                    {"src": "<img width='20' class='aui-inline' src='/by/image/emotion/Expression_1.png'>","text": "[微笑]"},
                    {"src": "<img width='20' class='aui-inline' src='/by/image/emotion/Expression_2.png'>","text": "[撇嘴]"},
                    {"src": "<img width='20' class='aui-inline' src='/by/image/emotion/Expression_3.png'>","text": "[色]"},
                    {"src": "<img width='20' class='aui-inline' src='/by/image/emotion/Expression_4.png'>","text": "[发呆]"},
                    {"src": "<img width='20' class='aui-inline' src='/by/image/emotion/Expression_5.png'>","text": "[得意]"},
                    {"src": "<img width='20' class='aui-inline' src='/by/image/emotion/Expression_6.png'>","text": "[流泪]"},
                    {"src": "<img width='20' class='aui-inline' src='/by/image/emotion/Expression_7.png'>","text": "[害羞]"},
                    {"src": "<img width='20' class='aui-inline' src='/by/image/emotion/Expression_8.png'>","text": "[闭嘴]"},
                    {"src": "<img width='20' class='aui-inline' src='/by/image/emotion/Expression_9.png'>","text": "[睡]"},
                    {"src": "<img width='20' class='aui-inline' src='/by/image/emotion/Expression_10.png'>","text": "[大哭]"},
                    {"src": "<img width='20' class='aui-inline' src='/by/image/emotion/Expression_11.png'>","text": "[尴尬]"},
                    {"src": "<img width='20' class='aui-inline' src='/by/image/emotion/Expression_12.png'>","text": "[发怒]"},
                    {"src": "<img width='20' class='aui-inline' src='/by/image/emotion/Expression_13.png'>","text": "[调皮]"},
                    {"src": "<img width='20' class='aui-inline' src='/by/image/emotion/Expression_14.png'>","text": "[呲牙]"},
                    {"src": "<img width='20' class='aui-inline' src='/by/image/emotion/Expression_15.png'>","text": "[惊讶]"},
                    {"src": "<img width='20' class='aui-inline' src='/by/image/emotion/Expression_16.png'>","text": "[难过]"},
                    {"src": "<img width='20' class='aui-inline' src='/by/image/emotion/Expression_17.png'>","text": "[酷]"},
                    {"src": "<img width='20' class='aui-inline' src='/by/image/emotion/Expression_18.png'>","text": "[冷汗]"},
                    {"src": "<img width='20' class='aui-inline' src='/by/image/emotion/Expression_19.png'>","text": "[抓狂]"},
                    {"src": "<img width='20' class='aui-inline' src='/by/image/emotion/Expression_20.png'>","text": "[吐]"},
                    {"src": "<img width='20' class='aui-inline' src='/by/image/emotion/Expression_21.png'>","text": "[偷笑]"},
                    {"src": "<img width='20' class='aui-inline' src='/by/image/emotion/Expression_22.png'>","text": "[愉快]"},
                    {"src": "<img width='20' class='aui-inline' src='/by/image/emotion/Expression_23.png'>","text": "[白眼]"},
                    {"src": "<img width='20' class='aui-inline' src='/by/image/emotion/Expression_24.png'>","text": "[傲慢]"},
                    {"src": "<img width='20' class='aui-inline' src='/by/image/emotion/Expression_25.png'>","text": "[饥饿]"},
                    {"src": "<img width='20' class='aui-inline' src='/by/image/emotion/Expression_26.png'>","text": "[困]"},
                    {"src": "<img width='20' class='aui-inline' src='/by/image/emotion/Expression_27.png'>","text": "[恐惧]"},
                    {"src": "<img width='20' class='aui-inline' src='/by/image/emotion/Expression_28.png'>","text": "[流汗]"},
                    {"src": "<img width='20' class='aui-inline' src='/by/image/emotion/Expression_29.png'>","text": "[憨笑]"},
                    {"src": "<img width='20' class='aui-inline' src='/by/image/emotion/Expression_30.png'>","text": "[悠闲]"},
                    {"src": "<img width='20' class='aui-inline' src='/by/image/emotion/Expression_31.png'>","text": "[奋斗]"},
                    {"src": "<img width='20' class='aui-inline' src='/by/image/emotion/Expression_32.png'>","text": "[咒骂]"},
                    {"src": "<img width='20' class='aui-inline' src='/by/image/emotion/Expression_33.png'>","text": "[疑问]"},
                    {"src": "<img width='20' class='aui-inline' src='/by/image/emotion/Expression_34.png'>","text": "[嘘]"},
                    {"src": "<img width='20' class='aui-inline' src='/by/image/emotion/Expression_35.png'>","text": "[晕]"},
                    {"src": "<img width='20' class='aui-inline' src='/by/image/emotion/Expression_36.png'>","text": "[疯了]"},
                    {"src": "<img width='20' class='aui-inline' src='/by/image/emotion/Expression_37.png'>","text": "[衰]"},
                    {"src": "<img width='20' class='aui-inline' src='/by/image/emotion/Expression_38.png'>","text": "[骷髅]"},
                    {"src": "<img width='20' class='aui-inline' src='/by/image/emotion/Expression_39.png'>","text": "[敲打]"},
                    {"src": "<img width='20' class='aui-inline' src='/by/image/emotion/Expression_40.png'>","text": "[再见]"},
                    {"src": "<img width='20' class='aui-inline' src='/by/image/emotion/Expression_41.png'>","text": "[擦汗]"},
                    {"src": "<img width='20' class='aui-inline' src='/by/image/emotion/Expression_42.png'>","text": "[抠鼻]"},
                    {"src": "<img width='20' class='aui-inline' src='/by/image/emotion/Expression_43.png'>","text": "[鼓掌]"},
                    {"src": "<img width='20' class='aui-inline' src='/by/image/emotion/Expression_44.png'>","text": "[糗大了]"},
                    {"src": "<img width='20' class='aui-inline' src='/by/image/emotion/Expression_45.png'>","text": "[坏笑]"},
                    {"src": "<img width='20' class='aui-inline' src='/by/image/emotion/Expression_46.png'>","text": "[左哼哼]"},
                    {"src": "<img width='20' class='aui-inline' src='/by/image/emotion/Expression_47.png'>","text": "[右哼哼]"},
                    {"src": "<img width='20' class='aui-inline' src='/by/image/emotion/Expression_48.png'>","text": "[哈欠]"},
                    {"src": "<img width='20' class='aui-inline' src='/by/image/emotion/Expression_49.png'>","text": "[鄙视]"},
                    {"src": "<img width='20' class='aui-inline' src='/by/image/emotion/Expression_50.png'>","text": "[委屈]"},
                    {"src": "<img width='20' class='aui-inline' src='/by/image/emotion/Expression_51.png'>","text": "[快哭了]"},
                    {"src": "<img width='20' class='aui-inline' src='/by/image/emotion/Expression_52.png'>","text": "[阴险]"},
                    {"src": "<img width='20' class='aui-inline' src='/by/image/emotion/Expression_53.png'>","text": "[亲亲]"},
                    {"src": "<img width='20' class='aui-inline' src='/by/image/emotion/Expression_54.png'>","text": "[吓]"},
                    {"src": "<img width='20' class='aui-inline' src='/by/image/emotion/Expression_55.png'>","text": "[可怜]"},
                    {"src": "<img width='20' class='aui-inline' src='/by/image/emotion/Expression_56.png'>","text": "[菜刀]"},
                    {"src": "<img width='20' class='aui-inline' src='/by/image/emotion/Expression_57.png'>","text": "[西瓜]"},
                    {"src": "<img width='20' class='aui-inline' src='/by/image/emotion/Expression_58.png'>","text": "[啤酒]"},
                    {"src": "<img width='20' class='aui-inline' src='/by/image/emotion/Expression_59.png'>","text": "[篮球]"},
                    {"src": "<img width='20' class='aui-inline' src='/by/image/emotion/Expression_60.png'>","text": "[乒乓]"},
                    {"src": "<img width='20' class='aui-inline' src='/by/image/emotion/Expression_61.png'>","text": "[咖啡]"},
                    {"src": "<img width='20' class='aui-inline' src='/by/image/emotion/Expression_62.png'>","text": "[饭]"},
                    {"src": "<img width='20' class='aui-inline' src='/by/image/emotion/Expression_63.png'>","text": "[猪头]"},
                    {"src": "<img width='20' class='aui-inline' src='/by/image/emotion/Expression_64.png'>","text": "[玫瑰]"},
                    {"src": "<img width='20' class='aui-inline' src='/by/image/emotion/Expression_65.png'>","text": "[凋谢]"},
                    {"src": "<img width='20' class='aui-inline' src='/by/image/emotion/Expression_66.png'>","text": "[嘴唇]"},
                    {"src": "<img width='20' class='aui-inline' src='/by/image/emotion/Expression_67.png'>","text": "[爱心]"},
                    {"src": "<img width='20' class='aui-inline' src='/by/image/emotion/Expression_68.png'>","text": "[心碎]"},
                    {"src": "<img width='20' class='aui-inline' src='/by/image/emotion/Expression_69.png'>","text": "[蛋糕]"},
                    {"src": "<img width='20' class='aui-inline' src='/by/image/emotion/Expression_70.png'>","text": "[闪电]"},
                    {"src": "<img width='20' class='aui-inline' src='/by/image/emotion/Expression_71.png'>","text": "[炸弹]"},
                    {"src": "<img width='20' class='aui-inline' src='/by/image/emotion/Expression_72.png'>","text": "[刀]"},
                    {"src": "<img width='20' class='aui-inline' src='/by/image/emotion/Expression_73.png'>","text": "[足球]"},
                    {"src": "<img width='20' class='aui-inline' src='/by/image/emotion/Expression_74.png'>","text": "[瓢虫]"},
                    {"src": "<img width='20' class='aui-inline' src='/by/image/emotion/Expression_75.png'>","text": "[便便]"},
                    {"src": "<img width='20' class='aui-inline' src='/by/image/emotion/Expression_76.png'>","text": "[月亮]"},
                    {"src": "<img width='20' class='aui-inline' src='/by/image/emotion/Expression_77.png'>","text": "[太阳]"},
                    {"src": "<img width='20' class='aui-inline' src='/by/image/emotion/Expression_78.png'>","text": "[礼物]"},
                    {"src": "<img width='20' class='aui-inline' src='/by/image/emotion/Expression_79.png'>","text": "[拥抱]"},
                    {"src": "<img width='20' class='aui-inline' src='/by/image/emotion/Expression_80.png'>","text": "[强]"},
                    {"src": "<img width='20' class='aui-inline' src='/by/image/emotion/Expression_81.png'>","text": "[弱]"},
                    {"src": "<img width='20' class='aui-inline' src='/by/image/emotion/Expression_82.png'>","text": "[握手]"},
                    {"src": "<img width='20' class='aui-inline' src='/by/image/emotion/Expression_83.png'>","text": "[胜利]"},
                    {"src": "<img width='20' class='aui-inline' src='/by/image/emotion/Expression_84.png'>","text": "[抱拳]"},
                    {"src": "<img width='20' class='aui-inline' src='/by/image/emotion/Expression_85.png'>","text": "[勾引]"},
                    {"src": "<img width='20' class='aui-inline' src='/by/image/emotion/Expression_86.png'>","text": "[拳头]"},
                    {"src": "<img width='20' class='aui-inline' src='/by/image/emotion/Expression_87.png'>","text": "[差劲]"},
                    {"src": "<img width='20' class='aui-inline' src='/by/image/emotion/Expression_88.png'>","text": "[爱你]"},
                    {"src": "<img width='20' class='aui-inline' src='/by/image/emotion/Expression_89.png'>","text": "[NO]"},
                    {"src": "<img width='20' class='aui-inline' src='/by/image/emotion/Expression_90.png'>","text": "[OK]"},
                    {"src": "<img width='20' class='aui-inline' src='/by/image/emotion/Expression_91.png'>","text": "[爱情]"},
                    {"src": "<img width='20' class='aui-inline' src='/by/image/emotion/Expression_92.png'>","text": "[飞吻]"},
                    {"src": "<img width='20' class='aui-inline' src='/by/image/emotion/Expression_93.png'>","text": "[跳跳]"},
                    {"src": "<img width='20' class='aui-inline' src='/by/image/emotion/Expression_94.png'>","text": "[发抖]"},
                    {"src": "<img width='20' class='aui-inline' src='/by/image/emotion/Expression_95.png'>","text": "[怄火]"},
                    {"src": "<img width='20' class='aui-inline' src='/by/image/emotion/Expression_96.png'>","text": "[转圈]"},
                    {"src": "<img width='20' class='aui-inline' src='/by/image/emotion/Expression_97.png'>","text": "[磕头]"},
                    {"src": "<img width='20' class='aui-inline' src='/by/image/emotion/Expression_98.png'>","text": "[回头]"},
                    {"src": "<img width='20' class='aui-inline' src='/by/image/emotion/Expression_99.png'>","text": "[跳绳]"},
                    {"src": "<img width='20' class='aui-inline' src='/by/image/emotion/Expression_100.png'>","text": "[投降]"},
                    {"src": "<img width='20' class='aui-inline' src='/by/image/emotion/Expression_101.png'>","text": "[激动]"},
                    {"src": "<img width='20' class='aui-inline' src='/by/image/emotion/Expression_102.png'>","text": "[街舞]"},
                    {"src": "<img width='20' class='aui-inline' src='/by/image/emotion/Expression_103.png'>","text": "[献吻]"},
                    {"src": "<img width='20' class='aui-inline' src='/by/image/emotion/Expression_104.png'>","text": "[左太极]"},
                    {"src": "<img width='20' class='aui-inline' src='/by/image/emotion/Expression_105.png'>","text": "[右太极]"}
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
