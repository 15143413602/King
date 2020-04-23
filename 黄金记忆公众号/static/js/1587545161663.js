
 var users;
callBackUserInfo=function(user){
	users=user;

}
		new SYSVerification({
		Verification: 'appraisal', //验证区域
		Submit: 'modifybtn1', //提交按钮名称
		Empty: 'Emptybtn1',
		Datamode: 'json',
		FailurePrompt: '添加失败请从新输入', //请求失败提示
		Formmode: 'submitmode',
		SubmitMethod: function(index, data, newarr) { //index方法集合  data为拼接形式，不适合待&标签的文本内容 ,newarr为json格式
			var mode = index.par.Datamode;
			if(mode == "json") {
				var str = JSON.stringify(newarr);
 				var jsons = eval("("+str+")");
				var json=jsons[0];
 				//var json=str.replace(/\[|]/g,'');
			//	ID$('jsoncontent').innerHTML=json;
				//index.ajaxPost('../../php/submit.php?action=insertjson',null, json); //url地址，data获取数据
				jsonPost("/saveSql.do",{star:json.satisfied,tb_noform:"boyun_huo_pl",content:encodeURI(json.summary),uid:users.caruid,puid:users.xuid},function(v){
					 	if(v.error==0){
							jsonPost("/carRabTranOrder.do",{status:7,id:MP.id},function(data){
								if(data.error==0){
										alerts('评论成功！');
										setTimeout(function(){ winCloseFinish();},1500);
								} 
						  });

						}
				})
			}
		}, //提交验证回调方法
		Load: function(index, conttext) {}, //加载数据用于获取数据
		ConfirmCallback: function(index, data) {

			index.PromptBox("评价成功",2);
		}, //确认回调方法
		Expand: function(index) {}, //扩展
		ExtendMethod: function(index,conttext) {
			var muster = index.getByClass(conttext[1], 'ace');
			for(var i = 0; i < muster.length; i++) {
				muster[i].onclick = function(e) {
					var evt = e || window.event;
				    var tar = evt.target || evt.srcElement;
				    var text=tar.parentNode.innerText;
					if(tar.checked == true) {
						ID$('textarea').value +=text+' ,';
					}else{
						var content=ID$('textarea').value;
						ID$('textarea').value=content.replace(text+' ,', '');
					}
				}
			}
		}
	});
