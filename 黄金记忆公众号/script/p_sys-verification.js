/*
 * SYSUI-verification1.5
 * 2019-06-11
 * 799129700@qq.com SYSHUXL-�������� www.husysui.com
 * Reserved head available commercial use
 * Universal background system interface framework
 */
//�ϲ�
function extend(o, n, override) {
	for(var key in n) {
		if(n.hasOwnProperty(key) && (!o.hasOwnProperty(key) || override)) {
			o[key] = n[key];
		}
	}
	return o;
};
//����
function addLoadListener(fn) {
	if(typeof window.addEventListener != 'undefined') {
		window.addEventListener('load', fn, false);
	} else if(typeof document.addEventListener != 'undefined') {
		document.addEventListener('load', fn, false);
	} else if(typeof window.attachEvent != 'undefined') {
		window.attachEvent('onload', fn);
	} else {
		var oldfn = window.onload;
		if(typeof window.onload != 'function') {
			window.onload = fn;
		} else {
			window.onload = function() {
				oldfn();
				fn();
			};
		}
	}
};
//��document.getElementById����
function ID$(i) {
	return document.getElementById(i)
};
//��document.createElement����
function LABEL$(i) {
	return document.createElement(i)
};
//��document.getElementsByName����
function NAME$(i) {
	return document.getElementsByName(i)
}

