

$('#searchMap').bind('keyup', function(event) {
　　if (event.keyCode == "13") {
　　　　//回车执行查询
　　　　showMaps_JS($('#searchMap').val(),-1)
　　}
});
//收款方式
function shoukuanjgtype(obj){
  layer.open({
   content: '计费方式'
   ,btn: ['议价付费', '排班收费/10小时' ]
   ,skin: 'footer'
   ,yes: function(index){
       $(obj).val('议价付费 >');
       $("#jgtype").val(0);
       layer.close(index);
   },no:function(index){
      $("#jgtype").val(1);
      $(obj).val('排班收费/10小时 >');
      layer.close(index);
   }
 });
}
//收款方式
function shoukuanfangshi(obj){
  layer.open({
   content: '付款方式'
   ,btn: ['发货时付款', '收货时付款' ]
   ,skin: 'footer'
   ,yes: function(index){
       $(obj).val('发货时付款 >');
       $("#payfs").val(0);
       layer.close(index);
   },no:function(index){
      $("#payfs").val(1);
      $(obj).val('收货时付款 >');
      layer.close(index);
   }
 });
}
//添加收货地址

function addAdresses(obj){

   $(obj).parent().after('<div class="content-block showAddr'+addNums+'"> <i class="iconfont" style="top:12px;color: #e06803;">&#xe600;</i>'+
   ' <input id="demo'+addNums+'" type="text"  onclick="showMaps_JS('','+addNums+')"    readonly="" placeholder="选择收货地址" /> '+
   '   '+
   '<input id="shrsjh'+addNums+'"   type="hidden" maxlength="11"  maxnum="11"  oninput="splitInputValue(this,11)"  placeholder="收货电话" /> '
   +'<input id="shrdz'+addNums+'" type="hidden" value=""> <input id="shrx'+addNums+'" type="hidden" value=" "> <input id="shry'+addNums+'" type="hidden" value=" ">'+
 ' <input id="shall'+addNums+'" type="hidden" value=" "> <img onclick="$('.showAddr'+addNums+'').remove()" src="../image/del.png" style="float: right; position: absolute; right: 10px; z-index: 10001; top: 15px; width: 25px;"> </div>');
  addNums++;
}
//时间选择切换
   function qhtimes(obj,val){
     $("#yytime").val("现在");
     $(".yuyysj").find("li").removeClass("selecteds");
     $(obj).addClass("selecteds");

     if(val==2){
       $("#yytime").trigger("click");
     }
   }

   //过滤初始化
   function initshowFilter(name){
     $(".lvtong,.gongcheng").hide()
     getNewData("TranOrderController_43",{newApi:true},function(data){
         var nums=0;

         $(".filterDiv").html('<header class="aui-navBar aui-navBar-fixed b-line" s style="position: relative; width: 100%;"> '+
         '<a href="message_sys.html" class="aui-navBar-item"> &nbsp; </a> <div class="aui-center"> <span class="aui-center-title" style="font-size:14px">属性筛选</span> '+
         '</div> <a href="javascript:;" class="aui-navBar-item" onclick="scan()"> &nbsp; </a> </header>');
         var counts=0;
         $.each(data.data,function(k,v){
             if(name.indexOf(v.title)!=-1){
               counts++;
               var id="myid"+nums;
               nums++;
               $(".filterDiv").append('<h4>'+v.title+'</h4> <div id="'+id+'"></div><input type="hidden" id="val'+id+'">');
               var list = (v.content+"").split(',');
               var data = [];
               var prize=(v.prize+"").split(',');
               //价格展示ddd
               for(var i=0;i<list.length;i++){
                 var js = {};
                 js.id=v;
                 if(prize.length>i && typeof(prize[i])!="undefined" && !isNaN(prize[i]))
                   js.text=" "+list[i]+"/"+prize[i]+"元/小时";
                 else
                   js.text=" "+list[i];
                 data.push(js);
               }
               $('#'+id).comboboxfilter({
                  url: '',
                  scope: 'FilterQuery3',
                  data:data,
                  onChange:function(newValue){
                      //$('#val'+id).val(newValue);
                      $("input[name='othertext']").val((""+$(".selected-query").text()).replace("全部清除",""));
                      closeShowF();
                      $(".lvtong").hide();
                      $("html,body").animate({scrollTop:$("#subform").offset().top-200},100);
                      $("input[name='islt']").prop("checked",false);
                      $(".shangc").find("input[name='cartypeid']").each(function(){
                          if($(this).is(":checked")){
                            if($(this).attr("data-type")==0) {
                                 $(".lvtong").show();
                                 $("#demo1").attr("placeholder","选择装货地址");
                                 //$("#demo1_1").attr("placeholder","添加装货手机号");
                              }
                              if($(this).attr("data-type")==1) {
                                   $(".gongcheng").show();
                                   $("#demo1").attr("placeholder","选择施工地址");
                                  // $("#demo1_1").attr("placeholder","添加施工手机号");
                                }
                          }
                     });
                  }
                });

             }

          });
              // $(".filterDiv").append('<textarea id="contents" style="width:100%;height:80px" placeholder="请简单描述下你的货物信息"></textarea>');
               $(".filterDiv").append('<input   type="button" value="关闭" onclick="closeShowF()" style="margin:10px auto; padding:4px 10px ;width:100%;background: #ff7a01; color: #FFF; font-size: 18px; text-indent: 0px;" />');
               if( counts==0){

                 $("input[name='othertext']").val((""+$(".selected-query").text()).replace("全部清除",""));
                 closeShowF();
                 $(".lvtong").hide();
                 $("html,body").animate({scrollTop:$("#subform").offset().top-200},100);
                 $("input[name='islt']").prop("checked",false);
                 $(".shangc").find("input[name='cartypeid']").each(function(){
                     if($(this).is(":checked")){
                       if($(this).attr("data-type")==0) {
                            $(".lvtong").show();
                            $("#demo1").attr("placeholder","选择装货地址");
                            //$("#demo1_1").attr("placeholder","添加装货手机号");
                         }
                         if($(this).attr("data-type")==1) {
                              $(".gongcheng").show();
                              $("#demo1").attr("placeholder","选择施工地址");
                             // $("#demo1_1").attr("placeholder","添加施工手机号");
                           }
                     }
                });
                return;
               }
  } );
   }
   function showFilter(name,obj){
    $(".filterDiv").show();
    //初始化过滤信息
    initshowFilter(name);

    var par=$(obj).parent().parent();
    $(".shangc").append(par);
    //$(obj).parent().parent().remove();
   }
   function closeShowF(){
     //$("#hztext").val($("#contents").val());
     $('.filterDiv').hide();
   }
   //立即发货
   var submitFlags=true;
   function checkCarType(){

       $("input[name='xdsj']").val(new Date().getTime());
  //   if(true) openwin("xiadian-detail.html?id=");
       if($("input[name='fhdz']").val()==""){
           alerts("请选择发货地址！");
           return;
       }
       if($("input[name='fhrsjh']").val()==""){
           alerts("请输入发货人电话");
           return;
       }
       var addrs=[];
       for(var i=0;i<addNums+1;i++){
         if($("#shrdz"+i).length>0){
             if($("#shrx"+i).val()==""){
                  alerts("请选择收货地址！");
                 return;
             }
             if($("#shrsjh"+i).val()==""){
                  alerts("收货人手机号必填");
                 return;
             }
              var json = {};
              json.lat=$("#shrx"+i).val();
              json.lon=$("#shry"+i).val();
              json.dz=$("#shrdz"+i).val();
              json.all=$("#shall"+i).val();
              json.sjh=$("#shrsjh"+i).val();
              addrs.push(json);
          }
       }
       $("#waypoint").val(JSON.stringify(addrs));
      var layers=  loading();
       //选择车型
       var flags = true;
       $(".shangc").find("input[name='cartypeid']").each(function(){
               if($("input[name='islt']").is(":checked")){
                   $("#islt").val("1");

               }else{
                 if($(this).is(":checked")){
                   if($(this).attr("data-type")==0)
                     $("#islt").val(0);
                     else {

                        $("#islt").val(2);
                     }

                 }
               }

                if($(this).is(":checked")){
                     flags=false;
                     var obj = this;
                     var jcfy = parseFloat($(obj).attr("data-q"));
                     if($(obj).attr("data-type")=="1")
                         $("#islt").val("2");

                     //起步距离
                     $("input[name='cartypename']").val($(obj).attr("data-title"));
                     var foot =parseFloat ($(obj).attr("data-lucheng"));
                     var addprice=parseFloat($(obj).attr("data-addprice"));
                     var carid=parseFloat($(obj).attr("data-id"));
                      var max=parseFloat($(obj).attr("data-max"));
                      submitFlags=false;

                    //alert("路线长度："+ret.paths[0].distance+",收费路段："+ret.paths[0].tollDistance+",预计时间："+ret.paths[0].duration);
                    sumPoint(parseFloat($("input[name='fhry']").val()),parseFloat($("input[name='fhrx']").val()),1,1,
                    function(luchang,shoufeiluchang,times){
                         //alert("路线长度："+luchang+",收费路段："+shoufeiluchang+",预计时间："+times);
                          closeLoading(layers);
                          $("input[name='times']").val(times*1000);
                          $("input[name='juli']").val(luchang/1000);
                          var lc = (luchang/1000-foot) ;
                          if(lc<0)
                              lc=0;
                          var allprice =  toDecimal(lc*addprice+jcfy);
                          //if(allprice>max)
                          //    allprice=max;
                              //工程车
                          var titles=((luchang/1000).toFixed(2))+'公里,'+getTimes(times*1000)+',费用：'+allprice+'元';
                          if($("#islt").val()==2){
                              allprice=jcfy;
                              var otherText=$("input[name='othertext']").val()+"";
                              if(otherText.indexOf("/")!=-1)
                              //装在车 工程车
                                jcfy=parseFloat(otherText.split("/")[1]);
                              if($("#jgtype").val()==1){
                                allprice=jcfy*8;
                                titles=$("#jgtypeText").val()+',预计费用：'+allprice+'元';
                              }else{
                                allprice=jcfy;
                                titles=$("#jgtypeText").val()+',费用：'+allprice+'元/每小时';
                              }
                          }else{
                            //发货时付款
                            var payfs=$("input[name='payfs']:checked").val();
                            if(payfs==0){
                              var max=parseInt(apps().CYTFHFKJCFY.value);
                              allprice =  toDecimal(lc*addprice+jcfy+max);
                              titles=((luchang/1000).toFixed(2))+'公里,'+getTimes(times*1000)+',费用：'+allprice+'元';
                            }
                          }

                          $("input[name='jcfy']").val(allprice);
                          //提交表单
                          var params = $("#loginForm").serialize();

                          layer.open({
                            content: titles
                            ,btn: ['立即下单', '取消']
                            ,skin: 'footer'
                            ,yes: function(index){
                               jsonPost("/saveTranOrder.do",params,function(data){
                                  if(data.error=="0"){
                                      openwin("xiadian-detail.html?id="+data.id);
                                      layer.close(index);
                                      document.getElementById("loginForm").reset();
                                  }else{
                                      alerts(data.error_msg);

                                  }
                                    submitFlags=true;
                              });
                            }
                          });
                    });
                }

       });
       if( flags){
           closeLoading(layers);
           alerts("请选择车型！");
           return;
       }
    }
    //页面初始化完成
    callBackInit=  function(){
        var template='<div class="aui-flex aui-flex-top b-line"> <div class="aui-sml-car"> <img onclick="openwin('carInfo.html?id={id}');" data-src="{pic}" alt=""> </div>'+
        ' <div class="aui-flex-box"> <h4>{title}</h4><label onclick="showFilter('{title}',this)" > <h5>基础价: <em>{qprice}元,{lucheng}km</em></h5> '+
        '<h6>宽高:{width}*{height}米,载重:{weight}吨<em><input style="position:relative;right:-20px;top:-20px;"  data-lucheng="{lucheng}"'+
        ' data-addprice="{addprice}" data-q="{qprice}" data-max="{maxprice}"'
        +' data-type="{types}" data-title="{title}"  data-width="{width}" data-id="{id}" data-height="{height}" '+
        'type="radio"  name="cartypeid"  value="{id}"> </em></h6> <label></div> </div>';
      //  var template='<ul ><a href="carInfo.html?id={id}"> <i><img data-src="{pic}"></i> </a><li > <div class="WellRadio WellRadioH" ><input  data-lucheng="{lucheng}" data-addprice="{addprice}" data-q="{qprice}" data-max="{maxprice}" data-type="{types}" data-title="{title}"  data-width="{width}" data-id="{id}" data-height="{height}" type="radio"  name="cartypeid"  value="{id}" ></div><pre>{title}</pre> </li> </ul>';
        getNewData("TranOrderController_13",{newApi:true},function(data){
            $.each(data.data,function(k,v){

                $(".shangc").append(replaceJsonKeys(template,v));
            });
            //初始化图片数据数据
            loadImg(".shangc");
        });
        $(function(){
            addUpdateLocation();
        });


    }
    //用户信息回调
    callBackUserInfo=function(user){
      //检测是否有未完成订单
      getNewData("TranOrderController_xuid",{newApi:true,param:"{'p1':'"+user.id+"'}"},function(data){
          if(data.res==0){
            var v = data.data[0];
            if(v.status>-1&&v.status<6)
              openwin("xiadian-detail.html?id="+v.id);
          }
          //初始化图片数据数据
      });
    }
