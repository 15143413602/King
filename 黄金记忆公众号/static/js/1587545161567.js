
    apiready = function() {
        var ver = api.version;
        var sType = api.systemType;
        var sVer = api.systemVersion;
        var id = api.deviceId;
        var model = api.deviceModel;
        var name = api.deviceName;
        var cType = api.connectionType;
        var winName = api.winName;
        var winWidth = api.winWidth;
        var winHeight = api.winHeight;
        var frameName = api.frameName || '';
        var frameWidth = api.frameWidth || '';
        var frameHeight = api.frameHeight || '';

        var str = '<ul>';
        str += '<li>引擎版本信息: ' + ver + '</li>';
        str += '<li>系统类型: ' + sType + '</li>';
        str += '<li>系统版本: ' + sVer + '</li>';
        str += '<li>设备标识: ' + id + '</li>';
        str += '<li>设备型号: ' + model + '</li>';
        str += '<li>设备名称: ' + name + '</li>';
        str += '<li>网络状  ' + cType + '</li>';
        str += '<li>主窗口名  ' + winName + '</li>';
        str += '<li>主窗口宽  ' + winWidth + '</li>';
        str += '<li>主窗口高  ' + winHeight + '</li>';
        str += '<li>子窗口名  ' + frameName + '</li>';
        str += '<li>子窗口宽  ' + frameWidth + '</li>';
        str += '<li>子窗口高  ' + frameHeight + '</li>';
        str += '</ul>';

        $api.byId('sys-info').innerHTML = str;

    };
