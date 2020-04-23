//移动空间 方法 通用div
///设置元素基础高宽
var divComWidth=120,divComHeight=30;
var nowDivLeft=0;nowDivTop=0;
function moveDivs(obj) {
	$("body").append('<div id="'+dragDivId+'" style="display:none;position:fixed; width:60px; height:60px; background:url(../image/yidong.png) no-repeat; background-size:100% 100%; right:10px; top:150px; z-index:5; border:1px solid #dcdcdc;"></div>');
	obj.each(function(){
		
		var objs = $(this); 
		var _id=objs.attr("id");
		if(typeof _id !="undefined"){
		var _block = document.getElementById(_id);
		
		var _init_left, _init_top, _div_top, _div_left, _box_width, _box_heiht;
		var _win_height = $(window).height();
		var _win_width = $(window).width();
		//加载图片特效*/
		$(_block).unbind();
		_block.addEventListener('click', function( ) {
			var e = event || window.event;
 			_init_left = parseInt(e. clientX);
			_init_top = parseInt(e. clientY);
 			if(typeof callTouchBack=="function"){
			   callTouchBack($(_block),_init_left,_init_top);
			}
		});
		_block.addEventListener('touchstart', function(e) {
			var img = objs.attr("src");
			if(typeof img!="undefined")
				$("#"+dragDivId).css({"background":"url('"+img+"')","background-size":"100% 100%"});
		
			_init_left = parseInt(e.touches[0].clientX);
			_init_top = parseInt(e.touches[0].clientY);
 			//$("#"+_id).css({"position":"fixed"});
			_div_top = $("#" + _id).offset().top - $(window).scrollTop();
			_div_left = $("#" + _id).offset().left;
			_box_width = $("#" + _id).width();
			_box_heiht = $("#" + _id).height();
			
			time_touch = setTimeout(function(){
				if(typeof callTouchBack=="function"){
					callTouchBack($(_block),_init_left,_init_top);
				}
			}, 2000);//这里设置长按响应时间
		}); 
		_block.addEventListener('touchmove', function(e) {
			e.preventDefault();$('#'+dragDivId).show();
			var _left = parseInt(e.touches[0].clientX);
			var _top = parseInt(e.touches[0].clientY);

			var _need_left = _div_left + (_left - _init_left);
			var _need_top = _div_top + (_top - _init_top);

			//检测_block是否还存在可视区域
			var _max_left = _win_width - _box_width;
			var _max_top = _win_height - _box_heiht;

			if (_need_left < 0) _need_left = 0;
			if (_need_left > _max_left) _need_left = _max_left;
			if (_need_top < 0) _need_top = 0;
			if (_need_top > _max_top) _need_top = _max_top;
 
			$('#'+dragDivId).css({
				'top': _need_top + 'px',
				'left': _need_left + 'px',
			}); 
			clearTimeout(time_touch);
			 nowDivLeft=_left;nowDivTop=_top; 
 		});

		_block.addEventListener('touchend', function(e) {
  			//检测元素是否符合标注
			obj.each(function(){
				var left =$(this).offset().left,top=$(this).offset().top;
 				if((nowDivLeft>left&&nowDivLeft<left+divComWidth)&&(nowDivTop>top&&nowDivTop<top+divComHeight)){
					
					//回调 拖动陈工
					if(typeof dragCallBack=="function"){
						dragCallBack($(_block),$(this));
						 
					}
				}
			});
			if(typeof callTouchEndBack=="function"){
				 callTouchEndBack();
			 }
			clearTimeout(time_touch);
			$("#"+_id).css({"position":"relative","top":"3px","left":"1px"});
			$('#'+dragDivId).hide();
		});
 		
		}
	});
}
//初始化系统导航
function initSysFooter(){
	var json=[{"url":"html/index.html","ico":"aui-icon-home","name":"首页"},
	{"url":"msg.html","ico":" aui-icon-note","name":"消息"},
	{"url":"quan.html?type=public","ico":"aui-icon-wechat-circle","name":"公众分享"},
	//{"url":"html/list.html","ico":"aui-icon-menu","name":"列表"},
	{"url":"html/huiyuan_hz.html","ico":"aui-icon-my","name":"会员"}
	];
	addFooters(json);
}
//添加底部导航
function addFooters(json){
	var string=' <footer class="aui-bar aui-bar-tab"  style="z-index:100001;border-top:1px solid #CCC" id="footer">';
	var i=1;
	//选中
	var selected=1;
	var loca = location.href+"";
	var isShowFoot=false;
	$.each(json,function(k,v){
		if(loca.indexOf(v.url)!=-1){
			isShowFoot=true;
			string+='<div id="tabbar'+i+'" class="aui-bar-tab-item  aui-active"' +'tapmode onclick="openwin(\''+rootDIr+v.url+'\')">'
				+ '   <i class="aui-iconfont footer'+i+' '+v.ico+'" style="background:url('+v.sebg+')"></i>'
				+ '   <div class="aui-bar-tab-label" style="color:'+v.sefont+'">'+v.name+'</div>'
			  + ' </div>';
		}else{
			string+='<div id="tabbar'+i+'" class="aui-bar-tab-item  "' +'tapmode onclick="openwin(\''+rootDIr+v.url+'\')">'
				+ '   <i class="aui-iconfont  footer'+i+' '+v.ico+'" style="background:url('+v.bg+');"></i>'
				+ '   <div class="aui-bar-tab-label" style="color:'+v.font+'">'+v.name+'</div>'
			  + ' </div>';
			
		}
		
	  i++;
	});
	string+='</footer>';
	if(isShowFoot)
	$("body").append(string);
}
//隐藏密处理
function hideController(id){
	console.log(id);
	var pass1="0",pass2 =0;
	callPassWord("输入解锁密码",function(data){
		pass1=data.pwd;
		isPwdInput.close();
		setTimeout(function(){
		callPassWord("确认输入解锁密码",function(data){
			if(data.pwd==pass1){ 
				isPwdInput.close();
				updateTable("HomeController_19",{sql:"",param:"{'p1':'1','p2':'"+pass1+"','p3':'"+id+"'}"}
		,		function(data){  layer.closeAll(); alerts("设置成功");
		        location.reload();
		});
			}else{
				 isPwdInput.close();
				 alert("两次密码不一致！");
			}
		});
		},500);
	});
}
// 输入框
function showAlertInput(msg,callback,type){
	if(typeof type=="undefined"){
		type="text";
	}
	layer.open({
	  title:[msg,
	  'background-color:#8DCE16; color:#fff;'],
	  content:  '<input type="'+type+'" placeholder="'+msg+'" style="text-indent:1em;border: 1px solid #CCC; height: 40px; width: 100%;" value="" id="myHomeAlertInput">'
	  ,btn: ['确定', '取消']
	  ,yes: function(index){ 
		if($("#myHomeAlertInput").val()==""){
			alerts("请输入");
		}else{
			callback($("#myHomeAlertInput").val());
			layer.close(index); 
		}
	  },no:function(index){
		layer.close(index); 
	  }
	});
}
//长按事件
//是否拖动
var isDragFlag=true;
//添加长按事件
var time_touch = 0;//初始化起始时间
//$("#banner").find("a")
function addTouchMouse(obj){
	obj.each(function(){
		var objs = $(this);
		objs.unbind();
		objs.on('touchstart', function(e){
			e.stopPropagation();
			time_touch = setTimeout(function(){
				if(typeof callTouchBack=="function"){
					callTouchBack(objs);
				}
			}, 2000);//这里设置长按响应时间
		});

		objs.on('touchend', function(e){
			e.stopPropagation();
			clearTimeout(time_touch);
		});
	});
}
//app 进入后台了
function inBackground(){
  if(isAppType==1)return;
  api.addEventListener({
      name:'pause'
  }, function(ret, err){
    /* setTimeout(function(){
       playSpeek(backgroundMsg,function(ret){
         setStorage("appBackRunFlag","true");
       });
     },5000);*/
  });
  //应用退出
   /*api.addEventListener({
      name:'resume'
  }, function(ret, err){
      if(getStorage("appBackRunFlag")=="false"){
        playSpeek("欢迎使用车运通APP！");
      }
  });*/
  //初始阿里云存储
  //var oss = api.require('aliCloudOss');
  //oss.init();
}
//打开密码框
function openPassWin(pwd,callback){
  //pwdInput
  //打开键盘
    var isPwdInput = api.require('pwdInput');
    isPwdInput.open(function(data) {
        // 回调对象:取值范围如下
        //  pwd : 当前输入数字
        //  type : 0 = open ，1 = close
        console.log(data)
    });
    //关闭键盘
    isPwdInput.close();
}
//设置头部信息
function setHeaderTitle(){
  $("title").html(appTitle);
  $(".logo").html(appTitle);
}
//亮屏
function screenLight(){
  //唤醒屏幕
  /*setInterval(function(){
    try{
    var sw = api.require('screenWake');
     sw.addScreenWake();
    }catch(e){}
  },4000);*/
  //屏幕常亮
  api.setKeepScreenOn({
    keepOn: true
});
}
var payNowing=true;
//播放和声语音
function playSpeek(title,callback){
  if(!payNowing){
    return;
  }
  payNowing=false;
  var bdTTS = api.require('bdTTS');
  bdTTS.init({
      mode:'MIX'
  },function(ret){
  });
  bdTTS.speak({
      text:title
  },function(ret){
  /*  bdTTS.release(function(ret1){

    });*/
    if(typeof callback=="function"){
      callback(ret);
    }
    setTimeout(function(){

      payNowing=true;
    },1000);

  });
}
//储存登陆信息
function setAttribute(name, value) {
    //登录界面
    //api.sendEvent广播登录成功事件
    /*api.sendEvent({
       name: 'loginSuccess'
    });*/
    if(typeof api =="undefined"){
      return;
    }
    //api.setPrefs设置登录成功状态
    api.setPrefs({
        key: name,
        value: value
    });
    //修改界面
    //api.addEventListener监听登录成功事件（需执行才可生效）
    /*api.addEventListener({
        name: 'loginSuccess'
    }, function(ret, err){
        if( ret ){
            //执行登录成功相关指令
        }
    });*/
}
function loginClearUser(){
  if(isAppType==1){
	   setStorage("userid", 0);
	  setStorage("type", "-1");
	  setStorage("isopenLoginFlag",true);
	  location.href="loginU.html";
	  return;
  }
 
  api.closeFrame({
      name: 'frame0'+getStorage("userid")
  });
  api.closeFrame({
      name: 'frame1'+getStorage("userid")
  });
  api.closeFrame({
      name: 'frame2'+getStorage("userid")
  });
  api.closeFrame({
      name: 'frame3'+getStorage("userid")
  });
  api.closeFrame({
      name: 'frame4'+getStorage("userid")
  });

  setStorage("userid", 0);
  setStorage("type", "-1");
  setStorage("isopenLoginFlag",true);
}
//存储用户信息
function getAttribute1(name, callback) {
    //api.getPrefs获取当前登录状态
    api.getPrefs({
        key: name
    }, function(ret, err) {
        //当偏好设置尚未设置或者曾设置后被移除后，返回值(ret.value)均为空。
        var val = ret.value;
        if (val && val != "") {
            //已登录
            callback(0, ret.value);
        } else {
            //未登录
            callback(1, '未登录！');
        }
    });
}

 function getAttribute(name, callback) {

    //api.getPrefs获取当前登录状态
    var val =  getStorage(name);

    if (val!=0 && val != "") {
        //已登录
        callback(0,val);
    } else {
        //未登录
      // if(getStorage("isopenLoginFlag")=="true"){
            //setStorage("isopenLoginFlag",false);
            //openwin('./html/loginU.html');
      //  }
        callback(1, '未登录！');
    }
}
//储存用户信息
function setStorage(name,key){
    localStorage.setItem(name,key);
}
function getStorage(name){
    var val=  localStorage.getItem(name);
  	if(typeof(val)=="undefined"|| val==null|| val==""){
        return 0;
    }else{
        return val;
    }
}
//字符过长截取
function substring(string){
  if(typeof string=="undefined"){
    return "";
  }
  if(string.length>6){
     return string.substring(0,6)+".";
  }else {

    return string;
  }
}
Date.prototype.toLocaleDatetime = function() {
          return this.getFullYear() + "-" + (this.getMonth() + 1) + "-" + this.getDate() + " " + this.getHours() + ":" + this.getMinutes() + ":" + this.getSeconds();
 };
 Date.prototype.toLocaleDate = function() {
           return this.getFullYear() + "-" + (this.getMonth() + 1) + "-" + this.getDate()  ;
 };
 Date.prototype.toLocaleDates = function() {
           return  (this.getMonth() + 1) + "-" + this.getDate() ;
 };
 Date.prototype.toLocalehour = function() {
           return this.getHours() + ":" + this.getMinutes();
 };
//移除用户储存名
function removeAttrbute(name){
    api.removePrefs({key:name});
}
//自动更新位置信息
function updateLocation(isSendFlag){
  try{
    if(typeof api =="undefined"){
      return;
    }
    if(aMapSearchValue==null){
        aMapSearchValue=api.require('aMap');
    }
    aMapSearchValue.open({
      rect: {
          x: 0,
          y: 0,
          w: 1,
          h: 1
      },
          showUserLocation: true,
          zoomLevel: 11,
          center: {
              lon: 116.4021310000,
              lat: 39.9994480000
          },
          fixedOn: api.frameName,
          fixed: false
      }, function(ret, err) {

      });
     aMapSearchValue.getLocation(function(ret, err) {
         if (ret.status) {
          if($(".L_lat").length>0){
            $(".L_lat").val(ret.lat);
          }
          if($(".L_lon").length>0){
            $(".L_lon").val(ret.lon);
          }
          aMapSearchValue.getNameFromCoords({
              lon: ret.lon,
              lat: ret.lat
          }, function(rets, err) {

              if (rets.status) {
                 setStorage("lon",ret.lon);
                 setStorage("lat",ret.lat);
                  if($(".L_addr").length>0){
                    $(".L_addr").val(rets.address);
                    $(".L_addr").html(rets.address);
                  }
                  //市
                  if($(".L_city").length>0){
                    $(".L_city").val(rets.city);
                    $(".L_city").html(rets.city);
                  }
                  //省
                  if($(".L_state").length>0){
                    $(".L_state").val(rets.state);
                    $(".L_state").html(rets.state);
                  }
                  //区
                  if($(".L_district").length>0){
                    $(".L_district").html(rets.district);
                    $(".L_district").val(rets.district);
                  }
                  //街道
                  if($(".L_street").length>0){

                    $(".L_street").html(rets.street);
                    $(".L_street").val(rets.street);
                  }
                  //街道号码
                  if($(".L_number").length>0){
                    $(".L_number").val(rets.number);
                    $(".L_number").html(rets.number);
                  }
                  if (typeof callbackLocation == 'function'){
                      callbackLocation(rets);
                  }
                  if(typeof isSendFlag !="undefined" && isSendFlag){
                      jsonPost(domainUrl + "/updateLocation.do",{lat:ret.lat,longs:ret.lon,addr:encodeURI(rets.address)},function(data){
                        flagSeachLoc=true;
                        },false);
                }
              } else {

              }
          });

        } else {
            alert(JSON.stringify(err));
        }
    });
  }catch(e){
      console.log(e);
  }
}
//循环位置查询
var flagSeachLoc=true;
function addUpdateLocation(){
  try{
    if(aMapSearchValue==null){
        aMapSearchValue=api.require('aMap');;
    }
    aMapSearchValue.open({
        rect: {
            x: 0,
            y: 0,
            w: 1,
            h: 1
        },
        showUserLocation: true,
        zoomLevel: 11,
        center: {
            lon: 116.4021310000,
            lat: 39.9994480000
        },
        fixedOn: api.frameName,
        fixed: true
    }, function(ret, err) {

    aMapSearchValue.getLocation(function(ret, err) {

        if (ret.status) {
          if($(".L_lat").length>0){
            $(".L_lat").val(ret.lat);
          }
          if($(".L_lon").length>0){
            $(".L_lon").val(ret.lon);
          }
          aMapSearchValue.getNameFromCoords({
              lon: ret.lon,
              lat: ret.lat
          }, function(rets, err) {
              if (rets.status) {
                  if($(".L_addr").length>0){
                       $(".L_addr").val(rets.address);
                  }
                  if($("#defKey").length>0){
                       $("#defKey").val(rets.district+rets.township);
                  }
                   jsonPost(domainUrl + "/updateLocation.do",{lat:ret.lat,longs:ret.lon,addr:encodeURI(rets.address)},function(data){
                },false);
              } else {

              }
              aMapSearchValue.close();
          });

        } else {
            alert(JSON.stringify(err));
        }
    });
    });
  }catch(e){

  }
}

//城市选择
var cityList=null;
function selectCity(obj,callback){
  cityList = api.require('cityList');
  cityList.open({
    x:0,y:25,
      currentCity: '',
      resource: 'widget://res/cityList.json'
  }, function(ret, err) {

      var cityInfo = ret.cityInfo;
      //alert(JSON.stringify(cityInfo));

      if($(".aui-mask").length>0){
        $(".aui-mask").hide();
      }
       if(ret.eventType=="click"){

        callback(obj,cityInfo);
        if(typeof closeAll=="function"){
          closeAll();
        }
        cityList.close();
        cityList=null;
  }


  });
}
//获取验证码
var times = 60;
var inteval;

