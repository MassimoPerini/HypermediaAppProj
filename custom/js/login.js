$(document).ready(function (){

    params = new URLSearchParams(window.location.search);
    if (params.get("error")){
        $('#errors').text("Login error");
    }

    $('#register, #login').click(function (e) {
            $('.register-form').animate({height: "toggle", opacity: "toggle"}, "slow");
            $('.login-form').animate({height: "toggle", opacity: "toggle"}, "slow");
            $('#errors').text("");
    });

    $('#forget, #back').click(function (e) {
        $('.forget-form').animate({height: "toggle", opacity: "toggle"}, "slow");
        $('.login-form').animate({height: "toggle", opacity: "toggle"}, "slow");
        $('#errors').text("");
    });

    $('.forget-form').submit(function(e) {
        $(".forget-form");//.append("<div class='loading' style='transform:scale(0.31);'><div></div><div></div></div>");
        $.ajax({
            type: "POST",
            url: "/api/password/reset",
            data: {
              email: $('#forget-email').val(),
            },
            success: function(data){
                $(".forget-form").empty().append(data.message);
            },
            error: function(error){
              $('#errors').text("Error recovering password");
            }
        });
        e.preventDefault();
    });

});
