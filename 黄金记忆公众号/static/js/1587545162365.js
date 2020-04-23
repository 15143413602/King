
 //setStorage("isopenLoginFlag",true);
    var firstisopenLoginFlag=true;
    indexListExit=true;

    $(function(){
        setInterval(function(){
        var userid=getStorage("userid")+"";
        var type=getStorage("type")+"";
        var locaH=location.href;
        if(type==1){
          api.closeFrameGroup({
             name: 'footer_tab_demo'
          });
          location.href="./html/loginU.html";
         }
          //加载基础框架
        if(userid=="0"){
             api.closeFrameGroup({
                name: 'footer_tab_demo'
             });
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
      
       //  常亮屏幕
       screenLight();
       	loadSystemConf();
       //注册通知
        initJGLoads();
        api.parseTapmode();
        var footer =�?$api.byId('footer')
        var headerPos = {h:0};
        var body_h = api.winHeight;
        var footer_h = $api.offset(footer).h;

        api.openFrameGroup ({
            name: 'footer_tab_demo',
            scrollEnabled:true,
            rect:{
            x:0,
            y:headerPos.h,
            w:'auto',
            h:body_h - headerPos.h - footer_h
            },
            index:0,
            preload:3,

            frames:
            [{
                name: 'main',
                url: 'html/index.html',//index_jd
                bounces:true,
                vScrollBarEnabled:false,
                hScrollBarEnabled:false
            },{
                name: 'footer_tab_2',
                url: 'msg.html',
                bounces:true,
                vScrollBarEnabled:false,
                hScrollBarEnabled:false
            },{
                name: 'footer_tab_3',
                url: 'quan.html',
                bounces:true,
                vScrollBarEnabled:false,
                hScrollBarEnabled:false
            } ,{
                name: 'footer_tab_3',
                url: 'html/huiyuan_hz.html',
                bounces:true,
                vScrollBarEnabled:false,
                hScrollBarEnabled:false
            }]
        }, function(ret, err){
            var footer = $api.byId('footer');
            var footerAct = $api.dom(footer, '.aui-bar-tab-item.aui-active');
             $api.removeCls(footerAct, 'aui-active');

            var name = ret.name;
            var index = ret.index;
            if(index==0){
                $api.addCls($api.byId('tabbar1'), 'aui-active');
            }else if(index==1){
                 $api.addCls($api.byId('tabbar2'), 'aui-active');
            }else if(index==2){
                 $api.addCls($api.byId('tabbar3'), 'aui-active');
            }else if(index==3){
                 $api.addCls($api.byId('tabbar4'), 'aui-active');

            }else if(index==4){
                $api.text($api.byId('aui-header'),' ');
                $api.addCls($api.byId('tabbar5'), 'aui-active');
            }
        })
    }

    function closeWin(){
        api.closeWin();
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
