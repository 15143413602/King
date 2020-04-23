
			callBackInit=function(){
 					var template='<option value="{id}" style="text-align:right">{title}</option>';
					getNewData("TranOrderController_13",{newApi:true},function(data){
							$.each(data.data,function(k,v){
									$(".selected").append(replaceJsonKeys(template,v));
							});
							//初始化图片数据数据
							loadImg(".shangc");
					});
				}
		