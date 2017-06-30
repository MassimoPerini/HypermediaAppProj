function initFilters() {
    params = new URLSearchParams(window.location.search), params.get("location") && $("#location-selector").val(params.get("location")).trigger("change"), 
    params.get("area") && $("#area-selector").val(params.get("area")).trigger("change"), 
    params.get("service") && $("#service-selector").val(params.get("service")).trigger("change"), 
    initDoctors(), $(window).scroll(function() {
        $(document).height() - $(window).height() >= $(window).scrollTop() && loadNextPage();
    });
}

function initDoctors() {
    getFilters(), window.currentPage = -1, window.doctors = [], $("#doctors-list").empty(), 
    loadNextPage();
}

function loadNextPage() {
    window.currentPage != window.filters.page && -1 != window.currentPage || (window.filters.page = window.currentPage + 1, 
    $.getJSON("api/doctor", window.filters, function(result) {
        window.currentPage = window.filters.page, result.data.forEach(function(doctor) {
            $("#doctors-list").append(doctorCard(doctor));
        });
    }));
}

function getFilters() {
    window.filters = {}, $("#location-selector").val().length > 0 && (window.filters.location = Number($("#location-selector").val())), 
    $("#area-selector").val().length > 0 && (window.filters.area = Number($("#area-selector").val())), 
    $("#service-selector").val().length > 0 && (window.filters.service = Number($("#service-selector").val()));
    var params = new URLSearchParams();
    window.filters.location && params.append("location", window.filters.location), window.filters.area && params.append("area", window.filters.area), 
    window.filters.service && params.append("service", window.filters.service), window.history.pushState(null, null, "?" + params.toString());
}

function doctorCard(doctor) {
    return '<article><div class="card"><a href="/doctor/' + doctor.id + '"><center><img src="' + doctor.icon + '"></img></center><div class="card-text"><h5>' + doctor.fullname + "</h5></div></a></div></article>";
}

$(document).ready(function() {
    $("#location-selector").select2({
        allowClear: !0,
        placeholder: "Select a location"
    }), $("#location-selector").on("change", function(e) {
        initDoctors();
    }), $("#area-selector").select2({
        allowClear: !0,
        placeholder: "Select an area"
    }), $("#area-selector").on("change", function(e) {
        initDoctors();
    }), $("#service-selector").select2({
        allowClear: !0,
        placeholder: "Select a service"
    }), $("#service-selector").on("change", function(e) {
        initDoctors();
    });
}), window.onload = function() {
    initFilters();
};