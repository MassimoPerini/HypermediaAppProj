function updateNavbar() {
    $(window).width() >= 992 && $(".navbar-toggle").is(":hidden") ? ($("#sidebar").width("0"), 
    $("#sidebar-bg").width("0"), $(".brand").removeClass("pull-right"), $(".navbar-toggle").removeClass("pull-left")) : ($("#sidebar").width("0"), 
    $("#sidebar-bg").width("0"), $(".brand").addClass("pull-right"), $(".navbar-toggle").addClass("pull-left"));
}

function toggleNav() {
    $(window).width() >= 992 && $(".navbar-toggle").is(":hidden") || ($("#sidebar").width() <= 0 ? ($("#sidebar").width("70%"), 
    $("#sidebar-bg").width("100%")) : ($("#sidebar").width("0"), $("#sidebar-bg").width("0")));
}

$(document).ready(function($) {
    var isFormInside = 1;
    isFormInside *= 200, $(window).on("scroll", function() {
        var headerOuter = $("header").length ? $("header").outerHeight() : 0;
        $(window).scrollTop() + $(window).height() > $("#content").outerHeight() + headerOuter + isFormInside ? $("body").addClass("tight") : $("body").removeClass("tight");
    }), $("html").on("click", "body.tight #content", function() {
        $("html, body").animate({
            scrollTop: $("#content").outerHeight() - $(window).height()
        }, 500);
    }), updateNavbar();
}), $(window).on("resize", function() {
    updateNavbar();
});