function initYzm() {

    $(".yanzhengma").click(function() {
        var obj = $(this);
        jsonPost(domainUrl + "/yzmAction?mobile=" + $("input[name='username']").val() + "&temp=SMS_168115557", {}, function(data) {
            if (data.error != 0) {
                alerts(data.error_msg+data.error);
            } else {
                alerts(data.error_msg);
                inteval = setInterval(function() {
                    times--;
                    obj.unbind();
                    obj.html("剩余" + times + "s");
                    obj.val("剩余" + times + "s");
                    if (times == 0) {
                        clearInterval(inteval);
                        initYzm();
                        obj.html("获取验证码");
                        obj.val("获取验证码"  );
                        times = 60;
                    }
                }, 1000)
            }
        });
    });
}
//获取阿里云oss 时间
function getIosTIme(){
	var d = new Date();
	d.setHours(d.getHours(), d.getMinutes() - d.getTimezoneOffset());
	return(d.toISOString())
}
//时间格式画
function dateFormat(fmt, date) {
    let ret;
    const opt = {
        "Y+": date.getFullYear().toString(),        // 年
        "m+": (date.getMonth() + 1).toString(),     // 月
        "d+": date.getDate().toString(),            // 日
        "H+": date.getHours().toString(),           // 时
        "M+": date.getMinutes().toString(),         // 分
        "S+": date.getSeconds().toString()          // 秒
        // 有其他格式化字符需求可以继续添加，必须转化成字符串
    };
    for (let k in opt) {
        ret = new RegExp("(" + k + ")").exec(fmt);
        if (ret) {
            fmt = fmt.replace(ret[1], (ret[1].length == 1) ? (opt[k]) : (opt[k].padStart(ret[1].length, "0")))
        };
    };
    return fmt;
}
//如果微信端 加载基础数据
function addWxToken(){
	jsonPost("/tkAction", {
    url: location.href
	},function(data) {
		wx.config({
			debug: false,
			// 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
			appId: data.appId, 
			// 必填，企业号的唯一标识，此处填写企业号corpid
			timestamp: data.timestamp, 
			// 必填，生成签名的时间戳
			nonceStr: data.noncestr,
			// 必填，生成签名的随机串
			signature: data.signature,
			// 必填，签名，见附录1
			jsApiList: ["onMenuShareTimeline", "onMenuShareAppMessage", "onMenuShareQQ", "chooseImage", "previewImage", "chooseWXPay","uploadImage", "downloadImage", "scanQRCode"]
		});
		});
}

//检测系统
function isAndroid(){
	var u = navigator.userAgent; 
		var flag = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; 
	return  flag;
}
function isIos(){
	var u = navigator.userAgent; 
		var flag   = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); 
	return  flag;
}
//调用支付
function jsApiCall(params,id,money,title,callback){
	  if((params.mweb_url+"").indexOf("http")!=-1){ 
		$("#myiframe").attr("src",params.mweb_url+"&redirect_url="+encodeURI("a."+document.domain+"://"));
	  }else{
 		  wx.chooseWXPay({
				timestamp: params.timeStamp, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
				nonceStr: params.nonceStr, // 支付签名随机串，不长于 32 位
				package: params.package, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=***）
				signType: params.signType, // 签名方式，默认为′SHA1′，使用新版支付需传入′MD5′
				paySign: params.paySign, // 支付签名
				success: function (res) {
					if(res.errMsg == "chooseWXPay:ok"){
						callback(0);				
					}else{
						callback(1);	
					}
				}, 
				cancel: function(res){
					callback(2);
				},fail:function(res){ 
					callback(3);
				}
		  });
	  }
	}
//初始化
$(function() {
	
	//当前平台
	if(isAppType==1){
		//加入底部连接
		initSysFooter();
		setTimeout(function(){addWxToken();},600);
		apiready();
		//隐藏扫码
		if((""+location.href).indexOf("index.html")!=-1)
		$(".am-header-left").hide();
		$(".header-green1").css("top","0");
		
	}
	if(typeof layer=="undefined"){
		$("body").append('<script src="/A6021579864710/script/layer_mobile/layer.js"></script>');
	    $("body").append('<link href="/A6021579864710/script/layer_mobile/need/layer.css?2.0" type="text/css" rel="styleSheet" id="layermcss"><style>.layui-m-layercont { padding: 10px 30px;}</style>');
	}
    if ($(".yanzhengma").length > 0) {
        initYzm();
    }
    var titles = $("title").text();
    if(titles=="")
    {
      setHeaderTitle();
    }
});
//卸货状态管理
function getOrderStatus(status){
  var string="未完成";
  if(status==1&&orderInfo.paystatus==2){
      string="已付款";
  }else  if(status==1){
       string="未付款";
  }else   if(status==2){
        string="待装货";
  }else   if(status==3){
      string="装货完成";
  }else   if(status==4){
    string="到达目的地";
  }else   if(status==5){
    string="代收款";
  }else   if(status==6){
    string="待评价";
  }else  if(status==7){
      string="已评价";
  }else if(status==-1){
    string="已取消";
  }else if(status==-2){
    string="已退款";
  }else{
    string="待处理";
  }
  return string;
}
//货主端订单 查看跳转
function hz_lookOrder(v){
  var string='xiadian-detail.html?id='+id;
  var status=v.status;
  var id=v.id;
  var bzj=v.yjje;
  var islt=v.islt;
  if(status==0){
         string='xiadian-detail.html?id='+id;
  }else
  if(status==1&&v.paystatus==2){
      //string="已付款";
  }else  if(status==1&&v.paystatus==1){
       string='pay1.html?id='+MP.id+"&type="+islt+"&money="+v.jcfy+"&bzj="+bzj;
  }else   if(status==2){
      //  string="待装货";
      string='xiadian-detail.html?id='+id;
  }else   if(status==3||status==3){
    //  string="装货完成";
    string='xiadian-detail.html?id='+id;
  }else   if(status==4){
  //  string="到达目的地";
    string='xiadian-detail.html?id='+id;
  }else   if(status==5){
  //  string="卸载完成";
    string='xiadian-detail.html?id='+id;
  }else   if(status==6){
    //string="待评价";
    string='pingjia.html?id='+id;
  }else  if(status==7){
     //    string="已评价";
  }else if(status==-1){
      //  string="已取消";
  }else if(status==-2){
    //string="已退款";
  }else{
  //  string="待处理";
  }
  return string;
}
//用户名登陆
function loginUser(callback) {
    var  pass = $("input[name='password']");
    if(pass.length>0){
      var val = pass.val();
      pass.val(hex_md5("by"+val+"by"));
    }
    var params = $("#loginForm").serialize();
  //  params = decodeURIComponent(params, true);
  //  params = encodeURI(encodeURI(params));
    jsonPost(domainUrl + "/userInfo", params, function(data) {
        if (data.error == 0) {
			MLog(data);
            //setAttribute("userid", data.id);
          //  setAttribute("type", data.type);
            setStorage("userid", data.id);
            setStorage("type", data.type);
            setStorage("isopenLoginFlag",true);
            alerts(data.error_msg);
            if(isAppType==1){
			 location.href="index.html";
		   }


        } else {
            alerts(data.error_msg);
        }
        callback(data);
    });
}
//验证码登陆 yzm_noform
function loginUserOfCode(callback) {
    loginUser(function(data){
       callback(data);
    });
}
//文本框 验证数据长度
function splitInputValue(obj,len){
   if(obj.value.length>len)
      obj.value=obj.value.slice(0,len)
}
//用户注册
function userReg(callback) {
  var  pass = $("input[name='password']");
  if($("#name").val()==""){
	  alerts("请输入姓名或昵称！");
	  return;
  }
  if(pass.length>0){
    var val = pass.val();
    pass.val(hex_md5("by"+val+"by"));
  }
    var params = $("#loginForm").serialize();
  //  params = decodeURIComponent(params, true);
  //  params = encodeURI(encodeURI(params));
    jsonPost(domainUrl + "/regUserCode.do", params, function(data) {
        if (data.error == 0) {
          //  setAttribute("userid", data.id);
          //  setStorage("userid", data.id);
          //  setStorage("type", data.type);
            alerts(data.error_msg);
        } else {
            alerts(data.error_msg);
        }
        callback(data);
    });
}
//用户修改密码
function updatePassCode(callback) {
	var  pass = $("input[name='password']");
    if(pass.length>0){
      var val = pass.val();
      pass.val(hex_md5("by"+val+"by"));
    }
    var params = $("#loginForm").serialize();
//    params = decodeURIComponent(params, true);
  //  params = encodeURI(encodeURI(params));
    jsonPost(domainUrl + "/updateMobileUserPass.do", params, function(data) {
        if (data.error == 0) {
            alerts(data.error_msg);
        } else {
            alerts(data.error_msg);
        }
        callback(data);
    });
}
//$("#footer").hide();
//修改用户信息
function updateUserInfo(callback) {
    var flag=false;
    var params = $("#loginForm").serialize();
    $("#loginForm").find("input").each(function(){
         if($(this).val()==""&&!flag && typeof($(this).attr("placeholder"))!="undefined"){
            alerts($(this).attr("placeholder"));
            flag=true;
            return;
        }
    });
    if(flag){
      return;
    }
  //  params = decodeURIComponent(params, true);
  //  params = encodeURI(encodeURI(params));
    jsonPost(domainUrl + "/saveUser.do", params, function(data) {
        if (data.error == 0) {
            alerts(data.error_msg);
        } else {
            alerts(data.error_msg);
        }
        callback(data);
    });

}
//保存数据  uid、 为主  reuse_noform:true
function saveSql(callback) {
    var flag=false;
    var params = $("#loginForm").serialize();
    $("#loginForm").find("input").each(function(){
         if($(this).val()==""&&!flag && typeof($(this).attr("placeholder"))!="undefined"){
            alerts($(this).attr("placeholder"));
            flag=true;
            return;
        }
    });
    if(flag){
      return;
    }
  //  params = decodeURIComponent(params, true);
  //  params = encodeURI(encodeURI(params));
    jsonPost(domainUrl + "/saveSql.do", params, function(data) {
        if (data.error == 0) {
            alerts(data.error_msg);
        } else {
            alerts(data.error_msg);
        }
        callback(data);
    });

}
//获取系统参数
function getSystem(name,callback){
  jsonPost("/getSystemParam.do",{name:name},function(data){
      callback(data);
  })
}
//储存用户的信息
function saveUserInfo(callback){
     var params = $("#loginForm").serialize();
     jsonPost(domainUrl + "/saveUser.do", params, function(data) {
         if (data.error == 0) {
             alerts(data.error_msg);
         } else {
             alerts(data.error_msg);
         }
         callback(data);
     });
}
//微信登陆
function wxLogin(){
  var wx = api.require('wx');
  wx.auth({
      apiKey: ''
  }, function(ret, err) {
      if (ret.status) {
          //授权成功
          //获取token
          wx.getToken({
              code: ret.code
          }, function(ret, err) {
              if (ret.status) {
                  //获取用户信息
                  wx.getUserInfo({
                      accessToken: ret.accessToken,
                      openId: ret.openId
                  }, function(ret, err) {
                    //输出用户信息
                        if (ret.status) {
                          jsonPost("/save.do",{tb_noform:"boyun_users",openid:ret.openid,name:ret.nickname,pic:ret.headimgurl
                          ,id:getStorage("userid"),unionid:ret.unionid},function(data){
                            alerts(data.error_msg);
                          });
                      } else {
                          alert(err.code);
                      }
                  });
              } else {
                  alert(err.code);
              }
          });
      } else {

      }
  });
}
//退出登陆
function loginOut(name) {

    api.removePrefs({
        key: name
    });
    /*
    //登出界面
      //api.sendEvent广播登出成功事件
      api.sendEvent({
          name: 'logoutSuccess'
      });
      //api.removePrefs移除登录状态
      api.removePrefs({
          key: 'loginStatus'
      });
      //修改界面
      //api.addEventListener监听登出成功事件（需执行才可生效）
      api.addEventListener({
          name: 'logoutSuccess'
      }, function(ret, err){
          if( ret ){
              //执行登出成功相关指令
          }
      });
    */
}
//引入文件
/**
使用 apicloud 实现  include 功能
参数 api 为 apiready = function() {...} 的代码块里的 api
**/
function include_files(api) {
    $("include").each(function() {
        var ele = $(this);
        var file_name = ele.attr("file");
        var file_path = getPath(file_name);
        api.readFile({
            path: file_path
        }, function(ret, err) {
            if (ret.status) {
                var file_data = ret.data;
                $(file_data).appendTo(ele); //把文件内容添加到 include 标签后面
            } else {
                alert(err.msg);
            }
        })
    })
}
//获取路径
function getPath(file_name) {
  if(file_name.indexOf("http")!=-1)
    return file_name;
    var wgtRootDir = "../html/"; //程序运行目录
    var file_path = wgtRootDir + file_name; //拼接文件的完整路径
    if (file_name.indexOf("/html/") != -1)
        file_path = file_name;
    return file_path;
}
//系统弹出框
function Salert(msg, title) {
    if (typeof(title) == "undefined" || title == null || title == "") {
        title = "提示";
    }
    api.alert({
        title: title,
        msg: msg,
        buttons: ['确认']
    }, function(ret, err, message) {
        if (ret.buttonIndex == 1) { //点击确定退出应用
            api.closeWidget({
                id: api.appId,
                silent: true //直接退出
            });
        }
    });
}
//推送消息
function pushFriend(id,callback){
	jsonPost("/pushSpaceMsg.do",{sql:"("+id+")",
	  content:encodeURI("您的家族成员“"+userInfo.name+"”发布了关于您的信息。")},function(data){
		  if(typeof callback=="function"){
			  callback(data);
		  }
	  });
}
//重新加载页面
function reload(){
	setTimeout(function(){
		location.reload();
		
	},1000);
}
//弹出消息提示
function alertMsg(msg,callback,title) {
    if (typeof(title) == "undefined" || title == null || title == "") {
        title = "温馨提示";
    }
	if(typeof api!="undefined"){
		api.confirm({
			title: title,
			msg: msg,
			buttons: ['确认','取消']
		}, function(ret, err, message) {
			if (ret.buttonIndex == 1) { //点击确定退出应用
				callback();
			}
		});
	}else{
		layer.open({
				  title:[title,
				  'background-color:#8DCE16; color:#fff;'],
				  content: msg,  anim: 'up'  
				  ,btn: ['确定', '取消']
				  ,yes: function(index){ 
					  callback();
					  layer.close(index); 
				  },no:function(index){
					   layer.close(index); 
						
				  }
			 });
	}
}
//初始化文件
//返回键 监听
$(function() {
    pushHistory();
    window.addEventListener("popstate", function(e) {
        closeWin();
    }, false);

    function pushHistory() {
        var state = {
            title: "title",
            url: "#"
        };
        window.history.pushState(state, "title", "#");
    }
});
//关闭窗口
function closeWin() {
    goBack();
}
//是否可以打开新窗口
var isOpenNewsWin=true;
//是否禁止回调窗口
var isJZBackFlag=true;
//打开新窗口
var firstisopenLoginFlag=true;
//是否容许开启监听返回
var isListenerBackFlag=true;
function openwin(windowurl) {
	if(isAppType==1){
		location.href=windowurl;
		return;
	}
    if(windowurl==""){winCloseFinish(); return};
    if(windowurl.indexOf("javascript")!=-1){return;}
    var openName="win" + new Date().getTime();
    setStorage("openFrame",openName);
     api.addEventListener({
        name: openName
    }, function(ret, err){
      if(isListenerBackFlag){
        if(typeof callBackInit=="function")
            {
              location.reload();
            }else{
              if(typeof closeWinCallback=="function"){
                closeWinCallback(ret);
              }
               firstisopenLoginFlag=true;
               isOpenNewsWin=true;
               if(isJZBackFlag){
                   getUserInfos();
               }
            }
      }else{
        if(typeof callBackInitFirst=="function"){
          callBackInitFirst();
        }
      }

    });
    isOpenNewsWin=false;
    api.openWin({
        name: openName, //描述：window名字
        url: windowurl,
        slidBackEnabled: true,
        bgColor: "widget://res/load.jpg"
      //  data: '正在加载，请稍后·······',
         //（可选项）背景色，支持图片和颜色，格式为 #fff、#ffffff、rgba(r,g,b,a)等，图片路径支持 fs://、widget://
        //data: "", //（可选项）页面加载的数据内容，可以为html片段或者整张html文件的数据
        /*  headers: "", //（可选项）请求头
          useWKWebView: false, //（可选项）是否使用WKWebView来加载页面。WKWebView具有Safari相同的JavaScript引擎，支持更多的HTML5特性，相比于UIWebView，在性能和功能方面都有很大提升。只支持iOS8.0及以上系统。注意openWin时使用WKWebView可能会影响window的页面切换效果，建议在openFrame时使用。
          historyGestureEnabled: false, //（可选项）是否可以通过手势来进行历史记录前进后退，只在useWKWebView参数为true时有效。
          //pageParam: pageParam, //（可选项）页面参数，新页面中可以通过 api.pageParam 获取
          bounces: defaultproperty.bounces, //（可选项）页面是否弹动
          bgColor: defaultproperty.bgColor, //（可选项）背景色，支持图片和颜色，格式为 #fff、#ffffff、rgba(r,g,b,a)等，图片路径支持 fs://、widget://等 APICloud 自定义文件路径协议，同时支持相对路径
          scrollToTop: false, //（可选项）当点击状态栏，页面是否滚动到顶部。若当前屏幕上不止一个页面的 scrollToTop 属性为 true，则所有的都不会起作用。只 iOS 有效
          scrollEnabled: true, //（可选项） 页面内容超出后是否可以滚动， 只支持iOS
          vScrollBarEnabled: true, //（可选项）是否显示垂直滚动条
          hScrollBarEnabled: true, //（可选项）是否显示水平滚动条
          scaleEnabled: false, //（可选项）页面是否可以缩放
          slidBackEnabled: defaultproperty.slidBackEnabled, //（可选项）是否支持滑动返回。iOS7.0及以上系统中，在新打开的页面中向右滑动，可以返回到上一个页面，该字段只 iOS 有效
          slidBackType: "full",*/
    });
}
//扫码
function scan(id) {
    var FNScanner = api.require('FNScanner');
    FNScanner.open({
        autorotation: true
    }, function(ret, err) {
        if (ret) {
             if(typeof ret=="string"){
                ret = eval('('+ret+')');
             }
             var content = ret.content+"";
             if(content=="undefined"){

             }else{
               if(typeof(id)!="undefined"){
                  $(id).val(content);
                }else{
                  if(content.indexOf("http")!=-1)
                    openwin(content);
                  else
                   openwin('pay1.html?id='+content);
                }
            }
        } else {
            //   alert(JSON.stringify(err));
        }
    });
}

