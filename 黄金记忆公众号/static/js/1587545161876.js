

	var flag = true;
	$('.aui-flex-box').click(function (ev) {
		//console.log(111)
		var $sub = $(this).children('ul')
		var $h2 = $(this).children('h2')
		var ev = window.event || ev
		var target = ev.target
		if (target.nodeName.toLocaleLowerCase() == 'h2' || target.nodeName.toLocaleLowerCase() == 'i') {
			$('.aui-flex-box').children('ul').slideUp(200)
			$('.aui-flex-box').children('h2').children('i').removeClass(' icon-up')
			$sub.slideDown(200)
			flag = !flag
			$h2.children('i').addClass(' icon-up')
			$('.aui-mask').show()
		}
		if (target.nodeName.toLocaleLowerCase() == 'li') {
			var $li = $sub.children('li')
			for (var i = 0; i < $li.length; i++) {
				$li[i].className = ''
			}
			target.className = 'aui-active'
			$h2[0].innerHTML = target.innerHTML + '<i class="icon icon-dow  "></i>'
			$('.aui-mask').hide();
		  $('.val3').hide();
		}
	});
	//隐藏显示层
	$('.aui-mask').click(function () {
			$('.aui-flex-box').children('ul').slideUp(200)
			$('.aui-flex-box').children('h2').children('i').removeClass(' icon-up')
			$(this).hide()
			if(cityList!=null)
			cityList.close();
			flag = true
			closeAll();
	});
	//关闭
	function closeAll(){
		 var val3=$(".val3").find(".aui-active").attr("data")+"";
		 if(val3=="undefined")
				 val3="";
		 var val2=$(".val2").text();
		 if(val2=="目的地")
		   val2="";
		 else {
			 	val2="and  shall like '%"+val2+"%'";
	   }
		 $(t.scroll_append_div).html(' ');
		 sql="pushcount>=4 and status=0 and fhall like '%"+$(".val1").text()+"%' "+val2+" "+val3;
		getLists();
	}
	//加载数据
	 var sql="status=0";
	 var users;
	 callBackUserInfo=function(user){
				 users=user;
			  //加载数据

				closeAll();
				$(function(){
						updateLocation();
				});
	 }
  t.sql_name="TranOrderController_25";
	t.scroll_append_div=".aui-for-list";
	t.maxnum=20;
	newDataApi=true;
	var temp = $(".temp").html();
	page_num=0;
	addPageScroll();
	t.scroll_callback_forward_getdata=true;

 // getLists();
 t.scroll_callback_function=function (){
		 getLists();
		 page_num++;
 };
 function getLists(){
	 if(typeof(users)=="undefined"){
		 getLists();
		 return;
	 };
	getNewData(t.sql_name,{newApi:true,sql:encodeURI(sql),"param":"{'p1':'"+users.longs+"','p2':'"+users.lags+"','p3':'"+users.cartype+"','p4':"+(page_num*t.maxnum)+",'p5':"+t.maxnum+"}"},function(data){
		if(data.res==0){
			$.each(data.data,function(k,v){
					$(t.scroll_append_div).append(replaceJsonKeys(temp.replace(/\{distance\}/ig,(parseFloat(v.distance)/1000).toFixed(2)),v));
			});
			Mflag=true;
		}else{
			Mflag=false;
			if(page_num==0)
			$(t.scroll_append_div).html('<div class="col-xs-4 info-item"> <a href="#"><p>暂无数据</p></a> </div>');
		}
	});
 }
