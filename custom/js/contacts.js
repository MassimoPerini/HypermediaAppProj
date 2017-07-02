$(document).ready(function (){
    // Form init (area selection)
    params = new URLSearchParams(window.location.search);
    if (params.get("target")) $('#target').val(params.get("target"));
    // Target selection change in history
    $('#target').change(function(e){
      var params = new URLSearchParams();
      params.append('target', $('#target').val());
      window.history.pushState(window.filters, null, '?' + params.toString());
    });
    // Form submit
    $('form').submit(function(e) {
        $("#contact-form").empty().append("<div class='loading' style='transform:scale(0.31);'><div></div><div></div></div>");
        $.ajax({
            type: "POST",
            url: "/api/contact",
            data: $(this).serialize(),
            success: function(data)
            {
                $("#contact-form").empty().append(data.message);
            }
        });
        e.preventDefault();
    });
});
