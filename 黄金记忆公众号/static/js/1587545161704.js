
          callBackInit=function(){
              getAttribute("userid",function(num,data){$("input[name='id']").val(data);});
							var template='<option value="{id}">{title}</option>';
			        getNewData("TranOrderController_13",{newApi:true},function(data){
			            $.each(data.data,function(k,v){
			                $(".selected").append(replaceJsonKeys(template,v));
			            });
			            //��ʼ��ͼƬ��������
			            loadImg(".shangc");
			        });
						}
        