/*
 * @Author: zs.duan
 * @Date: 2021-12-06 13:45:23
 * @LastEditors: zs.duan
 * @LastEditTime: 2021-12-15 09:23:46
 * @FilePath: \重庆蒂慕商贸有限公司f:\我的博客\blog_show\src\static\js\global.js
 */
// JavaScript Document
(function(doc, win) {
	let docEl = doc.documentElement,
		resizeEvt = "orientationchange" in window ? "orientationchange" : "resize",
		recalc = function() {
			function getScrollbarWidth() {
				let odiv = document.createElement('div'),
					styles = {
						width: '100px',
						height: '100px',
						overflowY: 'scroll'
					},
					i, scrollbarWidth;
				for (i in styles) odiv.style[i] = styles[i];
				document.body.appendChild(odiv);
				scrollbarWidth = odiv.offsetWidth - odiv.clientWidth;
				let odivParent = odiv.parentNode;
				odivParent.removeChild(odiv);
				return scrollbarWidth;
			};
			let scrollbarWidth = getScrollbarWidth();
			let clientWidth = docEl.clientWidth - scrollbarWidth;
			if (!clientWidth) return;

			let resultPC = window.matchMedia('(min-width:' + (1081 + scrollbarWidth) + 'px)');
			let resultWAP = window.matchMedia('(max-width:1080px)');

			if (resultPC.matches) {
				document.querySelector("body").setAttribute("data-width","pc");
				docEl.style.fontSize = 100 * (clientWidth / (1920 - scrollbarWidth)) + "px";
			} else if (resultWAP.matches) {
				document.querySelector("body").setAttribute("data-width","wap");
				let widthArr = [320, 360, 375,480,640, 750, 1080];
				if (widthArr.indexOf(clientWidth) < 0) {
					if (clientWidth < 320) {
						 clientWidth = 320;
					} else if (clientWidth > 750) {
						 clientWidth = 750;
					}
					docEl.style.fontSize = 100 * (clientWidth / 750) + "px";
				} else {
					docEl.style.fontSize = 100 * (clientWidth / 750) + "px";
				}
			} else {
				docEl.style.fontSize = 100 * (clientWidth / (1080 - scrollbarWidth)) + "px";
			}
		};
	if (!doc.addEventListener) return;
	
	win.addEventListener(resizeEvt, recalc, false);
	doc.addEventListener('DOMContentLoaded', recalc, false);
})(document, window);