function confirms(title, callback) {
    api.confirm({
        title: "温馨提示：",
        msg: title,
        buttons: ['确定', '取消']
    }, function(ret, err) {
        var index = ret.buttonIndex;
        if (index == 1) {
            callback(0);
        }
    });

}
//微信 推送服务初始化
function initLoads(){
       getAttribute("userid",function(num,data){
          var params = { account: "testAccount" };
          var tencentPush = api.require('tencentPush');
          tencentPush.registerPush(params,function(ret, err) {
              if (ret.status) {
                   //alert("注册成功，token为：" + ret.token);
              } else {
                  alert("注册失败，错误码：" + err.code + "，错误信息：" + err.msg);
              }
          });
           tencentPush.setListener({ name: "notifactionClick" }, function(ret, err) {
             playSpeek(ret.content,function(ret){
               setStorage("appBackRunFlag","true");
             });

            //  alert("收到通知被展示的回调，title：" + ret.title + "，content：" + ret.content + "，customContent：" + ret.customContent + ",activity:" + ret.activity + ",actionType:" + ret.actionType + ",msgid:" + ret.msgid);
          });
        /*   tencentPush.setListener({ name: "notifactionShow" }, function(ret, err) {
             alerts("通知消息被屏蔽！");
            //  alert("收到通知被展示的回调，title：" + ret.title + "，content：" + ret.content + "，customContent：" + ret.customContent + ",activity:" + ret.activity + ",actionType:" + ret.actionType + ",msgid:" + ret.msgid);
          });
          tencentPush.setListener({ name: "notifactionClick" }, function(ret, err) {
            alerts();
           //  alert("收到通知被展示的回调，title：" + ret.title + "，content：" + ret.content + "，customContent：" + ret.customContent + ",activity:" + ret.activity + ",actionType:" + ret.actionType + ",msgid:" + ret.msgid);
         });
         tencentPush.setListener({ name: "notifactionClear" }, function(ret, err) {
             alerts(ret.title,ret.content);
          //  alert("收到通知被展示的回调，title：" + ret.title + "，content：" + ret.content + "，customContent：" + ret.customContent + ",activity:" + ret.activity + ",actionType:" + ret.actionType + ",msgid:" + ret.msgid);
        });*/
      });



}
//极光推送服务初始化
function initJGLoads(){
       getAttribute("userid",function(num,data){
         var ajpush = api.require('ajpush');
              //初始化
                ajpush.init(function(ret) {
                   if (ret && ret.status){
                       //success
                   }
                });
                //监听推送
                ajpush.setListener(
                    function(ret) {

                         var id = ret.id;
                         var title = ret.title;
                         var content = ret.content ;
                         if(content.indexOf("已取消")!=-1){
                           //openwin('./html/pay1.html?id='+ret.extr a.orderid);
                           setStorage("isCancelOrder","true");
                          }else{
                            // var extra = ret.extra;
                            playSpeek(ret.content,function(ret1){
                              if(getStorage("appBackRunFlag")=="true"){
                                 api.openApp({
                                        androidPkg : 'com.by.huoyuntong',
                                        mimeType : 'text/html',
                                        uri : 'http://www.baidu.com'
                                }, function(ret2, err) {
                                    setStorage("appBackRunFlag","false");
                                });
                                if(ret.content.indexOf("付款")!=-1){
                                  openwin('./html/pay1.html?id='+ret.extra.orderid);
                                }
                            }
                            });
                      }
                    }
                );
                //绑定tag
                var param = {alias:data,tags:['tag1','tag2']};
                ajpush.bindAliasAndTags(param,function(ret) {
                        var statusCode = ret.statusCode;
                 });
                 ajpush.getRegistrationId(function(ret) {
                    var registrationId = ret.id;
                    jsonPost("/save.do",{tb_noform:"boyun_users",website:registrationId,id:data},function(data){

                    });
                });
            //  alert("收到通知被展示的回调，title：" + ret.title + "，content：" + ret.content + "，customContent：" + ret.customContent + ",activity:" + ret.activity + ",actionType:" + ret.actionType + ",msgid:" + ret.msgid);
          });
}
//极光推送
function pushContent(orderId,userId,content,callback){
   jsonPost("/noticeTranOrder.do",{orderId:orderId,id:userId,content:encodeURI(content)},function(data){
        callback(data);
   });
}

//添加本地通知
function addNotic(title, content, json, callback) {
    var tencentPush = api.require('tencentPush');
    var date = new Date();
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    var hour = date.getHours();
    var minuter = date.getMinutes();
    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    var params = {
        title: title, // 标题
        content: content, // 内容
        date: year + "" + month + "" + strDate, // 日期
        hour: hour, // 时间
        min: minuter, // 分钟
        customContent: JSON.stringify(json), // 自定义key-value
        activity: "", // 打开的activity
        ring: 1, // 是否响铃
        vibrate: 1 // 是否振动
    };
    var resultCallback = function(ret, err) {
        if (ret.status) {
            callback(0, "添加通知成功");
        } else {
            callback(1, "通知失败");
        }
    };
     tencentPush.addlocalNotification(params, resultCallback);
}
//计算距离多远
function sumPoint_old(lon,lat,elon,elat,callback){
  if(aMapSearchValue==null){
      aMapSearchValue=api.require('aMap');
  }
  //规划路线
  aMapSearchValue.searchRoute({
      type: 'drive',
      strategy: 'drive_time_first',
      start: {
          lon: lon,
          lat: lat
      },
      end: {
          lon: elon,
          lat: elat
      },
  }, function(ret, err) {
     // alert("路线长度："+ret.paths[0].distance+",收费路段："+ret.paths[0].tollDistance+",预计时间："+ret.paths[0].duration);
     callback(parseFloat(ret.paths[0].distance),parseFloat(ret.paths[0].tollDistance),parseFloat(ret.paths[0].duration));
  });
}
//路线规划 费用计算
var addNums=2;
function sumPoint(lon,lat,elon,elat,callback){
  var map = new AMap.Map("container", {
      center: [parseFloat(getStorage("lon")), parseFloat(getStorage("lat"))],
      zoom: 14
  });

  var truckDriving = new AMap.TruckDriving({
      map: map,
      policy: 0, // 规划策略
      size: 1, // 车型大小
       width: 2.5, // 宽度
       height: 2, // 高度
       load: 1, // 载重
       weight: 12, // 自重
       axlesNum: 2, // 轴数
       province: '京', // 车辆牌照省份
      isOutline: true,
      outlineColor: '#ffeeee',
      //panel: 'panel'
  });

  var path = [];
  if(elon==0){
    //path=elat;
    path.push({lnglat:[lon, lat]});//起点
    //[{"lat":"39.863957","lon":"116.380298","dz":"北京南站(出口)","all":"北京南站路附近","sjh":"1888888888"}]
    $.each(elat,function(k,v){
      path.push({lnglat:[v.lon, v.lat]});
    });
  }else{
    path.push({lnglat:[lon, lat]});//起点
    if(elon!=1)
    path.push({lnglat:[elon, elat]});//起点
    for(var i=0;i<addNums+1;i++){
      if($("#shrdz"+i).length>0){
            path.push({lnglat:[parseFloat($("#shry"+i).val()), parseFloat($("#shrx"+i).val())]});//途径
        }
    }
  }
  if($("#shry").val()=="0"){
    callback(0,0,0);
    return;
  }
  truckDriving.search(path, function(status, result) {
      // searchResult即是对应的驾车导航信息，相关数据结构文档请参考  https://lbs.amap.com/api/javascript-api/reference/route-search#m_DrivingResult
      if (status === 'complete') {

          var distance=0;
          var tollDistance=0;
          var times=0;
          $.each(result.routes[0].steps,function(k,v){

               distance+=parseInt(v.distance);
              tollDistance+=parseInt(v.tolls);
              times+=parseInt(v.time);
          })
          callback(distance,tollDistance,times);

      } else {
           MLog(result);
          alerts('计算费用失败！');
      }
  });
 return map;
}
var showAmapNow=null;
function closeAmap(){
  if(showAmapNow!=null){
      showAmapNow.close();
      showAmapNow=null;
  }
};
//添加地图标注
function addAnnotations(log,lat,user)
{
  try{
   showAmapNow.cancelAnnotationSelected({
    id: 1
   });
 }catch(e){}
 showAmapNow.setCenter({
    coords: {
        lon: log,
        lat: lat
    },
    animation: false
});
   showAmapNow.addAnnotations({
        annotations: [{
            id: 1,
            lon: log,
            lat: lat
        } ],
        icons: ['widget://res/car.png'],
        draggable: true,
        timeInterval: 2.0,w:10,h:10
    }, function(ret) {
        if (ret.eventType == 'click') {
               showAmapNow.getNameFromCoords({
                lon: log,
                lat: lat
              }, function(rets, err) {
                    alerts(rets.address);
                    openwin('infor.html?id='+user.id);
              });
        }
    });
}//开启地图
function MLog(ret){
  console.log(JSON.stringify(ret));
}
function showMap(lon,lat,elon,elat,height){
  closeAmap();
  var hms=110;
  if(typeof height!="undefined"&&!isNaN(height)){
     hms=height;
  }
  showAmapNow = api.require('aMap');
      showAmapNow.open({
          rect: {
              x: 0,
              y: 60,
              w: "auto",
              h: api.winHeight-hms

          },
          showUserLocation: true,
          zoomLevel: 14,
          center: {
              lon: lon,
              lat: lat
          },
          fixedOn: api.frameName,
          fixed: true
      }, function(ret, err) {
          if (ret.status) {
            //开始定位
            //定位
                showAmapNow.getLocation(function(ret, err) {
                    if (ret.status) {
                      //	alert(JSON.stringify(ret));
                    } else {
                        //  api.alert({ msg: JSON.stringify(ret) });
                    }
                });
                //设置跟踪类型
                showAmapNow.setTrackingMode({
                  animation: true,
                  trackingMode: 'none' // follow heading none
              });
              //地图监听事件
              showAmapNow.addEventListener({
                  name: 'longPress'
              }, function(ret) {
                  if (ret.status) {
                      //alert(JSON.stringify(ret));
                  }
              });
              //规划路线
              showAmapNow.searchRoute({
                  type: 'drive',
                  policy: 'drive_fee_first',
                  start: {
                      lon: lon,
                      lat: lat
                  },
                  end: {
                      lon: elon,
                      lat: elat
                  },
              }, function(ret, err) {
                 //alert(JSON.stringify(ret));
                // alert("路线长度："+ret.paths[0].distance+",收费路段："+ret.paths[0].tollDistance+",预计时间："+ret.paths[0].duration);
                  if (ret.status) {
                      showAmapNow.drawRoute({
                          id: 1,
                          autoresizing: true,
                          index: 0,
                          styles: {
                              driveLine: {
                                  width: 6,
                                  color: '#0000EE',
                                  lineDash: false,
                                  strokeImg: ''
                              },
                              icons: {
                                  start: 'widget://res/start.png',
                                  end: 'widget://res/end.png',
                                  bus: '',
                                  car: '',
                                  man: ''
                              }
                          }
                      });
                      //

                  } else {
                    //  api.alert("12");
                  }
              });
          } else {
          }
      });

}
//定义用户ID
var letCustomUserId=0;
//获取用户信息
function getUserInfos(){
	   if(isAppType==1){
		 if((getStorage("userid")+"")=="undefined"||getStorage("userid")=="0")
		 {
			 if((""+location.href).indexOf("login")==-1&&(""+location.href).indexOf("reg")==-1&&(""+location.href).indexOf("forget")==-1)
				location.href="loginU.html";
			  return;
		 }
		
	   }
      if(letCustomUserId==0){
        getSingleData("TranOrderController_12",getStorage("userid"),"U_",function(data){
			 
			if(data.stuid!="0"){
				$(".footer2").append('<span style=" top: 0px; right: -20px;position: absolute; background: red; border-radius: 50%; height: 20px; width: 20px; display: block; font-size: 0.4rem; line-height: 20px; color: #FFF; ">2</span>'); 
			}
             if(isAppType==1&&isNull(data.wxopenid)){
				  openwin('/wap_openid_1.jsp');
			 }
        });
      }else{ 
        getSingleData("TranOrderController_12",letCustomUserId,"U_",function(data){
			
        });
      }

}
//验证参数是否为空
function isNull(str){
	if(typeof str=="undefined"||str==""||str==null||str=="null"){
		return true;
	}else{
		return false;
	}
}
//取消订单
function myNoAcepase(){
    jsonPost("/carRabTranOrder.do",{carname:"",paystatus:0,carsjh:"",status:0,caruid:0,id:MP.id,jdsj:new Date().getTime()},function(data){
      if(data.error==0){
          winCloseFinish();
      }
   });
}
//关闭视频
var speedPlayer=null;
function closePlayVideo(){
  if(speedPlayer!=null){
    $(".closePlayVideo").remove();
    speedPlayer.close();
  }
}
//播放视频
function playSysVideos(url,title){
  //$("body").append('<div class="closePlayVideo" style="position:fixed;z-index:1000;top:0px;left:0px;width:100%;height:100%;background:#FFF;" onclick="closePlayVideo()"></div>');

  var fs = api.require('fs');
  fs.copyTo({
      oldPath: url,
      newPath: "fs://floder/"
  }, function(ret, err) {
    url = "fs://floder/"+url.substring(url.lastIndexOf("/")+1);
        //视频播放
        playVideos(url,title);
  });
}
function playVideos2(url,title){
  var speedPlayer = api.require('speedPlayer');
    speedPlayer.open({
        url:url,
        title:title,
        pos:30,
        hideController:false,
        frame:{x:0,y:0,w:api.frameWidth,h:200},
        },function(ret, err){
            if(ret.cmd=='playing'){
            }else if(ret.cmd=='playerStatus'){
                switch(ret.status){
                    case 'statusReady':
                        duration=ret.duration;//单位，秒。
                        console.log('视频准备好了')
                        break;
                    case 'statusUnknown':
                        console.log('未知错误')
                        break;
                    case 'statusFailed':
                        console.log('视频播放失败')
                        break;
                }
            }
    });
}
//通用div ceng
function commenDiv(id){
	$(".commentDiv").remove();
	$("body").append('<div class="commentDiv" style="  background:#000;width:100%;height:100%;position:fixed;top:0;left:0px;z-index:1000"><img style="width:24px;position:fixed;top:20px;left:20px;z-index:1000001"  src="./image/back.png"></div>');
	if(typeof id!="undefined"){
		$(id).show();
	}
	$(".commentDiv").click(function(){
		if(typeof id!="undefined"){
			$(id).hide();
		}
		$('.commentDiv').remove();
	});
}
//菜单插件
function addMenus(json,id){
	$("head").append('<style>.addMenus'+id+'{display:none;width:120px;position:absolute;top:40px;right:0px;z-index:10000;background:#FFF;}.addMenus'+id+' a{color: #605c5c; border-bottom: 1px dotted #CCC; line-height: 24px; display: block; float: left; width: 100%; padding: 2px 5px;}</style>');
	var string="";
	$.each(json,function(k,v){
		string+='<a href="'+v.url+'" '+v.attr+'>'+v.title+'</a>';
	});
	$("#"+id).append('<div class="addMenus'+id+'">'+string+'</div>');
	$("#"+id).click(function(){
		if($(".addMenus"+id).is(":hidden")){
			$(".addMenus"+id).show();
		}else{
			$(".addMenus"+id).hide();
		}
	});
}
//视频播放
function playVideos(url,title){
	if(isAppType==1){
		commenDiv();
		//location.href="";
		//$("#video2").remove();
		$('.commentDiv').append('<video  controlsList=\'nodownload\' style=\'width:100%;display:none;width: 100%;  z-index: 10000; left: 0px;\' id=\'video2\'  src=\'\' controls></video>');$('#video2').show();$('#video2').attr('src',url);document.getElementById('video2').play();
	}else{
		  var videoPlayer = api.require('videoPlayer');
		  videoPlayer.play({
			  texts: {
				  head: {
					  title: title
				  }
			  },
			  head: {
						 bg: '#000000',
						 height: 44,
						 titleSize: 20,
						 titleColor: '#fff',
						 backSize: 44,
						 backImg: 'fs://img/back.png',
						 setSize: 44,
						 setImg: 'fs://img/set.png'
					 },
					 foot: {
						 bg: '#000000'},
			  autorotation:true,
			  coverImg:"widget://res/timg.jpg",
			  path: url, //（可选项）字符串类型；文档的路径，支持网络和本地（fs://）路径；默认：未传值时不播放
			  //在 android 平台上不支持 widget://
			  autoPlay: true //（可选项）布尔类型；打开时是否自动播放；默认：true（自动播放）
			  ,isFull:false,hideStatusBar:true
		  }, function(ret, err) {

		  });
  }
}
//保存 用户信息
function saveUsers(param,callback){
  if(typeof param.tb_noform =="undefined")
	param.tb_noform="boyun_users";
  if(typeof param.id == "undefined")
	param.id=getStorage("userid");
  jsonPost("/save.do",param,function(data){
    alerts(data.error_msg);
    if(typeof callback=="function"){
      callback(data);
    }
  });
}
//保存
function saveTables(param,callback,flag){

  jsonPost("/save.do",param,function(data){
    if(typeof flag!="undefined"&&flag)
    alerts(data.error_msg);
    if(typeof callback=="function"){
      callback(data);
    }
  });
}
//json数组转string
function jsonToString(json){

  var jsl=JSON.stringify(json)+"";
  jsl=jsl.replace("[","(").replace("]",")");
   return jsl;
}
//获取单条数据信息
function getSingleData(name,id,pre,callback){
  var i=0;
    getNewData(name,{newApi:true,param:"{'p1':'"+id+"' }"},function(res){
            if(res.res==0){

            $.each(res.data[0],function(k,v){

                if($("#"+pre+k).length>0){
                    var text= $("#"+pre+k).html()+"";
                    var reg = new RegExp("\{"+k+"\}","ig");
                    $("#"+pre+k).html(text.replace(reg,v));
                }
                if($("."+pre+k).length>0){
                    //检测下拉
                    var classes=$("."+pre+k).attr("class")+"";
                    if(classes.indexOf("xiala")!=-1){
                        $("."+pre+k).find("option").each(function(){
                          var valus=$(this).attr("value")+"";
                          if(valus==v){
                            $(this).prop("selected","selected");
                          }
                        });
                    }else{
                        var text =  $("."+pre+k).text()+""; 
                        if((v+"").indexOf(".jpg")!=-1||(v+"").indexOf(".png")!=-1||(v+"").indexOf(".mp4")!=-1){
                          if(v.indexOf("http")==-1)
                               $("."+pre+k).attr("src",domainUrl+v);
                          else{
                              $("."+pre+k).attr("src",v);
                          }
                          $("."+pre+k).val(v);
                        }else{
                          var vals=$("."+pre+k).attr("data-value");
                          if(typeof vals!="undefined"){
                             vlist = vals.split("|");
                             v = vlist[parseInt(v)];
                          }

                          var vals=$("."+pre+k).attr("data-time");
                          if(typeof vals!="undefined"){

                              if(parseInt(v)>0){
                                 v=getTimes(parseInt(v));
                              }
                          }
                          if(text.indexOf("：")!=-1){
                              text = text.split("：")[0]+"："+v;
                          }else {
                            text=v;
                          }
                            $("."+pre+k).html(text);
                            $("."+pre+k).val(text);
							$("."+pre+k).attr("src",text);
                        }
                      /*  if(v.indexOf(".")!=-1){
                          getAliOss(v,function(ret){
                              $("."+pre+k).html(ret);
                              $("."+pre+k).val(ret);
                              $("."+pre+k).attr("src",ret);
                          });
                      }*/

                    }

                }
            });
            if(typeof callback=="function"){
              callback(res.data[0]);
            }
            //参数替换
            if(name=="TranOrderController_12"&&id==getStorage("userid")&&isLoadUserInfo){
               currentUserId=res.data[0].id;
               userInfo=res.data[0];
               if(typeof callBackUserInfo=="function"){
                callBackUserInfo(res.data[0]);
              }
            }
            if(name=="TranOrderController_1"){
              //初始化订单
                 orderInfo=res.data[0];
                 $(".footer").find("a").each(function(){
                  var fohtml=$(this).text()+"";
                  if(res.data[0].islt==2){
                    $(this).text(fohtml.replace(/到达卸货/ig,"到达施工").replace(/完成装车/ig,"到达施工").replace(/发货/ig,"施工").replace(/卸货/ig,"施工"));
                  }
                });

            }
         }

  },false);
}
//用户信息
var userInfo;
//订单信息
var orderInfo;
//添加头部
function addFindString(){

  if( $(".find").length>0)
  $(".find").html('<li style="border: 0;"> <img class="tx" src="../image/tx.png"/> <div class="find-left"> <p class="name O_xdname">下单人：</p>'+
  ' <p class="style " style="color: #2b9f55;"><span class="style O_islt" data-value="普通|绿通|工程" >'+
  '货运类型：--</span>&nbsp;&nbsp;&nbsp; <span class="O_jcfy">费用：-</span>元</p> <p class="car">'+
  ' <i class="iconfont">&#xe605;</i> <i class="shijian O_xs" data-time="">限时：</i> <i class="iconfont">&#xe612;</i>'+
  ' <i class="num O_yytime">用车时间：</i> </p> </div> <a href="javascript:void(0)" class="rote"> <i class="iconfont">&#xe600;</i>'+
  '<span class="O_juli">距离：</span>km </a> </li>');
}
//毫秒转时间
function getTimes(time) {
      time = parseInt(time+"");
				var date = new Date(time);
				var leftTime = date.getTime();
				var d, h, m, s, ms;
        var string="";
				if(leftTime >= 0) {
					d = Math.floor(leftTime / 1000 / 60 / 60 / 24);
					h = Math.floor(leftTime / 1000 / 60 / 60 % 24);
					m = Math.floor(leftTime / 1000 / 60 % 60);
					s = Math.floor(leftTime / 1000 % 60);
					ms = Math.floor(leftTime % 1000);
          //将倒计时赋值到div中
          if(d!=0)
          string += d + "天";
            if(h!=0)
          string +=  h + "时";
            if(m!=0)
          string +=   m + "分";
            if(s!=0)
          string += s + "秒";
          if(string=="")
          return "0";
          else
          return string ;
				} else {
					  return "0";
				}

				//document.getElementById("_ms").innerHTML = ms + "毫秒";
				//递归每秒调用countTime方法，显示动态时间效果
			//	setTimeout(countTime, 50);
 }
 //计时器
