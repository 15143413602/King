
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
        str += '<li>����汾��Ϣ: ' + ver + '</li>';
        str += '<li>ϵͳ����: ' + sType + '</li>';
        str += '<li>ϵͳ�汾: ' + sVer + '</li>';
        str += '<li>�豸��ʶ: ' + id + '</li>';
        str += '<li>�豸�ͺ�: ' + model + '</li>';
        str += '<li>�豸����: ' + name + '</li>';
        str += '<li>����״  ' + cType + '</li>';
        str += '<li>��������  ' + winName + '</li>';
        str += '<li>�����ڿ�  ' + winWidth + '</li>';
        str += '<li>�����ڸ�  ' + winHeight + '</li>';
        str += '<li>�Ӵ�����  ' + frameName + '</li>';
        str += '<li>�Ӵ��ڿ�  ' + frameWidth + '</li>';
        str += '<li>�Ӵ��ڸ�  ' + frameHeight + '</li>';
        str += '</ul>';

        $api.byId('sys-info').innerHTML = str;

    };
