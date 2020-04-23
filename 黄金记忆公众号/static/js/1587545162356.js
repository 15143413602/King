
 //setStorage("isopenLoginFlag",true);
    var firstisopenLoginFlag=true;
    indexListExit=true;

    $(function(){
        setInterval(function(){
        var userid=getStorage("userid")+"";
        var type=getStorage("type")+"";
        var locaH=location.href;
        if(type==1){ 
          location.href="./html/loginU.html";
         }
          //加载基础框架
        if(userid=="0"){ 
             //location.href="./html/loginU.html";
            location.href="./html/loginU.html";

         }else   if(firstisopenLoginFlag&&typeof api =="object" &&(locaH).indexOf("reaload=true")!=-1){
           firstisopenLoginFlag=false;
           setTimeout(function(){ apiready();},2000);
          }

        if(flagSeachLoc){
          flagSeachLoc=false;
          updateLocation(true);
        }
      },2000);
    });
    //初始化次�?
     callBackInit = function(){
       
    }
 
 function randomSwitchBtn(obj, name, index) {
      	var footer = $api.byId('footer');
      	var footerAct = $api.dom(footer, '.aui-bar-tab-item.aui-active');
        $api.removeCls(footerAct, 'aui-active');
        $api.addCls(obj, 'aui-active');
        api.setFrameGroupIndex({
            name: 'footer_tab_demo',
            index: index,
            scroll:true
        });
    }