function countTime(slong,elong,callback) {
				var date = new Date(slong);
				var now = date.getTime();
				var endDate = new Date(elong);//设置截止时间
				var end = endDate.getTime();
				var leftTime = end - now; //时间差
				var d, h, m, s, ms;
				if(leftTime >= 0) {
					d = Math.floor(leftTime / 1000 / 60 / 60 / 24);
					h = Math.floor(leftTime / 1000 / 60 / 60 % 24);
					m = Math.floor(leftTime / 1000 / 60 % 60);
					s = Math.floor(leftTime / 1000 % 60);
					ms = Math.floor(leftTime % 1000);
					if(ms < 100) {
						ms = "0" + ms;
					}
					if(s < 10) {
						s = "0" + s;
					}
					if(m < 10) {
						m = "0" + m;
					}
					if(h < 10) {
						h = "0" + h;
					}
          //将倒计时赋值到div中
          var str = "";
          if(d!=0)
  				str+= d + "天";
          if(h!=0)
  				str+= h + "时";
          if(m!=0)
  				str+= m + "分";
          if(s!=0)
  				str+= s + "秒";
  				//str+= ms + "毫秒";
          callback(str);
				} else {
          callback('');
				}

				//递归每秒调用countTime方法，显示动态时间效果
			//	setTimeout(countTime, 50);
 }
 //读取缓存
 function readCach(id){
	  if(isAppType==1){
		    $(id).html("0KB");
			return;
	  }
      api.getCacheSize(function(ret, err) {
            //size:        //缓存大小，单位为Byte，数字类型。（-1：无存储设备、-2：正在准备USB存储设备、-3：无法访问存储设备）
            var size = parseInt(ret.size/1024) + 'KB';
            var cacheSize = $api.byId('cacheSize');
            $(id).html(size);

    });
 }
 //清理缓存
 function clearnCach(id){
         api.clearCache(function() {
             api.toast({
                 msg: '清除完成'
             });
         });
         api.getCacheSize(function(ret, err) {
             var size = parseInt(ret.size/1024) + 'KB';
             var cacheSize = $api.byId('cacheSize');

         });
  };
 // 检查更新
function checkUpdate() {
    var mam = api.require('mam');
    mam.checkUpdate(function( ret, err ){
        if (ret) {
            if (!ret.status) {
                alerts('服务器繁忙，请稍后再试');
                return;
            }
            if (ret.result.update) {
                var updateTip;
                updateTip = ret.result.updateTip.replace(/\r\n/g,"<BR>");
                updateTip =updateTip.replace(/\n/g,"<BR>");
                layer.confirm('有新版本啦！<br/>最新版本:'+ret.result.version+'<br/>更新描述:<br/>'+updateTip+'<br/>发布时间:'+ret.result.time,
                {
                    title:'更新提示',
                    btn: ['立即更新','取消'] //按钮
                }, function(){
                        if (api.systemType == "android") {
                            api.download({
                                url : ret.result.source,
                                report : true
                            }, function(retdownload, err) {
                                if (retdownload && 0 == retdownload.state) {/* 下载进度 */
                                    api.toast({
                                        msg : "正在下载应用" + retdownload.percent + "%",
                                        duration : 2000
                                    });
                                }
                                if (retdownload && 1 == retdownload.state) {/* 下载完成 */
                                    var savePath = retdownload.savePath;
                                    api.installApp({
                                        appUri : savePath
                                    });
                                }
                            });
                        }
                        if (api.systemType == "ios") {
                            api.installApp({
                                appUri : ret.result.source
                            });
                        }
                }, function(){
                });
                return;
            } else {
                alerts('当前已是最新版本');
                return;
            }
        } else{
            alerts('服务器繁忙，请稍后再试');
            return;
        }
    });
}
 function secondToDate(leftTime) {
 				var d, h, m, s, ms;
        var str = "";

 				if(leftTime >= 0) {

 					d = Math.floor(leftTime / 1000 / 60 / 60 / 24);
 					h = Math.floor(leftTime / 1000 / 60 / 60 % 24);
 					m = Math.floor(leftTime / 1000 / 60 % 60);
 					s = Math.floor(leftTime / 1000 % 60);
 					ms = Math.floor(leftTime % 1000);
 					if(ms < 100) {
 						ms = "0" + ms;
 					}
 					if(s < 10) {
 						s = "0" + s;
 					}
 					if(m < 10) {
 						m = "0" + m;
 					}
 					if(h < 10) {
 						h = "0" + h;
 					}
           //将倒计时赋值到div中
           if(d!=0)
   				str+= d + "天";
           if(h!=0)
   				str+= h + "时";
           if(m!=0)
   				str+= m + "分";
           if(s!=0)
   				str+= s + "秒";

   				//str+= ms + "毫秒";
            return str;
 				} else {
            return str;
 				}

  }
  //
function secondToHour(leftTime) {
	 var d, h, m, s, ms;
	 var str = "";

	if(leftTime >= 0) {

		h = Math.floor(leftTime / 1000 / 60 / 60);
		if((leftTime / 1000 / 60 / 60)%60>0)
			h++;
			return h;
	} else {
	   return 0;
	}

}
 //input file 生成预览文件
function createFileImage(file,callback){
	 
	let reader = new FileReader();
	//新建 FileReader 对象
	reader.onload = function(){
	  // 当 FileReader 读取文件时候，读取的结果会放在 FileReader.result 属性中
 	  callback(this.result);
	};
	// 设置以什么方式读取文件，这里以base64方式
	reader.readAsDataURL(file);

}
   //数据保存
function saveData(callback){
  var params = $("#loginForm").serialize();
//  params = decodeURIComponent(params, true);
//  params = encodeURI(encodeURI(params));
  var flag=false;
  $("#loginForm").find("input").each(function(){
       if((""+$(this).attr("class")).indexOf("uploadtext")==-1&&$(this).val()==""&&!flag && typeof($(this).attr("placeholder"))!="undefined"&&$(this).attr("nocheck")!="true"){
          alerts($(this).attr("placeholder"));
          flag=true;
          return false;
      }
  });
  if(flag){
    return;
  }
  jsonPost("/save.do",params,function(data){
    if(typeof callback=="function")
       callback(data);
       alerts(data.error_msg);
       setTimeout(function(){$("#loginForm")[0].reset();},500);
       $("#touxiang").attr("src","./images/touxiang.png");
  });
}
//关闭搜索地址
function closeSearchMap(addr,lat,lon,all){
    // aMapSearchValue.close();
    // aMapSearchValue=null;
    $(".showMapSearch").hide();
    $("#searchMap").val("");
    jsonPost("/save.do",{
      reuse_noform:true,
       col_noform:"title",
       tb_noform:"boyun_huo_cache",
       uid_noform:true,
       title:encodeURI(addr),
       lat:lat,
       lon:lon,addr:encodeURI(all),uid:getStorage("userid")},function(){

    });
     if(aMapGetNumber==0){
      $("input[name='fhdz']").val(addr);
      $("input[name='fhrx']").val(lat);
      $("input[name='fhry']").val(lon);
      $("input[name='fhall']").val(all);
      $("#demo1").val(addr);
      layer.open({
       title:[$("#demo1").attr("placeholder"),'background-color:#ff7a01; color:#fff;'],
      content: '<div class="content-block"> <i class="iconfont" style="  color: #008b32;">'+
      '<img src="../image/mobile.png"></i> <input id="t_mobile"  value="'+userInfo.username+'"  type="number" maxlength="11" maxnum="11" oninput="splitInputValue(this,11)" placeholder="联系电话" />'+
      ' </div> <div class="content-block">'+
      ' <i class="iconfont" style=" top:12px;color: #008b32;">&#xe601;</i> '+
      '<input id="t_addr"type="text"   placeholder="（可不填）门牌号" /> </div>',
      shadeClose: false
      ,btn: '确定' ,yes: function(index){
             $("#fhrsjh").val($("#t_mobile").val());
              if($("#t_mobile").val()==""){
                alerts("请输入手机号");
             }else
              layer.close(index);if($(".shangc").length>0)$(".shangc").show();
              setTimeout(function(){
                var h = $(document).height()-$(window).height();
                $(document).scrollTop(h);
              },200);
       }
    });
    }else {
      $("input[name='shrdz']").val(addr);
      $("input[name='shrx']").val(lat);
      $("input[name='shry']").val(lon);
      $("input[name='shall']").val(all);

      $("#demo"+aMapGetNumber).val(addr);
      layer.open({
       title:[$("#demo1").attr("placeholder"),'background-color:#ff7a01; color:#fff;'],
      content: '<div class="content-block"> <i class="iconfont" style="  color: #008b32;">'+
      '<img src="../image/mobile.png"></i> <input id="t_mobile" value="'+userInfo.username+'"    type="number" maxlength="11" maxnum="11" oninput="splitInputValue(this,11)" placeholder="联系电话" />'+
      ' </div> <div class="content-block">'+
      ' <i class="iconfont" style=" top:12px;color: #008b32;">&#xe601;</i> '+
      '<input id="t_addr"type="text"   placeholder="（可不填）门牌号" /> </div>',
      shadeClose: false
      ,btn: '确定' ,yes: function(index){
             $("#shrsjh"+aMapGetNumber).val($("#t_mobile").val());
              $("#shall"+aMapGetNumber).val($("#shall"+aMapGetNumber).val()+$("#t_addr").val());
             $("input[name='shrsjh']").val($("#t_mobile").val());
             if($("#t_mobile").val()==""){
               alerts("请输入手机号");
             }else
             layer.close(index);
             if($(".shangc").length>0)$(".shangc").show();
             setTimeout(function(){
               var h = $(document).height()-$(window).height();
               $(document).scrollTop(h);
             },200);

       }
    });


      //新添加地址
      $("#shrdz"+aMapGetNumber).val(addr);
      $("#shrx"+aMapGetNumber).val(lat);
      $("#shry"+aMapGetNumber).val(lon);
      $("#shall"+aMapGetNumber).val(all);
      $("#demo"+aMapGetNumber).val(addr);
    }
}
function closeLoading(layers){
  layer.close(layers);
}
//系统自带加载
function showLoad(title){
  if(typeof title=="undefined")
    title="加载中······";
  api.showProgress({
      title: title
      ,text: '请稍后...',
  });
}
function hideLoad(){
  api.hideProgress();
}
//加载中
function loading()
{
  var lays= layer.open({
    type: 2
    ,content: '加载中',shadeClose: false
  });
  return lays;
}
//删除地图位置缓存项目
function delCacheItem(obj,id){
  jsonPost("/deleteuid.do",{id:id,tb:"boyun_huo_cache"},function(){
	  if(obj!=null)
		$(obj).parent().remove();
  });
}
//删除通用
function delUidContent(obj,id,tb){
  alertMsg("删除信息么？",function(){
    jsonPost("/deleteuid.do",{id:id,tb:tb,pic:""},function(){
		if(obj!=null)
			$(obj).parent().remove();
    });
  });

}

