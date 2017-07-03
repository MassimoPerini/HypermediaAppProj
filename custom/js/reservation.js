function loadNewLocations(serviceId) {
    $.getJSON("/service/"+serviceId+"/location", function(result){
        console.log(result);
        var append = "";
        $.each(result.data, function (i, item) {
            append+='<option value='+item.id+'>'+item.name+'</option>';
        });
        $("#location").empty().append(append).prop( "disabled", false );
    });
}


$(document).ready(function (){
    var now = new Date();
    var minDate = now.toISOString().substring(0,10);
    $('#date').prop('min', minDate);

    //    var defaultPage = $("#booking-form").children();


    // If they do not have HTML5 date then provide a datepicker using javascript
    if (!Modernizr.inputtypes.date) {
        $( "input[type=date]" ).pickadate({
            min: now,
            container: 'body'
        });
    }

    /*    $('body').on('click','#reserve-again', function() {
     $("#booking-form").empty().append(defaultPage);
     });*/

    $('#service').change(function () {
        $( this ).val() === "-1" ? $("#location").empty().append("<option>Choose a service</option>").prop( "disabled", true ) : loadNewLocations($( this ).val())
    }).change();


    //    $('body').on('submit','form', function() {
    $('form').submit(function(e) {
        if ($('#service').val() === "-1")
        {
            alert("Input not valid");
            e.preventDefault();
            return;
        }

        $("#booking-form").empty().append("<div class='loading' style='transform:scale(0.31);'><div></div><div></div></div>");
        $.ajax({
            type: "POST",
            url: "/api/reservation",
            data: $(this).serialize(),
            success: function(data)
            {
                $('#booking-form').empty().append(
                    "<h3 style='text-align: center'>Well done!</h3>"
                );
            }
        });
        e.preventDefault();
    });

});