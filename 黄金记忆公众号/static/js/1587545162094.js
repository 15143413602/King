
			$(function(){
			        $('.mem-pic-bg').click(function(){
			            $('input[name=file]').click();
			        })
			        $('input[name=file]').change(function(){
						$('#msg_bh').show();
			            var fd = new FormData();
			            fd.append("upload", 1);
			            fd.append("img", $("input[name=file]").get(0).files[0]);
			            $.ajax({
			                url: "",
			                type: "POST",
			                processData: false,
			                contentType: false,
			                data: fd,
			                success: function(d) {
			              console.log(d);
			                    if(d.status){
			                        $('.mem-pic-bg').css('background-image','url('+ d.info+')');
									$('#msg_bh').hide();
			                         reload();
			                    }else{
			                        alert(d.info);
			                    }
			                }
			            });
			        })
			    });
		