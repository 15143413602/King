var domainUrl="";//��������
var shareDomainurl="";
var appKey="ab32dk9292kdus92";//Զ��ͨѶkey �뱣��
var platType=0;//˾����   1 �û���
var currentUserId=0;//�û�ID
var downCarTime=1;//ж�س�ʱ��
var payCarTime=30;//�ȴ��û�����ʱ��
var appTitle="�ƽ����";//����
var backgroundMsg="������";//��̨������ʾ
var userTirckMsgId=781574342077511;//�û�Э��ID
var aboudUsMsgId=781574224241852;//��������ID
var startAliOssFlag=true;//�Ƿ����ð�����OSS�洢
var aliyunBucketName="byhome";//bucket ����
var aliyunOssShowUrl="https://byhome.oss-cn-hangzhou.aliyuncs.com";
var isAppType=1;//0 app 1 ΢�Ź��ں� 2 С���� 3 ֧����С���� 4 �ٶ�С����
var homeValue="home";
var dragDivId="home_Drag";//�϶���ID
var rootDIr="/A6021579864710/";//�ֻ���Ŀ¼
var sendQuanx='<select id="qx" name="qx"> <option value="0" selected="selected">����Ȩ��  ></option> <option value="1">����Ȩ��  ></option> <option value="2">����Ȩ��  ></option> </select>';
if(isAppType==1){
	$("head").append('<link rel="stylesheet" type="text/css" href="'+rootDIr+'css/myaui.css" /><script type="text/javascript" src="https://res.wx.qq.com/open/js/jweixin-1.2.0.js"></script>');
}
