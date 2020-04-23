
var slider = new FtSlider({
    id: "slider",
    width: "100%",
    height: "100%",
    textMsg: "拖动滑块到右边",
    successMsg: "验证成功!",
    callback: function(res) {
        alert(res);
    }
});