function TAGNAME$(i) {
	return document.getElementsByTagName(i)
}
// ������캯�� - ��������ṹ
function SYSVerification(options) {
	this._initial(options);
};
//������Ժͷ���
SYSVerification.prototype = {
	constructor: this, //���õ�ǰthis
	//��������
	_initial: function(options) {
		//��������
		var par = {
			Verification: '', //ָ����֤����
			Submit: '', //�ύ��
			Icon: '',
			Empty: '',
			Transform:true,
			Passwordlength:6,
			Editmode:'',//�༭ģʽ
			Loading: '<div class="padding05"><img src="images/timg.gif" style="width:45px;height:45px"></div>', //������ʽ����
			Verify_Promptcode: 101, //��֤�뷵������
			ConfirmCode: 202, //ȷ�Ϸ�������
			FailureCode: 102, //ʧ����֤��
			FailurePrompt: '�û�����������������������', //����ʧ����ʾ
			Load: function() {}, //�������ݷ���
			Formmode:"submitmode",//submitmode�ύģʽ��loadmode����ģʽ
			SelectEvent: function() {},
			ConfirmCallback: function() {}, //ȷ�ϻص�����
			SubmitMethod: function() {}, //�ύ����
			Expand:function(){},
			Complete:function() {},//ҳ����������ִ��
			ExtendMethod:function(){}
		};
		this.par = extend(par, options, true);
		//�ж��Ƿ����class���Է���
		this.hasClass = function(elements, cName) {
			return !!elements.className.match(new RegExp("(\\s|^)" + cName + "(\\s|$)"));
		}
		//���class���Է���
		this.addClass = function(elements, cName) {
			if(!this.hasClass(elements, cName)) {
				elements.className += " " + cName;
			};
		};
		//ɾ��class���Է��� elements��ǰ�ṹ  cName����
		this.removeClass = function(elements, cName) {
			if(this.hasClass(elements, cName)) {
				elements.className = elements.className.replace(new RegExp("(\\s|^)" + cName + "(\\s|$)"), " "); // replace�������滻
			};
		};
		//����class��������ɸѡ�ṹ
		this.getElementsByClassName = function(parent, className) {
			//��ȡ���и��ڵ��µ�tagԪ�ء�
			var aEls = parent.getElementsByTagName("*");����
			var arr = [];
			//ѭ������tagԪ�ء�
			for(var i = 0; i < aEls.length; i++) {
				//��tagԪ����������className���ϣ�����ָһ��Ԫ�ؿ��ܰ������class����ֳ�����,��ֵ��aClassName	��������
				var aClassName = aEls[i].className.split(' ');�������� //����ÿ��tagԪ����������ÿ��className
				for(var j = 0; j < aClassName.length; j++) {������������ //���������ѡclass����ӵ�arr����				����������
					if(aClassName[j] == className) {����������������
						arr.push(aEls[i]);���������������� //���className�������'box' ������ѭ��						����������������
						break; //��ֹһ��Ԫ�س��ֶ����ͬ��class����Ӷ��						������������
					}��������
				};����
			};����
			return arr;
		};
		//����class��������ɸѡ�ṹ
		this.getByClass = function(oParent, sClass) { //����class��ȡԪ��
			var oReasult = [];
			var oEle = oParent.getElementsByTagName("*");
			for(i = 0; i < oEle.length; i++) {
				if(oEle[i].className == sClass) {
					oReasult.push(oEle[i]);
				}
			};
			return oReasult;
		};
		//ɾ��ָ��_element����
		this.removeElement = function(_element) {
			var _parentElement = _element.parentNode;
			if(_parentElement) {
				_parentElement.removeChild(_element);
			};
		};
		this.par.Expand(this);
		this.show(this.par);
	},
	//��big-endian��������ת��Ϊbase-64�ַ�
	binb2b64:function(binarray) {
		var b64pad = "";
	    var tab = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
	    var str = "";
	    if(binarray!=undefined){
	    for (var i = 0; i < binarray.length * 4; i += 3) {
	        var triplet = (((binarray[i >> 2] >> 8 * (3 - i % 4)) & 0xFF) << 16) | (((binarray[i + 1 >> 2] >> 8 * (3 - (i + 1) % 4)) & 0xFF) << 8) | ((binarray[i + 2 >> 2] >> 8 * (3 - (i + 2) % 4)) & 0xFF);
	        for (var j = 0; j < 4; j++) {
	            if (i * 8 + j * 6 > binarray.length * 32) str += b64pad;
	            else str += tab.charAt((triplet >> 6 * (3 - j)) & 0x3F);
	        }
	    }
	    }
	    return str;
	},
	//���Ϸ���
	show: function(set) {	
		var _Method = this;
		var region = ID$(set.Verification);
		var subname = ID$(set.Submit);
		var Empty = ID$(set.Empty);
		var mobile_flag = _Method.isMobile(mobile_flag);
		var onbtn=null;
		_Method.ajaxObject(_Method);
		addLoadListener(subname);
		var conttext=_Method.conttext(conttext);
		if(subname!=null){
			subname.onmousedown = function(event,onbtn) {
				_Method.verificationMethod(region, conttext, subname, _Method, event);
				var evt = event || window.event;
				var onbtn = evt.target || evt.srcElement;
			}
		}
		if (Empty!=null){
		Empty.onclick = function(event) {
			for(var i = 0; i < conttext.length; i++) {
				conttext[i].value = "";
			}
		}
		}
		if(mobile_flag) {
			_Method.addClass(region, "mobile");
		} else {
			_Method.removeClass(region, "mobile");
		}
		     
		for(var i = 0; i < conttext.length; i++) {
			//�¼����ڶ���ʧȥ����ʱ����
			    conttext[i].onblur = function(e,onbtn) {
			        onblurMobile(e,onbtn);
			   }
			conttext[i].onfocus =function(e){
				onfocusMobile(e)				
			};
		}
		var mode=set.PromptMode;
		var onfocusMobile=function(e){		
				var evt = e || window.event;
				var tar = evt.target || evt.srcElement;
				if(tar.tagName.toLowerCase() == "textarea") {
					addLoadListener(_Method.Wordcount(_Method, conttext, e));
				}
				var eventname=evt.type;	
			_Method.PromptModeMethod(tar, _Method,eventname);
		};
		var onblurMobile=function(e){
			var textname = "����Ϊ�գ�";
			var evt = e || window.event;
				var tar = evt.target || evt.srcElement;
				if(tar.tagName.toLowerCase() == "input" || tar.tagName.toLowerCase() == "select") {
					var index = tar.selectedIndex; // ѡ������
					var Hints = tar.getAttribute('data-name');
					var verify = tar.getAttribute('data-verify');
					if(index != null) {
						var selectname = tar.options[index].value;
						if(selectname == "0") {
							_Method.newprompt(textname, Hints, _Method, tar);
						} else {
							_Method.prompthtml(tar);
						}
					} else if(tar.value != "") {
						var promptname = tar.getAttribute('data-prompt');
						for(var i = 0; i < conttext.length; i++) {
							var dataprompt = conttext[i].getAttribute('data-prompt');
							if(dataprompt == "password") {
								var zhi = conttext[i].value;
							}
						}
						_Method.prompthtml(tar);
						_Method.formatmethod(conttext, Hints, _Method, tar, promptname, zhi,verify);

					} else {
						if(verify == "verify") {
						_Method.newprompt(textname, Hints, _Method, tar);
						}
					}
				}
			var eventname=evt.type;	
			_Method.PromptModeMethod(tar, _Method,eventname);
		}
		_Method.FormdataMethod(null, _Method,conttext);
		set.SelectEvent(_Method, conttext);
		set.Load(_Method, conttext);	
		set.ExtendMethod(_Method, conttext);
	},
	//������ʾģʽ
	PromptModeMethod:function(tar,_Method,name){
		var mode=_Method.par.PromptMode;
			if(mode=="mode"){
	
			}else if(mode=="mode1"){				 
				 if(name=="focus"){
				 	_Method.removeClass(tar.parentNode, "form_prompt");
			        _Method.addClass(tar.parentNode, "form_errors");
				 }else if(name=="blur" || name=="click"){				 	
				 	_Method.removeClass(tar.parentNode, "form_errors");
				 	    if(tar.value==null){
				 	 	_Method.addClass(tar.parentNode, "form_prompt");
				 	    }else{
				 	    	_Method.removeClass(tar.parentNode, "form_prompt");
				 	    }
				 	}
			}
	},
	//�ж����ֻ�����pc
	isMobile: function(mobile_flag) {
		var userAgentInfo = navigator.userAgent;
		var mobileAgents = ["Android", "iPhone", "SymbianOS", "Windows Phone", "iPad", "iPod"];
		var mobile_flag = false;
		//����userAgent�ж��Ƿ����ֻ�
		for(var v = 0; v < mobileAgents.length; v++) {
			if(userAgentInfo.indexOf(mobileAgents[v]) > 0) {
				mobile_flag = true;
				break;
			}
		}
		var screen_width = window.screen.width;
		var screen_height = window.screen.height;
		//������Ļ�ֱ����ж��Ƿ����ֻ�
		if(screen_width < 500 && screen_height < 800) {
			mobile_flag = true;
		}
		return mobile_flag;
	},
	ajaxObject: function(obj) {
		//����ajax����.�������ж�������Ƿ�֧��ajax
		var xmlHttp;
		try {
			// Firefox, Opera 8.0+, Safari
			xmlHttp = new XMLHttpRequest();
		} catch(e) {
			// Internet Explorer
			try {
				xmlHttp = new ActiveXObject("Msxml2.XMLHTTP");
			} catch(e) {
				try {
					xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");
				} catch(e) {
					obj.PromptBox('�����������֧��AJAX', 2);
					return false;
				}
			}
		}
		return xmlHttp;
	},
	//get����
	ajaxGet: function(url,conttext) {
		var _Method = this;
		var ajax = _Method.ajaxObject();
		ajax.open("GET", url, true);
		if(ajax) {
			_Method.PromptBox(_Method.par.Loading, 0, true);
		}
		ajax.onreadystatechange = function() {
			if(ajax.readyState == 4) {
				if(ajax.status == 200) {
					var json = ajax.responseText; //��ȡ��json�ַ������������
					var jsonStr = JSON.parse(json); //���ַ���ת��Ϊjson����
					_Method.FormdataMethod(jsonStr, _Method);
				} else {
					_Method.PromptBox("HTTP������󣡴����룺" + ajax.status, 2);
				}
				_Method.PromptBox(null, 0, true);
				_Method.par.Complete(_Method,conttext);
			}
		};
		ajax.send();
	
	},
	//Post����
	ajaxPost: function(url, data,newarr) {
		var _Method = this;
		var ajax = _Method.ajaxObject();
		ajax.open("post", url, true);
		ajax.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
		ajax.onreadystatechange = function() {
			if(ajax.readyState == 4) {
				if(ajax.status == 200) {
					_Method.statusname(ajax.responseText, _Method, _Method,newarr);
				} else if(ajax.status == 500) {
					_Method.PromptBox('�������������Ժ����ԡ�', 2);
				} else if(ajax.status == 404) {
					_Method.PromptBox('ҳ����ɾ���򲻴���', 2);
				} else {
					_Method.PromptBox("HTTP������󣡴����룺" + ajax.status, 2);
					return;
				}
			} else {
				return false;
			}
		}
		typeof(data) != "undefined" ? ajax.send(data): '';
	},
	//��ʾ
	statusname: function(status, set, _Method,newarr) {
		var region = ID$(_Method.par.Verification);
		var Prompt_Code = _Method.par.Verify_Promptcode;
		var ConfirmCode = _Method.par.ConfirmCode;
		var FailureCode = _Method.par.FailureCode;
		var FailurePrompt = _Method.par.FailurePrompt;
		if(status == ConfirmCode) {
			set.par.ConfirmCallback(set, status,newarr);
		} else if(status == FailureCode) {
			set.PromptBox(FailurePrompt, 2);
		} else if(status == Prompt_Code) {
			_Method.PromptBox('��֤�벻��ȷ', 2);
		} else {
			set.PromptBox('�ύ�ɹ���', 2);
			set.par.ConfirmCallback(set, status,newarr);
		}
		var conttext = _Method.getElementsByClassName(region,"Required");; //name����
		for(var i = 0; i < conttext.length; i++) {
			var keyname = conttext[i].getAttribute("data-method");
			if(keyname == "select") {
				conttext[i].value = "0";
			}else{
				conttext[i].value = "";
			}
			var stint = conttext[i].getAttribute('data-stint');
			stint == 'Wordcount' ? addLoadListener(_Method.Wordcount(_Method, conttext, conttext[i])) : '';
		}
	},
		//�б����鼯�Ϸ���
	conttext:function(setlist){
		   var _Method = this;
		   var region = ID$(_Method.par.Verification);
		   var setlist = new Array(); 
		   var  sets= _Method.getElementsByClassName(region,"Required");
		   var up =NAME$("files");//�ϴ�
		   for (var i = 0; i < sets.length+up.length; i++) { 
			var name="";
			for (var u = 0; u < up.length; u++) { 
			    up[u]!=null?name=up[0].type:'';
			}
			if(up[i]!=null){			
				var ele = up[i];
			}else{
				if(!name){
					var ele = sets[i]; 
				}else{
					var ele = sets[i-1]; 
				}
			}
            setlist.push(ele); //���鼯������ 
		}		   
		  return setlist;
	},
	FormdataMethod: function(data, _Method) {
		var Arrayset = [];
		var value = '',
			value1 = '';
		var conttext=_Method.conttext(conttext);
		Arrayset.push(data);
		for(var i = 0; i < conttext.length; i++) {
			var keyvalue = conttext[i].getAttribute("data-key");
			var keyname = conttext[i].getAttribute("data-method");
			var ArrayString = conttext[i].getAttribute("data-Array");
			var stint = conttext[i].getAttribute("data-stint");
			var reveal=conttext[i].getAttribute("data-reveal");//��ʾģʽ
			if(data != null) {
				var Arrayset = data[0];
				value = Arrayset[keyvalue];
				var Selected = conttext[i].getAttribute("data-Selected");
				if(Selected) {
					if(keyname == "select") {
					  
						var index = conttext[i].options;
						if(index.length>1){
							 conttext[i].innerHTML="";
						}else{
						}
						conttext[i].id="Competence_sort" + i + "";
						var S = index.length;
						if(S < data.length + 1) {
							for(var s = 0; s < data.length; s++) {
								var loop = data[s];
								var id = data[s].id;
								var name = loop[Selected];
								if(name) {
									conttext[i].innerHTML += "<option value=" + id + ">" + name + "</option>";
									value1 ? value = value1 : value = 0;
								}
							}
						}
						for(var op = 0; op < index.length; op++) {
							var mun = conttext[i].options[op].value;
							if(mun == value) {
								value1 ? value = value1 : value = value;
							}
						}
					}
				}
			}
			if(keyname == "SelectionBox") {
				var mode = conttext[i].getAttribute("data-mode");
				var muster = _Method.getByClass(conttext[i], 'SelectionBox');
				if(_Method.par.Formmode=="submitmode"){			
					
				}else if(_Method.par.Formmode=="loadmode"){
					conttext[i].innerHTML = ""; //�������
					var muster = _Method.getByClass(conttext[i], 'SelectionBox');
				}
				if(muster.length==0){
				var result = ArrayString.split(",");
				var newarr = []; //����һ������
				for(var n = 0; n < result.length; n++) {
					var newgroup = {
						id: n,
						name: result[n]
					};
					newarr.push(newgroup); //������������ 
				};
				for(var r = 0; r < newarr.length; r++) {
					conttext[i].innerHTML += "<label class='SelectionBox'><input name='radio" + i + "' type='" + mode + "' value='" + r + "' class='ace'><span class='lbl Selectstyle"+r+"' data-radio='"+r+"'>" + newarr[r].name + "</span></label>"
				}
				if(!value) {
					values = conttext[i].getAttribute("data-value");
				} else {
					values = value;
				}
				muster = _Method.getByClass(conttext[i], 'SelectionBox');
				conttext[i].innerHTML = ""; //�������
				for(var r = 0; r < muster.length; r++) {
					var v = muster[r].childNodes[0].value;
					if(v == values) {
						conttext[i].innerHTML += "<label class='SelectionBox'><input name='radio" + i + "' type='" + mode + "' checked='checked' value='" + r + "' class='ace'><span class='lbl Selectstyle"+r+"' data-radio='"+r+"'>" + newarr[r].name + "</span></label>"
					} else {
						conttext[i].innerHTML += "<label class='SelectionBox'><input name='radio" + i + "' type='" + mode + "' value='" + r + "' class='ace'><span class='lbl Selectstyle"+r+"' data-radio='"+r+"'>" + newarr[r].name + "</span></label>"
					}
				}
				}
			}else if(keyname=="time"){
				var format = conttext[i].getAttribute("data-time");
				var dateTime = _Method.formatDate(format, value);
				    conttext[i].innerHTML = dateTime;
				
			}else{
				 if(reveal=="html"){
				 	conttext[i].innerHTML = value;
				 }else if(reveal=="value"){
				 	 conttext[i].value = value;
				 } 
			};
			
			if(stint) {
				addLoadListener(_Method.Wordcount(_Method, conttext));
			}
		}
		return false;
	},
		//ʱ���ת��
	formatDate: function(format, date) {
		if(typeof date === "string") {
			var mts = date.match(/(\/Date(\d+)\/)/);
			if(mts && mts.length >= 3) {
				date = parseInt(mts[2]);
			}
		}
		date = new Date(parseInt(date * 1000));
		if(!date || date.toUTCString() == "Invalid Date") {
			return "";
		}
		var map = {
			"M": date.getMonth() + 1, //�·�
			"d": date.getDate(), //��
			"h": date.getHours(), //Сʱ
			"m": date.getMinutes(), //��
			"s": date.getSeconds(), //��
			"q": Math.floor((date.getMonth() + 3) / 3), //����
			"S": date.getMilliseconds() //����
		};
		format = format.replace(/([yMdhmsqS])+/g, function(all, t) {
			var v = map[t];
			if(v !== undefined) {
				if(all.length > 1) {
					v = '0' + v;
					v = v.substr(v.length - 2);
				}
				return v;
			} else if(t === 'y') {
				return(date.getFullYear() + '').substr(4 - all.length);
			}
			return all;
		});
		return format;
	},
	//һ����ʾ����pc��
	newprompt: function(name, Hints, _Method, obj) {
		var mobile_flag = _Method.isMobile(mobile_flag);
		var prompt = obj.parentNode.getElementsByTagName('span')[0];
		var newspan = LABEL$("span");
		if(mobile_flag) {
			if(!prompt) {
				_Method.removeClass(obj.parentNode.appendChild(newspan), "prompt iconfont");
				obj.parentNode.appendChild(newspan).className = "prompt mobile-prompt";
				newspan.innerHTML = Hints + name;
				return false;
			} else {
				prompt.innerHTML = Hints + name;
			}
		} else {
			if(!prompt) {
				obj.parentNode.appendChild(newspan).className = "prompt iconfont";
				newspan.innerHTML = _Method.par.Icon + Hints + name;
				return false;
			} else {
				prompt.innerHTML = _Method.par.Icon + Hints + name;
			}
		}
	},
	//�����ʾ��Ϣ
	prompthtml: function(obj) {
		var prompt = obj.parentNode.getElementsByTagName('span')[0];
		if(prompt) {
			var prompthtml = obj.parentNode.removeChild(prompt);
		}
		return prompthtml;
	},
	//����һ����ʾ�򣬱༭��ʾ��textsΪ��ʾ�ı� ��timeΪ��ʾʱ���뵥λ
	PromptBox: function(texts, time, status) {
		var _this = this;
		var b = document.body.querySelector(".box_Bullet");
		if(!b) {
			var box = document.createElement("div");
			document.body.appendChild(box).className = "box_Bullet";
			var boxcss = document.querySelector(".box_Bullet");
			var winWidth = window.innerWidth;
			document.body.appendChild(box).innerHTML = texts;
			var wblank = winWidth - boxcss.offsetWidth;
			box.style.cssText = "width:" + boxcss.offsetWidth + "px" + "; left:" + (wblank / 2) + "px" + ";" +
				"margin-top:" + (-boxcss.offsetHeight / 2) + "px";

			var int = setInterval(function() {
				time--;
				_this.endclearInterval(time, box, int);
			}, 1000);

		} else if(status == true) {
			document.body.removeChild(b);
			return;
		}
	},
	endclearInterval: function(time, box, int) {
		time > 0 ? time-- : clearInterval(int);
		if(time == 0) {
			clearInterval(int);
			document.body.removeChild(box);
			return;
		}
	},
	//�жϷ���
	verificationMethod: function(region, conttext, subname, _Method, event) {
		var mobile_flag = _Method.isMobile(mobile_flag);
		var setvalue = [];
		mun = 0;
		for(var i = 0; i < conttext.length; i++) {
			var verify = conttext[i].getAttribute('data-verify');
			var textname = "����Ϊ�գ�";
			//if(verify === "verify") {
				var obj = conttext[i];
				var Hints = conttext[i].getAttribute('data-name');
				var promptname = conttext[i].getAttribute('data-prompt');
				var mode=conttext[i].getAttribute('data-mode');
				var selects = ID$("Competence_sort" + i + "");
				var index = conttext[i].selectedIndex; // ѡ������
				if(index) {
					var selectname = conttext[i].options[index].value;
				}
				if(conttext[i].value == "") {
					if(verify == "verify") {
					var eventname=event.type;	
			        _Method.PromptModeMethod(conttext[i], _Method,eventname);	
					_Method.newprompt(textname, Hints, _Method, obj);
					setvalue.push(i);
					}
				} else if(conttext[i] == selects) {
					var selectname = conttext[i].options[index].value;
					if(selectname == "0") {
						if(verify == "verify") {
						_Method.newprompt(textname, Hints, _Method, selects);
						setvalue.push(i);
						}
					} else {
						_Method.prompthtml(selects);
					}
				}
				mun++;
			//}
			var content=conttext[i].value;
			if(content!= "") {
				var Editmode = _Method.par.Editmode;
				if(mode==Editmode){
					_Method.prompthtml(obj);
				}else{
					if(conttext[i] != selects){
						_Method.formatmethod(conttext, Hints, _Method, obj, promptname,verify);
					}
				}	
			}
		}
		_Method.submitoperate(setvalue, conttext, _Method, mun);
	},
	//��ʽ��֤����
	formatmethod: function(conttext, Hints, _Method, obj, promptname,verify) {
		if(promptname!=null){
			if(promptname == "phone") {
				var expression = /^[1][3,4,5,7,8][0-9]{9}$/;
			} else if(promptname == "mailbox") {
				var expression = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
			} else if(promptname == "password") {
				var expression = /^[a-zA-Z]\w{5,17}$/;
			} else if(promptname == "text_content") {
				var expression = /^[A-Za-z0-9]+$/;
			}
		}
		var v = obj.value;
		if(expression != null) {
			if(promptname == "password") {
				if(v != "") {
					var V = v.length;
					if(V < _Method.par.Passwordlength) {
						var textname = "���Ȳ���С��"+_Method.par.Passwordlength+"λ������������롣";
						obj.value="";
						_Method.newprompt(textname, Hints, _Method, obj);
						return false
					} else if(expression.test(v)) {
						var textname = "����ֻ�������ֻ���ĸ��";
						_Method.newprompt(textname, Hints, _Method, obj);
						return false
					} else {
						var textname = "",
							Hints = "";
						_Method.newprompt(textname, Hints, _Method, obj);
						return false
					}
				};
			}
		}
		if(promptname == "confirm") {
			for(var i = 0; i < conttext.length; i++) {
				var format = conttext[i].getAttribute('data-prompt');
				if(format == "password") {
					var zhi = conttext[i].value;
				}
			}
			if(v != "") {
				if(zhi != v) {
					var textname = "��һ��,��������롣";
					//obj.value="";
					_Method.newprompt(textname, Hints, _Method, obj);
					return false;
				} else {
					_Method.prompthtml(obj);
				}
			}
		} else {
			var textname = "",
				Hints = "";
				if(verify === "verify") {
			_Method.newprompt(textname, Hints, _Method, obj);
			}
			return false
		}
	},
	submitoperate: function(setvalue, conttext, _Method, mun) {
		if(setvalue.length==0) {
			var formData = "";
			var newarr = []; //����һ������
			var newgroup = {};
			for(var i = 0; i < conttext.length; i++) {
				var keyvalue = conttext[i].getAttribute("data-key");
				var keypassword = conttext[i].getAttribute("data-value");
				var datatype=conttext[i].getAttribute("data-type");
				var verupload=conttext[i].type;
				var v = conttext[i].value;
				var muster = _Method.getByClass(conttext[i], 'SelectionBox');
				newgroup[keyvalue] = '';
				if(keyvalue != null) {	
					if(muster != 0) {
						var mode = conttext[i].getAttribute("data-mode");
						if(mode=='radio'){
							for(var c = 0; c < muster.length; c++) {
							    var checkedname = NAME$("radio" + i + "")[c];
								if(checkedname.checked == true) {
									var v = NAME$("radio" + i + "")[c].value;
								}
						  }
						}else if(mode=='checkbox'){
							var checkboxArray = []; //����һ������
							var ArrayString = conttext[i].getAttribute("data-Array");
							var result = ArrayString.split(",");
							for(var c = 0; c < muster.length; c++) {
							    var checkedname = NAME$("radio" + i + "")[c];
								if(checkedname.checked == true) {
									var x = NAME$("radio" + i + "")[c].value;
									var newcheckbox = {
									id: x,
									name: result[x]
								    };
							        checkboxArray.push(newcheckbox); //������������
								}
						  }
						var v = JSON.stringify(checkboxArray);
						}
					}
					if(keypassword == "password") {
						var base=_Method.par.Transform;
						if(base==true){
						 	formData += keyvalue + "=" + _Method.binb2b64(v) + "&";
						    newgroup[keyvalue] += _Method.binb2b64(v);
						 }else if(base==false){
						 	formData += keyvalue + "=" + v + "&";
						    newgroup[keyvalue] +=v;
						 }
					}else if(verupload=="file"){
						     if(conttext[i].files[0]){
						     	v=conttext[i].files[0].name;
						        formData += keyvalue + "=" + v + "&";
						        newgroup[keyvalue] += v;
						     	
						     }else{
						     	newgroup[keyvalue] += "";
						     }
						
					} else {
						formData += keyvalue + "=" + v + "&";
						newgroup[keyvalue] += v;
					}
				}else{
					newgroup[keyvalue] += v;	
				}
			}
			
			
			newarr.push(newgroup); //������������
			_Method.par.SubmitMethod(_Method, formData, newarr);
		} else {
		  return false
	    }
	},
	//�ı���������������
	Wordcount: function(_Method, conttext, e) {
		for(var i = 0; i < conttext.length; i++) {
			var stint = conttext[i].getAttribute('data-stint');
			if(stint == "Wordcount") {
				var obj = conttext[i];
				var S = obj.value.length;
				var span = LABEL$("span");
				var sl = conttext[i].getAttribute('size');
				if(sl) {
					var size = parseInt(conttext[i].getAttribute('size'));
				} else {
					var size = 20;
				}
				var classname = _Method.getByClass(obj.parentNode, 'word_count')[0];
				if(classname) {
					if(S == 0) {
						classname.innerHTML = "ʣ������ :<em class='number'>" + size + "</em>�ַ�";
					}
					var prompt = classname.getElementsByTagName('em')[0];
				} else {
					obj.parentNode.appendChild(span).className = "word_count";
					span.innerHTML = "ʣ������ :<em class='number'>" + size + "</em>�ַ�";
					var prompt = span.getElementsByTagName('em')[0];
				}

				obj.onkeyup = function(event) {
					_Method.Wordonkeyup(obj, size, _Method, prompt);
				}
				obj.onblur = function(event) {
					var expression = /^[A-Za-z0-9]+$/;
					if(expression.test(obj.value)) {
						var Hints = obj.getAttribute('data-name');
						var textname = "�ı����ݲ���ֻ����������ĸ��";
						_Method.newprompt(textname, Hints, _Method, obj);
						//_Method.PromptBox("�ı����ݲ���ֻ����������ĸ", 2);
					}
				};
				!e ? _Method.Wordonkeyup(obj, size, _Method, prompt) : '';
			}
		}
	},
	Wordonkeyup: function(obj, size, _Method, prompt) {
		if(obj.value.length > size) {
			_Method.PromptBox("�������������������", 2);
			obj.value = obj.value.substring(0, size);
			prompt.innerHTML = 0;
			return false;
		} else {
			var curr = size - obj.value.length; //��ȥ ��ǰ�����	
			prompt.innerHTML = curr.toString();
			return true;
		}
	}
}
