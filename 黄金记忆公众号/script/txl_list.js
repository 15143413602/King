//addPageScroll(".aui-scrollView",".aui-friends-list1");
t.maxnum=10;
var page_num_now=1;orderType=false;
t.scroll_callback_forward_getdata=true;
var layersm;
indexListExit=true;
function loadingHongjiu(){
	var uid=getStorage("userid");
	if(!isNull(MP.uid))
		uid=MP.uid;
		getNewData("HomeController_2",{newApi:true,param:"{'p1':'"+uid+"'}"},function(data){
		if(data.res==0){ 
					$(".aui-friends-list1").append((replaceJsonKey($(".hongjiutemp").html(),data.data)).replace(/\{mqx\}/ig,MP.qx));
			 
 				
				initScrollK();
				if(typeof MP.show=="undefined"){
					$(".noedit").hide();
				}else{
					$(".edit").hide();
					$(".addlist").hide();
				}
				if(!isNull(MP.me)){ 
					$(".WellRadio").hide();
					$(".queaddlist").hide();
				}
		}else{
				hideLoadingScroll();
		}
		if(typeof MP.id=="undefined"){}else{
		 $("input[name='jialist']").attr("type","checkbox")
	 }
		});
}
//关闭窗口
function closeHome(){
	var values=[];
	var uids=[];
	$("input[name='jialist']").each(function(){
		 if($(this).is(":checked")){
			 values.push($(this).attr("value"));
			 uids.push($(this).attr("data"));
		 }
	});
	var jsons={};
	jsons.phone=values;
	jsons.uid=uids;
	winCloseFinish(JSON.stringify(jsons));
}
t.scroll_callback_function=function(){
	page_num_now++;
	loadingHongjiu();
};
 callBackInit = function(){
	 loadingHongjiu();
	 if(!isNull(MP.title)){
		 $(".mytitles").text(decodeURI(MP.title));
	 }
	 
}
var time_touch = 0;//初始化起始时间
function addTouchMouse(){
	$(".aui-friends-list1").find(".aui-flex").each(function(){
		var objs = $(this);
		objs.unbind();
		objs.on('touchstart', function(e){
			e.stopPropagation();
 			time_touch = setTimeout(function(){
				showCloseImg(objs);
			}, 2000);//这里设置长按响应时间
		});

		objs.on('touchend', function(e){
			e.stopPropagation();
			clearTimeout(time_touch);
		});
	});
}

function showCloseImg( objs){
 var obj = $(objs);

	layer.open({
	 content: '是否删除'
	 ,btn: ['删除', '取消']
	 ,skin: 'footer'
	 ,yes: function(index){
		 jsonPost("/deleteuid.do",{"code_noform":contackCacheCode,"tb":"boyun_home","id":obj.attr("data")},function(data){
 		   if(data.error==0){
 			   obj.parent().parent().remove();
 		   }
 		   alerts(data.error_msg);
 	   });
	 }
 });
}

function showCloseImg1( obj){

	layer.open({
	 content: '是否删除'
	 ,btn: ['删除', '取消']
	 ,skin: 'footer'
	 ,yes: function(index){
		 jsonPost("/deleteuid.do",{"code_noform":contackCacheCode,"tb":"boyun_home","id":obj.attr("data")},function(data){
			 if(data.error==0){
				 obj.parent().parent().remove();
			 }
			 alerts(data.error_msg);
		 });
	 }
 });
}
function initScrollK(){
        var Initials=$('.initials');
        var LetterBox=$('#letter');
				Initials.find('ul').append('<li><a href="javascript:;" data-val="#"></a></li><li><a href="javascript:;" data-val="#A">A</a></li><li><a href="javascript:;" data-val="#B">B</a></li><li><a href="javascript:;" data-val="#C">C</a></li><li><a href="javascript:;" data-val="#D">D</a></li><li><a href="javascript:;" data-val="#E">E</a></li><li><a href="javascript:;" data-val="#F">F</a></li><li><a href="javascript:;" data-val="#G">G</a></li><li><a href="javascript:;" data-val="#H">H</a></li><li><a href="javascript:;" data-val="#I">I</a></li><li><a href="javascript:;" data-val="#J">J</a></li><li><a href="javascript:;" data-val="#K">K</a></li><li><a href="javascript:;" data-val="#L">L</a></li><li><a href="javascript:;" data-val="#M">M</a></li><li><a href="javascript:;" data-val="#N">N</a></li><li><a href="javascript:;" data-val="#O">O</a></li><li><a href="javascript:;" data-val="#P">P</a></li><li><a href="javascript:;" data-val="#Q">Q</a></li><li><a href="javascript:;" data-val="#R">R</a></li><li><a href="javascript:;" data-val="#S">S</a></li><li><a href="javascript:;" data-val="#T">T</a></li><li><a href="javascript:;" data-val="#U">U</a></li><li><a href="javascript:;" data-val="#V">V</a></li><li><a href="javascript:;" data-val="#W">W</a></li><li><a href="javascript:;" data-val="#X">X</a></li><li><a href="javascript:;" data-val="#Y">Y</a></li><li><a href="javascript:;" data-val="#Z">Z</a></li><li><a href="javascript:;" data-val="##">#</a></li>');

      //  Initials.find('ul').append('<li><a href="#"></a></li><li><a href="#A">A</a></li><li><a href="#B">B</a></li><li><a href="#C">C</a></li><li><a href="#D">D</a></li><li><a href="#E">E</a></li><li><a href="#F">F</a></li><li><a href="#G">G</a></li><li><a href="#H">H</a></li><li><a href="#I">I</a></li><li><a href="#J">J</a></li><li><a href="#K">K</a></li><li><a href="#L">L</a></li><li><a href="#M">M</a></li><li><a href="#N">N</a></li><li><a href="#O">O</a></li><li><a href="#P">P</a></li><li><a href="#Q">Q</a></li><li><a href="#R">R</a></li><li><a href="#S">S</a></li><li><a href="#T">T</a></li><li><a href="#U">U</a></li><li><a href="#V">V</a></li><li><a href="#W">W</a></li><li><a href="#X">X</a></li><li><a href="#Y">Y</a></li><li><a href="#Z">Z</a></li><li><a href="##">#</a></li>');
        initials();
				$(".initials ul li").click(function(){
						var _this=$(this);
						var LetterHtml=_this.html();
						LetterBox.html(LetterHtml).fadeIn();

						Initials.css('background','rgba(145,145,145,0.6)');

						setTimeout(function(){
								Initials.css('background','rgba(145,145,145,0)');
								LetterBox.fadeOut();
						},1000);

						var _index = _this.index()
						if(_index==0){
								$('.aui-scrollView').animate({scrollTop: '0px'}, 300);//点击第一个滚到顶部
						}else if(_index==27){
								var DefaultTop=$('#default').position().top;
								$('.aui-scrollView').animate({scrollTop: DefaultTop+'px'}, 300);//点击最后一个滚到#号
						}else{
								var letter = _this.text();
								if($('#'+letter).length>0){

										var LetterTop = $('#'+letter).position().top;
										$('.aui-scrollView').animate({scrollTop: LetterTop-45+'px'}, 300);
								}
						}
				});


        var windowHeight=$(window).height();
        var InitHeight=windowHeight-100;
        Initials.height(InitHeight);
        var LiHeight=InitHeight/28;
        Initials.find('li').height(LiHeight);
};

