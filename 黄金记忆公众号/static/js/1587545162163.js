
 var users;
callBackUserInfo=function(user){
	users=user;

}
		new SYSVerification({
		Verification: 'appraisal', //��֤����
		Submit: 'modifybtn1', //�ύ��ť����
		Empty: 'Emptybtn1',
		Datamode: 'json',
		FailurePrompt: '���ʧ�����������', //����ʧ����ʾ
		Formmode: 'submitmode',
		SubmitMethod: function(index, data, newarr) { //index��������  dataΪƴ����ʽ�����ʺϴ�&��ǩ���ı����� ,newarrΪjson��ʽ
			var mode = index.par.Datamode;
			if(mode == "json") {
				var str = JSON.stringify(newarr);
 				var jsons = eval("("+str+")");
				var json=jsons[0];
 				//var json=str.replace(/\[|]/g,'');
			//	ID$('jsoncontent').innerHTML=json;
				//index.ajaxPost('../../php/submit.php?action=insertjson',null, json); //url��ַ��data��ȡ����
				jsonPost("/saveSql.do",{star:json.satisfied,tb_noform:"boyun_huo_pl",content:encodeURI(json.summary),uid:users.caruid,puid:users.xuid},function(v){
					 	if(v.error==0){
							jsonPost("/carRabTranOrder.do",{status:7,id:MP.id},function(data){
								if(data.error==0){
										alerts('���۳ɹ���');
										setTimeout(function(){ winCloseFinish();},1500);
								} 
						  });

						}
				})
			}
		}, //�ύ��֤�ص�����
		Load: function(index, conttext) {}, //�����������ڻ�ȡ����
		ConfirmCallback: function(index, data) {

			index.PromptBox("���۳ɹ�",2);
		}, //ȷ�ϻص�����
		Expand: function(index) {}, //��չ
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
