/**
 * Created by massimo on 30/06/17.
 */

$(document).ready(function($) {
    $(window).on('scroll', function() {
        //ADD .TIGHT
        var headerOuter = ($('header').length) ? $('header').outerHeight() : 0;
        if ($(window).scrollTop() + $(window).height() > $('#content').outerHeight() + headerOuter) {
            $('body').addClass('tight');
        } else {
            $('body').removeClass('tight');
        }
    });

    //BACK TO PRESENTATION MODE
    $("html").on("click", "body.tight #content", function() {
        $('html, body').animate({
            scrollTop: $('#content').outerHeight() - $(window).height()
        }, 500);
    });

});
