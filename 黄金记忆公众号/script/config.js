var domainUrl="";//基础域名
var shareDomainurl="";
var appKey="ab32dk9292kdus92";//远程通讯key 请保密
var platType=0;//司机端   1 用户端
var currentUserId=0;//用户ID
var downCarTime=1;//卸载车时间
var payCarTime=30;//等待用户付款时间
var appTitle="黄金记忆";//标题
var backgroundMsg="运行中";//后台运行提示
var userTirckMsgId=781574342077511;//用户协议ID
var aboudUsMsgId=781574224241852;//关于我们ID
var startAliOssFlag=true;//是否启用阿里云OSS存储
var aliyunBucketName="byhome";//bucket 名称
var aliyunOssShowUrl="https://byhome.oss-cn-hangzhou.aliyuncs.com";
var isAppType=1;//0 app 1 微信公众号 2 小程序 3 支付宝小程序 4 百度小程序
var homeValue="home";
var dragDivId="home_Drag";//拖动曾ID
var rootDIr="/A6021579864710/";//手机根目录
var sendQuanx='<select id="qx" name="qx"> <option value="0" selected="selected">公开权限  ></option> <option value="1">保密权限  ></option> <option value="2">绝密权限  ></option> </select>';
if(isAppType==1){
	$("head").append('<link rel="stylesheet" type="text/css" href="'+rootDIr+'css/myaui.css" /><script type="text/javascript" src="https://res.wx.qq.com/open/js/jweixin-1.2.0.js"></script>');
}
