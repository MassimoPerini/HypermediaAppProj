$(document).ready(function($) {
    $(window).on("scroll", function() {
        $(window).scrollTop() + $(window).height() > $("#content").outerHeight() + $("header").outerHeight() ? $("body").addClass("tight") : $("body").removeClass("tight");
    }), $("html").on("click", "body.tight #content", function() {
        $("html, body").animate({
            scrollTop: $("#content").outerHeight() - $(window).height()
        }, 500);
    });
});