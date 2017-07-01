function changedFilters() {
    getFiltersFromSelectors(), initDoctors();
}

function setFiltersFromUrl() {
    params = new URLSearchParams(window.location.search), window.filters = {}, params.get("location") && (window.filters.location = Number(params.get("location"))), 
    params.get("area") && (window.filters.area = Number(params.get("area"))), params.get("service") && (window.filters.service = Number(params.get("service"))), 
    params.get("location") ? $("#location-selector").val(params.get("location")).trigger("change.select2") : $("#location-selector").val(null).trigger("change.select2"), 
    params.get("area") ? $("#area-selector").val(params.get("area")).trigger("change.select2") : $("#area-selector").val(null).trigger("change.select2"), 
    params.get("service") ? $("#service-selector").val(params.get("service")).trigger("change.select2") : $("#service-selector").val(null).trigger("change.select2");
}

function getFiltersFromSelectors() {
    window.filters = {}, $("#location-selector").val().length > 0 && (window.filters.location = Number($("#location-selector").val())), 
    $("#area-selector").val().length > 0 && (window.filters.area = Number($("#area-selector").val())), 
    $("#service-selector").val().length > 0 && (window.filters.service = Number($("#service-selector").val()));
    var params = new URLSearchParams();
    window.filters.location && params.append("location", window.filters.location), window.filters.area && params.append("area", window.filters.area), 
    window.filters.service && params.append("service", window.filters.service), window.history.pushState(window.filters, null, "?" + params.toString());
}

function initDoctors() {
    $("#doctors-list").empty(), window.currentPage = -1, window.doctors = {}, window.done = !1, 
    loadNextPage();
}

function loadNextPage() {
    window.done || window.filters.page && window.currentPage != window.filters.page || (window.filters.page = window.currentPage + 1, 
    $.getJSON("api/doctor", window.filters, function(result) {
        result.page == window.filters.page && (window.currentPage = window.filters.page, 
        result.data.length <= 0 ? (window.done = !0, Object.keys(window.doctors).length <= 0 && $("#doctors-list").append(noDoctor())) : insertDoctors(result.data));
    }));
}

function insertDoctors(doctors) {
    doctors.forEach(function(doctor) {
        window.doctors[doctor.id] || (window.doctors[doctor.id] = doctor, $("#doctors-list").append(doctorCard(doctor)));
    });
}

function noDoctor() {
    return '<section class="no-result"><img src="/public/imgs/doctor.svg"><h2>No doctors found.</h2>';
}

function doctorCard(doctor) {
    return '<article class="doctor"><div class="card"><a href="/doctor/' + doctor.id + '"><center><img src="' + doctor.icon + '"></img></center><div class="card-text"><h5>' + doctor.fullname + "</h5></div></a></div></article>";
}

$(document).ready(function() {
    $("#location-selector").select2({
        allowClear: !0,
        placeholder: "Select a location"
    }), $("#location-selector").on("change", function(e) {
        changedFilters();
    }), $("#area-selector").select2({
        allowClear: !0,
        placeholder: "Select an area"
    }), $("#area-selector").on("change", function(e) {
        changedFilters();
    }), $("#service-selector").select2({
        allowClear: !0,
        placeholder: "Select a service"
    }), $("#service-selector").on("change", function(e) {
        changedFilters();
    });
}), window.onload = function() {
    setFiltersFromUrl(), initDoctors(), $(window).scroll(function() {
        $(document).height() - $(window).height() >= $(window).scrollTop() && loadNextPage();
    });
}, window.onpopstate = function() {
    setFiltersFromUrl(), initDoctors();
};