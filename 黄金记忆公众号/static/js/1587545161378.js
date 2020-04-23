
      //是否自动加载头部
          isAppendCssFlag=false;
         callBackUserInfo=function(user){
           //
         /* var floatModule = api.require('floatModule');
          var params = { rect:{x:10,y:24,w:30, h:30},radius:30,avatar:'widget://res/fanhui.png'};
          floatModule.openFloat(params, function(ret) {
              alert(ret);
          });*/
             if(user.id==0||user.id==""){
               $(".user1").hide();
               $(".user2").show();
             }else{
               $(".user1").show();
               $(".user2").hide();
             }

       }
       uploadCallback=function(pic){
          saveUsers({pic:pic},function(){
              getUserInfos();
          });
       }
      