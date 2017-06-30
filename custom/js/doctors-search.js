$(document).ready(function() {
  // Location selector
  $("#location-selector").select2({
    allowClear: true,
    placeholder: 'Select a location'
  });
  $("#location-selector").on('change', function(e){
    initDoctors();
  });
  // Area selector
  $("#area-selector").select2({
    allowClear: true,
    placeholder: 'Select an area'
  });
  $("#area-selector").on('change', function(e){
    initDoctors();
  });
  // Service selector
  $("#service-selector").select2({
    allowClear: true,
    placeholder: 'Select a service'
  });
  $("#service-selector").on('change', function(e){
    initDoctors();
  });
});

function initFilters() {
    // Set filters from URL
    params = new URLSearchParams(window.location.search);
    if (params.get("location")) $("#location-selector").val(params.get("location")).trigger('change');
    if (params.get("area")) $("#area-selector").val(params.get("area")).trigger('change');
    if (params.get("service")) $("#service-selector").val(params.get("service")).trigger('change');
    // Init filters and list
    initDoctors();
    // Infinite scroll
    $(window).scroll(function(){
        if ($(document).height() - $(window).height() >= $(window).scrollTop()) {
            loadNextPage();
        }
    });
}

window.onload = function(){
  initFilters();
}

function initDoctors(){
  getFilters();
  window.currentPage = -1;
  window.doctors = [];
  $('#doctors-list').empty();
  loadNextPage();
}

function loadNextPage(){
  if (window.currentPage == window.filters.page || window.currentPage == -1){
    window.filters.page = window.currentPage + 1;
  }else{
    return;
  }
  $.getJSON("api/doctor", window.filters, function(result){
    window.currentPage = window.filters.page;
    result.data.forEach(function(doctor){
      $('#doctors-list').append(doctorCard(doctor));
    });
  });
}

function getFilters(){
  window.filters = {};
  if ($("#location-selector").val().length > 0) window.filters.location = Number($("#location-selector").val());
  if ($("#area-selector").val().length > 0) window.filters.area = Number($("#area-selector").val());
  if ($("#service-selector").val().length > 0) window.filters.service = Number($("#service-selector").val());
  // Update URL
  var params = new URLSearchParams();
  if (window.filters.location) params.append('location', window.filters.location);
  if (window.filters.area) params.append('area', window.filters.area);
  if (window.filters.service) params.append('service', window.filters.service);
  window.history.pushState(null, null, '?' + params.toString());
}

window.addEventListener('popstate', function(event) {
  console.log("popstate");
  initFilters();
});


function doctorCard(doctor){
  // FIXME: We did not use ES6 multiline because grunt Uglify minification did not support it
  return '<article>' +
          '<div class="card">' +
            '<a href="/doctor/' + doctor.id +'">' +
            '<center><img src="' + doctor.icon + '"></img></center>' +
            '<div class="card-text">' +
              '<h5>' + doctor.fullname + '</h5>' +
          '</div></a></div></article>';
}
