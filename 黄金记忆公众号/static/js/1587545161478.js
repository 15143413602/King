

$('#searchMap').bind('keyup', function(event) {
����if (event.keyCode == "13") {
��������//�س�ִ�в�ѯ
��������showMaps_JS($('#searchMap').val(),-1)
����}
});
//�տʽ
function shoukuanjgtype(obj){
  layer.open({
   content: '�Ʒѷ�ʽ'
   ,btn: ['��۸���', '�Ű��շ�/10Сʱ' ]
   ,skin: 'footer'
   ,yes: function(index){
       $(obj).val('��۸��� >');
       $("#jgtype").val(0);
       layer.close(index);
   },no:function(index){
      $("#jgtype").val(1);
      $(obj).val('�Ű��շ�/10Сʱ >');
      layer.close(index);
   }
 });
}
//�տʽ
function shoukuanfangshi(obj){
  layer.open({
   content: '���ʽ'
   ,btn: ['����ʱ����', '�ջ�ʱ����' ]
   ,skin: 'footer'
   ,yes: function(index){
       $(obj).val('����ʱ���� >');
       $("#payfs").val(0);
       layer.close(index);
   },no:function(index){
      $("#payfs").val(1);
      $(obj).val('�ջ�ʱ���� >');
      layer.close(index);
   }
 });
}
//����ջ���ַ