function initials() {//公众号排序
    var SortList=$(".sort_list");
    var SortBox=$(".sort_box");
    SortList.sort(asc_sort).appendTo('.sort_box');//按首字母排序
    function asc_sort(a, b) {
        return makePy($(b).find('.num_name').text().charAt(0))[0].toUpperCase() < makePy($(a).find('.num_name').text().charAt(0))[0].toUpperCase() ? 1 : -1;
    }

    var initials = [];
    var num=0;
    SortList.each(function(i) {
        var initial = makePy($(this).find('.num_name').text().charAt(0))[0].toUpperCase();
        if(initial>='A'&&initial<='Z'){
            if (initials.indexOf(initial) === -1)
                initials.push(initial);
        }else{
            num++;
        }

    });

    $.each(initials, function(index, value) {//添加首字母标签
        SortBox.append('<div class="sort_letter" id="'+ value +'">' + value + '</div>');
    });
    if(num!=0){SortBox.append('<div class="sort_letter" id="default">#</div>');}

    for (var i =0;i<SortList.length;i++) {//插入到对应的首字母后面
        var letter=makePy(SortList.eq(i).find('.num_name').text().charAt(0))[0].toUpperCase();
        switch(letter){
            case "A":
                $('#A').after(SortList.eq(i));
                break;
            case "B":
                $('#B').after(SortList.eq(i));
                break;
            case "C":
                $('#C').after(SortList.eq(i));
                break;
            case "D":
                $('#D').after(SortList.eq(i));
                break;
            case "E":
                $('#E').after(SortList.eq(i));
                break;
            case "F":
                $('#F').after(SortList.eq(i));
                break;
            case "G":
                $('#G').after(SortList.eq(i));
                break;
            case "H":
                $('#H').after(SortList.eq(i));
                break;
            case "I":
                $('#I').after(SortList.eq(i));
                break;
            case "J":
                $('#J').after(SortList.eq(i));
                break;
            case "K":
                $('#K').after(SortList.eq(i));
                break;
            case "L":
                $('#L').after(SortList.eq(i));
                break;
            case "M":
                $('#M').after(SortList.eq(i));
                break;
            case "O":
                $('#O').after(SortList.eq(i));
                break;
            case "P":
                $('#P').after(SortList.eq(i));
                break;
            case "Q":
                $('#Q').after(SortList.eq(i));
                break;
            case "R":
                $('#R').after(SortList.eq(i));
                break;
            case "S":
                $('#S').after(SortList.eq(i));
                break;
            case "T":
                $('#T').after(SortList.eq(i));
                break;
            case "U":
                $('#U').after(SortList.eq(i));
                break;
            case "V":
                $('#V').after(SortList.eq(i));
                break;
            case "W":
                $('#W').after(SortList.eq(i));
                break;
            case "X":
                $('#X').after(SortList.eq(i));
                break;
            case "Y":
                $('#Y').after(SortList.eq(i));
                break;
            case "Z":
                $('#Z').after(SortList.eq(i));
                break;
            default:
                $('#default').after(SortList.eq(i));
                break;
        }
    };
}
$("#searchMyContact").on("keyup",function(){
	var val=$(this).val();
	$(".sort_list").each(function(){
		var datas=$(this).html();

		if(val!=""&&datas.indexOf(val)!=-1){
			$(this).show();
			$(".sort_letter").hide();
		}else{
			if(val==""){
				$(this).show();
				$(".sort_letter").show();
			}else{
				$(this).hide();
				$(".sort_letter").hide();
			}
		}
	});
});
