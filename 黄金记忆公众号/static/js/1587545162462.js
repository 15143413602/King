
var picList = [
{
	width: 150,
	height: 207,
	content: "./images/s_1.jpg",
},
{
	width: 150,
	height: 207,
	content: "./images/s_2.jpg",
},
{
	width: 150,
	height: 207,
	content: "./images/s_3.jpg",
},
{
	width: 150,
	height: 207,
	content:"./images/s_5.jpg"
},
{
	width: 150,
	height: 207,
	content:"./images/s_6.jpg"
},
{
	width: 300,
	height: 414,
	content:"./images/s_7.jpg"
},
{
	width: 150,
	height: 207,
	content:"./images/s_8.jpg"
},
{
	width: 150,
	height: 207,
	content:"./images/s_9.jpg"
}
];

var domList = [
{
	'height' : '100%',
	'width' : '100%',
	'content' : '<div><h1>Home</h1><h2>This is home page</h2><p>home is pretty awsome</p><div>'
},{
	'height' : '100%',
	'width' : '100%',
	'content' : '<div><h1>Page1</h1><h2>This is page1</h2><p>page1 is pretty awsome</p><div>'
},{
	'height' : '100%',
	'width' : '100%',
	'content' : '<div><h1>Page2</h1><h2>This is Page2</h2><p>Page2 is pretty awsome</p><div>'
},{
	'height' : '100%',
	'width' : '100%',
	'content' : '<div><h1>Page3</h1><h2>This is page3</h2><p>page3 is pretty awsome</p><div>'
}
];

//all animation effect
var islider1 = new iSlider({
	data: picList,
	dom: document.getElementById("animation-effect"),
	duration: 2000,
	animateType: 'default',
	isAutoplay: true,
	isLooping: true,
	// isVertical: true, ????????
});
islider1.bindMouse();

//vertical slide
var islider2 = new iSlider({
	data: picList,
	dom: document.getElementById("vertical-slide"),
	duration: 2000,
	animateType: 'default',
	isVertical: true,
	isAutoplay: true,
	isLooping: true,
});
islider2.bindMouse();

//????? ?????????
var islider3 = new iSlider({
	data: picList,
	dom: document.getElementById("non-looping"),
	animateType: 'default',
});
islider3.bindMouse();

//????dom
var islider4 = new iSlider({
	data: domList,
	dom: document.getElementById("dom-effect"),
	type: 'dom',
	animateType: 'default',
	isAutoplay: true,
	isLooping: true,
});
islider4.bindMouse();

var menu = document.getElementById('menu-select').children;

function clickMenuActive(target) {

	for (var i = 0; i < menu.length; i++) {
		menu[i].className = '';
	}

	target.className = 'on';
	
}

menu[0].onclick = function() {

	clickMenuActive(this);
	islider1._opts.animateType = this.innerHTML;
	islider1.reset();
};

menu[1].onclick = function() {

	clickMenuActive(this);
	islider1._opts.animateType = this.innerHTML;
	islider1.reset();
};

menu[2].onclick = function() {

	clickMenuActive(this);
	islider1._opts.animateType = this.innerHTML;
	islider1.reset();
};

menu[3].onclick = function() {

	clickMenuActive(this);
	islider1._opts.animateType = this.innerHTML;
	islider1.reset();
};
