window.addEventListener("load", function () {

    if (document.querySelector(".input-form input") != undefined) {
        function placeholderEffect() {
            if (document.querySelectorAll(".input-form input")[0]) {
                for (i = 0; i < document.querySelectorAll(".input-form input").length; i++) {
                    if (document.querySelectorAll(".input-form input")[i].value == "") {
                        document.querySelectorAll(".input-form input")[i].parentElement.querySelector("label").style.cssText = "left:50%;font-size:20px;transform:translate(-50%);top:20%;";
                    } else {
                        document.querySelectorAll(".input-form input")[i].parentElement.querySelector("label").style.cssText = "left:0;transform:translate(0);top:0%;font-size:15px;font-weight:bolder;";
                    }

                    document.querySelectorAll(".input-form label")[i].onclick = function () {
                        this.parentElement.querySelector("input").focus();
                    };

                    document.querySelectorAll(".input-form input")[
                        i
                    ].onfocus = function () {
                        this.parentElement.querySelector("label").style.cssText =
                            "opacity:1;left:0;transform:translate(0);top:0%;font-size:15px;font-weight:bolder";
                    };

                    document.querySelectorAll(".input-form input")[
                        i
                    ].onblur = function () {
                        if (this.value == "") {
                            this.parentElement.querySelector(
                                "label"
                            ).style.cssText =
                                "opacity:.4;left:50%;font-size:20px;transform:translate(-50%);top:20%";
                        } else {
                            this.parentElement.querySelector(
                                "label"
                            ).style.cssText =
                                "opacity:1;left:0;transform:translate(0);top:0%;font-size:15px;font-weight:bolder";
                        }
                    };
                }
            }
        }

        placeholderEffect();

    }
});
