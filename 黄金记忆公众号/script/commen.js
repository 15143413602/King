//�ƶ��ռ� ���� ͨ��div
///����Ԫ�ػ����߿�
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
		//����ͼƬ��Ч*/
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
			}, 2000);//�������ó�����Ӧʱ��
		}); 
		_block.addEventListener('touchmove', function(e) {
			e.preventDefault();$('#'+dragDivId).show();
			var _left = parseInt(e.touches[0].clientX);
			var _top = parseInt(e.touches[0].clientY);

			var _need_left = _div_left + (_left - _init_left);
			var _need_top = _div_top + (_top - _init_top);

			//���_block�Ƿ񻹴��ڿ�������
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
  			//���Ԫ���Ƿ���ϱ�ע
			obj.each(function(){
				var left =$(this).offset().left,top=$(this).offset().top;
 				if((nowDivLeft>left&&nowDivLeft<left+divComWidth)&&(nowDivTop>top&&nowDivTop<top+divComHeight)){
					
					//�ص� �϶��¹�
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
//��ʼ��ϵͳ����
function initSysFooter(){
	var json=[{"url":"html/index.html","ico":"aui-icon-home","name":"��ҳ"},
	{"url":"msg.html","ico":" aui-icon-note","name":"��Ϣ"},
	{"url":"quan.html?type=public","ico":"aui-icon-wechat-circle","name":"���ڷ���"},
	//{"url":"html/list.html","ico":"aui-icon-menu","name":"�б�"},
	{"url":"html/huiyuan_hz.html","ico":"aui-icon-my","name":"��Ա"}
	];
	addFooters(json);
}
//��ӵײ�����
function addFooters(json){
	var string=' <footer class="aui-bar aui-bar-tab"  style="z-index:100001;border-top:1px solid #CCC" id="footer">';
	var i=1;
	//ѡ��
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
//�����ܴ���
function hideController(id){
	console.log(id);
	var pass1="0",pass2 =0;
	callPassWord("�����������",function(data){
		pass1=data.pwd;
		isPwdInput.close();
		setTimeout(function(){
		callPassWord("ȷ�������������",function(data){
			if(data.pwd==pass1){ 
				isPwdInput.close();
				updateTable("HomeController_19",{sql:"",param:"{'p1':'1','p2':'"+pass1+"','p3':'"+id+"'}"}
		,		function(data){  layer.closeAll(); alerts("���óɹ�");
		        location.reload();
		});
			}else{
				 isPwdInput.close();
				 alert("�������벻һ�£�");
			}
		});
		},500);
	});
}
// �����
function showAlertInput(msg,callback,type){
	if(typeof type=="undefined"){
		type="text";
	}
	layer.open({
	  title:[msg,
	  'background-color:#8DCE16; color:#fff;'],
	  content:  '<input type="'+type+'" placeholder="'+msg+'" style="text-indent:1em;border: 1px solid #CCC; height: 40px; width: 100%;" value="" id="myHomeAlertInput">'
	  ,btn: ['ȷ��', 'ȡ��']
	  ,yes: function(index){ 
		if($("#myHomeAlertInput").val()==""){
			alerts("������");
		}else{
			callback($("#myHomeAlertInput").val());
			layer.close(index); 
		}
	  },no:function(index){
		layer.close(index); 
	  }
	});
}
//�����¼�
//�Ƿ��϶�
var isDragFlag=true;
//��ӳ����¼�
var time_touch = 0;//��ʼ����ʼʱ��
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
			}, 2000);//�������ó�����Ӧʱ��
		});

		objs.on('touchend', function(e){
			e.stopPropagation();
			clearTimeout(time_touch);
		});
	});
}
//app �����̨��
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
  //Ӧ���˳�
   /*api.addEventListener({
      name:'resume'
  }, function(ret, err){
      if(getStorage("appBackRunFlag")=="false"){
        playSpeek("��ӭʹ�ó���ͨAPP��");
      }
  });*/
  //��ʼ�����ƴ洢
  //var oss = api.require('aliCloudOss');
  //oss.init();
}
//�������
function openPassWin(pwd,callback){
  //pwdInput
  //�򿪼���
    var isPwdInput = api.require('pwdInput');
    isPwdInput.open(function(data) {
        // �ص�����:ȡֵ��Χ����
        //  pwd : ��ǰ��������
        //  type : 0 = open ��1 = close
        console.log(data)
    });
    //�رռ���
    isPwdInput.close();
}
//����ͷ����Ϣ
function setHeaderTitle(){
  $("title").html(appTitle);
  $(".logo").html(appTitle);
}
//����
function screenLight(){
  //������Ļ
  /*setInterval(function(){
    try{
    var sw = api.require('screenWake');
     sw.addScreenWake();
    }catch(e){}
  },4000);*/
  //��Ļ����
  api.setKeepScreenOn({
    keepOn: true
});
}
var payNowing=true;
//���ź�������
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
//�����½��Ϣ
function setAttribute(name, value) {
    //��¼����
    //api.sendEvent�㲥��¼�ɹ��¼�
    /*api.sendEvent({
       name: 'loginSuccess'
    });*/
    if(typeof api =="undefined"){
      return;
    }
    //api.setPrefs���õ�¼�ɹ�״̬
    api.setPrefs({
        key: name,
        value: value
    });
    //�޸Ľ���
    //api.addEventListener������¼�ɹ��¼�����ִ�вſ���Ч��
    /*api.addEventListener({
        name: 'loginSuccess'
    }, function(ret, err){
        if( ret ){
            //ִ�е�¼�ɹ����ָ��
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
//�洢�û���Ϣ
function getAttribute1(name, callback) {
    //api.getPrefs��ȡ��ǰ��¼״̬
    api.getPrefs({
        key: name
    }, function(ret, err) {
        //��ƫ��������δ���û��������ú��Ƴ��󣬷���ֵ(ret.value)��Ϊ�ա�
        var val = ret.value;
        if (val && val != "") {
            //�ѵ�¼
            callback(0, ret.value);
        } else {
            //δ��¼
            callback(1, 'δ��¼��');
        }
    });
}

 function getAttribute(name, callback) {

    //api.getPrefs��ȡ��ǰ��¼״̬
    var val =  getStorage(name);

    if (val!=0 && val != "") {
        //�ѵ�¼
        callback(0,val);
    } else {
        //δ��¼
      // if(getStorage("isopenLoginFlag")=="true"){
            //setStorage("isopenLoginFlag",false);
            //openwin('./html/loginU.html');
      //  }
        callback(1, 'δ��¼��');
    }
}
//�����û���Ϣ
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
//�ַ�������ȡ
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
//�Ƴ��û�������
function removeAttrbute(name){
    api.removePrefs({key:name});
}
//�Զ�����λ����Ϣ
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
                  //��
                  if($(".L_city").length>0){
                    $(".L_city").val(rets.city);
                    $(".L_city").html(rets.city);
                  }
                  //ʡ
                  if($(".L_state").length>0){
                    $(".L_state").val(rets.state);
                    $(".L_state").html(rets.state);
                  }
                  //��
                  if($(".L_district").length>0){
                    $(".L_district").html(rets.district);
                    $(".L_district").val(rets.district);
                  }
                  //�ֵ�
                  if($(".L_street").length>0){

                    $(".L_street").html(rets.street);
                    $(".L_street").val(rets.street);
                  }
                  //�ֵ�����
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
//ѭ��λ�ò�ѯ
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

//����ѡ��
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
//��ȡ��֤��
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
                    obj.html("ʣ��" + times + "s");
                    obj.val("ʣ��" + times + "s");
                    if (times == 0) {
                        clearInterval(inteval);
                        initYzm();
                        obj.html("��ȡ��֤��");
                        obj.val("��ȡ��֤��"  );
                        times = 60;
                    }
                }, 1000)
            }
        });
    });
}
//��ȡ������oss ʱ��
function getIosTIme(){
	var d = new Date();
	d.setHours(d.getHours(), d.getMinutes() - d.getTimezoneOffset());
	return(d.toISOString())
}
//ʱ���ʽ��
function dateFormat(fmt, date) {
    let ret;
    const opt = {
        "Y+": date.getFullYear().toString(),        // ��
        "m+": (date.getMonth() + 1).toString(),     // ��
        "d+": date.getDate().toString(),            // ��
        "H+": date.getHours().toString(),           // ʱ
        "M+": date.getMinutes().toString(),         // ��
        "S+": date.getSeconds().toString()          // ��
        // ��������ʽ���ַ�������Լ�����ӣ�����ת�����ַ���
    };
    for (let k in opt) {
        ret = new RegExp("(" + k + ")").exec(fmt);
        if (ret) {
            fmt = fmt.replace(ret[1], (ret[1].length == 1) ? (opt[k]) : (opt[k].padStart(ret[1].length, "0")))
        };
    };
    return fmt;
}
//���΢�Ŷ� ���ػ�������
function addWxToken(){
	jsonPost("/tkAction", {
    url: location.href
	},function(data) {
		wx.config({
			debug: false,
			// ��������ģʽ,���õ�����api�ķ���ֵ���ڿͻ���alert��������Ҫ�鿴����Ĳ�����������pc�˴򿪣�������Ϣ��ͨ��log���������pc��ʱ�Ż��ӡ��
			appId: data.appId, 
			// �����ҵ�ŵ�Ψһ��ʶ���˴���д��ҵ��corpid
			timestamp: data.timestamp, 
			// �������ǩ����ʱ���
			nonceStr: data.noncestr,
			// �������ǩ���������
			signature: data.signature,
			// ���ǩ��������¼1
			jsApiList: ["onMenuShareTimeline", "onMenuShareAppMessage", "onMenuShareQQ", "chooseImage", "previewImage", "chooseWXPay","uploadImage", "downloadImage", "scanQRCode"]
		});
		});
}

//���ϵͳ
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
//����֧��
function jsApiCall(params,id,money,title,callback){
	  if((params.mweb_url+"").indexOf("http")!=-1){ 
		$("#myiframe").attr("src",params.mweb_url+"&redirect_url="+encodeURI("a."+document.domain+"://"));
	  }else{
 		  wx.chooseWXPay({
				timestamp: params.timeStamp, // ֧��ǩ��ʱ�����ע��΢��jssdk�е�����ʹ��timestamp�ֶξ�ΪСд�������°��֧����̨����ǩ��ʹ�õ�timeStamp�ֶ������д���е�S�ַ�
				nonceStr: params.nonceStr, // ֧��ǩ��������������� 32 λ
				package: params.package, // ͳһ֧���ӿڷ��ص�prepay_id����ֵ���ύ��ʽ�磺prepay_id=***��
				signType: params.signType, // ǩ����ʽ��Ĭ��Ϊ��SHA1�䣬ʹ���°�֧���贫���MD5��
				paySign: params.paySign, // ֧��ǩ��
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
//��ʼ��
$(function() {
	
	//��ǰƽ̨
	if(isAppType==1){
		//����ײ�����
		initSysFooter();
		setTimeout(function(){addWxToken();},600);
		apiready();
		//����ɨ��
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
//ж��״̬����
function getOrderStatus(status){
  var string="δ���";
  if(status==1&&orderInfo.paystatus==2){
      string="�Ѹ���";
  }else  if(status==1){
       string="δ����";
  }else   if(status==2){
        string="��װ��";
  }else   if(status==3){
      string="װ�����";
  }else   if(status==4){
    string="����Ŀ�ĵ�";
  }else   if(status==5){
    string="���տ�";
  }else   if(status==6){
    string="������";
  }else  if(status==7){
      string="������";
  }else if(status==-1){
    string="��ȡ��";
  }else if(status==-2){
    string="���˿�";
  }else{
    string="������";
  }
  return string;
}
//�����˶��� �鿴��ת
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
      //string="�Ѹ���";
  }else  if(status==1&&v.paystatus==1){
       string='pay1.html?id='+MP.id+"&type="+islt+"&money="+v.jcfy+"&bzj="+bzj;
  }else   if(status==2){
      //  string="��װ��";
      string='xiadian-detail.html?id='+id;
  }else   if(status==3||status==3){
    //  string="װ�����";
    string='xiadian-detail.html?id='+id;
  }else   if(status==4){
  //  string="����Ŀ�ĵ�";
    string='xiadian-detail.html?id='+id;
  }else   if(status==5){
  //  string="ж�����";
    string='xiadian-detail.html?id='+id;
  }else   if(status==6){
    //string="������";
    string='pingjia.html?id='+id;
  }else  if(status==7){
     //    string="������";
  }else if(status==-1){
      //  string="��ȡ��";
  }else if(status==-2){
    //string="���˿�";
  }else{
  //  string="������";
  }
  return string;
}
//�û�����½
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
//��֤���½ yzm_noform
function loginUserOfCode(callback) {
    loginUser(function(data){
       callback(data);
    });
}
//�ı��� ��֤���ݳ���
function splitInputValue(obj,len){
   if(obj.value.length>len)
      obj.value=obj.value.slice(0,len)
}
//�û�ע��
function userReg(callback) {
  var  pass = $("input[name='password']");
  if($("#name").val()==""){
	  alerts("�������������ǳƣ�");
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
//�û��޸�����
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
//�޸��û���Ϣ
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
//��������  uid�� Ϊ��  reuse_noform:true
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
//��ȡϵͳ����
function getSystem(name,callback){
  jsonPost("/getSystemParam.do",{name:name},function(data){
      callback(data);
  })
}
//�����û�����Ϣ
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
//΢�ŵ�½
function wxLogin(){
  var wx = api.require('wx');
  wx.auth({
      apiKey: ''
  }, function(ret, err) {
      if (ret.status) {
          //��Ȩ�ɹ�
          //��ȡtoken
          wx.getToken({
              code: ret.code
          }, function(ret, err) {
              if (ret.status) {
                  //��ȡ�û���Ϣ
                  wx.getUserInfo({
                      accessToken: ret.accessToken,
                      openId: ret.openId
                  }, function(ret, err) {
                    //����û���Ϣ
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
//�˳���½
function loginOut(name) {

    api.removePrefs({
        key: name
    });
    /*
    //�ǳ�����
      //api.sendEvent�㲥�ǳ��ɹ��¼�
      api.sendEvent({
          name: 'logoutSuccess'
      });
      //api.removePrefs�Ƴ���¼״̬
      api.removePrefs({
          key: 'loginStatus'
      });
      //�޸Ľ���
      //api.addEventListener�����ǳ��ɹ��¼�����ִ�вſ���Ч��
      api.addEventListener({
          name: 'logoutSuccess'
      }, function(ret, err){
          if( ret ){
              //ִ�еǳ��ɹ����ָ��
          }
      });
    */
}
//�����ļ�
/**
ʹ�� apicloud ʵ��  include ����
���� api Ϊ apiready = function() {...} �Ĵ������� api
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
                $(file_data).appendTo(ele); //���ļ�������ӵ� include ��ǩ����
            } else {
                alert(err.msg);
            }
        })
    })
}
//��ȡ·��
function getPath(file_name) {
  if(file_name.indexOf("http")!=-1)
    return file_name;
    var wgtRootDir = "../html/"; //��������Ŀ¼
    var file_path = wgtRootDir + file_name; //ƴ���ļ�������·��
    if (file_name.indexOf("/html/") != -1)
        file_path = file_name;
    return file_path;
}
//ϵͳ������
function Salert(msg, title) {
    if (typeof(title) == "undefined" || title == null || title == "") {
        title = "��ʾ";
    }
    api.alert({
        title: title,
        msg: msg,
        buttons: ['ȷ��']
    }, function(ret, err, message) {
        if (ret.buttonIndex == 1) { //���ȷ���˳�Ӧ��
            api.closeWidget({
                id: api.appId,
                silent: true //ֱ���˳�
            });
        }
    });
}
//������Ϣ
function pushFriend(id,callback){
	jsonPost("/pushSpaceMsg.do",{sql:"("+id+")",
	  content:encodeURI("���ļ����Ա��"+userInfo.name+"�������˹���������Ϣ��")},function(data){
		  if(typeof callback=="function"){
			  callback(data);
		  }
	  });
}
//���¼���ҳ��
function reload(){
	setTimeout(function(){
		location.reload();
		
	},1000);
}
//������Ϣ��ʾ
function alertMsg(msg,callback,title) {
    if (typeof(title) == "undefined" || title == null || title == "") {
        title = "��ܰ��ʾ";
    }
	if(typeof api!="undefined"){
		api.confirm({
			title: title,
			msg: msg,
			buttons: ['ȷ��','ȡ��']
		}, function(ret, err, message) {
			if (ret.buttonIndex == 1) { //���ȷ���˳�Ӧ��
				callback();
			}
		});
	}else{
		layer.open({
				  title:[title,
				  'background-color:#8DCE16; color:#fff;'],
				  content: msg,  anim: 'up'  
				  ,btn: ['ȷ��', 'ȡ��']
				  ,yes: function(index){ 
					  callback();
					  layer.close(index); 
				  },no:function(index){
					   layer.close(index); 
						
				  }
			 });
	}
}
//��ʼ���ļ�
//���ؼ� ����
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
//�رմ���
function closeWin() {
    goBack();
}
//�Ƿ���Դ��´���
var isOpenNewsWin=true;
//�Ƿ��ֹ�ص�����
var isJZBackFlag=true;
//���´���
var firstisopenLoginFlag=true;
//�Ƿ���������������
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
        name: openName, //������window����
        url: windowurl,
        slidBackEnabled: true,
        bgColor: "widget://res/load.jpg"
      //  data: '���ڼ��أ����Ժ󡤡�����������',
         //����ѡ�����ɫ��֧��ͼƬ����ɫ����ʽΪ #fff��#ffffff��rgba(r,g,b,a)�ȣ�ͼƬ·��֧�� fs://��widget://
        //data: "", //����ѡ�ҳ����ص��������ݣ�����ΪhtmlƬ�λ�������html�ļ�������
        /*  headers: "", //����ѡ�����ͷ
          useWKWebView: false, //����ѡ��Ƿ�ʹ��WKWebView������ҳ�档WKWebView����Safari��ͬ��JavaScript���棬֧�ָ����HTML5���ԣ������UIWebView�������ܺ͹��ܷ��涼�кܴ�������ֻ֧��iOS8.0������ϵͳ��ע��openWinʱʹ��WKWebView���ܻ�Ӱ��window��ҳ���л�Ч����������openFrameʱʹ�á�
          historyGestureEnabled: false, //����ѡ��Ƿ����ͨ��������������ʷ��¼ǰ�����ˣ�ֻ��useWKWebView����Ϊtrueʱ��Ч��
          //pageParam: pageParam, //����ѡ�ҳ���������ҳ���п���ͨ�� api.pageParam ��ȡ
          bounces: defaultproperty.bounces, //����ѡ�ҳ���Ƿ񵯶�
          bgColor: defaultproperty.bgColor, //����ѡ�����ɫ��֧��ͼƬ����ɫ����ʽΪ #fff��#ffffff��rgba(r,g,b,a)�ȣ�ͼƬ·��֧�� fs://��widget://�� APICloud �Զ����ļ�·��Э�飬ͬʱ֧�����·��
          scrollToTop: false, //����ѡ������״̬����ҳ���Ƿ����������������ǰ��Ļ�ϲ�ֹһ��ҳ��� scrollToTop ����Ϊ true�������еĶ����������á�ֻ iOS ��Ч
          scrollEnabled: true, //����ѡ� ҳ�����ݳ������Ƿ���Թ����� ֻ֧��iOS
          vScrollBarEnabled: true, //����ѡ��Ƿ���ʾ��ֱ������
          hScrollBarEnabled: true, //����ѡ��Ƿ���ʾˮƽ������
          scaleEnabled: false, //����ѡ�ҳ���Ƿ��������
          slidBackEnabled: defaultproperty.slidBackEnabled, //����ѡ��Ƿ�֧�ֻ������ء�iOS7.0������ϵͳ�У����´򿪵�ҳ�������һ��������Է��ص���һ��ҳ�棬���ֶ�ֻ iOS ��Ч
          slidBackType: "full",*/
    });
}
//ɨ��
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
        title: "��ܰ��ʾ��",
        msg: title,
        buttons: ['ȷ��', 'ȡ��']
    }, function(ret, err) {
        var index = ret.buttonIndex;
        if (index == 1) {
            callback(0);
        }
    });

}
//΢�� ���ͷ����ʼ��
function initLoads(){
       getAttribute("userid",function(num,data){
          var params = { account: "testAccount" };
          var tencentPush = api.require('tencentPush');
          tencentPush.registerPush(params,function(ret, err) {
              if (ret.status) {
                   //alert("ע��ɹ���tokenΪ��" + ret.token);
              } else {
                  alert("ע��ʧ�ܣ������룺" + err.code + "��������Ϣ��" + err.msg);
              }
          });
           tencentPush.setListener({ name: "notifactionClick" }, function(ret, err) {
             playSpeek(ret.content,function(ret){
               setStorage("appBackRunFlag","true");
             });

            //  alert("�յ�֪ͨ��չʾ�Ļص���title��" + ret.title + "��content��" + ret.content + "��customContent��" + ret.customContent + ",activity:" + ret.activity + ",actionType:" + ret.actionType + ",msgid:" + ret.msgid);
          });
        /*   tencentPush.setListener({ name: "notifactionShow" }, function(ret, err) {
             alerts("֪ͨ��Ϣ�����Σ�");
            //  alert("�յ�֪ͨ��չʾ�Ļص���title��" + ret.title + "��content��" + ret.content + "��customContent��" + ret.customContent + ",activity:" + ret.activity + ",actionType:" + ret.actionType + ",msgid:" + ret.msgid);
          });
          tencentPush.setListener({ name: "notifactionClick" }, function(ret, err) {
            alerts();
           //  alert("�յ�֪ͨ��չʾ�Ļص���title��" + ret.title + "��content��" + ret.content + "��customContent��" + ret.customContent + ",activity:" + ret.activity + ",actionType:" + ret.actionType + ",msgid:" + ret.msgid);
         });
         tencentPush.setListener({ name: "notifactionClear" }, function(ret, err) {
             alerts(ret.title,ret.content);
          //  alert("�յ�֪ͨ��չʾ�Ļص���title��" + ret.title + "��content��" + ret.content + "��customContent��" + ret.customContent + ",activity:" + ret.activity + ",actionType:" + ret.actionType + ",msgid:" + ret.msgid);
        });*/
      });



}
//�������ͷ����ʼ��
function initJGLoads(){
       getAttribute("userid",function(num,data){
         var ajpush = api.require('ajpush');
              //��ʼ��
                ajpush.init(function(ret) {
                   if (ret && ret.status){
                       //success
                   }
                });
                //��������
                ajpush.setListener(
                    function(ret) {

                         var id = ret.id;
                         var title = ret.title;
                         var content = ret.content ;
                         if(content.indexOf("��ȡ��")!=-1){
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
                                if(ret.content.indexOf("����")!=-1){
                                  openwin('./html/pay1.html?id='+ret.extra.orderid);
                                }
                            }
                            });
                      }
                    }
                );
                //��tag
                var param = {alias:data,tags:['tag1','tag2']};
                ajpush.bindAliasAndTags(param,function(ret) {
                        var statusCode = ret.statusCode;
                 });
                 ajpush.getRegistrationId(function(ret) {
                    var registrationId = ret.id;
                    jsonPost("/save.do",{tb_noform:"boyun_users",website:registrationId,id:data},function(data){

                    });
                });
            //  alert("�յ�֪ͨ��չʾ�Ļص���title��" + ret.title + "��content��" + ret.content + "��customContent��" + ret.customContent + ",activity:" + ret.activity + ",actionType:" + ret.actionType + ",msgid:" + ret.msgid);
          });
}
//��������
function pushContent(orderId,userId,content,callback){
   jsonPost("/noticeTranOrder.do",{orderId:orderId,id:userId,content:encodeURI(content)},function(data){
        callback(data);
   });
}

