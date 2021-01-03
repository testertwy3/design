function getPage(selector) {

    if (selector === undefined) {
        console.log("undefined slider element")
        return;
    }

    let inEffect = "opacity:1";
    let outEffect = "opacity:0";

    selector.style.cssText = outEffect;

    var hash = window.location.hash.trim()

    hash = hash == "" ? "0" : hash;

    var pages = ["0", "1", "2", "3"];
    if (hash != "" && hash.split("#").length > 1) {
        hash = hash.split("#")[1];
        if (pages.indexOf(hash) != -1) {
            function ret() {
                selector.style.cssText = inEffect;
            }
            setTimeout(function () {
                requesting("get", "components/pages/" + hash + ".htm", "", selector, ret, true, true);
            }, 500);
        }
    }
}