//关闭地图
function closeAllSearchMap(){
  //  aMapSearchValue.close();
  //  aMapSearchValue=null;
    $(".showMapSearch").hide();
    if($(".shangc").length>0)$(".shangc").show();
}
var aMapGetNumber=0;
var aMapSearchValue=null;
function showMaps_JS(key,num){
  if(num>-1){
    aMapGetNumber=num;
  }
  if($(".shangc").length>0)$(".shangc").hide();
  $("#container").html("");
   $(".showMapSearch").show();
   var map = new AMap.Map("container", {
       resizeEnable: true
   });
   AMap.service(["AMap.PlaceSearch"], function() {
       //构造地点查询类
       var placeSearch = new AMap.PlaceSearch({
          // type: '餐饮服务', // 兴趣点类别
           pageSize: 15, // 单页显示结果条数
           pageIndex: 1, // 页码
          // city: "010", // 兴趣点城市
           citylimit: true,  //是否强制限制在设置的城市内搜索
           map: map, // 展现结果的地图实例
         //  panel: "panel", // 结果列表将在此容器中进行展示。
           autoFitView: true // 是否自动调整地图视野使绘制的 Marker点都处于视口的可见范围
       });
       //搜索
       var lists=[];
       var cpoint = [parseFloat(getStorage("lon")), getStorage("lat")]; //中心点坐标
         $(".myArrList").html("");
            if(key=="")
            {
              getNewData("TranOrderController_44",{newApi:true,param:"{'p1':'"+getStorage("userid")+"'}"},function(data){

              $.each(data.data,function(k,v){
                 $(".myArrList").append('<li style="position:relative" data-lat="'+v.lat+
                 '"   data-lon="'+v.lon+
                 '" data-addr="'+v.addr+'"><h2 onclick="closeSearchMap(\''+v.title+'\',\''+v.lat+'\',\''+v.lon+'\',\''+v.addr+'\')">'+v.addr+'</h2><p onclick="closeSearchMap(\''+v.title+'\',\''+v.lat+'\',\''+v.lon+'\',\''+v.addr+'\')">'+v.title+
                 '</p><img src="../image/del.png" onclick="delCacheItem(this,\''+v.id+'\')" style="z-index:1000;width:20px;position:absolute;right:10px;top:25px;"><li>');
               });
            });
            //默认搜索周边信息
                placeSearch.searchNearBy('', cpoint, 200, function(status, result) {
                    $.each(result.poiList.pois,function(k,v){
                      var js = {};
                      js.id=v.address;
                      num++;
                      js.lon=v.location.lng;
                      js.lat=v.location.lat;
                      lists.push(js);

                      $(".myArrList").append('<li data-lat="'+v.location.lat+'" onclick="closeSearchMap(\''+v.name+'\',\''+v.location.lat+'\',\''+v.location.lng+'\',\''+v.pname+v.cityname+v.adname+v.address
                      +'\')"  data-lon="'+v.location.lng+'" data-addr="'+v.address+'"><h2>'+v.address+'</h2><p>'+v.name+'</p><li>');
                  });
               });
          }

        placeSearch.search(key,function(status,result){
          $.each(result.poiList.pois,function(k,v){
             var js = {};
             js.id=v.address;
             num++;
             js.lon=v.location.lng;
             js.lat=v.location.lat;
             lists.push(js);
             $(".myArrList").append('<li data-lat="'+v.location.lat+'" onclick="closeSearchMap(\''+v.name+'\',\''+v.location.lat+'\',\''+v.location.lng+'\',\''+v.pname+v.cityname+v.adname+v.address
             +'\')"  data-lon="'+v.location.lng+'" data-addr="'+v.address+'"><h2>'+v.address+'</h2><p>'+v.name+'</p><li>');
         });
        });

   });
   return map;
}
//合计费用计算中
function sumAllMoney(data){
  var heji =  parseFloat(data.jcfy)+parseFloat(data.bymoney)+parseFloat(data.gsmoney)+parseFloat(data.zccsmoney)+parseFloat(data.qtmoney)+parseFloat(data.xfmoney);
  return heji.toFixed(2);
}
//地图添加标记
function addMarker(map){
  var marker = new AMap.Marker({
            icon: "https://a.amap.com/jsapi_demos/static/demo-center/icons/poi-marker-default.png",
            position: [parseFloat(getStorage("lon")),parseFloat(getStorage("lat"))],
            offset: new AMap.Pixel(-13, -30)
   });
   marker.setMap(map);
   return marker;
}
//更新markter
function updateContent(marker,lon,lat,title) {

        if (!marker) {
            return;
        }

        // 自定义点标记内容
        var markerContent = document.createElement("div");
        // 点标记中的图标
        var markerImg = document.createElement("img");
        markerImg.className = "markerlnglat";
        markerImg.src = "https://a.amap.com/jsapi_demos/static/demo-center/icons/poi-marker-red.png";
        markerContent.appendChild(markerImg);

        // 点标记中的文本
        var markerSpan = document.createElement("span");
        markerSpan.className = 'marker';
        markerSpan.innerHTML = title;
        markerContent.appendChild(markerSpan);

        marker.setContent(markerContent); //更新点标记内容
        marker.setPosition([lon,lat]); //更新点标记位置
    }

//查找附近 的地址信息
function showMaps(key,num){
  if(num>-1){
    aMapGetNumber=num;
  }

   $(".showMapSearch").show();

    if(aMapSearchValue==null){
        aMapSearchValue=api.require('aMap');
    }

    aMapSearchValue.open({
        rect: {
            x: 0,
            y: 70,
            w: "auto",
            h: 200
        },
        showUserLocation: true,
        zoomLevel: 6,
        fixedOn: api.frameName,
        fixed: true
    }, function(ret, err) {
        if (ret.status) {
          //搜索
            $(".myArrList").html("");
               if(key=="")
               {
                 getNewData("TranOrderController_44",{newApi:true,param:"{'p1':'"+getStorage("userid")+"'}"},function(data){

                 $.each(data.data,function(k,v){
                    $(".myArrList").append('<li style="position:relative" data-lat="'+v.lat+
                    '"   data-lon="'+v.lon+
                    '" data-addr="'+v.addr+'"><h2 onclick="closeSearchMap(\''+v.title+'\',\''+v.lat+'\',\''+v.lon+'\',\''+v.addr+'\')">'+v.addr+'</h2><p onclick="closeSearchMap(\''+v.title+'\',\''+v.lat+'\',\''+v.lon+'\',\''+v.addr+'\')">'+v.title+
                    '</p><img src="../image/del.png" onclick="delCacheItem(this,\''+v.id+'\')" style="z-index:1000;width:20px;position:absolute;right:10px;top:25px;"><li>');
                  });
               });
                 key=$("#defKey").val();
             }
              aMapSearchValue.autocomplete({
                keyword: key
              }, function(ret) {
                if (ret.status) {
                    // alert(JSON.stringify(ret));
                    var lists=[];
                    var num=1;

                    $.each(ret.tips,function(k,v){
                        var js = {};
                        js.id=v.district+v.name;
                        num++;
                        js.lon=v.lon;
                        js.lat=v.lat;
                        lists.push(js);
                        $(".myArrList").append('<li data-lat="'+v.lat+'" onclick="closeSearchMap(\''+v.name+'\',\''+v.lat+'\',\''+v.lon+'\',\''+v.district+v.name+'\')"  data-lon="'+v.lon+'" data-addr="'+v.district+v.name+'"><h2>'+v.district+'</h2><p>'+v.name+'</p><li>');
                    });
                    //添加标注
                    aMapSearchValue.addAnnotations({
                        annotations: lists,
                      //  icons: ['widget://'],
                        draggable: true,
                        timeInterval: 2.0
                    }, function(ret) {
                        if (ret.eventType == 'click') {
                            //设置中心位置
                            $.each(lists,function(k,v){
                              if(v.id==ret.id){
                                  aMapSearchValue.setCenter({
                                      coords: {
                                          lon: v.lon,
                                          lat: v.lat
                                      },
                                      animation: false
                                  });
                                  //设置缩放
                                  aMapSearchValue.setZoomLevel({
                                      level: 18,
                                      animation: true
                                  });
                              }
                            })


                        }
                    });
                    //结束标注提娜姬
                }
              });
              //搜索结束
        } else {
            alert(JSON.stringify(err));
        }
    });
}
var  aMapNavigation=null;
//导航2
function runMapNavi2(lon,lat,elon,elat){

    aMapNavigation= api.require('aMapNavi');
    aMapNavigation.addEventListener(function(ret, err) {
        if(ret.eventType=="onArriveDestination"){
              //到达目的地
        }
    });
    aMapNavigation.startNavi({
      start: {
          name : '',
          lat: lat,
          lng: lon,
          poiId : ''
      },
      end: {
          name : '',
          lat: elat,
          lng: elon,
          poiId : ''
      }
      /*,
      carInfo:{
          carType : 1,
          carNumber : '京DFZ239',
          vehicleSize : 4,
          vehicleWidth : 2.1,
          vehicleHeight : 4,
          vehicleLength : 25,
          vehicleWeight : 99,
          vehicleLoad : 100,
          vehicleAxis : 6,
          vehicleLoadSwitch : false,
          restriction : true
      },*/
    });
}
//开始导航
function runMapNavi(lon,lat,elon,elat) {
    if(  aMapNavigation!=null){
        aMapNavigation.close();
          aMapNavigation=null;
    }
    aMapNavigation = api.require('aMapNavigation');
    var point = [];
    if(elon==0){
      point=elat;
      $.each(elat ,function(k,v){
         elon=v.lon;
         elat=v.lat;
      });
    }
    aMapNavigation.start({
        start: {
            lon: lon,
            lat: lat
        },
        wayPoint: point,
        end: {
            lon: elon,
            lat: elat
        },
        type: 'drive',
        strategy: 'fast',
        mode: 'GPS',
        styles: {
            image: {
                //  start: 'fs://nav/start.png',
                //    end: 'fs://nav/end.png',
                //  way: 'fs://nav/way.png',
                //  camera: 'fs://nav/camera.png'
            },
            preference: {
                night: false, //（可选项）布尔类型；是否显示黑夜模式；默认：false
                compass: true, //（可选项）布尔类型；是否显示指南针；默认：false
                crossImg: true, //（可选项）布尔类型；是否显示路口放大图，只适用于驾车导航；默认：false
                degree: 30, //（可选项）数字类型；地图倾角大小，范围[0,60]，大于40会显示蓝天；默认：30
                yawReCal: false, //（可选项）数字类型；偏航时是否重新计算路径；默认：true；android不支持。已废弃，默认重算
                jamReCal: true, //（可选项）数字类型；导航状态下屏幕是否一直开启；默认：false
                alwaysBright: true //（可选项）布尔类型；是否允许后台定位，暂仅支持 iOS 平台且只在iOS 9.0及之后起作用；默认：false，为 true 时必须保证 conifg.xml 文件内把后台定位和后台音频播放打开，否则会异常，具体操作见 config.xml 文件配置文档
            }
        }
    }, function(ret, err) {

        if (ret) {
            //alert(JSON.stringify(ret));
            /*
            {
                eventType: '',        //字符串类型；导航事件，取值范围：
                                            //calculateSuc  路径规划成功
                                            //calculateFai  路径规划失败
                                            //naviFai       导航发生错误
                                            //naviStart     导航页面推出并开始导航
                                            //naviEnd       达到目的地导航结束
                                            //naviClose     用户关闭导航页面
                routeInfo: {          //JSON对象；导航的路线信息，仅当 eventType 为 calculateSuc 时有值
                   length: ,          //数字类型；导航路径总长度（单位：米）
                   time: ,            //数字类型；导航路径所需要的时间（单位：秒）
                   segmentCount: ,    //数字类型；导航路线上分段的总数
                   trafficLightCount:,//数字类型；导航路线上红绿灯的总数
                   tollCost:          //数字类型；导航路线的花费金额（单位：元）
                }
            }
            */
        } else {
            //  alert(JSON.stringify(err));
            /*
            code:       //数字类型；错误码，取值范围如下：
                                //2     网络超时或网络失败
                                //3     起点错误
                                //4     协议解析错误
                                //6     终点错误
                                //10     起点没有找到道路
                                //11     没有找到通向终点的道路
                                //12     没有找到通向途经点的道路
                                //13     路径长度超过限制
                                //14     其他错误
            */
        }
    });
    return aMapNavigation;
}
// 关闭导航
function closeMapNavi() {
    aMapNavigation.close();
}
/*弹窗*/
function alerts(title) {
   if(typeof api !="undefined"){
    api.toast({
        msg: title,
        duration: 2000,
        location: 'middle'
    });
  }else {
    layer.open({
      content: title
      ,skin: 'msg'
      ,time: 2 //2秒后自动关闭
    });
  }
}
//是否为阿里云产品 初始化阿里云产品oss
var ossIsInitSuccess=false;
function getSisUser(callback){
  if(isAppType==0){
	  aliyunOss = api.require('aliyunStsOss');
	  aliyunOss.init({
		  url: domainUrl+'/getAliSis.do'
	  }, function(ret, err) {
		  if(ret) {
			//  alert(JSON.stringify(ret));
		  } else {
			///  alert(JSON.stringify(err));
		  }
	  });
  }
}
//阿里云 oSS上传
var aliyunOss=null;
function uploadOss(path,valueId,imgId ,callback){

    //阿里云文件名
    var prex = path.substring(path.lastIndexOf("."));
    var fileName="bucketsave"+getStorage("userid")+"/"+new Date().getTime()+prex;
    aliyunOss.upload({
        bucketName: aliyunBucketName,
        objectKey: fileName,
        file: path
    }, function(ret, err){

        if( ret ){
          if(ret.code=="200"){
               ret.url =  (ret.url).replace("http://oss-cn-hangzhou.aliyuncs.com/byhome",aliyunOssShowUrl);

                if(typeof valueId!="undefined"&&valueId!=null&&valueId!=""&&$("#"+valueId).length>0){
                   $api.byId(valueId).value = ret.url;
                 }
                  if(typeof imgId!="undefined"&&imgId!=null&&imgId!=""&&$("#"+valueId).length>0){
                   $("#"+imgId).attr("src",path);
                 }
                 if(typeof callback=="function"){
                   callback(ret.url,path);
                 }
                 if(typeof uploadCallback=="function"){
                   uploadCallback(ret.url,path);
                 }
                   hideLoad();
             }
        }else{
            console.log( JSON.stringify( err ) );
              hideLoad();
        }
        ossIsInitSuccess=true;
    });
}
//在阿里云下载获取URL
function getAliOss(fileName,callback){
  if(fileName.indexOf(".")==-1){

    callback(fileName);
  } else  if(fileName.indexOf("bucketsave")!=-1){

        if(!ossIsInitSuccess){
          setTimeout(function(){
              getAliOss(fileName,callback) ;
          },1000);
        }

        //获取文件名
        var name = fileName.substring(fileName.lastIndexOf("/")+1);
        aliyunOss.signAccessObjectURL({
            bucket: aliyunBucketName,
            objectKey:fileName,
          //  type: 0
        //    xOssProcess:'image/circle,r_100'
        }, function(ret, err){

            if( ret ){
              if(ret.code=200)
                callback( ret.url);
            }else{
                callback( "");
            }

        });
   }else{
     if(fileName.indexOf("http://")==-1||fileName.indexOf("https://")==-1)
        fileName=domainUrl+fileName;
        callback(fileName);
      //  return fileName;
    }
}
//秒杀产品
function replaceMiaoProduce(str, v) {
    if (typeof(v.taocan) == "undefined")
        return "";
    return str
        .replace(/\{id\}/ig, v.id)
        .replace(/\{hd\}/ig, (v.money > 0 ? "积分抵现" : (parseInt(v.taocan[0].price[0].p[0]) < parseInt(v.taocan[0].price[0].y[0]) ? "优惠活动" : "")))
        .replace(/\{dkjf\}/ig, (v.money))
        .replace(/\{dkje\}/ig, (v.space))
        .replace(/\{title\}/ig, v.proname)
        .replace(/\{showpic\}/ig, v.showpic).replace(/\{uuid\}/ig, (v.uuid))
        .replace(/\{pic\}/ig, ((v.pic[0].img + "" != "undefined") ? v.pic[0].img : v.pic[0]))
        .replace(/\{counts\}/ig, v.xscount)
        .replace(/\{detail\}/ig, v.detail)

    .replace(/\{progress\}/ig, keepTwoDecimal((v.xscount / v.taocan[0].price[0].s[0]) * 100))
        //秒杀数量price[0].l
        .replace(/\{count\}/ig, v.cbprice)
        .replace(/\{jifen\}/ig, v.taocan[0].price[0].j[0])
        .replace(/\{pic\}/ig, (v.pic[0].img + "" != "undefined") ? v.pic[0].img : v.pic[0])
        .replace(/\{money\}/ig, v.taocan[0].price[0].m[0])
        .replace(/\{yprice\}/ig, v.taocan[0].price[0].y[0]);
}
//四舍五入
function keepTwoDecimal(num) {
    var result = parseFloat(num);
    if (isNaN(result)) {
        alerts('传递参数错误，请检查！');
        return false;
    }
    result = Math.round(num * 100) / 100;
    return result;
}
//团购产品
function replaceTuanProduce(str, v) {
    if (typeof(v.taocan) == "undefined")
        return "";
    return str
        .replace(/\{id\}/ig, v.id)
        .replace(/\{hd\}/ig, (v.money > 0 ? "积分抵现" : (parseInt(v.taocan[0].price[0].p[0]) < parseInt(v.taocan[0].price[0].y[0]) ? "优惠活动" : "")))
        .replace(/\{dkjf\}/ig, (v.money))
        .replace(/\{dkje\}/ig, (v.space))
        .replace(/\{uuid\}/ig, (v.uuid))
        .replace(/\{jf\}/ig, (v.taocan[0].price[0].l) ? v.taocan[0].price[0].l[0] : "0")
        //组团人数
        .replace(/\{person\}/ig, v.grpcount)
        .replace(/\{title\}/ig, v.proname)
        //团购数量
        .replace(/\{count\}/ig, v.jifen)
        .replace(/\{showpic\}/ig, v.showpic)
        .replace(/\{pic\}/ig, (v.pic[0].img + "" != "undefined") ? v.pic[0].img : v.pic[0])
        .replace(/\{counts\}/ig, v.xscount)
        .replace(/\{detail\}/ig, v.detail)
        .replace(/\{jifen\}/ig, v.taocan[0].price[0].j[0])
        .replace(/\{money\}/ig, v.taocan[0].price[0].t[0])
        .replace(/\{yprice\}/ig, v.taocan[0].price[0].y[0]);
}
//普通产品
function replaceProduce(str, v) {
    if (typeof(v.taocan) == "undefined")
        return "";
    return str
        .replace(/\{id\}/ig, v.id)
        .replace(/\{hd\}/ig, (v.money > 0 ? "积分抵现" : (parseInt(v.taocan[0].price[0].p[0]) < parseInt(v.taocan[0].price[0].y[0]) ? "优惠活动" : "")))
        .replace(/\{dkjf\}/ig, (v.money))
        .replace(/\{dkje\}/ig, (v.space)).replace(/\{uuid\}/ig, (v.uuid))
        .replace(/\{title\}/ig, v.proname)
        .replace(/\{showpic\}/ig, v.showpic)
        .replace(/\{pic\}/ig, ((v.pic[0].img + "" != "undefined") ? v.pic[0].img : v.pic[0]))
        .replace(/\{counts\}/ig, v.xscount)
        .replace(/\{detail\}/ig, v.detail)
        .replace(/\{jf\}/ig, (v.taocan[0].price[0].l) ? v.taocan[0].price[0].l[0] : "0")
        .replace(/\{jifen\}/ig, v.taocan[0].price[0].j[0])
        .replace(/\{money\}/ig, v.taocan[0].price[0].p[0])
        .replace(/\{status\}/ig, (v.status == 1 ? '已评论' : '立即评论'))
        .replace(/\{yprice\}/ig, v.taocan[0].price[0].y[0]);
}
/*产品替换*/
function replaceAllProduce(temp, data, type) {
    var strings = "";
    $.each(data, function(k, v) {
        if (type == 0) {
            strings = strings + replaceProduce(temp, v);
        } else if (type == 1) {
            strings = strings + replaceMiaoProduce(temp, v);
        } else if (type == 2) {
            strings = strings + replaceTuanProduce(temp, v);
        } else {
            strings = strings + replaceProduce(temp, v);
        }

    });
    return strings;
}
//轮播图展示
function showSpic(temp, id) {
    $(id).append(replaceJsonKey(temp, indexBigPic.indexBigPic));
}
//图片替换
function replaceImagesWidth(string, num) {
    if (num == 1) {
        string = string.replace(/widthauto/ig, "width:100%;list-style: none; float:left;margin: 4px 1%;overflow: hidden;height: 100px;");
    } else if (num == 2) {
        string = string.replace(/widthauto/ig, "width:48%;list-style: none; float:left;margin: 4px 1%;overflow: hidden;height: 100px;");
    } else {
        string = string.replace(/widthauto/ig, "width:31.33%;list-style: none; float:left;margin: 4px 1%;overflow: hidden;height: 100px;");
    }
    return string;
}
//获取当前小时
function getHour() {
    var date = new Date();
    var h = date.getHours();
    return h;
}
//获取分钟
function getMinutes() {
    var date = new Date();
    var h = date.getMinutes();
    return h;
}
//获取秒
function getSeconds() {
    var date = new Date();
    var h = date.getSeconds();
    return h;
}
//时间截转化成时间 yyyy-MM-dd HH:mm:ss
function formatDateTime(timeStamp) {
    var date = new Date();
    date.setTime(timeStamp * 1000);
    var y = date.getFullYear();
    var m = date.getMonth() + 1;
    m = m < 10 ? ('0' + m) : m;
    var d = date.getDate();
    d = d < 10 ? ('0' + d) : d;
    var h = date.getHours();
    h = h < 10 ? ('0' + h) : h;
    var minute = date.getMinutes();
    var second = date.getSeconds();
    minute = minute < 10 ? ('0' + minute) : minute;
    second = second < 10 ? ('0' + second) : second;
    return y + '-' + m + '-' + d + ' ' + h + ':' + minute + ':' + second;
}
//时间比对
function activeStatus(times) {
    var bmstime = (times.split("~")[0]);
    var bmetime = (times.split("~")[1]);
    var nowTime = new Date();
    if (CompareNowDate(bmstime)) {
        return "活动未开始";
    } else if (CompareNowsDate(bmstime) && CompareNowDate(bmetime)) {
        return "活动进行中";
    } else {
        return "已结束";
    }
}

