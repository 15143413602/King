
		//���� �ص�
		siliCallback=function(){
			reachLocation(true);
		}

	 //��ӻ���
	  addSilide('���װ����������','�ɹ�ȷ��');
		addFindString();
			 callBackInit = function(){
					 getSingleData("TranOrderController_1",MP.id,"O_");
					 appBackFlag=false;
			 }
			 function reachLocation(){
 				 location.href="huo-detail4.html?id="+MP.id;
 			}
			appBack=function(){
				//alertMsg("�Ƿ�ȡ��������",function(){
					//			myNoAcepase()
			  //});
			}
		