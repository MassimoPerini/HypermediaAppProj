$(document).ready(function() {
    $("#to-top").bind("click", function() {
        $("body,html").animate({
            scrollTop: 0
        }, 2500);
    }), $(function() {
        $("a[href*=#]:not([href=#])").click(function() {
            if (location.pathname.replace(/^\//, "") == this.pathname.replace(/^\//, "") && location.hostname == this.hostname) {
                var target = $(this.hash);
                if (target = target.length ? target : $("[name=" + this.hash.slice(1) + "]"), target.length) return $("html,body").animate({
                    scrollTop: target.offset().top - 420
                }, 3500, "easeOutBounce"), !1;
            }
        });
    });
}), $(document).ready(function() {
    $(".dropdown").hover(function() {
        $(".dropdown-menu", this).not(".in .dropdown-menu").stop(!0, !0).slideDown("400"), 
        $(this).toggleClass("open");
    }, function() {
        $(".dropdown-menu", this).not(".in .dropdown-menu").stop(!0, !0).slideUp("400"), 
        $(this).toggleClass("open");
    });
}), $(document).ready(function() {
    $("#menu-close").click(function(e) {
        $("#sidebar-wrapper").toggleClass("active"), e.preventDefault();
    }), $("#menu-toggle").hover(function(e) {
        $("#sidebar-wrapper").toggleClass("active", !0), e.preventDefault();
    }), $("#menu-toggle").bind("click", function(e) {
        $("#sidebar-wrapper").toggleClass("active", !0), e.preventDefault();
    }), $("#sidebar-wrapper").mouseleave(function(e) {
        $("#sidebar-wrapper").toggleClass("active", !1), e.stopPropagation(), e.preventDefault();
    });
}), $("#menu-close").click(function(e) {
    $("#sidebar-wrapper").toggleClass("active"), e.preventDefault();
});