main = function() {
	
	setupInitialVisibility();

	var concentration;
	var coursesTaken = [];

	$('#nextButton').click(function() {
		if ($('#chooseConcentration').hasClass('currentDiv')) {
			concentration = $('#concentrationDropdown option:selected').text();
			removeCurrentDiv('#chooseConcentration');
			makeCurrentDiv('#chooseClasses');
			$('#backButton').show();
		}
		else if ($('#chooseClasses').hasClass('currentDiv')) {
			removeCurrentDiv('#chooseClasses');
			showConcentration(concentration)
			$('#savePDFButton').show();
			var courseList = $('ul.courses');
			courseList.empty();
			$.each(coursesTaken, function(i) {
				console.log('populating list with \'' + coursesTaken[i] + '\'')
				var li = $('<li>' + coursesTaken[i] + '</li>')
					.addClass('list-group-item')
				courseList.append(li);
			});
			makeCurrentDiv('#coursesTaken');
		}
	});

	$('#backButton, #editCoursesButton').click(function() {
		if($('#chooseClasses').hasClass('currentDiv')) {
			removeCurrentDiv('#chooseClasses');
			makeCurrentDiv('#chooseConcentration');
			$('#backButton').hide();
		}
		else if ($('#undecidedResultPage').hasClass('currentDiv')) {
			removeCurrentDiv('#undecidedResultPage');
			removeCurrentDiv('#coursesTaken');
			makeCurrentDiv('#chooseClasses');
			$('#nextButton').show();
			$('#savePDFButton').hide();
		}
	});

	$("#savePDFButton").click(function() {
   		// // hope the server sets Content-Disposition: attachment!
    	window.open('../download/requirements.pdf','_blank');
	});

	$('.classList input:checkbox').change(function() {
		var className = $(this).next('label').text();
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

setupInitialVisibility = function() {
	$('#chooseConcentration').addClass('currentDiv');
	$('#chooseClasses').addClass('hidden');
	$('#undecidedResultPage').addClass('hidden');
	$('#actuarial').addClass('hidden');
	$('#individual').addClass('hidden')
	$('#computing').addClass('hidden')
	$('#pure').addClass('hidden')
	$('#teaching').addClass('hidden')
	$('#stats').addClass('hidden')
	$('#applied').addClass('hidden')
	$('#coursesTaken').addClass('hidden');
	$('#backButton').hide();
	$('#savePDFButton').hide();
}

makeCurrentDiv = function(selector) {
	$(selector).addClass('currentDiv');
	$(selector).removeClass('hidden');
}

removeCurrentDiv = function(selector) {
	$(selector).removeClass('currentDiv');
	$(selector).addClass('hidden');
}

showConcentration = function(concentration){
  switch (concentration){
  case "Undecided":
  	$('#actuarial').removeClass('hidden')
		$('#individual').removeClass('hidden')
		$('#computing').removeClass('hidden')
		$('#pure').removeClass('hidden')
		$('#teaching').removeClass('hidden')
		$('#stats').removeClass('hidden')
		$('#applied').removeClass('hidden')
  	$('#nextButton').hide()
    break
  case "Actuarial":
  	$('#actuarial').removeClass('hidden')
  	$('#nextButton').hide()
    break
  case "Applied Mathematics":
  	$('#applied').removeClass('hidden')
  	$('#nextButton').hide()
    break
  case "Mathematical Computing":
  	$('#computing').removeClass('hidden')
  	$('#nextButton').hide()
    break
  case "Pure Mathematics":
  	$('#pure').removeClass('hidden')
  	$('#nextButton').hide()
    break
  case "Statistics":
  	$('#stats').removeClass('hidden')
  	$('#nextButton').hide()
    break
  case "Teaching":
  	$('#teaching').removeClass('hidden')
  	$('#nextButton').hide()
    break
  case "Design Your Own":
  	$('#individual').removeClass('hidden')
    break
  default:
    alert("An error has occured!")
    break
  }
}

$(document).ready(main);