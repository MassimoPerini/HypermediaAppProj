$(document).ready(function() {
    params = new URLSearchParams(window.location.search), params.get("error") && $("#errors").text("Login error"), 
    $("#register, #login").click(function(e) {
        $(".register-form").animate({
            height: "toggle",
            opacity: "toggle"
        }, "slow"), $(".login-form").animate({
            height: "toggle",
            opacity: "toggle"
        }, "slow"), $("#errors").text("");
    }), $("#forget, #back").click(function(e) {
        $(".forget-form").animate({
            height: "toggle",
            opacity: "toggle"
        }, "slow"), $(".login-form").animate({
            height: "toggle",
            opacity: "toggle"
        }, "slow"), $("#errors").text("");
    }), $(".forget-form").submit(function(e) {
        $(".forget-form"), $.ajax({
            type: "POST",
            url: "/api/password/reset",
            data: {
                email: $("#forget-email").val()
            },
            success: function(data) {
                window.location.replace("/login");
            },
            error: function(error) {
                $("#errors").text("Error recovering password");
            }
        }), e.preventDefault();
    });
});