//��ӱ���֪ͨ
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
        title: title, // ����
        content: content, // ����
        date: year + "" + month + "" + strDate, // ����
        hour: hour, // ʱ��
        min: minuter, // ����
        customContent: JSON.stringify(json), // �Զ���key-value
        activity: "", // �򿪵�activity
        ring: 1, // �Ƿ�����
        vibrate: 1 // �Ƿ���
    };
    var resultCallback = function(ret, err) {
        if (ret.status) {
            callback(0, "���֪ͨ�ɹ�");
        } else {
            callback(1, "֪ͨʧ��");
        }
    };
     tencentPush.addlocalNotification(params, resultCallback);
}
//��������Զ
function sumPoint_old(lon,lat,elon,elat,callback){
  if(aMapSearchValue==null){
      aMapSearchValue=api.require('aMap');
  }
  //�滮·��
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
     // alert("·�߳��ȣ�"+ret.paths[0].distance+",�շ�·�Σ�"+ret.paths[0].tollDistance+",Ԥ��ʱ�䣺"+ret.paths[0].duration);
     callback(parseFloat(ret.paths[0].distance),parseFloat(ret.paths[0].tollDistance),parseFloat(ret.paths[0].duration));
  });
}
//·�߹滮 ���ü���
var addNums=2;
function sumPoint(lon,lat,elon,elat,callback){
  var map = new AMap.Map("container", {
      center: [parseFloat(getStorage("lon")), parseFloat(getStorage("lat"))],
      zoom: 14
  });

  var truckDriving = new AMap.TruckDriving({
      map: map,
      policy: 0, // �滮����
      size: 1, // ���ʹ�С
       width: 2.5, // ���
       height: 2, // �߶�
       load: 1, // ����
       weight: 12, // ����
       axlesNum: 2, // ����
       province: '��', // ��������ʡ��
      isOutline: true,
      outlineColor: '#ffeeee',
      //panel: 'panel'
  });

  var path = [];
  if(elon==0){
    //path=elat;
    path.push({lnglat:[lon, lat]});//���
    //[{"lat":"39.863957","lon":"116.380298","dz":"������վ(����)","all":"������վ·����","sjh":"1888888888"}]
    $.each(elat,function(k,v){
      path.push({lnglat:[v.lon, v.lat]});
    });
  }else{
    path.push({lnglat:[lon, lat]});//���
    if(elon!=1)
    path.push({lnglat:[elon, elat]});//���
    for(var i=0;i<addNums+1;i++){
      if($("#shrdz"+i).length>0){
            path.push({lnglat:[parseFloat($("#shry"+i).val()), parseFloat($("#shrx"+i).val())]});//;��
        }
    }
  }
  if($("#shry").val()=="0"){
    callback(0,0,0);
    return;
  }
  truckDriving.search(path, function(status, result) {
      // searchResult���Ƕ�Ӧ�ļݳ�������Ϣ��������ݽṹ�ĵ���ο�  https://lbs.amap.com/api/javascript-api/reference/route-search#m_DrivingResult
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
          alerts('�������ʧ�ܣ�');
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
//��ӵ�ͼ��ע
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
}//������ͼ
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
            //��ʼ��λ
            //��λ
                showAmapNow.getLocation(function(ret, err) {
                    if (ret.status) {
                      //	alert(JSON.stringify(ret));
                    } else {
                        //  api.alert({ msg: JSON.stringify(ret) });
                    }
                });
                //���ø�������
                showAmapNow.setTrackingMode({
                  animation: true,
                  trackingMode: 'none' // follow heading none
              });
              //��ͼ�����¼�
              showAmapNow.addEventListener({
                  name: 'longPress'
              }, function(ret) {
                  if (ret.status) {
                      //alert(JSON.stringify(ret));
                  }
              });
              //�滮·��
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
                // alert("·�߳��ȣ�"+ret.paths[0].distance+",�շ�·�Σ�"+ret.paths[0].tollDistance+",Ԥ��ʱ�䣺"+ret.paths[0].duration);
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
//�����û�ID
var letCustomUserId=0;
//��ȡ�û���Ϣ
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
//��֤�����Ƿ�Ϊ��
function isNull(str){
	if(typeof str=="undefined"||str==""||str==null||str=="null"){
		return true;
	}else{
		return false;
	}
}
//ȡ������
function myNoAcepase(){
    jsonPost("/carRabTranOrder.do",{carname:"",paystatus:0,carsjh:"",status:0,caruid:0,id:MP.id,jdsj:new Date().getTime()},function(data){
      if(data.error==0){
          winCloseFinish();
      }
   });
}
//�ر���Ƶ
var speedPlayer=null;
function closePlayVideo(){
  if(speedPlayer!=null){
    $(".closePlayVideo").remove();
    speedPlayer.close();
  }
}
//������Ƶ
function playSysVideos(url,title){
  //$("body").append('<div class="closePlayVideo" style="position:fixed;z-index:1000;top:0px;left:0px;width:100%;height:100%;background:#FFF;" onclick="closePlayVideo()"></div>');

  var fs = api.require('fs');
  fs.copyTo({
      oldPath: url,
      newPath: "fs://floder/"
  }, function(ret, err) {
    url = "fs://floder/"+url.substring(url.lastIndexOf("/")+1);
        //��Ƶ����
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
                        duration=ret.duration;//��λ���롣
                        console.log('��Ƶ׼������')
                        break;
                    case 'statusUnknown':
                        console.log('δ֪����')
                        break;
                    case 'statusFailed':
                        console.log('��Ƶ����ʧ��')
                        break;
                }
            }
    });
}
//ͨ��div ceng
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
//�˵����
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
//��Ƶ����
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
			  path: url, //����ѡ��ַ������ͣ��ĵ���·����֧������ͱ��أ�fs://��·����Ĭ�ϣ�δ��ֵʱ������
			  //�� android ƽ̨�ϲ�֧�� widget://
			  autoPlay: true //����ѡ��������ͣ���ʱ�Ƿ��Զ����ţ�Ĭ�ϣ�true���Զ����ţ�
			  ,isFull:false,hideStatusBar:true
		  }, function(ret, err) {

		  });
  }
}
//���� �û���Ϣ
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
//����
function saveTables(param,callback,flag){

  jsonPost("/save.do",param,function(data){
    if(typeof flag!="undefined"&&flag)
    alerts(data.error_msg);
    if(typeof callback=="function"){
      callback(data);
    }
  });
}
//json����תstring
function jsonToString(json){

  var jsl=JSON.stringify(json)+"";
  jsl=jsl.replace("[","(").replace("]",")");
   return jsl;
}
//��ȡ����������Ϣ
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
                    //�������
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
                          if(text.indexOf("��")!=-1){
                              text = text.split("��")[0]+"��"+v;
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
            //�����滻
            if(name=="TranOrderController_12"&&id==getStorage("userid")&&isLoadUserInfo){
               currentUserId=res.data[0].id;
               userInfo=res.data[0];
               if(typeof callBackUserInfo=="function"){
                callBackUserInfo(res.data[0]);
              }
            }
            if(name=="TranOrderController_1"){
              //��ʼ������
                 orderInfo=res.data[0];
                 $(".footer").find("a").each(function(){
                  var fohtml=$(this).text()+"";
                  if(res.data[0].islt==2){
                    $(this).text(fohtml.replace(/����ж��/ig,"����ʩ��").replace(/���װ��/ig,"����ʩ��").replace(/����/ig,"ʩ��").replace(/ж��/ig,"ʩ��"));
                  }
                });

            }
         }

  },false);
}
//�û���Ϣ
var userInfo;
//������Ϣ
var orderInfo;
//���ͷ��
function addFindString(){

  if( $(".find").length>0)
  $(".find").html('<li style="border: 0;"> <img class="tx" src="../image/tx.png"/> <div class="find-left"> <p class="name O_xdname">�µ��ˣ�</p>'+
  ' <p class="style " style="color: #2b9f55;"><span class="style O_islt" data-value="��ͨ|��ͨ|����" >'+
  '�������ͣ�--</span>&nbsp;&nbsp;&nbsp; <span class="O_jcfy">���ã�-</span>Ԫ</p> <p class="car">'+
  ' <i class="iconfont">&#xe605;</i> <i class="shijian O_xs" data-time="">��ʱ��</i> <i class="iconfont">&#xe612;</i>'+
  ' <i class="num O_yytime">�ó�ʱ�䣺</i> </p> </div> <a href="javascript:void(0)" class="rote"> <i class="iconfont">&#xe600;</i>'+
  '<span class="O_juli">���룺</span>km </a> </li>');
}
//����תʱ��
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
          //������ʱ��ֵ��div��
          if(d!=0)
          string += d + "��";
            if(h!=0)
          string +=  h + "ʱ";
            if(m!=0)
          string +=   m + "��";
            if(s!=0)
          string += s + "��";
          if(string=="")
          return "0";
          else
          return string ;
				} else {
					  return "0";
				}

				//document.getElementById("_ms").innerHTML = ms + "����";
				//�ݹ�ÿ�����countTime��������ʾ��̬ʱ��Ч��
			//	setTimeout(countTime, 50);
 }
 //��ʱ��
