function slider(sliderName) {

    if (sliderName === undefined) {
        console.log("undefined slider element")
        return;
    }

    let active = 0;

    function slidesDeactivate() {
        for (let c = 0; c < sliderName.querySelectorAll(".slide").length; c++) {
            sliderName.querySelectorAll(".slide")[c].style.display = "none";
        }
    }

    function slideSwitch(direction = true) {
        let slideCount = sliderName.querySelectorAll(".slide").length;
        if (direction) {
            if (sliderName.querySelectorAll(".slide").length - 1 > active) {
                active += 1;
            } else {
                active = 0;
            }
            animator({ selector: sliderName.querySelectorAll(".slide")[active], effect: "slide", duration: .5, direction: "right" });
            animator({ start: false, selector: sliderName.querySelectorAll(".slide")[active], effect: 'slide', "duration": .5, direction: "right" });
        } else {
            if (active > 0) {
                active -= 1;
            } else {
                active = slideCount - 1;
            }
            animator({ selector: sliderName.querySelectorAll(".slide")[active], effect: 'slide', "duration": .5, direction: "left" });
            animator({ start: false, selector: sliderName.querySelectorAll(".slide")[active], effect: 'slide', "duration": .5, direction: "left" });
        }
        dotSwitch(active);
        sliderName.querySelectorAll(".slide")[active].style.display = "block";
    }

    function createDots() {
        let slideCount = sliderName.querySelectorAll(".slide").length;
        let dot;
        for (let i = 0; i < slideCount; i++) {
            dot = document.createElement("span");
            dot.setAttribute("class", "dot");
            sliderName.querySelectorAll(".dots")[0].appendChild(dot);
        }
        return true;
    }

    if (createDots()) {

        function dotSwitch(active) {
            slidesDeactivate();
            for (let i = 0; i < sliderName.querySelectorAll(".dot").length; i++) {
                sliderName.querySelectorAll(".dot")[i].setAttribute("class", "dot");
            }
            sliderName.querySelectorAll(".slide")[active].style.display = "block";
            sliderName.querySelectorAll(".dots .dot")[active].setAttribute("class", "dot active");
            animator({ selector: sliderName.querySelectorAll(".slide")[active], effect: "fade", duration: .5 });
            animator({ start: false, selector: sliderName.querySelectorAll(".slide")[active], effect: "fade", duration: .5 });
        }

        dotSwitch(active);

        for (let i = 0; i < sliderName.querySelectorAll(".dots .dot").length; i++) {
            sliderName.querySelectorAll(".dots .dot")[i].addEventListener("click", function () {
                dotSwitch(i);
            });
        }

    }

    sliderName.querySelector(".slider-btn.right").addEventListener("click", function () {
        slidesDeactivate();
        slideSwitch();
    });

    sliderName.querySelector(".slider-btn.left").addEventListener("click", function () {
        slidesDeactivate();
        slideSwitch(false);
    });

    // window.addEventListener("keydown", function (e) {
    //     if (e.code == "ArrowLeft") {
    //         slidesDeactivate();
    //         slideSwitch(false);
    //     } else if (e.code == "ArrowRight") {
    //         slidesDeactivate();
    //         slideSwitch();
    //     }
    // });

}