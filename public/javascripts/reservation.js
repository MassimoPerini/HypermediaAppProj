function loadNewLocations(serviceId) {
    $.getJSON("/api/service/" + serviceId + "/location", function(result) {
        console.log(result);
        var append = "";
        $.each(result.data, function(i, item) {
            append += "<option value=" + item.id + ">" + item.name + "</option>";
        }), $("#location").empty().append(append).prop("disabled", !1);
    });
}

$(document).ready(function() {
    var now = new Date(), minDate = now.toISOString().substring(0, 10);
    $("#date").prop("min", minDate), Modernizr.inputtypes.date || $("input[type=date]").pickadate({
        min: now,
        container: "body"
    }), $("#service").change(function() {
        "-1" === $(this).val() ? $("#location").empty().append("<option>Choose a service</option>").prop("disabled", !0) : loadNewLocations($(this).val());
    }).change(), $("form").submit(function(e) {
        if ("-1" === $("#service").val()) return alert("Input not valid"), void e.preventDefault();
        $("#booking-form").empty().append("<div class='loading' style='transform:scale(0.31);'><div></div><div></div></div>"), 
        $.ajax({
            type: "POST",
            url: "/api/reservation",
            data: $(this).serialize(),
            success: function(data) {
                $("#booking-form").empty().append("<h3 style='text-align: center'>Well done!</h3>");
            }
        }), e.preventDefault();
    });
});