//时间比对
function activeStatus2(times) {
    var bmstime = (times.split("~")[0]);
    var bmetime = (times.split("~")[1]);
    var nowTime = new Date();
    if (CompareNowDate(bmstime)) {
        return "未开始报名";
    } else if (CompareNowsDate(bmstime) && CompareNowDate(bmetime)) {
        return "正在报名";
    } else {
        return "截止报名";
    }
}
//json 查找数组
function getQuery(json, keys, value) {
    var len = keys.length;
    var returnJson = [];
    var j = 0;
    var flag = false;
    $.each(json, function(k, v) {
        for (var i = 0; i < len; i++) {
            for (obj in v) {
                if (obj == keys[i] && v[obj].indexOf(value) != -1) {
                    returnJson.push(json[j]);
                    flag = true;
                    break;
                }
            }
            if (flag) {
                break;
            }
        }
        j++;
    })
    return returnJson;
}
//查找单挑
function getSelected(json, keys, value) {
    var len = keys.length;
    var returnJson = [];
    var j = 0;
    var flag = false;
    $.each(json, function(k, v) {
        for (var i = 0; i < len; i++) {
            for (obj in v) {
                if (obj == keys[i] && v[obj] == value) {
                    returnJson.push(json[j]);
                    flag = true;
                    break;
                }
            }
            if (flag) {
                break;
            }
        }
        j++;
    })
    return returnJson;
}
/*
时间比较
*/

function CompareDate(d1, d2) {
    return ((new Date(d1.replace(/-/g, "\/"))) > (new Date(d2.replace(/-/g, "\/"))));
}

function CompareNowsDate(d2) {
    return ((new Date(d2.replace(/-/g, "\/"))) < (new Date()));
}

function CompareNowDate(d2) {
    return ((new Date(d2.replace(/-/g, "\/"))) > (new Date()));
}

function getUrlVars(url) {
    var hash;
    var myJson = {};
    var hashes = url.slice(url.indexOf('?') + 1).split('&');
    for (var i = 0; i < hashes.length; i++) {
        hash = hashes[i].split('=');
        var values = hash[1];
        if(hash[1]=="password"){
          values= hex_md5("by"+values+"by");
        }
        myJson[hash[0]] = values;
    }
    return myJson;
}
//通用请求接口

function jsonPost(url, param, callback,booleans,path) {

    if (typeof booleans == 'undefined') {
        booleans = true;
    }else{
       booleans=false;
    }
    if (typeof param == 'string') {
        param = getUrlVars(param);
    }

    param.key_noform = appKey;
    if(url.indexOf("http://")==-1&&url.indexOf("https://")==-1){
      url = domainUrl+url;
    }
    if(booleans){
        loadingScroll();
    }
      param.id_noform = getStorage("userid");
    var postJson={
        values: param,
    };
    if(typeof(path)!="undefined"){
       postJson={
          values: param,
          files : {
              file :path
          }
      };
    }
    if(typeof api !="undefined"){
              api.ajax({
                url: url,
                method: 'post',
                timeout: 30,
                async: false,
                dataType: 'json',
                returnAll: false,
                data: postJson
            }, function(data, err) {

                if (data.error == 0) {
                    Mflag = true;
                    hideLoadingScroll();
                    callback(data);

                } else {
                    if((data.error_msg+"").indexOf("未登录")!=-1){
                       removeAttrbute("userid");
                       openwin("../html/login.html");
                    }

                    callback(data);
                    Mflag = false;
                    hideLoadingScroll();
                }
                setStorage("hideFoot","false");
                addHrefOpenAttr();
            });
    }else{
	  $.post(url,param,function(data){
		  if((data+"").indexOf("<html")!=-1){
			  console.log(data);
			  return;
		 }else{
			 
			  
		 }
        if (data.error == 0) {
            Mflag = true;
            hideLoadingScroll();
            callback(data);

        } else {
            if((data.error_msg+"").indexOf("未登录")!=-1){
               removeAttrbute("userid");
               openwin("../html/login.html");
            }
            callback(data);
            //Mflag = false;
            hideLoadingScroll();
        }
        setStorage("hideFoot","false");
        addHrefOpenAttr();
	  }); 
    }

}

//a 标签添加拦截
function addHrefOpenAttr() {
		if(isAppType==1){
			return;
		}
       // include_files(api);
        //链接 拦截器
        $("a").each(function() {
            var href = $(this).attr("href")+"";
            var clas = $(this).attr("class") + ""; //&&clas.indexOf("aui-tabBar-item")==-1
           //检测是否返回键
            if (href.indexOf("history.back") != -1) {
                $(this).attr("href", "javascript:void(0);");
                $(this).click(function() {
                    closeWin();
                });
                //添加a标签监听
            } else if (typeof(href) != "undefined" && clas.indexOf("del") == -1 && href.indexOf("add_collect") == -1 && href.indexOf("newuser") == -1 && href.indexOf("#") == -1
             && href != "" && href.indexOf("javascript") == -1 && href.indexOf("tel") == -1 && href.indexOf("/Wx/index/index.html") == -1 &&
                href.indexOf("add_buycar") == -1) {
                $(this).unbind("click");
                $(this).click(function() {
                    var titles = $(this).text();
                    if (typeof(href) != "undefined" && href != "" && href.indexOf("javascript") == -1) {
                        try {
                            href = getPath(href);
                            //Salert(href);
                            event.preventDefault();
                            event.stopPropagation();
                            openwin(href);
                        } catch (e) {}
                    } else {

                    }
                    openWxScrollFlag = true;
                    return true;
                });
            }
        });
}
//是否需要所图
var isSmallPic = false;
//正序方式
var orderType = true;
//点赞 累计增加 通用方法
function addClickCount(id,tb,col,type,obj,qx){
	if(typeof qx=="undefined")
		qx="";
  jsonPost("/userGood.do",{tb:tb,type:type,id:id,col:col,qx:qx},function(data){
  //  alerts(data.error_msg);
    if(typeof obj!="undefined"){
      var count = parseInt($(obj).text());
      if(data.error==1){
        count++;
      }else{
        count--;
      }
      $(obj).text(count);
    }
  });
}
function addClickUserCount(id,tb,col,type,obj,qx){
	if(typeof qx=="undefined")
		qx="";
  jsonPost("/addUserGoods.do",{tb:tb,type:type,id:id,col:col,name:qx},function(data){
    //alerts(data.error_msg);
    if(typeof obj!="undefined"){
      var count = parseInt($(obj).text());
      if(data.error==1){
        count++;
      }else{
        count--;
      }
      $(obj).text(count);
    }
  });
}
//json 转化 替换
function replaceJsonKey(temp, jsons) {
    var returnstr = "";
    var hhN = 1;

    $.each(jsons, function(k, v) {
         if (orderType)
             returnstr = replaceJsonKeys(temp,v)  + returnstr;
         else
             returnstr = returnstr + replaceJsonKeys(temp,v) ;
    });
    if (returnstr == "")
        return '<h1 style="text-align:center;font-size:16px; margin:15px auto;">已经没有了！??</h1>';
     return returnstr;
}
//json 转化 替换
function replaceJsonKeys(temp, v) {
    var returnstr = "";
    var hhN = 1;
    var string = temp;
    $.each(v, function(m, n) {
        if ($.isArray(n)) {
            var images_list = "";
            for (var l = 0; l < n.length; l++) {
                var patt1 = new RegExp("\{" + m + "_" + l + "\}", "ig");
                var im = n[l];
                var title="图片说明";
                if (typeof(im.img) != "undefined")
                    im = im.img;
                if (typeof(im.title) != "undefined"){
                    title = im.title;
                    //替换图片标题
                    var patt2 = new RegExp("\{" + m + "_title_" + l + "\}", "ig");
                    string = string.replace(patt2, title);
                }
                string = string.replace(patt1, im);
                if(im.indexOf("http")==-1)
                  images_list += '<li style="widthauto"><span><img  title="'+title+'" src="' +(typeof domainUrl !="undefined"?domainUrl:"")+ (isSmallPic ? getSmallPic(im) : im) + '"/></span></li>';
                else {//+"?x-oss-process=image/circle,r_100"
                  images_list += '<li style="widthauto"><span><img  title="'+title+'" src="' +im+ '?x-oss-process=image/quality,q_50"/></span></li>';

                }
            }
            var patt2 = new RegExp("\{" + m+"_list" + "\}", "ig");
            string = string.replace(patt2, JSON.stringify(n));
            images_list = replaceImagesWidth(images_list, n.length);
            var patt1 = new RegExp("\{" + m + "\}", "ig");
            string = string.replace(patt1, "<ul class='myPicListclass' style='list-style: none;' onclick='searchImages(this);'>" + images_list + "</ul>");
        } else {

            if ((m.indexOf("time") != -1 || m.indexOf("date") != -1)&&n.length>8) {
                 var patt1 = new RegExp("\{" + m + "\}", "ig");
                string = string.replace(patt1, calcTime(parseInt(n)));
                var patt2 = new RegExp("\{" + m + "_date\}", "ig");
                string = string.replace(patt2, new Date(parseInt(n)).toLocaleDates());
                var patt3 = new RegExp("\{" + m + "_time\}", "ig");
                string = string.replace(patt3, new Date(parseInt(n)).toLocalehour( ));

            } else {
              if(n.length<100&&n.substring(0,1)=="/"){
                n=n.toLowerCase();
                if(n.indexOf(".png")!=-1
                ||n.indexOf(".jpg")!=-1
                ||n.indexOf(".gif")!=-1
                ||n.indexOf(".jpeg")!=-1
                ||n.indexOf(".mp4")!=-1
                ||n.indexOf(".3gp")!=-1
                ||n.indexOf(".flv")!=-1
                ||n.indexOf(".rtmp")!=-1
                ||n.indexOf(".m3u8")!=-1
                ||n.indexOf(".mov")!=-1
                ||n.indexOf(".m4v")!=-1  ){
                  if(n.indexOf("http")==-1)
                        n=domainUrl+n;
                   else {
                //    images_list += '<li style="widthauto"><img  title="'+title+'" src="' +im+ '"/></li>';
					 
						n=n+"?x-oss-process=image/circle,r_100"; 
                  }
                }
              }
			  if(n.indexOf("aliyun")!=-1){ 
 			  if(n.indexOf(".mp4")!=-1||  n.indexOf(".3gp")!=-1
                ||n.indexOf(".flv")!=-1
                ||n.indexOf(".rtmp")!=-1
                ||n.indexOf(".m3u8")!=-1
                ||n.indexOf(".mov")!=-1
                ||n.indexOf(".m4v")!=-1 ){
					
				}else
					n=n+"?x-oss-process=image/quality,q_50"; 
			  }
                var patt1 = new RegExp("\{" + m + "\}", "ig");
                 if($("."+m+"_").length>0){
                  var slist = null;
                  if (($("."+m+"_").attr("data")+"").indexOf(",")!=-1) {
                    slist=($("."+m+"_").attr("data")+"").split(",")
                  }else{
                    slist=($("."+m+"_").attr("data")+"").split("|")
                  }
				  if(typeof slist[parseInt(n)]=="undefined")
					 string = string.replace(patt1, slist[slist.length-1]);
				  else 
					string = string.replace(patt1, slist[parseInt(n)]);
				//替换原始值
					var patt5 = new RegExp("\{" + m + "_val\}", "ig");
					string = string.replace(patt5, n);
                }else{
                  string = string.replace(patt1, n);
                }
                //自定义解析服务
                if(typeof jsonDefineCall =="function"){
                    string=jsonDefineCall(string,v);
                }
                var patt2 = new RegExp("\{utf8" + m + "\}", "ig");
                string = string.replace(patt2, encodeURI(n, "UTF-8"));
            }
            var patt1 = new RegExp("\{" + m + "_min\}", "ig");
            string = string.replace(patt1, (isSmallPic ? getSmallPic(n) : n));
        }

    });
    string = string.replace(/\{NUM\}/ig, hhN);
    hhN++;
    if (orderType)
        returnstr = string + returnstr;
    else
        returnstr = returnstr + string;
    if (returnstr == "")
        return '<h1 style="text-align:center;font-size:16px; margin:15px auto;">已经没有了！??</h1>';
    return returnstr;
}
//图片懒加载方法