function countTime(slong,elong,callback) {
				var date = new Date(slong);
				var now = date.getTime();
				var endDate = new Date(elong);//���ý�ֹʱ��
				var end = endDate.getTime();
				var leftTime = end - now; //ʱ���
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
          //������ʱ��ֵ��div��
          var str = "";
          if(d!=0)
  				str+= d + "��";
          if(h!=0)
  				str+= h + "ʱ";
          if(m!=0)
  				str+= m + "��";
          if(s!=0)
  				str+= s + "��";
  				//str+= ms + "����";
          callback(str);
				} else {
          callback('');
				}

				//�ݹ�ÿ�����countTime��������ʾ��̬ʱ��Ч��
			//	setTimeout(countTime, 50);
 }
 //��ȡ����
 function readCach(id){
	  if(isAppType==1){
		    $(id).html("0KB");
			return;
	  }
      api.getCacheSize(function(ret, err) {
            //size:        //�����С����λΪByte���������͡���-1���޴洢�豸��-2������׼��USB�洢�豸��-3���޷����ʴ洢�豸��
            var size = parseInt(ret.size/1024) + 'KB';
            var cacheSize = $api.byId('cacheSize');
            $(id).html(size);

    });
 }
 //������
 function clearnCach(id){
         api.clearCache(function() {
             api.toast({
                 msg: '������'
             });
         });
         api.getCacheSize(function(ret, err) {
             var size = parseInt(ret.size/1024) + 'KB';
             var cacheSize = $api.byId('cacheSize');

         });
  };
 // ������
