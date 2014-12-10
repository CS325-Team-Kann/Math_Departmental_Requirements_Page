var levelFilterEnabled = false
var coursesTaken = [];
var shoppingCart = []
main = function() {
	
	setupInitialVisibility();

	var concentration;
  	
	$('#nextButton').click(function() {
		if ($('#chooseConcentration').is(':visible')) {
			concentration = $('#concentrationDropdown option:selected').text();
			console.log("user selected concentration: " + concentration)
			$('#chooseConcentration').hide();
			$('#chooseClasses').show();
			$('#backButton').show();
		}
		else if ($('#chooseClasses').is(':visible')) {
			$('#chooseClasses').hide();
			$('#requirements').show()
			showConcentration(concentration)
			
			// BUTTONS
			$('#nextButton').hide()
			$('#backButton').hide();
			$('#changeConcentration').show();
			$('#savePDFButton').show();
			
			var courseList = $('ul.courses');
			courseList.empty();
      coursesTaken.sort()
			$.each(coursesTaken, function(i) {
				console.log('populating list with \'' + coursesTaken[i] + '\'')
				var li = $('<li>' + coursesTaken[i] + '</li>')
				.addClass('list-group-item')
				courseList.append(li);
			});
			$('#coursesTaken').show();
		}

	});

  $('#backButton').click(function() {
  	if($('#chooseClasses').is(':visible')) {
  		$('#chooseClasses').hide()
  		$('#chooseConcentration').show()
  		$('#backButton').hide()
  	}
  });

  $('#editCoursesButton').click(function() {
    $('#filter').prop('checked', false)
    prereqs($('#filter'))
    $('#prereqFilter').prop('checked', false)
  	if ($('#requirements').is(':visible')) {
  		hideRequirementsPage()
  		$('#chooseClasses').show()
  		$('#backButton').show()
  		$('#nextButton').show()
  	}
  })

  $('#changeConcentration').click(function() {
  	if ($('#requirements').is(':visible')) {
  		hideRequirementsPage()
  		$('#chooseConcentration').show()
  		$('#nextButton').show()
  	}
  })

  $("#savePDFButton").click(function() {
     		// // hope the server sets Content-Disposition: attachment!
     		window.open('../download/requirements.pdf','_blank');
     	});

  $('.classList input:checkbox').change(function() {
  	var className = $(this).next('label').text();
  	// if no prequisites is pressed
  	if (className === "No prerequisites.") {
  		if($(this).is(':checked')) {
  			coursesTaken = []
  			$(this).siblings().attr('checked', false);
  			$()
  		}
  	}
  	// if a normal class is pressed
  	else {
  		if($(this).is(':checked')) {
  			coursesTaken.push(className);
  		}
  		else {
  			var index = coursesTaken.indexOf(className);
  			if (index > -1) {
  				coursesTaken.splice(index, 1)
  			}
  		}
  	}
  })

  $('#allClasses input:checkbox').change(function() {
    var className = $(this).next('label').text();
    var id = className.split(" ")[1]
    // if a normal class is pressed
    if($(this).is(':checked')) {
      if(!hasPrereqs(coursesTaken, className)){
        $(this).parent().addClass('noPrereq')
        alert("You currently do not have the prequisites for this class. Please assure this is correct before continuing.")
      }
      shoppingCart.push(className)
      $('#shoppingCart').append("<div id=" + id + " ><label>" + className + "</label><br></div")
    }
    else {
      var index = shoppingCart.indexOf(className)
      if (index > -1) {
        $(this).parent().removeClass('noPrereq')
        shoppingCart.splice(index, 1)
        $('#'+id).remove()
      }
    }
  })

  $('#comparator').change(function(){
    if (levelFilterEnabled){
      setFilters()
    }
  })

  $('#prereqFilter').change(function(){
    prereqs($(this))
  })

  $('#level').change(function(){
    if (levelFilterEnabled)
      setFilters()
  })
}

// If the class you want has a higher number than what you've taken,
// you don't have the prereq
function hasPrereqs(coursesTaken, course){
  if (coursesTaken.length == 0)
    return false
  var taken = parseInt(coursesTaken[coursesTaken.length-1].split(" ")[1].substring(0,1))
  var want = parseInt(course.split(" ")[1].substring(0,1))
  return ((taken + 1) >= want)
}

function prereqs(checkbox){
  if(checkbox.checked) {
    hidePrereqs()
  }
  else{
    $('#allClasses span').each(function(i){
      $(this).show()
    })
  }
}

function filterLevels(checkbox){
  if(checkbox.checked) {
    setFilters()
    levelFilterEnabled = true
  }
  else {
    $('.coursesSpan').each(function(){
      $('#currLevel').text("All Courses")
      levelFilterEnabled = false
      $(this).show();
    })
  }
}

hidePrereqs = function() {
  if(coursesTaken.length > 0){
    var c
    var highest = coursesTaken[coursesTaken.length-1].split(" ")[1].substring(0,1)
    highest = parseInt(highest)
    $('#allClasses span').each(function(i){
      c = parseInt($(this).text().split(" ")[1].substring(0,1))
      if (highest + 1 < c)
        $(this).hide()
    })
  }
}

setFilters = function() {
  var comparator = $('#comparator').val()
  var level = $('#level').val()
  if (comparator == 'Above'){
      $('#currLevel').text("Math Courses > " + level)
      $('.coursesSpan').each(function(){
        if (level >= $(this).text().split(" ")[1]){
          $(this).hide()
        }
        else{
          $(this).show()
        
        }
      })
    }
    else if (comparator == 'Below'){
      $('.coursesSpan').each(function(){
        $('#currLevel').text("Math Courses < " + level)
        if (level <= $(this).text().split(" ")[1]){
          $(this).hide()
        }
        else{
          $(this).show()
        }
      })
    }
}

setupInitialVisibility = function() {
	$('#chooseClasses').hide()
	$('#general').hide()
	$('#actuarial').hide()
	$('#individual').hide()
	$('#computing').hide()
	$('#pure').hide()
	$('#teaching').hide()
	$('#stats').hide()
	$('#applied').hide()
	$('#coursesTaken').hide()
	$('#backButton').hide()
	$('#savePDFButton').hide()
	$('#changeConcentration').hide()
}

hideRequirementsPage = function() {
	$('#requirements').children().hide();
	$('#requirements').hide()
	$('#coursesTaken').hide()
	$('#changeConcentration').hide()
	$('#savePDFButton').hide()
}

showConcentration = function(concentration){
	switch (concentration){
		case "Undecided":
		$('#actuarial').show();
		$('#general').show();
		$('#computing').show();
		$('#pure').show();
		$('#teaching').show();
		$('#stats').show();
		$('#applied').show();
		break
		case "Actuarial":
		$('#actuarial').show();
		break
		case "Applied Mathematics":
		$('#applied').show();
		break
		case "Mathematical Computing":
		$('#computing').show();
		break
		case "Pure Mathematics":
		$('#pure').show();
		break
		case "Statistics":
		$('#stats').show();
		break
		case "Teaching":
		$('#teaching').show();
		break
		case "Design Your Own":
		$('#individual').show();
		$('#general').show();
		break
		default:
		alert("An error has occured!")
		break
	}
}

$(document).ready(main);