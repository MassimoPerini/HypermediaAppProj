function refresh() {
    $("#content").height() + 80 + $("#footer").height() < $(window).height() ? $("#footer").addClass("navbar-fixed-bottom") : $("#footer").removeClass("navbar-fixed-bottom");
}

window.onload = function() {
    refresh();
}, window.onresize = function(event) {
    refresh();
};