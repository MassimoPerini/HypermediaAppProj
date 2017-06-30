$(document).ready(function($) {
    var isFormInside = $('form').length > 0 ? 1 :  0;
    console.log($('form'));
    isFormInside*=200;
    $(window).on("scroll", function() {
        var headerOuter = $("header").length ? $("header").outerHeight() : 0;
        $(window).scrollTop() + $(window).height() > ($("#content").outerHeight() + headerOuter + isFormInside) ? $("body").addClass("tight") : $("body").removeClass("tight");
    }), $("html").on("click", "body.tight #content", function() {
        $("html, body").animate({
            scrollTop: $("#content").outerHeight() - $(window).height()
        }, 500);
    });
});