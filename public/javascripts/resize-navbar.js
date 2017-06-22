$(window).scroll(function() {
    $(document).scrollTop() > 50 ? $("nav").addClass("shrink") : $("nav").removeClass("shrink");
});