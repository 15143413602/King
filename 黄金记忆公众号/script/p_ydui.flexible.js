/**
 * YDUI ���������ַ���
 * rem���㷽ʽ�����ͼ�ߴ�px / 100 = ʵ��rem  ��: 100px = 1rem
 */
!function (window) {

    /* ���ͼ�ĵ���� */
    var docWidth = 750;

    var doc = window.document,
        docEl = doc.documentElement,
        resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize';

    var recalc = (function refreshRem () {
        var clientWidth = docEl.getBoundingClientRect().width;

        /* 8.55��С��320px������С��11.2������420px���ٷŴ� */
        docEl.style.fontSize = Math.max(Math.min(20 * (clientWidth / docWidth), 11.2), 8.55) * 5 + 'px';

        return refreshRem;
    })();

    /* ��ӱ�����ʶ����׿����Ϊ1 */
    docEl.setAttribute('data-dpr', window.navigator.appVersion.match(/iphone/gi) ? window.devicePixelRatio : 1);

    if (/iP(hone|od|ad)/.test(window.navigator.userAgent)) {
        /* ���IOS��ʶ */
        doc.documentElement.classList.add('ios');
        /* IOS8���ϸ�html���hairline��ʽ���Ա����⴦�� */
        if (parseInt(window.navigator.appVersion.match(/OS (\d+)_(\d+)_?(\d+)?/)[1], 10) >= 8)
            doc.documentElement.classList.add('hairline');
    }

    if (!doc.addEventListener) return;
    window.addEventListener(resizeEvt, recalc, false);
    doc.addEventListener('DOMContentLoaded', recalc, false);

}(window);
