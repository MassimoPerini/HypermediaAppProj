$(document).ready(function($) {
    /* STICKY FOOTER */
    var isFormInside = 1;//$('form').length > 0 ? 1 :  0;
    //console.log($('form'));
    isFormInside*=200;
    $(window).on("scroll", function() {
        var headerOuter = $("header").length ? $("header").outerHeight() : 0;
        $(window).scrollTop() + $(window).height() > ($("#content").outerHeight() + headerOuter + isFormInside) ? $("body").addClass("tight") : $("body").removeClass("tight");
    }), $("html").on("click", "body.tight #content", function() {
        $("html, body").animate({
            scrollTop: $("#content").outerHeight() - $(window).height()
        }, 500);
    });
    /* SIDEBAR NAV */
    updateNavbar();

    $('#sidebar-bg').click(function(e) {
        toggleNav();
    });
});

$(window).on("resize", function () {
  updateNavbar();
});

function addBlur()
{
    $('header').addClass("blurred");
    $('#content').addClass("blurred");
    $('footer').addClass("blurred");
}

function removeBlur() {
    $('header').removeClass("blurred");
    $('#content').removeClass("blurred");
    $('footer').removeClass("blurred");
}

function updateNavbar(){
    removeBlur();
  if ($(window).width() >= 992 && $('.navbar-toggle').is(':hidden')) {
    $('#sidebar').width('0');
    $('#sidebar-bg').width('0');
    $('.brand').removeClass('pull-right');
    $('.navbar-toggle').removeClass('pull-left');
  }else{
    $('#sidebar').width('0');
    $('#sidebar-bg').width('0');
    $('.brand').addClass('pull-right');
    $('.navbar-toggle').addClass('pull-left');
  }
}


function toggleNav(){
  if ($(window).width() >= 992 && $('.navbar-toggle').is(':hidden')) return;
  if ($('#sidebar').width() <= 0){
    $('#sidebar').width('70%');
    $('#sidebar-bg').width('100%');
    addBlur();
  }else{
    $('#sidebar').width('0');
    $('#sidebar-bg').width('0');
    removeBlur();
  }
}