function addAdresses(obj){

   $(obj).parent().after('<div class="content-block showAddr'+addNums+'"> <i class="iconfont" style="top:12px;color: #e06803;">&#xe600;</i>'+
   ' <input id="demo'+addNums+'" type="text"  onclick="showMaps_JS('','+addNums+')"    readonly="" placeholder="ѡ���ջ���ַ" /> '+
   '   '+
   '<input id="shrsjh'+addNums+'"   type="hidden" maxlength="11"  maxnum="11"  oninput="splitInputValue(this,11)"  placeholder="�ջ��绰" /> '
   +'<input id="shrdz'+addNums+'" type="hidden" value=""> <input id="shrx'+addNums+'" type="hidden" value=" "> <input id="shry'+addNums+'" type="hidden" value=" ">'+
 ' <input id="shall'+addNums+'" type="hidden" value=" "> <img onclick="$('.showAddr'+addNums+'').remove()" src="../image/del.png" style="float: right; position: absolute; right: 10px; z-index: 10001; top: 15px; width: 25px;"> </div>');
  addNums++;
}
//ʱ��ѡ���л�
   function qhtimes(obj,val){
     $("#yytime").val("����");
     $(".yuyysj").find("li").removeClass("selecteds");
     $(obj).addClass("selecteds");

     if(val==2){
       $("#yytime").trigger("click");
     }
   }

   //���˳�ʼ��
   function initshowFilter(name){
     $(".lvtong,.gongcheng").hide()
     getNewData("TranOrderController_43",{newApi:true},function(data){
         var nums=0;

         $(".filterDiv").html('<header class="aui-navBar aui-navBar-fixed b-line" s style="position: relative; width: 100%;"> '+
         '<a href="message_sys.html" class="aui-navBar-item"> &nbsp; </a> <div class="aui-center"> <span class="aui-center-title" style="font-size:14px">����ɸѡ</span> '+
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
               //�۸�չʾddd
               for(var i=0;i<list.length;i++){
                 var js = {};
                 js.id=v;
                 if(prize.length>i && typeof(prize[i])!="undefined" && !isNaN(prize[i]))
                   js.text=" "+list[i]+"/"+prize[i]+"Ԫ/Сʱ";
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
                      $("input[name='othertext']").val((""+$(".selected-query").text()).replace("ȫ�����",""));
                      closeShowF();
                      $(".lvtong").hide();
                      $("html,body").animate({scrollTop:$("#subform").offset().top-200},100);
                      $("input[name='islt']").prop("checked",false);
                      $(".shangc").find("input[name='cartypeid']").each(function(){
                          if($(this).is(":checked")){
                            if($(this).attr("data-type")==0) {
                                 $(".lvtong").show();
                                 $("#demo1").attr("placeholder","ѡ��װ����ַ");
                                 //$("#demo1_1").attr("placeholder","���װ���ֻ���");
                              }
                              if($(this).attr("data-type")==1) {
                                   $(".gongcheng").show();
                                   $("#demo1").attr("placeholder","ѡ��ʩ����ַ");
                                  // $("#demo1_1").attr("placeholder","���ʩ���ֻ���");
                                }
                          }
                     });
                  }
                });

             }

          });
              // $(".filterDiv").append('<textarea id="contents" style="width:100%;height:80px" placeholder="�����������Ļ�����Ϣ"></textarea>');
               $(".filterDiv").append('<input   type="button" value="�ر�" onclick="closeShowF()" style="margin:10px auto; padding:4px 10px ;width:100%;background: #ff7a01; color: #FFF; font-size: 18px; text-indent: 0px;" />');
               if( counts==0){

                 $("input[name='othertext']").val((""+$(".selected-query").text()).replace("ȫ�����",""));
                 closeShowF();
                 $(".lvtong").hide();
                 $("html,body").animate({scrollTop:$("#subform").offset().top-200},100);
                 $("input[name='islt']").prop("checked",false);
                 $(".shangc").find("input[name='cartypeid']").each(function(){
                     if($(this).is(":checked")){
                       if($(this).attr("data-type")==0) {
                            $(".lvtong").show();
                            $("#demo1").attr("placeholder","ѡ��װ����ַ");
                            //$("#demo1_1").attr("placeholder","���װ���ֻ���");
                         }
                         if($(this).attr("data-type")==1) {
                              $(".gongcheng").show();
                              $("#demo1").attr("placeholder","ѡ��ʩ����ַ");
                             // $("#demo1_1").attr("placeholder","���ʩ���ֻ���");
                           }
                     }
                });
                return;
               }
  } );
   }
   function showFilter(name,obj){
    $(".filterDiv").show();
    //��ʼ��������Ϣ
    initshowFilter(name);

    var par=$(obj).parent().parent();
    $(".shangc").append(par);
    //$(obj).parent().parent().remove();
   }
   function closeShowF(){
     //$("#hztext").val($("#contents").val());
     $('.filterDiv').hide();
   }
   //��������
   var submitFlags=true;
   function checkCarType(){

       $("input[name='xdsj']").val(new Date().getTime());
  //   if(true) openwin("xiadian-detail.html?id=");
       if($("input[name='fhdz']").val()==""){
           alerts("��ѡ�񷢻���ַ��");
           return;
       }
       if($("input[name='fhrsjh']").val()==""){
           alerts("�����뷢���˵绰");
           return;
       }
       var addrs=[];
       for(var i=0;i<addNums+1;i++){
         if($("#shrdz"+i).length>0){
             if($("#shrx"+i).val()==""){
                  alerts("��ѡ���ջ���ַ��");
                 return;
             }
             if($("#shrsjh"+i).val()==""){
                  alerts("�ջ����ֻ��ű���");
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
       //ѡ����
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

                     //�𲽾���
                     $("input[name='cartypename']").val($(obj).attr("data-title"));
                     var foot =parseFloat ($(obj).attr("data-lucheng"));
                     var addprice=parseFloat($(obj).attr("data-addprice"));
                     var carid=parseFloat($(obj).attr("data-id"));
                      var max=parseFloat($(obj).attr("data-max"));
                      submitFlags=false;

                    //alert("·�߳��ȣ�"+ret.paths[0].distance+",�շ�·�Σ�"+ret.paths[0].tollDistance+",Ԥ��ʱ�䣺"+ret.paths[0].duration);
                    sumPoint(parseFloat($("input[name='fhry']").val()),parseFloat($("input[name='fhrx']").val()),1,1,
                    function(luchang,shoufeiluchang,times){
                         //alert("·�߳��ȣ�"+luchang+",�շ�·�Σ�"+shoufeiluchang+",Ԥ��ʱ�䣺"+times);
                          closeLoading(layers);
                          $("input[name='times']").val(times*1000);
                          $("input[name='juli']").val(luchang/1000);
                          var lc = (luchang/1000-foot) ;
                          if(lc<0)
                              lc=0;
                          var allprice =  toDecimal(lc*addprice+jcfy);
                          //if(allprice>max)
                          //    allprice=max;
                              //���̳�
                          var titles=((luchang/1000).toFixed(2))+'����,'+getTimes(times*1000)+',���ã�'+allprice+'Ԫ';
                          if($("#islt").val()==2){
                              allprice=jcfy;
                              var otherText=$("input[name='othertext']").val()+"";
                              if(otherText.indexOf("/")!=-1)
                              //װ�ڳ� ���̳�
                                jcfy=parseFloat(otherText.split("/")[1]);
                              if($("#jgtype").val()==1){
                                allprice=jcfy*8;
                                titles=$("#jgtypeText").val()+',Ԥ�Ʒ��ã�'+allprice+'Ԫ';
                              }else{
                                allprice=jcfy;
                                titles=$("#jgtypeText").val()+',���ã�'+allprice+'Ԫ/ÿСʱ';
                              }
                          }else{
                            //����ʱ����
                            var payfs=$("input[name='payfs']:checked").val();
                            if(payfs==0){
                              var max=parseInt(apps().CYTFHFKJCFY.value);
                              allprice =  toDecimal(lc*addprice+jcfy+max);
                              titles=((luchang/1000).toFixed(2))+'����,'+getTimes(times*1000)+',���ã�'+allprice+'Ԫ';
                            }
                          }

                          $("input[name='jcfy']").val(allprice);
                          //�ύ��
                          var params = $("#loginForm").serialize();

                          layer.open({
                            content: titles
                            ,btn: ['�����µ�', 'ȡ��']
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
           alerts("��ѡ���ͣ�");
           return;
       }
    }
    //ҳ���ʼ�����
    callBackInit=  function(){
        var template='<div class="aui-flex aui-flex-top b-line"> <div class="aui-sml-car"> <img onclick="openwin('carInfo.html?id={id}');" data-src="{pic}" alt=""> </div>'+
        ' <div class="aui-flex-box"> <h4>{title}</h4><label onclick="showFilter('{title}',this)" > <h5>������: <em>{qprice}Ԫ,{lucheng}km</em></h5> '+
        '<h6>���:{width}*{height}��,����:{weight}��<em><input style="position:relative;right:-20px;top:-20px;"  data-lucheng="{lucheng}"'+
        ' data-addprice="{addprice}" data-q="{qprice}" data-max="{maxprice}"'
        +' data-type="{types}" data-title="{title}"  data-width="{width}" data-id="{id}" data-height="{height}" '+
        'type="radio"  name="cartypeid"  value="{id}"> </em></h6> <label></div> </div>';
      //  var template='<ul ><a href="carInfo.html?id={id}"> <i><img data-src="{pic}"></i> </a><li > <div class="WellRadio WellRadioH" ><input  data-lucheng="{lucheng}" data-addprice="{addprice}" data-q="{qprice}" data-max="{maxprice}" data-type="{types}" data-title="{title}"  data-width="{width}" data-id="{id}" data-height="{height}" type="radio"  name="cartypeid"  value="{id}" ></div><pre>{title}</pre> </li> </ul>';
        getNewData("TranOrderController_13",{newApi:true},function(data){
            $.each(data.data,function(k,v){

                $(".shangc").append(replaceJsonKeys(template,v));
            });
            //��ʼ��ͼƬ��������
            loadImg(".shangc");
        });
        $(function(){
            addUpdateLocation();
        });


    }
    //�û���Ϣ�ص�
    callBackUserInfo=function(user){
      //����Ƿ���δ��ɶ���
      getNewData("TranOrderController_xuid",{newApi:true,param:"{'p1':'"+user.id+"'}"},function(data){
          if(data.res==0){
            var v = data.data[0];
            if(v.status>-1&&v.status<6)
              openwin("xiadian-detail.html?id="+v.id);
          }
          //��ʼ��ͼƬ��������
      });
    }