function checkUpdate() {
    var mam = api.require('mam');
    mam.checkUpdate(function( ret, err ){
        if (ret) {
            if (!ret.status) {
                alerts('��������æ�����Ժ�����');
                return;
            }
            if (ret.result.update) {
                var updateTip;
                updateTip = ret.result.updateTip.replace(/\r\n/g,"<BR>");
                updateTip =updateTip.replace(/\n/g,"<BR>");
                layer.confirm('���°汾����<br/>���°汾:'+ret.result.version+'<br/>��������:<br/>'+updateTip+'<br/>����ʱ��:'+ret.result.time,
                {
                    title:'������ʾ',
                    btn: ['��������','ȡ��'] //��ť
                }, function(){
                        if (api.systemType == "android") {
                            api.download({
                                url : ret.result.source,
                                report : true
                            }, function(retdownload, err) {
                                if (retdownload && 0 == retdownload.state) {/* ���ؽ��� */
                                    api.toast({
                                        msg : "��������Ӧ��" + retdownload.percent + "%",
                                        duration : 2000
                                    });
                                }
                                if (retdownload && 1 == retdownload.state) {/* ������� */
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
                alerts('��ǰ�������°汾');
                return;
            }
        } else{
            alerts('��������æ�����Ժ�����');
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
           //������ʱ��ֵ��div��
           if(d!=0)
   				str+= d + "��";
           if(h!=0)
   				str+= h + "ʱ";
           if(m!=0)
   				str+= m + "��";
           if(s!=0)
   				str+= s + "��";

   				//str+= ms + "����";
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
 //input file ����Ԥ���ļ�
function createFileImage(file,callback){
	 
	let reader = new FileReader();
	//�½� FileReader ����
	reader.onload = function(){
	  // �� FileReader ��ȡ�ļ�ʱ�򣬶�ȡ�Ľ������� FileReader.result ������
 	  callback(this.result);
	};
	// ������ʲô��ʽ��ȡ�ļ���������base64��ʽ
	reader.readAsDataURL(file);

}
   //���ݱ���
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
//�ر�������ַ
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
      '<img src="../image/mobile.png"></i> <input id="t_mobile"  value="'+userInfo.username+'"  type="number" maxlength="11" maxnum="11" oninput="splitInputValue(this,11)" placeholder="��ϵ�绰" />'+
      ' </div> <div class="content-block">'+
      ' <i class="iconfont" style=" top:12px;color: #008b32;">&#xe601;</i> '+
      '<input id="t_addr"type="text"   placeholder="���ɲ�����ƺ�" /> </div>',
      shadeClose: false
      ,btn: 'ȷ��' ,yes: function(index){
             $("#fhrsjh").val($("#t_mobile").val());
              if($("#t_mobile").val()==""){
                alerts("�������ֻ���");
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
      '<img src="../image/mobile.png"></i> <input id="t_mobile" value="'+userInfo.username+'"    type="number" maxlength="11" maxnum="11" oninput="splitInputValue(this,11)" placeholder="��ϵ�绰" />'+
      ' </div> <div class="content-block">'+
      ' <i class="iconfont" style=" top:12px;color: #008b32;">&#xe601;</i> '+
      '<input id="t_addr"type="text"   placeholder="���ɲ�����ƺ�" /> </div>',
      shadeClose: false
      ,btn: 'ȷ��' ,yes: function(index){
             $("#shrsjh"+aMapGetNumber).val($("#t_mobile").val());
              $("#shall"+aMapGetNumber).val($("#shall"+aMapGetNumber).val()+$("#t_addr").val());
             $("input[name='shrsjh']").val($("#t_mobile").val());
             if($("#t_mobile").val()==""){
               alerts("�������ֻ���");
             }else
             layer.close(index);
             if($(".shangc").length>0)$(".shangc").show();
             setTimeout(function(){
               var h = $(document).height()-$(window).height();
               $(document).scrollTop(h);
             },200);

       }
    });


      //����ӵ�ַ
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
//ϵͳ�Դ�����
function showLoad(title){
  if(typeof title=="undefined")
    title="�����С�����������";
  api.showProgress({
      title: title
      ,text: '���Ժ�...',
  });
}
function hideLoad(){
  api.hideProgress();
}
//������
function loading()
{
  var lays= layer.open({
    type: 2
    ,content: '������',shadeClose: false
  });
  return lays;
}
//ɾ����ͼλ�û�����Ŀ
function delCacheItem(obj,id){
  jsonPost("/deleteuid.do",{id:id,tb:"boyun_huo_cache"},function(){
	  if(obj!=null)
		$(obj).parent().remove();
  });
}
//ɾ��ͨ��
function delUidContent(obj,id,tb){
  alertMsg("ɾ����Ϣô��",function(){
    jsonPost("/deleteuid.do",{id:id,tb:tb,pic:""},function(){
		if(obj!=null)
			$(obj).parent().remove();
    });
  });

}

//�رյ�ͼ
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
       //����ص��ѯ��
       var placeSearch = new AMap.PlaceSearch({
          // type: '��������', // ��Ȥ�����
           pageSize: 15, // ��ҳ��ʾ�������
           pageIndex: 1, // ҳ��
          // city: "010", // ��Ȥ�����
           citylimit: true,  //�Ƿ�ǿ�����������õĳ���������
           map: map, // չ�ֽ���ĵ�ͼʵ��
         //  panel: "panel", // ����б��ڴ������н���չʾ��
           autoFitView: true // �Ƿ��Զ�������ͼ��Ұʹ���Ƶ� Marker�㶼�����ӿڵĿɼ���Χ
       });
       //����
       var lists=[];
       var cpoint = [parseFloat(getStorage("lon")), getStorage("lat")]; //���ĵ�����
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
            //Ĭ�������ܱ���Ϣ
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
//�ϼƷ��ü�����
function sumAllMoney(data){
  var heji =  parseFloat(data.jcfy)+parseFloat(data.bymoney)+parseFloat(data.gsmoney)+parseFloat(data.zccsmoney)+parseFloat(data.qtmoney)+parseFloat(data.xfmoney);
  return heji.toFixed(2);
}
//��ͼ��ӱ��
function addMarker(map){
  var marker = new AMap.Marker({
            icon: "https://a.amap.com/jsapi_demos/static/demo-center/icons/poi-marker-default.png",
            position: [parseFloat(getStorage("lon")),parseFloat(getStorage("lat"))],
            offset: new AMap.Pixel(-13, -30)
   });
   marker.setMap(map);
   return marker;
}
//����markter
function updateContent(marker,lon,lat,title) {

        if (!marker) {
            return;
        }

        // �Զ����������
        var markerContent = document.createElement("div");
        // �����е�ͼ��
        var markerImg = document.createElement("img");
        markerImg.className = "markerlnglat";
        markerImg.src = "https://a.amap.com/jsapi_demos/static/demo-center/icons/poi-marker-red.png";
        markerContent.appendChild(markerImg);

        // �����е��ı�
        var markerSpan = document.createElement("span");
        markerSpan.className = 'marker';
        markerSpan.innerHTML = title;
        markerContent.appendChild(markerSpan);

        marker.setContent(markerContent); //���µ�������
        marker.setPosition([lon,lat]); //���µ���λ��
    }

//���Ҹ��� �ĵ�ַ��Ϣ
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
          //����
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
                    //��ӱ�ע
                    aMapSearchValue.addAnnotations({
                        annotations: lists,
                      //  icons: ['widget://'],
                        draggable: true,
                        timeInterval: 2.0
                    }, function(ret) {
                        if (ret.eventType == 'click') {
                            //��������λ��
                            $.each(lists,function(k,v){
                              if(v.id==ret.id){
                                  aMapSearchValue.setCenter({
                                      coords: {
                                          lon: v.lon,
                                          lat: v.lat
                                      },
                                      animation: false
                                  });
                                  //��������
                                  aMapSearchValue.setZoomLevel({
                                      level: 18,
                                      animation: true
                                  });
                              }
                            })


                        }
                    });
                    //������ע���ȼ�
                }
              });
              //��������
        } else {
            alert(JSON.stringify(err));
        }
    });
}
var  aMapNavigation=null;
//����2
function runMapNavi2(lon,lat,elon,elat){

    aMapNavigation= api.require('aMapNavi');
    aMapNavigation.addEventListener(function(ret, err) {
        if(ret.eventType=="onArriveDestination"){
              //����Ŀ�ĵ�
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
          carNumber : '��DFZ239',
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
//��ʼ����
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
                night: false, //����ѡ��������ͣ��Ƿ���ʾ��ҹģʽ��Ĭ�ϣ�false
                compass: true, //����ѡ��������ͣ��Ƿ���ʾָ���룻Ĭ�ϣ�false
                crossImg: true, //����ѡ��������ͣ��Ƿ���ʾ·�ڷŴ�ͼ��ֻ�����ڼݳ�������Ĭ�ϣ�false
                degree: 30, //����ѡ��������ͣ���ͼ��Ǵ�С����Χ[0,60]������40����ʾ���죻Ĭ�ϣ�30
                yawReCal: false, //����ѡ��������ͣ�ƫ��ʱ�Ƿ����¼���·����Ĭ�ϣ�true��android��֧�֡��ѷ�����Ĭ������
                jamReCal: true, //����ѡ��������ͣ�����״̬����Ļ�Ƿ�һֱ������Ĭ�ϣ�false
                alwaysBright: true //����ѡ��������ͣ��Ƿ������̨��λ���ݽ�֧�� iOS ƽ̨��ֻ��iOS 9.0��֮�������ã�Ĭ�ϣ�false��Ϊ true ʱ���뱣֤ conifg.xml �ļ��ڰѺ�̨��λ�ͺ�̨��Ƶ���Ŵ򿪣�������쳣����������� config.xml �ļ������ĵ�
            }
        }
    }, function(ret, err) {

        if (ret) {
            //alert(JSON.stringify(ret));
            /*
            {
                eventType: '',        //�ַ������ͣ������¼���ȡֵ��Χ��
                                            //calculateSuc  ·���滮�ɹ�
                                            //calculateFai  ·���滮ʧ��
                                            //naviFai       ������������
                                            //naviStart     ����ҳ���Ƴ�����ʼ����
                                            //naviEnd       �ﵽĿ�ĵص�������
                                            //naviClose     �û��رյ���ҳ��
                routeInfo: {          //JSON���󣻵�����·����Ϣ������ eventType Ϊ calculateSuc ʱ��ֵ
                   length: ,          //�������ͣ�����·���ܳ��ȣ���λ���ף�
                   time: ,            //�������ͣ�����·������Ҫ��ʱ�䣨��λ���룩
                   segmentCount: ,    //�������ͣ�����·���Ϸֶε�����
                   trafficLightCount:,//�������ͣ�����·���Ϻ��̵Ƶ�����
                   tollCost:          //�������ͣ�����·�ߵĻ��ѽ���λ��Ԫ��
                }
            }
            */
        } else {
            //  alert(JSON.stringify(err));
            /*
            code:       //�������ͣ������룬ȡֵ��Χ���£�
                                //2     ���糬ʱ������ʧ��
                                //3     ������
                                //4     Э���������
                                //6     �յ����
                                //10     ���û���ҵ���·
                                //11     û���ҵ�ͨ���յ�ĵ�·
                                //12     û���ҵ�ͨ��;����ĵ�·
                                //13     ·�����ȳ�������
                                //14     ��������
            */
        }
    });
    return aMapNavigation;
}
// �رյ���
function closeMapNavi() {
    aMapNavigation.close();
}
/*����*/
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
      ,time: 2 //2����Զ��ر�
    });
  }
}
//�Ƿ�Ϊ�����Ʋ�Ʒ ��ʼ�������Ʋ�Ʒoss
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
//������ oSS�ϴ�
var aliyunOss=null;
function uploadOss(path,valueId,imgId ,callback){

    //�������ļ���
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
//�ڰ��������ػ�ȡURL
function getAliOss(fileName,callback){
  if(fileName.indexOf(".")==-1){

    callback(fileName);
  } else  if(fileName.indexOf("bucketsave")!=-1){

        if(!ossIsInitSuccess){
          setTimeout(function(){
              getAliOss(fileName,callback) ;
          },1000);
        }

        //��ȡ�ļ���
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
//��ɱ��Ʒ
function replaceMiaoProduce(str, v) {
    if (typeof(v.taocan) == "undefined")
        return "";
    return str
        .replace(/\{id\}/ig, v.id)
        .replace(/\{hd\}/ig, (v.money > 0 ? "���ֵ���" : (parseInt(v.taocan[0].price[0].p[0]) < parseInt(v.taocan[0].price[0].y[0]) ? "�Żݻ" : "")))
        .replace(/\{dkjf\}/ig, (v.money))
        .replace(/\{dkje\}/ig, (v.space))
        .replace(/\{title\}/ig, v.proname)
        .replace(/\{showpic\}/ig, v.showpic).replace(/\{uuid\}/ig, (v.uuid))
        .replace(/\{pic\}/ig, ((v.pic[0].img + "" != "undefined") ? v.pic[0].img : v.pic[0]))
        .replace(/\{counts\}/ig, v.xscount)
        .replace(/\{detail\}/ig, v.detail)

    .replace(/\{progress\}/ig, keepTwoDecimal((v.xscount / v.taocan[0].price[0].s[0]) * 100))
        //��ɱ����price[0].l
        .replace(/\{count\}/ig, v.cbprice)
        .replace(/\{jifen\}/ig, v.taocan[0].price[0].j[0])
        .replace(/\{pic\}/ig, (v.pic[0].img + "" != "undefined") ? v.pic[0].img : v.pic[0])
        .replace(/\{money\}/ig, v.taocan[0].price[0].m[0])
        .replace(/\{yprice\}/ig, v.taocan[0].price[0].y[0]);
}
//��������
function keepTwoDecimal(num) {
    var result = parseFloat(num);
    if (isNaN(result)) {
        alerts('���ݲ����������飡');
        return false;
    }
    result = Math.round(num * 100) / 100;
    return result;
}
//�Ź���Ʒ
function replaceTuanProduce(str, v) {
    if (typeof(v.taocan) == "undefined")
        return "";
    return str
        .replace(/\{id\}/ig, v.id)
        .replace(/\{hd\}/ig, (v.money > 0 ? "���ֵ���" : (parseInt(v.taocan[0].price[0].p[0]) < parseInt(v.taocan[0].price[0].y[0]) ? "�Żݻ" : "")))
        .replace(/\{dkjf\}/ig, (v.money))
        .replace(/\{dkje\}/ig, (v.space))
        .replace(/\{uuid\}/ig, (v.uuid))
        .replace(/\{jf\}/ig, (v.taocan[0].price[0].l) ? v.taocan[0].price[0].l[0] : "0")
        //��������
        .replace(/\{person\}/ig, v.grpcount)
        .replace(/\{title\}/ig, v.proname)
        //�Ź�����
        .replace(/\{count\}/ig, v.jifen)
        .replace(/\{showpic\}/ig, v.showpic)
        .replace(/\{pic\}/ig, (v.pic[0].img + "" != "undefined") ? v.pic[0].img : v.pic[0])
        .replace(/\{counts\}/ig, v.xscount)
        .replace(/\{detail\}/ig, v.detail)
        .replace(/\{jifen\}/ig, v.taocan[0].price[0].j[0])
        .replace(/\{money\}/ig, v.taocan[0].price[0].t[0])
        .replace(/\{yprice\}/ig, v.taocan[0].price[0].y[0]);
}
//��ͨ��Ʒ
function replaceProduce(str, v) {
    if (typeof(v.taocan) == "undefined")
        return "";
    return str
        .replace(/\{id\}/ig, v.id)
        .replace(/\{hd\}/ig, (v.money > 0 ? "���ֵ���" : (parseInt(v.taocan[0].price[0].p[0]) < parseInt(v.taocan[0].price[0].y[0]) ? "�Żݻ" : "")))
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
        .replace(/\{status\}/ig, (v.status == 1 ? '������' : '��������'))
        .replace(/\{yprice\}/ig, v.taocan[0].price[0].y[0]);
}
/*��Ʒ�滻*/
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
//�ֲ�ͼչʾ
function showSpic(temp, id) {
    $(id).append(replaceJsonKey(temp, indexBigPic.indexBigPic));
}
//ͼƬ�滻
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
//��ȡ��ǰСʱ
function getHour() {
    var date = new Date();
    var h = date.getHours();
    return h;
}
//��ȡ����
function getMinutes() {
    var date = new Date();
    var h = date.getMinutes();
    return h;
}
//��ȡ��
function getSeconds() {
    var date = new Date();
    var h = date.getSeconds();
    return h;
}
//ʱ���ת����ʱ�� yyyy-MM-dd HH:mm:ss
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
//ʱ��ȶ�
function activeStatus(times) {
    var bmstime = (times.split("~")[0]);
    var bmetime = (times.split("~")[1]);
    var nowTime = new Date();
    if (CompareNowDate(bmstime)) {
        return "�δ��ʼ";
    } else if (CompareNowsDate(bmstime) && CompareNowDate(bmetime)) {
        return "�������";
    } else {
        return "�ѽ���";
    }
}

//ʱ��ȶ�
function activeStatus2(times) {
    var bmstime = (times.split("~")[0]);
    var bmetime = (times.split("~")[1]);
    var nowTime = new Date();
    if (CompareNowDate(bmstime)) {
        return "δ��ʼ����";
    } else if (CompareNowsDate(bmstime) && CompareNowDate(bmetime)) {
        return "���ڱ���";
    } else {
        return "��ֹ����";
    }
}
//json ��������
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
//���ҵ���
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
ʱ��Ƚ�
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
//ͨ������ӿ�

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
                    if((data.error_msg+"").indexOf("δ��¼")!=-1){
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
            if((data.error_msg+"").indexOf("δ��¼")!=-1){
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

//a ��ǩ�������
function addHrefOpenAttr() {
		if(isAppType==1){
			return;
		}
       // include_files(api);
        //���� ������
        $("a").each(function() {
            var href = $(this).attr("href")+"";
            var clas = $(this).attr("class") + ""; //&&clas.indexOf("aui-tabBar-item")==-1
           //����Ƿ񷵻ؼ�
            if (href.indexOf("history.back") != -1) {
                $(this).attr("href", "javascript:void(0);");
                $(this).click(function() {
                    closeWin();
                });
                //���a��ǩ����
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
//�Ƿ���Ҫ��ͼ
var isSmallPic = false;
//����ʽ
var orderType = true;
//���� �ۼ����� ͨ�÷���
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
//json ת�� �滻
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
        return '<h1 style="text-align:center;font-size:16px; margin:15px auto;">�Ѿ�û���ˣ�??</h1>';
     return returnstr;
}
//json ת�� �滻
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
                var title="ͼƬ˵��";
                if (typeof(im.img) != "undefined")
                    im = im.img;
                if (typeof(im.title) != "undefined"){
                    title = im.title;
                    //�滻ͼƬ����
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
				//�滻ԭʼֵ
					var patt5 = new RegExp("\{" + m + "_val\}", "ig");
					string = string.replace(patt5, n);
                }else{
                  string = string.replace(patt1, n);
                }
                //�Զ����������
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
        return '<h1 style="text-align:center;font-size:16px; margin:15px auto;">�Ѿ�û���ˣ�??</h1>';
    return returnstr;
}
//ͼƬ�����ط���

function loadImg(id){
//.attr(ֵ)
//.attr(��������,ֵ)
  $(id).find("img").each(function(){
    var data = $(this).attr("data-src")+"";
    if(data!=null&&data!=""&&data!="undefined"){
     if(data.indexOf("http")==-1)
        $(this).attr('src', domainUrl+data) //��data-src��ֵ ��ֵ��src
     else{
         $(this).attr('src', data) //��data-src��ֵ ��ֵ��src
     }
      $(this).attr('data-isLoaded', 1) //�Ѽ��ع���ͼƬ�����
    }

  });
}
//�Զ��滻
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
                    string = string.replace(patt1, (v[colums[i]] == 0 ? "����" : "<span style=\"color:red\">�ر�</span>"));
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
          return '<h1 style="text-align:center;font-size:16px; margin:15px auto;">�Ѿ�û���ˣ�??</h1>';
    return returnstr;
}
var temp_base_url = "/cache/public/template/{user}/{id}.jsp";
//��ʾminiͼƬ
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
//��ȡϵͳ����
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
//ϵͳ����
function apps(){
  var par= getStorage("config");
   return eval("("+par+")");
}
//url ��������
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
//genuine�����滻
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
                        string = string.replace(patt1, (v[colums[i]] == 0 ? "����" : "<span style=\"color:red\">�ر�</span>"));
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
          return '<h1 style="text-align:center;font-size:16px; margin:15px auto;">�Ѿ�û���ˣ�??</h1>';
    return returnstr;
}
var jsonTempCacheList = [];
//��ȡϵͳĬ��չʾģ��
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
//json���ݻ�ȡ
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
//��ʱȡ���ݽӿ�
function getJsonData(callback) {
    var url = ("/api/" + t.t + "/" + t.u + "/" + t.i + "/" + t.s + "/" + t.p + "/" + t.ic + "/" + t.c);
    jsonPost(url, {}, function(text, status) {
        callback(text);
    });
}
//��ʱȡ���ݽӿ�
function getJsonDatas(t, callback) {
    var url = ("/api/" + t.t + "/" + t.u + "/" + t.i + "/" + t.s + "/" + t.p + "/" + t.ic + "/" + t.c);
    jsonPost(url, {}, function(text, status) {
        callback(text);
    });
}
//ʱ��ת������
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
                str = day + "��ǰ";
                return str;
            }
            if (hour > 0) {
                str = hour + "Сʱǰ";
                return str;
            }
            if (minute > 0) {
                str = minute + "����ǰ";
                return str;
            }
            if (seconds < 60) {
                str = "�ո�";
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
//չʾJSON �ַ�������
function alertJson(json) {
    alert(JSON.stringify(json));
}
//�ղ�
function addCollect(list) {
    jsonPost("/template/disshop/action/addstore.jsp?d=" + Math.random(), list, function(responseText) {
        alerts(responseText.replace(/\r|\t|\n/ig, ""));
    });
}
//��ȡ������api
function getNewData(name, json, callback,flags) {
    //(page_num*t.maxnum)+","+t.maxnum
      if(getStorage("userid")=="0"){

      }else if (json != null && json != "") {
        jsonPost("/sqlAction?sqlname=" + name, json, function(data) {
             if (data.res == 0) {
                callback(data)
            } else {

                callback(data)
              //   $(t.scroll_append_div).append('<h3 style="display:block;width:100%;text-align:center;font-size:13px">�Ѿ�û����</h3>');

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
                 //$(t.scroll_append_div).append('<h3 style="display:block;width:100%;text-align:center;font-size:13px">�Ѿ�û����</h3>');
            }
            load_swiper_flag = true;
        },flags);
    }
}
/*�ղظ���ҳ*/
function addFootRemark(list) {
    /*
    var list = {zid:��ǰ����ID,tb:��,pid:�ռ�����ID,id:��ƷID,price:�۸�,mytype:�ײ�����, "UTF-8"),title:encodeURI(����, "UTF-8"),pic:ͼƬ};
    */
    jsonPost("/template/disshop/action/addFootRemark.jsp?d=" + Math.random(), list, function(responseText) {
        //ds.dialog.tips(responseText.replace(/\r|\t|\n/ig,""),2,true,true);
    });
}
/*�Ƿ�ʹ����API*/
var newDataApi = false;
/*������������*/
var range = 50; //���±߽糤��/��λpx
var elemt = 500; //����Ԫ�ظ߶�/��λpx       //���ü���������
var page_num = 1;
var totalheight = 0;
//�Ƿ�������
var Mflag = true;

function getNoData() {
     $(t.scroll_append_div).html('<div style="margin:auto 30%;text-align:center">�Ѿ�û����</div>');
}


/*��ӹ����¼�*/
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
    //����Ԫ��
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
                    //��ʱ�ӿ�00
                    getJsonData(function(jsons) {
                        if (jsons.res == 0 && jsons.data && jsons.data.length > 0) {
                            //�û��Զ���ģ��
                            if (t.scroll_append_flag) {
                                $(t.scroll_append_div).append(eachforcondition(jsons.data, null, t.scroll_append_temp));
                                page_num++;
                                Mflag = true;
                                hideLoadingScroll();
                            } else {
                                //�Ƿ�ص��Զ��巽��
                                if (t.scroll_append_callback) {
                                    t.scroll_callback_function(jsons);
                                } else {
                                    //ʹ��ϵͳ�Դ�ģ��
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
                    //�½ӿ�
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
/*����ͼƬ��Ч*/
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
/*������Ч����*/
function loadingScroll() {
   if(typeof api !="undefined")
    api.showProgress();
    /*api.showProgress({
           title: '���ڴ���...',
           text: '',
    });*/
}
/*���ؼ�����Ч*/
function hideLoadingScroll() {
 if(typeof api !="undefined")
    hideLoad();//���ؼ��ؽ��ȿ�
}
/*��ʼ������*/
function initScroll() {
    page_num = 1;
    Mflag = true;
}
//����΢��ģ�����
var openWxScrollFlag = true;
/*��Ӽ����¼�*/
function openWxHref() {

}
/*ʱ���ʽ ��չ*/
Date.prototype.format = function(fmt) { //author: meizz
    var o = {
        "M+": this.getMonth() + 1, //�·�
        "d+": this.getDate(), //��
        "h+": this.getHours(), //Сʱ
        "m+": this.getMinutes(), //��
        "s+": this.getSeconds(), //��
        "q+": Math.floor((this.getMonth() + 3) / 3), //����
        "S": this.getMilliseconds() //����
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
/*����ʱ��ת��*/
function getLocalTime(nS) {
    return (new Date(parseInt(nS)).format('yyyy��M��d��'));
}
function getLocaldate() {
    return (new Date().format('yyyyMd'));
}
/*json�滻*/
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
/*��ʼĬ�Ϲ�������*/
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
//������λС��  ��Ǯת��
function toDecimal(x) {
   var f = parseFloat(x);
   if (isNaN(f)) {
     return;
   }
   f = Math.round(x*100)/100;
      return f;
 }
 //��������
 var indexListExit=false;
//��ʼ��
var MP;
var closeNowWinObj=false;
//���������
function callPassWord(title,callback){
  setStorage("hideFoot","true");
  isPwdInputTip=title;
  isPwdInput.open(function(data) {
      // �ص�����:ȡֵ��Χ����
	  if(typeof data.pwd!="undefined"&&(data.pwd).length==6){
		   callback(data);
	  }
      //  pwd : ��ǰ��������
      //  type : 0 = open ��1 = close
      if(data.type=="1"){
        setStorage("hideFoot","false");
      }
     
   });
}
//��ʾ���׳�Ա
function showHomeMember(){
	searchHomeMember(function(data){
		 //����������������
		   callPassWord("����������������",function(pp){
			 if((pp.pwd+"")==data.pass){
				 isPwdInput.close();
				 updateTable("HomeController_19",{param:"{'p1':'0','p2':'','p3':'"+data.id+"'}"},function(dd){
					  alerts("���óɹ���");
						reload();
				 });
			   }else{
				   alerts("�������");
			   }
		   });
	});
  
}
//�����û�
function hideHomeMember(id){
	var pass1="0",pass2 =0;
	callPassWord("�����������",function(data){
		pass1=data.pwd;
		isPwdInput.close();
		setTimeout(function(){
		callPassWord("ȷ�������������",function(data){
			if(data.pwd==pass1){ 
				isPwdInput.close();
				updateTable("HomeController_19",{sql:"",param:"{'p1':'1','p2':'"+pass1+"','p3':'"+id+"'}"}
		,		function(data){  layer.close(index); alerts("���óɹ�");location.reload();});
			}else{
				 isPwdInput.close();
				 alert("�������벻һ�£�");
			}
		});
		},500);
	});
}
//����������Ϣ
function sendRegMsg(uids,content,types,callback){
	if(typeof types=="undefined")
		types=1;
	jsonPost("/sendSpaceContent.do",{uids:uids.replace("(","[").replace(")","]"),content:encodeURI(content),type:types},function(data){
			if(typeof callback=="function"){
				callback();
			}else{
				alerts("�ѳɹ���������");
			}
	});
}
//��������
function isUpTree(bid,id,position){
		var ms="";
		var tid=0; 
		layer.open({
		  title:['����������ʾ',
		  'background-color:#8DCE16; color:#fff;'],
		  content:  '��ѡ��λ�ã�<select style="border:1px solid #CCC;background:#FFF;" name="qx" id="qx"><option value="0" selected="selected">��һλ</option> <option value="1">�ڶ�λ</option> <option value="2">����λ</option> </select>'
		  ,btn: ['ȷ��', 'ȡ��']
		  ,yes: function(index){
			var qxval=$("#qx").find("option:selected").val();
			if($(".home"+bid+"_"+qxval).length>0){
			
				ms="�Ƿ�Ҫ�滻��"+$(".home"+bid+"_"+qxval).attr("data-name")+"����λ�ã�";
				tid=$(".home"+bid+"_"+qxval).attr("data");
			}
			if(ms!=""){
			layer.open({
				  title:['��ܰ��ʾ',
				  'background-color:#8DCE16; color:#fff;'],
				  content: ms
				  ,btn: ['ȷ��', 'ȡ��']
				  ,yes: function(index){ 
					updateTable("HomeController_17",{sql:"",param:"{'p1':'1','p2':'"+qxval+"','p3':'"+id+"'}"}
						,	function(data){  
							updateTable("HomeController_17",{sql:"",param:"{'p1':'0','p2':'0','p3':'"+tid+"'}"}
						,	function(data){  layer.close(index); alerts("���óɹ�");});
					   });
				  },no:function(index){
					 
						
				  }
				});
			  
			}else{
			   updateTable("HomeController_17",{sql:"",param:"{'p1':'1','p2':'"+qxval+"','p3':'"+id+"'}"}
				,	function(data){  
					layer.close(index);alerts("���óɹ�");
				});
			}
			
		  },no:function(index){
			layer.close(index);

		  }
		});
   }
//��Ա��ѯ
function searchHomeMember(callback){
	 showAlertInput("����������",function(val){
		getSqlData("HomeController_20","",[getStorage("userid"),val] ,function(data){
			if(data==1){
				alerts("��ѯʧ��");
			}else{
				if(data.data.pid==0){
					//alerts("��Աδע�ᣡ");
				}  
				if(data.data.status==1){
					//alerts("��Ա�ѱ����أ�");
				}  
				if(typeof callback=="function")
					callback(data.data);
				else
					hideController(data.data.id);
			}
			
		});
	 });
	 
}

//��ȡ������¼
function getSqlData(name,sql,json,callback){
	jsonPost("/query.do?name="+name,{"sql":sql,"param":dataToJson(json)},function(data){
		if(data.error==0){
			callback(data);
		}else{
			callback(1);
		}
	});
}
//��������ͨ��
function updateSql(name,sql,json,callback){
   jsonPost("/update.do?t="+name,{"sql":sql,"param":dataToJson(json)},function(data){
    callback(data);
  });
}
//��ȡ������¼
function getSqlDataList(name,sql,json,callback){
	jsonPost("/queryList.do?name="+name,{"sql":sql,"param":dataToJson(json)},function(data){
		if(data.error==0){
			callback(data);
		}else{
			callback(1);
		}
	});
}
//�µ����ݽṹת��
function dataToJson(json){
	var string=[];
	var i=1;
	$.each(json,function(k,v){
		string.push("'p"+i+"':'"+encodeURI(v)+"'");
		i++;
	});
	return (JSON.stringify(string)).replace("[","{").replace("]","}").replace(/\"/ig,"");
} 
//��������ͨ��
function updateTable(sql,pram,callback){
   jsonPost("/update.do?t="+sql,pram,function(data){
    callback(data);
  });
}
//����ͷ������ ״̬��ɫ��
function hideOrShow(id,status)
{
    if(userInfo.pass==""||userInfo.pass=="0"){

        //�򿪼���
         callPassWord("����������������",function(data){
            // �ص�����:ȡֵ��Χ����
            //  pwd : ��ǰ��������
            //  type : 0 = open ��1 = close
            if((data.pwd+"").length==6){
              saveTables({"tb_noform":"boyun_users","pass":data.pwd,"id":userInfo.id},function(data){
                isPwdInput.close();
                  alertMsg("�Ƿ����ظ��û���",function(){
                            saveTables({"tb_noform":"boyun_home","status":status,"id":id},function(data){
                              alerts("�����أ��������ҵ��￪�����ء�");
                          });
                  });
              });
          }
          });
        //�رռ���
    }else{
        alertMsg("�Ƿ����ظ��û���",function(){
          saveTables({"tb_noform":"boyun_home","status":status,"id":id},function(data){
            alerts("�����أ��������ҵ��￪�����ء�");
        });
      });
  }
}
//�Ƿ�����û���Ϣ
var isLoadUserInfo=true;
//��ʼ������
apiready = function(){
  //��� ҳ��������
  //�����ƴ洢
  getSisUser(function(){});
  if(isAppType==0){
	  var systemType = api.systemType;
	  var systemVersion = api.systemVersion;  // ���磺 8.0
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
      //��ȡ�û���Ϣ
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
        //�������ؼ�
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
                    msg: '�ٰ�һ���˳�Ӧ��',
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
		  var systemVersion = api.systemVersion;  // ���磺 8.0
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
      //����ˢ�±��������Զ��������״̬��ʹ�� api.refreshHeaderLoadDone() �ֶ�����������״̬
      //����ˢ�±�������ʹ�� api.refreshHeaderLoadDone() ����������״̬
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
        XBack.record(XBack.STATE); //��ʼ���¼�ʱ��pushһ��
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

})(XBack); // �������js�ļ�
//XBack.init();
//XBack.listen(function() {});
  //���η��ؼ�
 var appBackFlag=true;
//���ؼ�����
function goBack(){
   if(appBackFlag){
      winCloseFinish();
   }else{
     if(typeof appBack=="function"){
       appBack();
     }
   }
}
//׷��ͳһ��ʽ
var isAppendCssFlag=true;
//׷��ͳһ��ʽ
var myTopColor="#2b9f55";
function addTopColorPadding(){

  if(isAppendCssFlag){
    var htb=25;
    $("body").append('<style>.header-white{top:24px !important}body{border-top:24px solid '+myTopColor+' !important;}</style>'+
    '<div id="myhead_top" style="z-index:100000 ;position:fixed;top:0px;height:24px;left:0px;  width:100%;background:'+myTopColor+'">&nbsp;</div>');
  }
}
//�رյ�ǰ����
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
//���´���
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
//΢��֧��
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
                  //֧���ɹ�
                    callback(ret);
              } else {

              }
          });
      });
}
//��ֵ
function chargeMoney(val){
	jsonPost( "/appCharge.do", {id:getStorage("userid"),money:val}, function(data) {
		if (data.error == 0) {
				//alerts("��ֵ�ɹ���");
		} else {
				//alerts(data.error_msg);
		}
	});
}
//֧����֧�� getStorage
function aliPay(money,title,callback){

  jsonPost("/aliSignPay.do",{money:money,body:encodeURI(title),charge:"notify","pid":getStorage("pid")},function(data){
        var aliPayPlus = api.require('aliPayPlus');
        var infos = data.message+'&sign='+ (data.sign);
       aliPayPlus.payOrder({
          orderInfo:   (infos)
      }, function(ret, err) {
          //console.log(JSON.stringify(ret));
          if(ret.code==9000)//֧���ɹ�
              callback(ret);
      });
  });
}
//
function WxPay_cus(money,title,callback){
		var id=new Date().getTime()+""+getStorage("userid"); 
		var jason=  {"userid":getStorage("userid"),"openId":userInfo.wxopenid,charge:"notify","name":(encodeURI("�̳�֧��","UTF-8")),"id":id,"money":money,"title":(encodeURI(title,"UTF-8")),"pid":getStorage("pid")};
	   
		//alert(JSON.stringify(jason))
		$.post("/payWap",jason,function(datas){ 
			jsApiCall(datas,id,money,title,function(data){
				callback(data,id);
			});
		});
 }
//֧������
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
    //�ύ����
    if(val==1){
		if(isAppType==1){
			WxPay_cus(money.toFixed(2),'֧������',function(data){
			//��������
			if(data==0)
			  callback({"error":0});
		  });
		}else{
			wxPay(money.toFixed(2),'֧������',function(data){
			//��������
			  callback({"error":0});
		  });
		}
      
    }else if(val==2){
      
	  if(isAppType==1){
			
		}else{
		  aliPay(money.toFixed(2),'֧������',function(data){
			//��������
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
 *	�ж�APP�Ƿ���и�Ȩ��
 * @param array   one_per  	- Ȩ������['camera','location']
 */
 //��ȡȨ��
function hasPermission(one_per) {
    var rets = api.hasPermission({
        list: one_per
    });

	//��ȡ��Ҫ�жϵ�Ȩ��
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
	//���ؽ��������Ҫ�����Ȩ��
    return  { "status": status, "perms": temp };
}

/**
 *	��ȡȨ��
 * @param array		one_per  	- Ȩ������['camera','location']
 * @param function  callback  	- �ص�����
 */
function reqPermission(one_per,callback) {
   if(typeof api =="undefined"){
    return;
  }
    api.requestPermission({
        list: one_per,
        code: 100001
    }, function(ret, err) {

		//��ȡ������
		var list = ret.list;
		for (var i in list) {
			//ֻ����һ��Ȩ�޲��㣬�ͷ���
      console.log(list[i].granted+"--"+list[i]);
			if (list[i].granted == false) {
				api.toast({
				    msg: 'Ȩ�޲��㣬�޷�������һ������',
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
 * �ж��Ƿ���������е�Ȩ�ޣ���Ȩ�޻�ȡ��Ӧ��Ȩ��
 * @param array		perm	  	- Ȩ������['camera','location']
 * @param function  callback  	- �ص�����
 */
function confirmPer(perm, callback) {
	//Ȩ��������
	//calendar������camera�����contactsͨѶ¼��locationλ����Ϣ��microphone��˷�
	//phone�绰��sensor���崫������sms���ţ�storage�洢�ռ䣬photos���
 	//iosϵͳֱ������
	//�ж϶��Ȩ���ǣ�ʹ�� ,��Ӣ�Ķ��Ÿ�����
    if (perm.indexOf(",") != -1) {
        var perms = perm.split(',');
    } else {
		    var perms = new Array(perm);
    }

	//�ж��Ƿ���и������е�Ȩ��
    var has = hasPermission(perms);
     if (!has.status) {
		    //��ȡȨ��
        reqPermission(has.perms,callback);
        return false;
    }

	  callback();
    return true;
}
