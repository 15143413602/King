/* 项目配置.基于默认配置,可以通过
 http://www.example.com/PUBLIC_PATH/web_adapter/adapter.html
访问自己的 app.如有修改,请对应变换访问地址即可.

服务器静态部署目录 PUBLIC_PATH,默认为用户 appId
*/

/* ==================== 用户相关配置.可根据需要,灵活修改. ============= */
/* app 入口文件. */
var APP_INDEX_PATH = 'index.html'

/* ====================== 以下适配器相关配置,一般不需要修改.=================== */
/* 适配器入口文件. */
var WEB_ADAPTER_INDEX_PATH = 'web_adapter/adapter.html'

/* 适配器核心js文件. */
var WEB_ADAPTER_CORE_JS_PATH = 'web_adapter/script/adapter.js'

/* =================== 应用和模块相关信息.一般由 APICloud 服务器自动生成.============= */
var PUBLIC_PATH = '/A6021579864710/'

var APP_INFO = {
  appId: 'A6021579864710',
  version: '1.2.23',
  appVersion: '00.00.01',
  appName: '家'
}

var MODULES_INFO = [{
 "name":"agoraRtc",
 "class":"AgoraRtcForAPICloud",
 "methods":["init", "destroy", "getSdkVersion", "setParameters", "setLogFile", "setLogFilter",
            "joinChannel", "leaveChannel", "setChannelProfile", "setClientRole", "renewToken",
            "enableVideo", "disableVideo", "enableLocalVideo", "setVideoProfile", "switchCamera",
            "startPreview", "stopPreview", "setupLocalVideo", "setupRemoteVideo",
            "muteLocalVideoStream", "muteAllRemoteVideoStreams", "muteRemoteVideoStream",
            "enableAudio", "disableAudio", "pauseAudio", "resumeAudio",
            "muteLocalAudioStream", "muteAllRemoteAudioStreams", "muteRemoteAudioStream",
            "joinChannelSuccessListener", "leaveChannelListener", "firstLocalVideoFrameListener",
            "remoteUserJoinedListener", "remoteUserOfflineListener", "firstRemoteVideoDecodedListener",
            "requestTokenListener", "errorListener", "warningListener"]
}
,{
    "name":"ajpush",
    "class":"UZModuleJPush",
    "launchClassMethod":"sdkInit",
    "methods":["setListener","removeListener", "bindAliasAndTags","setBadge","getRegistrationId","init","onResume","onPause","clearNotification","setPushTime","setSilenceTime","stopPush","resumePush","isPushStopped"]
}
,{
	 "name":"aliPayPlus",
	 "class":"UZAliPayPlus",
	 "methods":["pay","config","payOrder","auth","authDirect"]
 }
,{
    "name":"aliyunStsOss",
    "class":"AliyunOSS",
    "methods":["getStsToken", "initConfig", "init", "upload", "resumableUpload", "download", "deleteObject", "signAccessObjectURL"]
}
,{
    "name":"aMap",
    "class":"GDMap",
    "methods":["open","takeSnapshotInRect","close","show","hide","setRect","getLocation","stopLocation","getCoordsFromName","getNameFromCoords","getDistance","showUserLocation","setTrackingMode","setCenter","getCenter","setZoomLevel","getZoomLevel","setMapAttr","setRotation","getRotation","setOverlook","getOverlook","setRegion","getRegion","setScaleBar","setCompass","setLogo","isPolygonContainsPoint","interconvertCoords","addEventListener","removeEventListener","addAnnotations","getAnnotationCoords","setAnnotationCoords","annotationExist","setBubble","popupBubble","closeBubble","addBillboard","addMobileAnnotations","moveAnnotation","removeAnnotations","addLine","addArc","addPolygon","addCircle","addImg","addLocus","removeOverlay","searchRoute","drawRoute","removeRoute","searchBusRoute","drawBusRoute","removeBusRoute","autocomplete","searchInCity","searchNearby","searchInPolygon","getProvinces","getMunicipalities","getNationWide","getAllCities","getVersion","downloadRegion","isDownloading","pauseDownload","cancelAllDownload","clearDisk","checkNewestVersion","reloadMap","setWebBubble","districtSearch","isShowsIndoorMap","showsIndoorMap","isShowsIndoorMapControl","showsIndoorMapControl","indoorMapControlSize","setIndoorMapControlOrigin","setCurrentIndoorMapFloorIndex","clearIndoorMapCache","addWebBubbleListener","removeWebBubbleListener","addHeatMap","refreshHeatMap","addMultiPoint","addMoveAnimation","cancelMoveAnimation","convertCoordinate","processedTrace","cancelProcessedTrace","getCitiesByProvince","isCircleContainsPoint","cancelAnnotationSelected"]
}


,{
     "name":"aMapLBS",
     "class":"UZAMapLBS",
     "methods":["configManager","singleLocation","singleAddress","startLocation","stopUpdatingLocation"]
 }
,
 {
    "name":"baiduIdentifyOCR",
    "class":"BaiDuOCR",
    "launchClassMethod":"didFinishLaunchingWithOptions"

 }
,{
    "name":"bdTTS",
    "class":"bdTTs",
    "methods":["init","authCheck","speak","synthesize","batchSpeak","speakResume","speakPause","stop","addListener"]
}
,    {
        "name":"brightnessUtil",
        "class":"Brightness",

    }
,{
    "name":"downloadManager",
    "class":"UZDownloadManager",
    "methods":["open","openManagerView","closeManagerView","enqueue","pause","resume","remove","getDownloadData","query","openDownloadedFile"]
}
,  [
   {
     "name":"floatModule",
     "class":"floatModule",
     "methods":["openFloat","show","hide","close","changeState"]
   }
  ]

, {
     "name":"FNImageClip",
     "class":"UZFNImageClip",
     "methods":["open","save","reset","close"]
 }
,{
	 "name":"FNScanner",
	 "class":"UZFNScanner",
	 "methods":["open","openScanner","openView","closeView","decodeImg","encodeImg","switchLight","setFrame","onPause","onResume"]
 }
,{
    "name":"fs",
    "class":"UZFileSystem",
    "methods":["createDir","createFile","remove","copyTo","moveTo","rename","readDir","open","read","readUp","readDown","write","close","exist","getAttribute","rmdir","readByLength","writeByLength","getMD5","cutFile"],
    "syncMethods":["createDirSync","createFileSync","removeSync","copyToSync","moveToSync","renameSync","readDirSync","openSync","readSync","readUpSync","readDownSync","writeSync","closeSync","existSync","getAttributeSync","rmdirSync","readByLengthSync","writeByLengthSync","getMD5Sync","cutFileSync"]
    }
,{
    "name":"imageBrowser",
    "class":"UZImageBrowser",
    "methods":["openImages"]
}
,{
 "name":"imageOptim",
 "class":"ImageUtils",
 "methods":["compress"]
}
,
{
    "name":"LBAirDrop",
    "class":"LBAirDrop",
    "launchClassMethod":"didFinishLaunchingWithOptions"
    
    }
,{
    "name":"mam",
    "class":"UZMAM",
    "launchClassMethod":"launch"
}
, {
     "name":"NVTabBar",
     "class":"NVTabBar",
     "methods":["open","close","hide","show","setBadge","setSelect","bringToFront"],
 }
,
 {
     "name":"pedometer",
     "class":"UZPedometer",
     "methods":["getStepCount"]
 }
 
,{
    "name":"screenClip",
    "class":"UZScreenClip",
    "methods":["open","save","cancel","screenShot"]
}
,{
    "name":"setJumpNew",
    "class":"setJumpNew",
    "methods":["open","isUserNotificationEnable"]
}

, [
  {
     "name":"soundPlayer",
     "class":"soundPlayer",
     "methods":["playSound","play","stopSound"]
  }
  ]

,{"name":"speedPlayer","class":"UZModuleDemo","methods":["openTmall","play","open","close","start","pause","resume","setPath","replay","seek","getCurrent","getDuration","setRate","getRate","fullscreen","cancelFullscreen","getVol","setVol","setRect","setBrightness","getBrightness"]}
,{
      "name":"UIAlbumBrowser",
      "class":"UZUIAlbumBrowser",
      "methods":["open","imagePicker","closePicker","scan","fetch","transPath","getVideoDuration","scanGroups","scanByGroupId","fetchGroup","requestAlbumPermissions","openGroup","changeGroup","closeGroup","transVideoPath","openAlbum","closeAlbum","removeAllSelectedPath","batchTransPath"]
}
, {
     "name":"UIButton",
     "class":"UZUIButton",
     "methods":["open","setTitle","setRect","getRect","getState","setState","close","hide","show"]
 }
, {
 "name":"UIChatBox",
 "class":"UZUIChatBox",
 "methods":["open","close","popupKeyboard","closeKeyboard","popupBoard","closeBoard","show","hide","value","insertValue","addEventListener","setPlaceholder","reloadExtraBoard","cancelRecord"]
 }

,
 {
 "name":"UIChatUnit",
 "class":"UIChatUnit",
 "methods":["open","recordPanelListener","giftsToolListener","setGiftDatas","clearText","setAppendButton","faceListener","addFace","imageListener","toolsListener","recorderListener","startTimer","close","show","hide","popupKeyboard","closeKeyboard","popupBoard","closeBoard","value","insertValue","chatBoxListener","setPlaceholder","updateGiftInfo","hideRecordPanel","showGiftPanel","reset","setEnableAllBtns","getCurrentVisiblePanel","showRecordPanel"]
 }
,{
 "name":"uimusic",
 "class":"UIMusicModule",
 "methods":["playMusic","showUI","closeUI","stopMusic","addEventListener","addMusic","selectMusic","getCurrentPlayer","musicPlayPause","musicPrevious","musicNext"],
 "launchClassMethod":"launch"
 }
, {
     "name":"UIPullRefresh",
     "class":"UZRefreshBase",
     "methods":["setCustomRefreshHeaderInfo","refreshHeaderLoading","refreshHeaderLoadDone"]
 }
,
{
    "name":"UIScrollPicture",
    "class":"UZUIScrollPicture",
    "methods":["open","close","setCurrentIndex","hide","show","reloadData","addEventListener","clearCache"]
}
,
 {
     "name":"UISwitchButton",
     "class":"UZUISwitchButton",
     "methods":["open","hide","show","turnOn","turnOff","getState","close"]
 }
, {
     "name":"UIWebBrowser",
     "class":"UZWebBrowser",
     "methods":["open","hide","show","close","setRect","setSelected"]
 }
, {
    "name":"videoPlayer",
    "class":"LPlayerView"
 }
, {
     "name":"videoScreenshots",
     "class":"UZVideoScreenshots",
     "methods":["screenshots","clearCache"]
 }
, {
	 "name":"wx",
	 "class":"UZWX",
	 "methods":["isInstalled","shareText","shareImage","shareMusic","shareVideo","shareWebpage","shareProgram","launchMiniProgram","auth","getToken","getUserInfo","refreshToken"]
 }
,{
     "name":"wxPay",
     "class":"UZWxPay",
     "methods":["getToken","getOrderId","payOrder","config","pay"]
}
]
