
					callBackInit=function(){
							 getSingleData("query71SingleNews",MP.id,"N_",function(data){
								 $(".N_content").html(data.content.replace(/\/upload\//ig,domainUrl+"/upload/"))
							 });
					}
				