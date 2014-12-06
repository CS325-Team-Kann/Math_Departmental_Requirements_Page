$(document).ready(function() {
  var concentration
  $('#next').click(function() {
    concentration = $('#concentrations option:selected').text()
    $('.home').hide()
  })
})