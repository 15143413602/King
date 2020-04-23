

              var page_num_now=1;
              var load_swiper_flag=true;
 	          	t.scroll_callback_forward_getdata=true;
              t.scroll_callback_function=function(){
        			if(load_swiper_flag){
        				load_swiper_flag=false;
        				page_num_now++;
        				loadingQuan( );
        			}
        		}
            t.maxnum=10;
            function loadingQuan(){
                  var temps=$("#temps").html();

                			//remenfriend myFriends
                			jsonPost("/sqlAction?sqlname=TranOrderController_22",{newApi:true,"param":"{'p1':"+currentUserId+",'p2':"+((page_num_now-1)*t.maxnum)+",'p3':"+t.maxnum+"}"},function(data){
                 				if(data.res==0){
                					$.each(data.data,function(k,v){
                            var status=v.status;
                            var string="抢单失败";
                            var str=getOrderStatus(status);
                            var pic ="../image/error.png";
                            var url="javascript:void(0)";
                            if(v.caruid==currentUserId){
                                string="抢单成功";
                                pic ="../image/succes.png";
                               if(status==1&&v.paystatus>=1){
                                   url="huo-detail2.html?id="+v.id;
                               }else  if(status==1){
                                   url="huo-detail.html?id="+v.id;
                                }else   if(status==2){
                                  url="huo-detail3.html?id="+v.id;
                                }else   if(status==3){
                                  url="huo-detail5.html?id="+v.id;
                                }else   if(status==4){
                                  url="huo-detail7.html?id="+v.id;
                                }else   if(status==5){
                                  url="huo-detail9.html?id="+v.id;
                                }else   if(status==6){

                                }
                            }
                             //订单状态 0 新订单 1接单 2 已付押金 3 装货完成 4 到达目的地 5卸载完成 6 订单完成


                                $(".aui-order-title").append(temps.replace(/\{id\}/ig,v.id)
                                .replace(/\{xdsj\}/ig,new Date(parseInt(v.xdsj)).toLocaleDate())
                                .replace(/\{shrdz\}/ig,v.shrdz)
                                .replace(/\{pic\}/ig, pic)
                                .replace(/\{name\}/ig,string)
                                .replace(/\{fhdz\}/ig,v.fhdz)
                                .replace(/\{status\}/ig,str)
                                .replace(/\{url\}/ig,url)
                                .replace(/\{xdsj\}/ig,calcTime(parseInt(v.xdsj))));


                					});
                				}
                				load_swiper_flag=true;
                	 });
            }
            callBackUserInfo=  function(){
              //增加滚动事件
                addPageScroll(".aui-scrollView",".aui-order-title");
                loadingQuan();
            }

        