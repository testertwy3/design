function accordion(accordion) {

    if (accordion == undefined) {
        console.log("undefined accordion");
        return;
    }

    accordion.querySelector(".title").addEventListener("click", function () {
        let content = accordion.querySelector(".content");
        let icon = this.querySelector(".icon");
        if (this.getAttribute("class").indexOf("active") == -1) {
            icon.textContent = "+";
            this.setAttribute("class", "title active");
            content.style.cssText = "height:" + (content.scrollHeight + 7) + "px;padding:5px 10px";
        } else {
            this.setAttribute("class", "title");
            content.style.cssText = "height:0px;padding:0";
            icon.textContent = "-";
        }
    });

}