function loadImg(id){
//.attr(值)
//.attr(属性名称,值)
  $(id).find("img").each(function(){
    var data = $(this).attr("data-src")+"";
    if(data!=null&&data!=""&&data!="undefined"){
     if(data.indexOf("http")==-1)
        $(this).attr('src', domainUrl+data) //把data-src的值 赋值给src
     else{
         $(this).attr('src', data) //把data-src的值 赋值给src
     }
      $(this).attr('data-isLoaded', 1) //已加载过的图片做标记
    }

  });
}
//自动替换
function eachforgrade(jsons, colums, temp) {
    var returnstr = "";
    if (colums == null || colums == "") {
        var hhN = 1;
        $.each(jsons, function(k, v) {
            var string = temp;
            $.each(v, function(m, n) {
                if ($.isArray(n)) {
                    var images_list = "";
                    for (var l = 0; l < n.length; l++) {
                        var patt1 = new RegExp("\{" + m + "_" + l + "\}", "ig");
                        var im = n[l];
                        if (typeof(im.img) != "undefined")
                            im = im.img;
                        string = string.replace(patt1, im);
                        images_list += '<li style="widthauto"><img src="' + (isSmallPic ? getSmallPic(im) : im) + '"/></li>';

                    }
                    images_list = replaceImagesWidth(images_list, n.length);
                    var patt1 = new RegExp("\{" + m + "\}", "ig");
                    string = string.replace(patt1, "<ul>" + images_list + "</ul>");
                } else {
                    if (m.indexOf("time") != -1 || m.indexOf("date") != -1) {
                        var patt1 = new RegExp("\{" + m + "\}", "ig");
                        string = string.replace(patt1, calcTime(n));
                    } else {
                        var patt1 = new RegExp("\{" + m + "\}", "ig");
                        string = string.replace(patt1, n);
                        var patt2 = new RegExp("\{utf8" + m + "\}", "ig");
                        string = string.replace(patt2, encodeURI(n, "UTF-8"));
                    }
                }
            });
            string = string.replace(/\{NUM\}/ig, hhN);
            hhN++;
            if (orderType)
                returnstr = string + returnstr;
            else
                returnstr = returnstr + string;
        })
    } else {
        var hhN = 1;
        $.each(jsons, function(k, v) {
            var string = temp;
            for (var i = 0; i < colums.length; i++) {
                if (colums[i] == "status") {
                    var patt1 = new RegExp("\{" + colums[i] + "\}", "ig");
                    string = string.replace(patt1, (v[colums[i]] == 0 ? "开启" : "<span style=\"color:red\">关闭</span>"));
                } else {
                    var n = v[colums[i]];
                    if ($.isArray(n)) {
                        var images_list = "";
                        for (var l = 0; l < n.length; l++) {
                            var patt1 = new RegExp("\{" + m + "_" + l + "\}", "ig");
                            var im = n[l];
                            if (typeof(im.img) != "undefined")
                                im = im.img;
                            string = string.replace(patt1, im);
                            images_list += '<li style="widthauto"><img src="' + (isSmallPic ? getSmallPic(im) : im) + '"/></li>';
                        }
                        images_list = replaceImagesWidth(images_list, n.length);
                        var patt1 = new RegExp("\{" + m + "\}", "ig");
                        string = string.replace(patt1, "<ul>" + images_list + "</ul>");
                    } else {
                        if (colums[i].indexOf("time") != -1 || colums[i].indexOf("date") != -1) {
                            var patt1 = new RegExp("\{" + colums[i] + "\}", "ig");
                            string = string.replace(patt1, calcTime(v[colums[i]]));
                        } else {
                            var patt1 = new RegExp("\{" + colums[i] + "\}", "ig");
                            string = string.replace(patt1, v[colums[i]]);
                            var patt2 = new RegExp("\{utf8" + colums[i] + "\}", "ig");
                            string = string.replace(patt2, encodeURI(v[colums[i]], "UTF-8"));
                        }

                    }
                }
            }
            string = string.replace(/\{NUM\}/ig, hhN);
            hhN++;
            if (orderType)
                returnstr = string + returnstr;
            else
                returnstr = returnstr + string;
        })
    }
    if (returnstr == "")
          return '<h1 style="text-align:center;font-size:16px; margin:15px auto;">已经没有了！??</h1>';
    return returnstr;
}
var temp_base_url = "/cache/public/template/{user}/{id}.jsp";
//显示mini图片
function getSmallPic(pic) {
    if (typeof(pic) == "undefined") {
        return "";
    }
    if (typeof(pic.img) != "undefined") {
        pic = pic.img;
    }
    pic = pic + "";
    var n_pic = pic.substring(0, pic.lastIndexOf("/") + 1) + "stu/" + pic.substring(pic.lastIndexOf("/") + 1);
    return n_pic;
}
//读取系统参数
function loadSystemConf(){
  if(getStorage("userid")!="0"){

   getNewData("TranOrderController_45",{newApi:true},function(data){
      try{
      var param=data.data[0].params;
      setStorage("config",JSON.stringify(param));
    }catch(e){}
  });
  }
}
//系统参数
function apps(){
  var par= getStorage("config");
   return eval("("+par+")");
}
//url 参数调用
 function parseQuery () {

      var query=(location.href+"").split("?")[1]+"";
       var reg = /([^=&\s]+)[=\s]*([^&\s]*)/g;
       var obj = {};
       while (reg.exec(query.replace(/#/ig,''))) {
           obj[RegExp.$1] = RegExp.$2;
       }
       if(typeof (obj.userid)!="undefined"&&obj.userid!=""){
         letCustomUserId=obj.userid;
       }
       return obj;
   }
//genuine条件替换
function eachforcondition(jsons, colums, temp, condition, value) {
    var returnstr = "";
    if (colums == null || colums == "") {
        var hhN = 1;
        $.each(jsons, function(k, v) {
            var string = temp;
            if (v[condition] == value) {
                $.each(v, function(m, n) {
                    if ($.isArray(n)) {
                        var images_list = "";
                        for (var l = 0; l < n.length; l++) {
                            var patt1 = new RegExp("\{" + m + "_" + l + "\}", "ig");
                            var im = n[l];
                            if (typeof(im.img) != "undefined")
                                im = im.img;
                            string = string.replace(patt1, im);
                            images_list += '<li style="widthauto"><img src="' + (isSmallPic ? getSmallPic(im) : im) + '"/></li>';
                        }
                        images_list = replaceImagesWidth(images_list, n.length);
                        var patt1 = new RegExp("\{" + m + "\}", "ig");
                        string = string.replace(patt1, "<ul>" + images_list + "</ul>");
                    } else {
                        if (m.indexOf("time") != -1 || m.indexOf("date") != -1) {
                            var patt1 = new RegExp("\{" + m + "\}", "ig");
                            string = string.replace(patt1, calcTime(n));
                        } else {
                            var patt1 = new RegExp("\{" + m + "\}", "ig");
                            string = string.replace(patt1, n);
                            var patt2 = new RegExp("\{utf8" + m + "\}", "ig");
                            string = string.replace(patt2, encodeURI(n, "UTF-8"));
                        }
                    }
                })
            } else
                string = "";
            string = string.replace(/\{NUM\}/ig, hhN);
            hhN++;
            if (orderType)
                returnstr = string + returnstr;
            else
                returnstr = returnstr + string;
        })

    } else {
        var hhN = 1;
        $.each(jsons, function(k, v) {
            var string = temp;
            if (v[colums[i]] == value) {
                for (var i = 0; i < colums.length; i++) {

                    if (colums[i] == "status") {
                        var patt1 = new RegExp("\{" + colums[i] + "\}", "ig");
                        string = string.replace(patt1, (v[colums[i]] == 0 ? "开启" : "<span style=\"color:red\">关闭</span>"));
                    } else {
                        var n = v[colums[i]];
                        if ($.isArray(n)) {
                            var images_list = "";
                            for (var l = 0; l < n.length; l++) {
                                var patt1 = new RegExp("\{" + colums[i] + "_" + l + "\}", "ig");
                                var im = n[l];
                                if (typeof(im.img) != "undefined")
                                    im = im.img;
                                string = string.replace(patt1, im);
                                images_list += '<li style="widthauto"><img src="' + (isSmallPic ? getSmallPic(im) : im) + '"/></li>';
                            }
                            images_list = replaceImagesWidth(images_list, n.length);
                            var patt1 = new RegExp("\{" + colums[i] + "\}", "ig");
                            string = string.replace(patt1, "<ul>" + images_list + "</ul>");
                        } else {
                            if (colums[i].indexOf("time") != -1 || colums[i].indexOf("date") != -1) {
                                var patt1 = new RegExp("\{" + colums[i] + "\}", "ig");
                                string = string.replace(patt1, calcTime(v[colums[i]]));
                            } else {
                                var patt1 = new RegExp("\{" + colums[i] + "\}", "ig");
                                string = string.replace(patt1, v[colums[i]]);
                                var patt2 = new RegExp("\{utf8" + colums[i] + "\}", "ig");
                                string = string.replace(patt2, encodeURI(v[colums[i]], "UTF-8"));
                            }
                        }
                    }

                }
            } else
                string = "";
            string = string.replace(/\{NUM\}/ig, hhN);
            hhN++;
            if (orderType)
                returnstr = string + returnstr;
            else
                returnstr = returnstr + string;
        })
    }
    if (returnstr == "")
          return '<h1 style="text-align:center;font-size:16px; margin:15px auto;">已经没有了！??</h1>';
    return returnstr;
}
var jsonTempCacheList = [];
//获取系统默认展示模板
function getJsonTemp(id, callback) {
    var flag = 0;
    $.each(jsonTempCacheList, function(k, v) {
        if (v.id == id) {
            flag = 1;
            callback(v.temp);
        }
    })
    if (flag == 0) {
        jsonPost(temp_base_url.replace(/\{id\}/ig, id).replace(/\{user\}/ig, $("#defaultUser").val()), {},
            function(text, status) {
                var p = {
                    id: id,
                    temp: text
                };
                jsonTempCacheList.push(p);
                callback(text);
            });
    }
}
//json数据获取
var t = {
    sql_name: "",
    t: "admin",
    u: "a",
    i: "no-id",
    s: "no-sql",
    p: "no-limit",
    ic: "no",
    c: "*",
    scroll_append_div: "",
    scroll_append_temp: "3",
    scroll_append_key: "styleid",
    scroll_append_val: "79",
    scroll_append_url: "",
    scroll_append_flag: false,
    maxnum: 2,
    scroll_append_callback: false,
    scroll_callback_function: null,
    scroll_open_pic: false,
    scroll_callback_forward_getdata: false
};
//过时取数据接口
function getJsonData(callback) {
    var url = ("/api/" + t.t + "/" + t.u + "/" + t.i + "/" + t.s + "/" + t.p + "/" + t.ic + "/" + t.c);
    jsonPost(url, {}, function(text, status) {
        callback(text);
    });
}
//过时取数据接口
function getJsonDatas(t, callback) {
    var url = ("/api/" + t.t + "/" + t.u + "/" + t.i + "/" + t.s + "/" + t.p + "/" + t.ic + "/" + t.c);
    jsonPost(url, {}, function(text, status) {
        callback(text);
    });
}
//时间转化计算
function calcTime(t) {
    var str = '';
    if (!isNaN(t)&&t) {
        var t1 = Date.parse(new Date(t));
        var t2 = Date.parse(new Date());
        var s = (t2 - t1);
        if (s < (86400000 * 15)) {
            var day = Math.floor(s / 86400000);
            var hour = Math.floor((s % 86400000) / 3600000);
            var minute = Math.floor((s % 86400000 % 3600000) / 60000);
            var seconds = Math.floor(s % 86400000 % 3600000 % 60000) / 1000;
            if (day > 0) {
                str = day + "天前";
                return str;
            }
            if (hour > 0) {
                str = hour + "小时前";
                return str;
            }
            if (minute > 0) {
                str = minute + "分钟前";
                return str;
            }
            if (seconds < 60) {
                str = "刚刚";
                return str;
            }
        } else {
            if ((t+"").indexOf(" ") != -1)
                return (t+"").substring(0, 16).split(" ")[0];
            else
                return new Date(t).toLocaleDate();
        }
    } else {
        return str;
    }
}
//展示JSON 字符串数据
function alertJson(json) {
    alert(JSON.stringify(json));
}
//收藏
function addCollect(list) {
    jsonPost("/template/disshop/action/addstore.jsp?d=" + Math.random(), list, function(responseText) {
        alerts(responseText.replace(/\r|\t|\n/ig, ""));
    });
}
//获取数据新api
function getNewData(name, json, callback,flags) {
    //(page_num*t.maxnum)+","+t.maxnum
      if(getStorage("userid")=="0"){

      }else if (json != null && json != "") {
        jsonPost("/sqlAction?sqlname=" + name, json, function(data) {
             if (data.res == 0) {
                callback(data)
            } else {

                callback(data)
              //   $(t.scroll_append_div).append('<h3 style="display:block;width:100%;text-align:center;font-size:13px">已经没有了</h3>');

            }
            load_swiper_flag = true;
        },flags);
    } else {
        jsonPost("/sqlAction?sqlname=" + name, {
            "param": "{'p1':" + (page_num * t.maxnum) + ",'p2':" + t.maxnum + "}"
        }, function(data) {
            if (data.res == 0) {
                callback(data)
            } else {
                 //$(t.scroll_append_div).append('<h3 style="display:block;width:100%;text-align:center;font-size:13px">已经没有了</h3>');
            }
            load_swiper_flag = true;
        },flags);
    }
}
/*收藏该网页*/
function addFootRemark(list) {
    /*
    var list = {zid:当前分类ID,tb:表,pid:终极分类ID,id:产品ID,price:价格,mytype:套餐类型, "UTF-8"),title:encodeURI(标题, "UTF-8"),pic:图片};
    */
    jsonPost("/template/disshop/action/addFootRemark.jsp?d=" + Math.random(), list, function(responseText) {
        //ds.dialog.tips(responseText.replace(/\r|\t|\n/ig,""),2,true,true);
    });
}
/*是否使用新API*/
var newDataApi = false;
/*滚动参数设置*/
var range = 50; //距下边界长度/单位px
var elemt = 500; //插入元素高度/单位px       //设置加载最多次数
var page_num = 1;
var totalheight = 0;
//是否有数据
var Mflag = true;

function getNoData() {
     $(t.scroll_append_div).html('<div style="margin:auto 30%;text-align:center">已经没有了</div>');
}


/*添加滚动事件*/
function addPageScroll(obj, dmv) {
    openWxHref();
    var w = window;
    var d = document;
    if (typeof obj != "undefined") {
        range = 10;
        w = obj;
        d = ".aui-friends-list";
    }
    if (typeof dmv != "undefined") {
        d = dmv;
    }
    //主体元素
    $(w).scroll(function() {
		
        var srollPos = $(w).scrollTop();
        totalheight = parseFloat($(w).height()) + parseFloat(srollPos);
        t.p = (page_num * t.maxnum) + "," + t.maxnum;
         if (($(d).height() - range) <= totalheight && Mflag) {
			
            if (Mflag) {
                loadingScroll();
                Mflag = false;
                if (t.scroll_callback_forward_getdata) {

                    t.scroll_callback_function(null);
                } else if (!newDataApi) {
                    //过时接口00
                    getJsonData(function(jsons) {
                        if (jsons.res == 0 && jsons.data && jsons.data.length > 0) {
                            //用户自定义模版
                            if (t.scroll_append_flag) {
                                $(t.scroll_append_div).append(eachforcondition(jsons.data, null, t.scroll_append_temp));
                                page_num++;
                                Mflag = true;
                                hideLoadingScroll();
                            } else {
                                //是否回调自定义方法
                                if (t.scroll_append_callback) {
                                    t.scroll_callback_function(jsons);
                                } else {
                                    //使用系统自带模版
                                    getJsonTemp(t.scroll_append_temp, function(data) {
                                        $(t.scroll_append_div).append(eachforgrade(jsons.data, null, data));
                                        page_num++;
                                        Mflag = true;
                                        hideLoadingScroll();
                                    })
                                }
                                loadingScrollPic();

                            }
                        } else {
                            hideLoadingScroll();

                        }
                        openWxHref()
                    })

                } else {
                    //新接口
                    getNewData(t.sql_name, null, function(data) {
                        $(t.scroll_append_div).append(replaceJsonKey(jsons.data, null));
                        page_num++;
                        Mflag = true;
                        hideLoadingScroll();
                    });
                }
            } else {
                loadingScroll();
                setTimeout(function() {
                    hideLoadingScroll();
                }, 500);
            }
        }
    });
}
/*加载图片特效*/
function loadingScrollPic() {
    if (t.scroll_open_pic) {
        $(t.scroll_append_div).find("img").each(function() {
            $(this).unbind();
            $(this).click(function() {
                $(this).zoomify('zoom');
            })
        })
    }
}
/*加载特效动画*/
function loadingScroll() {
   if(typeof api !="undefined")
    api.showProgress();
    /*api.showProgress({
           title: '正在处理...',
           text: '',
    });*/
}
/*隐藏加载特效*/
function hideLoadingScroll() {
 if(typeof api !="undefined")
    hideLoad();//隐藏加载进度框
}
/*初始化滚动*/
function initScroll() {
    page_num = 1;
    Mflag = true;
}
//开启微信模版监听
var openWxScrollFlag = true;
/*添加监听事件*/
function openWxHref() {

}
/*时间格式 扩展*/
Date.prototype.format = function(fmt) { //author: meizz
    var o = {
        "M+": this.getMonth() + 1, //月份
        "d+": this.getDate(), //日
        "h+": this.getHours(), //小时
        "m+": this.getMinutes(), //分
        "s+": this.getSeconds(), //秒
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度
        "S": this.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt))
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}

function location_href_to(obj) {
    location.href = "/wap" + t.scroll_append_url + "?id=" + $(obj).attr("data-id");
}
/*本地时间转化*/
function getLocalTime(nS) {
    return (new Date(parseInt(nS)).format('yyyy年M月d日'));
}
function getLocaldate() {
    return (new Date().format('yyyyMd'));
}
/*json替换*/
function jsonReplace(data, key, val) {
    var patt1 = new RegExp("\{" + key + "\}", "ig");
    return data.replace(patt1, val);
}
var page_num_now = 1;

function loadingDefaultData(val) {
    //remenfriend myFriends
    jsonPost("/sqlAction?sqlname=readMyDateTask", {
        "param": "{'p1':" + ((page_num_now - 1) * t.maxnum) + ",'p2':10}"
    }, function(data) {
        if (data.res == 0) {
            $(".defaultScrollDiv").append(replaceJsonKey($(".defaultScrollTemp").html(), data.data));
        } else {
            //alerts("");
        }
    });
}
/*初始默认滚动数据*/
function initDefault(val) {
    addPageScroll();
    t.maxnum = 10;
    loadingDefaultData(val);

    t.scroll_callback_function = function() {
        page_num_now++;
        loadingHongjiu();
    };
    t.scroll_callback_forward_getdata = true;
    loadingHongjiu();

}
function addSilide(title,succ,ids){
  if(typeof ids=="undefined"){
    ids="slider";
  }
  var slider = new FtSlider({
    id: ids,
    width: "100%",
    height: "100%",
    textMsg: title,
    successMsg: succ,
    callback: function(res) {
      $("#"+ids).html("");
      addSilide(title,succ,ids);
       if(typeof siliCallback=="function"&&res){
        siliCallback(res);
      }

    }
});
}
//保留两位小数  金钱转化
function toDecimal(x) {
   var f = parseFloat(x);
   if (isNaN(f)) {
     return;
   }
   f = Math.round(x*100)/100;
      return f;
 }
 //监听返回
 var indexListExit=false;
//初始化
var MP;
var closeNowWinObj=false;
//密码输入框
function callPassWord(title,callback){
  setStorage("hideFoot","true");
  isPwdInputTip=title;
  isPwdInput.open(function(data) {
      // 回调对象:取值范围如下
	  if(typeof data.pwd!="undefined"&&(data.pwd).length==6){
		   callback(data);
	  }
      //  pwd : 当前输入数字
      //  type : 0 = open ，1 = close
      if(data.type=="1"){
        setStorage("hideFoot","false");
      }
     
   });
}
//显示家谱成员
function showHomeMember(){
	searchHomeMember(function(data){
		 //请输入隐藏锁密码
		   callPassWord("请输入隐藏锁密码",function(pp){
			 if((pp.pwd+"")==data.pass){
				 isPwdInput.close();
				 updateTable("HomeController_19",{param:"{'p1':'0','p2':'','p3':'"+data.id+"'}"},function(dd){
					  alerts("设置成功！");
						reload();
				 });
			   }else{
				   alerts("密码错误！");
			   }
		   });
	});
  
}
//隐藏用户
function hideHomeMember(id){
	var pass1="0",pass2 =0;
	callPassWord("输入解锁密码",function(data){
		pass1=data.pwd;
		isPwdInput.close();
		setTimeout(function(){
		callPassWord("确认输入解锁密码",function(data){
			if(data.pwd==pass1){ 
				isPwdInput.close();
				updateTable("HomeController_19",{sql:"",param:"{'p1':'1','p2':'"+pass1+"','p3':'"+id+"'}"}
		,		function(data){  layer.close(index); alerts("设置成功");location.reload();});
			}else{
				 isPwdInput.close();
				 alert("两次密码不一致！");
			}
		});
		},500);
	});
}
//发送请求消息
function sendRegMsg(uids,content,types,callback){
	if(typeof types=="undefined")
		types=1;
	jsonPost("/sendSpaceContent.do",{uids:uids.replace("(","[").replace(")","]"),content:encodeURI(content),type:types},function(data){
			if(typeof callback=="function"){
				callback();
			}else{
				alerts("已成功发送请求！");
			}
	});
}
//立即上树
function isUpTree(bid,id,position){
		var ms="";
		var tid=0; 
		layer.open({
		  title:['设置树上显示',
		  'background-color:#8DCE16; color:#fff;'],
		  content:  '请选择位置：<select style="border:1px solid #CCC;background:#FFF;" name="qx" id="qx"><option value="0" selected="selected">第一位</option> <option value="1">第二位</option> <option value="2">第三位</option> </select>'
		  ,btn: ['确定', '取消']
		  ,yes: function(index){
			var qxval=$("#qx").find("option:selected").val();
			if($(".home"+bid+"_"+qxval).length>0){
			
				ms="是否要替换“"+$(".home"+bid+"_"+qxval).attr("data-name")+"”的位置？";
				tid=$(".home"+bid+"_"+qxval).attr("data");
			}
			if(ms!=""){
			layer.open({
				  title:['温馨提示',
				  'background-color:#8DCE16; color:#fff;'],
				  content: ms
				  ,btn: ['确定', '取消']
				  ,yes: function(index){ 
					updateTable("HomeController_17",{sql:"",param:"{'p1':'1','p2':'"+qxval+"','p3':'"+id+"'}"}
						,	function(data){  
							updateTable("HomeController_17",{sql:"",param:"{'p1':'0','p2':'0','p3':'"+tid+"'}"}
						,	function(data){  layer.close(index); alerts("设置成功");});
					   });
				  },no:function(index){
					 
						
				  }
				});
			  
			}else{
			   updateTable("HomeController_17",{sql:"",param:"{'p1':'1','p2':'"+qxval+"','p3':'"+id+"'}"}
				,	function(data){  
					layer.close(index);alerts("设置成功");
				});
			}
			
		  },no:function(index){
			layer.close(index);

		  }
		});
   }
//成员查询
function searchHomeMember(callback){
	 showAlertInput("请输入姓名",function(val){
		getSqlData("HomeController_20","",[getStorage("userid"),val] ,function(data){
			if(data==1){
				alerts("查询失败");
			}else{
				if(data.data.pid==0){
					//alerts("成员未注册！");
				}  
				if(data.data.status==1){
					//alerts("成员已被隐藏！");
				}  
				if(typeof callback=="function")
					callback(data.data);
				else
					hideController(data.data.id);
			}
			
		});
	 });
	 
}

//获取单条记录
function getSqlData(name,sql,json,callback){
	jsonPost("/query.do?name="+name,{"sql":sql,"param":dataToJson(json)},function(data){
		if(data.error==0){
			callback(data);
		}else{
			callback(1);
		}
	});
}
//更新数据通用
function updateSql(name,sql,json,callback){
   jsonPost("/update.do?t="+name,{"sql":sql,"param":dataToJson(json)},function(data){
    callback(data);
  });
}
//获取多条记录
function getSqlDataList(name,sql,json,callback){
	jsonPost("/queryList.do?name="+name,{"sql":sql,"param":dataToJson(json)},function(data){
		if(data.error==0){
			callback(data);
		}else{
			callback(1);
		}
	});
}
//新的数据结构转化
function dataToJson(json){
	var string=[];
	var i=1;
	$.each(json,function(k,v){
		string.push("'p"+i+"':'"+encodeURI(v)+"'");
		i++;
	});
	return (JSON.stringify(string)).replace("[","{").replace("]","}").replace(/\"/ig,"");
} 
//更新数据通用
function updateTable(sql,pram,callback){
   jsonPost("/update.do?t="+sql,pram,function(data){
    callback(data);
  });
}
//定义头部导航 状态来色彩
function hideOrShow(id,status)
{
    if(userInfo.pass==""||userInfo.pass=="0"){

        //打开键盘
         callPassWord("请设置隐藏锁密码",function(data){
            // 回调对象:取值范围如下
            //  pwd : 当前输入数字
            //  type : 0 = open ，1 = close
            if((data.pwd+"").length==6){
              saveTables({"tb_noform":"boyun_users","pass":data.pwd,"id":userInfo.id},function(data){
                isPwdInput.close();
                  alertMsg("是否隐藏该用户？",function(){
                            saveTables({"tb_noform":"boyun_home","status":status,"id":id},function(data){
                              alerts("已隐藏，可以在我的里开启隐藏。");
                          });
                  });
              });
          }
          });
        //关闭键盘
    }else{
        alertMsg("是否隐藏该用户？",function(){
          saveTables({"tb_noform":"boyun_home","status":status,"id":id},function(data){
            alerts("已隐藏，可以在我的里开启隐藏。");
        });
      });
  }
}
//是否加载用户信息
var isLoadUserInfo=true;
//初始化次数
apiready = function(){
  //添加 页面点击监听
  //开启云存储
  getSisUser(function(){});
  if(isAppType==0){
	  var systemType = api.systemType;
	  var systemVersion = api.systemVersion;  // 比如： 8.0
	  if(systemType=="android"&&parseFloat(systemVersion)<6&&myTopColor=="#FFFFFF"){
		myTopColor="#837c7c";
	  }
	  addTopColorPadding();
  }
  MP=parseQuery();
  if(isAppType==0){
	  api.addEventListener({
       name:'tap'
   }, function(ret, err){
     if(typeof appPageTapCallback =="function")
      appPageTapCallback();
   });
   }
      addHrefOpenAttr();
      //获取用户信息
	  if(isLoadUserInfo){
		  setTimeout(function(){

			getUserInfos();
		  },200);
	  }else{
		  if(typeof callBackUserInfo=="function"){
			  callBackUserInfo({});
		  }
	  }
      if($("#stime").length>0){
        $("#stime").val(new Date().getTime());
       }
      if(typeof callBackInit=="function"){
        callBackInit();
      }
      if(typeof api !="undefined"){
        //监听返回键
        if(indexListExit){
        var exitFlag = false;
        api.addEventListener({
            name: 'keyback'
        }, function(ret, err) {
          if(closeNowWinObj){
            if(typeof appBack=="function")
             appBack();
             return false;
          }
            if (!exitFlag) {
                api.toast({
                    msg: '再按一次退出应用',
                    duration: 2000,
                    location: 'bottom'
                }); 
                exitFlag = true;
            } else {
                api.closeWidget({
                    silent: true
                });
            }
            setTimeout(function() {
                exitFlag = false;
            }, 2000);
        });
      }else{
        api.addEventListener({name: 'keyback'
		}, function(ret, err){
               if(closeNowWinObj){
                 if(typeof appBack=="function")
                  appBack();
                  return false;
               }else{
					closeWin();
               }
        });
      }

      }
  /*  if($("#header").length>0){
      $api.fixStatusBar($api.byId('header'));
      if (api.systemType == 'ios') {
          $api.fixIos7Bar($api.byId('header'));
      }*/
	  if(isAppType==0){
		  var systemType = api.systemType;
		  var systemVersion = api.systemVersion;  // 比如： 8.0
		  if(systemType=="android"&&parseFloat(systemVersion)<6){

			api.setStatusBarStyle({
				style: 'light',//light dark
				color: 'transparent'
			});
		  }else{
			if(myTopColor=="#2b9f55"){
			  api.setStatusBarStyle({
				  style: 'light',//light dark
				   color: 'transparent'
			  });
			}else{
			  api.setStatusBarStyle({
				  style: 'dark',//light dark
				   color: 'transparent'
			  });
			}

		  }
	}
    //}
//transparent
    /*
   api.setCustomRefreshHeaderInfo({
    bgColor: '#C0C0C0',
    image: {
        pull: [
            'widget://timg.jpg',
            'widget://timg.jpg',
            'widget://timg.jpg'
        ],
        load: [
          'widget://timg.jpg',
          'widget://timg.jpg',
          'widget://timg.jpg'
        ]
    }
  }, function() {
      //下拉刷新被触发，自动进入加载状态，使用 api.refreshHeaderLoadDone() 手动结束加载中状态
      //下拉刷新被触发，使用 api.refreshHeaderLoadDone() 结束加载中状态
     location.reload();
     api.refreshHeaderLoadDone()
  });*/
};
XBack = {};

(function(XBack) {
    XBack.STATE = 'x - back';
    XBack.element;

    XBack.onPopState = function(event) {
        event.state === XBack.STATE && XBack.fire();
        XBack.record(XBack.STATE); //初始化事件时，push一下
    };

    XBack.record = function(state) {
        history.pushState(state, null, location.href);
    };

    XBack.fire = function() {
        var event = document.createEvent('Events');
        event.initEvent(XBack.STATE, false, false);
        XBack.element.dispatchEvent(event);
    };

    XBack.listen = function(listener) {
        XBack.element.addEventListener(XBack.STATE, listener, false);
    };

    XBack.init = function() {
        XBack.element = document.createElement('span');
        window.addEventListener('popstate', XBack.onPopState);
        XBack.record(XBack.STATE);
    };

})(XBack); // 引入这段js文件
//XBack.init();
//XBack.listen(function() {});
  //屏蔽返回键
 var appBackFlag=true;
//返回键监听
function goBack(){
   if(appBackFlag){
      winCloseFinish();
   }else{
     if(typeof appBack=="function"){
       appBack();
     }
   }
}
//追加统一样式
var isAppendCssFlag=true;
//追加统一样式
var myTopColor="#2b9f55";
function addTopColorPadding(){

  if(isAppendCssFlag){
    var htb=25;
    $("body").append('<style>.header-white{top:24px !important}body{border-top:24px solid '+myTopColor+' !important;}</style>'+
    '<div id="myhead_top" style="z-index:100000 ;position:fixed;top:0px;height:24px;left:0px;  width:100%;background:'+myTopColor+'">&nbsp;</div>');
  }
}
//关闭当前窗口
function winCloseFinish(value){
	if(isAppType==1){
		history.back(-1);
		return;
	}
    var extra={key1:"close"};
    if(typeof value!="undefined"){
      extra.value=value;
    }
    if(typeof api !="undefined"){
      api.sendEvent({
        name: getStorage("openFrame"),
            extra:extra
        });
      api.closeWin();
    }
    if(typeof wx !="undefined"){
      history.back(-1);
    	try{
    		wx.navigateBack({
    		  delta: 1
    		});
    	}catch(e){}
    }
}
//打开新窗口
var UIWebBrowser = null;
function openNewWin(url){
  UIWebBrowser = api.require('UIWebBrowser');
  $("body").append('<div onclick="closeOpenNewWin();" id="ccccc" style="position: fixed; z-index: 100000; top: 0px; left: 15px; font-size: 3rem; color: #FFF; width: 30px;">?</div>');
  UIWebBrowser.open({
      rect: {
          x: 0,
          y: 0,
          w: api.frameWidth,
          h: api.frameHeight
      },
      path: url,
      fixedOn: api.frameName,
      fixed: true
  }, function(ret) {
  });
}
function closeOpenNewWin(){
  if(UIWebBrowser!=null){
    UIWebBrowser.close();
    $("#ccccc").remove();
  }
}
//微信支付
function wxPay(money,title,callback){
      jsonPost("/wxSignPay.do",{money:money,title:encodeURI(title),"pid":getStorage("pid")},function(data){
        var json={
            apiKey: data.appId,
            orderId: data.prepay_id,
            mchId: data.mchId,
            nonceStr: data.nonceStr,
            timeStamp: data.timeStamp,
            package: "Sign=WXPay",
            sign: data.paySign
        };
          var wxPay = api.require('wxPay');
          wxPay.payOrder(json, function(ret, err) {
               if (ret.status)  {
                  //支付成功
                    callback(ret);
              } else {

              }
          });
      });
}
//充值
function chargeMoney(val){
	jsonPost( "/appCharge.do", {id:getStorage("userid"),money:val}, function(data) {
		if (data.error == 0) {
				//alerts("充值成功！");
		} else {
				//alerts(data.error_msg);
		}
	});
}
//支付宝支付 getStorage
function aliPay(money,title,callback){

  jsonPost("/aliSignPay.do",{money:money,body:encodeURI(title),charge:"notify","pid":getStorage("pid")},function(data){
        var aliPayPlus = api.require('aliPayPlus');
        var infos = data.message+'&sign='+ (data.sign);
       aliPayPlus.payOrder({
          orderInfo:   (infos)
      }, function(ret, err) {
          //console.log(JSON.stringify(ret));
          if(ret.code==9000)//支付成功
              callback(ret);
      });
  });
}
//
function WxPay_cus(money,title,callback){
		var id=new Date().getTime()+""+getStorage("userid"); 
		var jason=  {"userid":getStorage("userid"),"openId":userInfo.wxopenid,charge:"notify","name":(encodeURI("商城支付","UTF-8")),"id":id,"money":money,"title":(encodeURI(title,"UTF-8")),"pid":getStorage("pid")};
	   
		//alert(JSON.stringify(jason))
		$.post("/payWap",jason,function(datas){ 
			jsApiCall(datas,id,money,title,function(data){
				callback(data,id);
			});
		});
 }
//支付方法
function pay(money,callback){
    var v=$("input[name='pay']");
    var val=0;
    v.each(function(){
        if($(this).is(":checked")){
           val=($(this).val());
        }
    });
    if(val==0){
      val=1;
    }
    //提交数据
    if(val==1){
		if(isAppType==1){
			WxPay_cus(money.toFixed(2),'支付订单',function(data){
			//保存数据
			if(data==0)
			  callback({"error":0});
		  });
		}else{
			wxPay(money.toFixed(2),'支付订单',function(data){
			//保存数据
			  callback({"error":0});
		  });
		}
      
    }else if(val==2){
      
	  if(isAppType==1){
			
		}else{
		  aliPay(money.toFixed(2),'支付订单',function(data){
			//保存数据
			callback({"error":0});
		  });
		}
    }else{
        jsonPost("/appConsume.do",{money:money.toFixed(2)},function(data){
            if(data.error==0){
              callback({"error":0});
            }else{
              alerts(data.error_msg);
            }
        })
    }
}
//XBack.init();
//XBack.listen(function() {});
/**
 *	判断APP是否持有该权限
 * @param array   one_per  	- 权限数组['camera','location']
 */
 //获取权限
function hasPermission(one_per) {
    var rets = api.hasPermission({
        list: one_per
    });

	//获取需要判断的权限
	var temp = new Array();
	var status = true;
	for (var obj in rets) {
		var granted = rets[obj].granted;
		var names = rets[obj].name;
		if (granted == false) {
			temp.push(names);
			status = false;
		}
	}
	//返回结果，和需要申请的权限
    return  { "status": status, "perms": temp };
}

/**
 *	获取权限
 * @param array		one_per  	- 权限数组['camera','location']
 * @param function  callback  	- 回调函数
 */
function reqPermission(one_per,callback) {
   if(typeof api =="undefined"){
    return;
  }
    api.requestPermission({
        list: one_per,
        code: 100001
    }, function(ret, err) {

		//获取处理结果
		var list = ret.list;
		for (var i in list) {
			//只有有一项权限不足，就返回
      console.log(list[i].granted+"--"+list[i]);
			if (list[i].granted == false) {
				api.toast({
				    msg: '权限不足，无法进行下一步操作',
				    duration: 2000,
				    location: 'bottom'
				});
				return false;
			}
		}

        if (callback) {
            callback();
            return;
        }
    });
}

/**
 * 判断是否持有数组中的权限，无权限获取对应的权限
 * @param array		perm	  	- 权限数组['camera','location']
 * @param function  callback  	- 回调函数
 */
function confirmPer(perm, callback) {
	//权限类型有
	//calendar日历，camera相机，contacts通讯录，location位置信息，microphone麦克风
	//phone电话，sensor身体传感器，sms短信，storage存储空间，photos相册
 	//ios系统直接跳过
	//判断多个权限是，使用 ,（英文逗号隔开）
    if (perm.indexOf(",") != -1) {
        var perms = perm.split(',');
    } else {
		    var perms = new Array(perm);
    }

	//判断是否持有该数组中的权限
    var has = hasPermission(perms);
     if (!has.status) {
		    //获取权限
        reqPermission(has.perms,callback);
        return false;
    }

	  callback();
    return true;
}
