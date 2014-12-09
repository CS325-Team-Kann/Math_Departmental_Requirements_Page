main = function() {
	
	setupInitialVisibility();

	var concentration;
	var coursesTaken = [];
  var shoppingCart = []

	$('#nextButton').click(function() {
		if ($('#chooseConcentration').is(':visible')) {
			concentration = $('#concentrationDropdown option:selected').text();
			console.log("user selected concentration: " + concentration)
			//removeCurrentDiv('#chooseConcentration');
			$('#chooseConcentration').hide();
			//makeCurrentDiv('#chooseClasses');
			$('#chooseClasses').show();
			$('#backButton').show();
		}
		else if ($('#chooseClasses').is(':visible')) {
			//removeCurrentDiv('#chooseClasses');
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
			$.each(coursesTaken, function(i) {
				console.log('populating list with \'' + coursesTaken[i] + '\'')
				var li = $('<li>' + coursesTaken[i] + '</li>')
				.addClass('list-group-item')
				courseList.append(li);
			});
			$('#coursesTaken').show();
		}

	});

$('#backButton, #editCoursesButton').click(function() {
	if($('#chooseClasses').is(':visible')) {
		$('#chooseClasses').hide()
		$('#chooseConcentration').show()
		$('#backButton').hide()
	}
});

$('#editCoursesButton').click(function() {
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
	});
}

function filterLevels(checkbox){
  var comparator = $('#comparator').val()
  var level = $('#level').val()
  if(checkbox.checked) {
    if (comparator == 'Above'){
      $('#currLevel').text("Math Courses > " + level)
      $('.coursesSpan').each(function(){
        if (level >= $(this).text().split(" ")[1]){
          $(this).hide()
        }
      })
    }
    else if (comparator == 'Below'){
      $('.coursesSpan').each(function(){
        $('#currLevel').text("Math Courses < " + level)
        if (level <= $(this).text().split(" ")[1]){
          $(this).hide()
        }
      })
    }
  }
  else {
    $('.coursesSpan').each(function(){
      $(this).show();
    })
  }
}

setupInitialVisibility = function() {
	/*$('#chooseConcentration').addClass('currentDiv')
	$('#chooseClasses').addClass('hidden')
	$('#general').addClass('hidden')
	$('#actuarial').addClass('hidden')
	$('#individual').addClass('hidden')
	$('#computing').addClass('hidden')
	$('#pure').addClass('hidden')
	$('#teaching').addClass('hidden')
	$('#stats').addClass('hidden')
	$('#applied').addClass('hidden')
	$('#coursesTaken').addClass('hidden')
	$('#backButton').hide()
	$('#savePDFButton').hide()*/

	//$('#chooseConcentration').show()
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

makeCurrentDiv = function(selector) {
	$(selector).addClass('currentDiv')
	$(selector).removeClass('hidden')
}

removeCurrentDiv = function(selector) {
	$(selector).removeClass('currentDiv');
	$(selector).addClass('hidden');
}

showConcentration = function(concentration){
	switch (concentration){
		case "Undecided":
		$('#actuarial').show();
		//$('#individual').removeClass('hidden')
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