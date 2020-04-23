
       callBackUserInfo=function(user){
            getPictureByAlbum(1,true,'image',function(data){

            });
       }
       uploadCallback=function(pic){
          saveUsers({pic:pic},function(){
              winCloseFinish();
          });
       }
      