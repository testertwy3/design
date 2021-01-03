ready(function () {

    function navbar(collapsedBtn = false) {

        if ($("nav").length > 0) {

            if (!collapsedBtn) {
                if (window.innerWidth > 600) {
                    $("nav .collapsed-btn")[0].style.display = "none";
                    $("nav ul.collapsed")[0].style.cssText = "";
                    $("nav ul.collapsed .closed")[0].style.cssText = "display:none";
                    for (let i = 0; i < $("nav ul.collapsed li").length; i++) {
                        $("nav ul.collapsed li")[i].style.cssText = "";
                    }
                } else {
                    $("nav .collapsed-btn")[0].style.display = "inline-block";
                    $("nav ul.collapsed")[0].style.cssText = "height:0px;padding:0px;position:absolute;top:0;left:0;height:0%;width:100%;text-align:center;overflow:auto;";
                    $("nav ul.collapsed .closed")[0].style.cssText = "";
                    for (let i = 0; i < $("nav ul.collapsed li").length; i++) {
                        $("nav ul.collapsed li")[i].style.cssText = "display:block;";
                    }
                }
            }

            function collapsed(elmn) {
                if ($("nav .collapsed-btn")[0].getAttribute("class").indexOf("active") == -1 && elmn.getAttribute("class").indexOf("closed") == -1) {
                    $("nav .collapsed-btn")[0].setAttribute("class", "active collapsed-btn");
                    $("nav ul.collapsed")[0].style.height = "100%";
                } else {
                    $("nav .collapsed-btn")[0].setAttribute("class", "collapsed-btn");
                    $("nav ul.collapsed")[0].style.height = "0%";
                }
            }

            $("nav .collapsed-btn")[0].onclick = function () {
                let elmn = this;
                collapsed(elmn);
            }

            $("nav ul.collapsed span")[0].onclick = function () {
                let elmn = this;
                collapsed(elmn);
            }

            for (let i = 0; i < $("nav ul li a").length; i++) {
                $("nav ul li a")[i].onclick = function () {
                    for (let ii = 0; ii < $("nav ul li a").length; ii++) {
                        $("nav ul li a")[ii].setAttribute("class", "");
                    };
                    this.setAttribute("class", "active");
                }
            }

        }
    }

    navbar();
    window.addEventListener("resize", function () {
        navbar();
    });

});