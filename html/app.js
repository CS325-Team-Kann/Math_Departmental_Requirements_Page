var concentration
$(document).ready(function() {
  $('#gotoClassSelect').click(function() {
    concentration = $('#concentrations option:selected').text()
    $('.home').hide()
    showClassSelect(concentration)
  })


})

function showClassSelect(concentration){
  switch (concentration){
  case "Undecided":
    alert("hi")
    break
  case "Actuarial":

    break
  case "Applied Mathematics":

    break
  case "Mathematical Computing":

    break
  case "Pure Mathematics":

    break
  case "Statistics":

    break
  case "Teaching":

    break
  case "Design Your Own":

    break

  default:
    alert("An error has occured!")
    break

  }

}