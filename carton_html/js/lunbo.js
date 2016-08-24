window.onload = function () {
	var oul = document.getElementById('banner_1');
	var oNa = document.getElementById('nav1');
	var oli = oul.getElementsByTagName('li');//图片
	var oNav = oNa.getElementsByTagName('div');//小格子
	var timer = null, t = 0,
	    n = n || 0;
	fnAutoPlay(n);
	function fnAutoPlay(n) {
		fnActive (oNav,oli,n%oli.length);
		timer = setInterval(function() {
			n++;
			fnActive(oNav,oli,n%oli.length);
			if (n%oNav.length === 0) {
				n = 0;
				clearInterval(timer);
				fnActive(oNav,oli,n%oli.length);
				fnAutoPlay(n%oNav.length);
			}
		}, 2000)
	}

	rolling();
	function rolling () {
		for(var i = 0; i < oNav.length; i++) {
			oNav[i].index = i;
			oNav[i].onclick = function () {
				for (var j = 0; j < oli; j++) {
					oli[j].style.display="none";
					oNav[j].className = '';
				}
				oNav[this.index].className="cur";
				oli[this.index].style.display="inline-block";
			}
		}
	}

	function fnActive(ele, ele2, n) {
		for (var i = 0; i < ele.length; i++) {
			ele[i].className = '';
			ele2[i].style.display = "none";
		}
		ele[n].className = 'cur';
		ele2[n].style.display = 'block';
	}

	fnMouse();//鼠标移入停止播放，移出继续播放
	function fnMouse () {
    for (var i = 0; i < oNav.length; i++) {
    	(function (index) {
    		oli[index].onmouseover = oNav[index].onmouseover = function () {
    			clearInterval(timer);
    			fnActive(oNav,oli,index);
    		}
    		oli[index].onmouseout = oNav[index].onmouseout = function () {
    			fnAutoPlay(index);
    		}
    	})(i);
    }
	}
}