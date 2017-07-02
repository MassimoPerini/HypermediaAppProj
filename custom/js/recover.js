$(document).ready(function (){

    $('.recover-form').submit(function(e) {
        $.ajax({
            type: "POST",
            url: "/api/password/set",
            data: {
              password: $('#recover-password').val(),
              token: token
            },
            success: function(data){
                window.location.replace("/login");
            },
            error: function(error){
              $('#errors').text("Error setting new password");
            }
        });
        e.preventDefault();
    });

});
