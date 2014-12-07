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
			if (concentration === "Undecided") {
				removeCurrentDiv('#chooseClasses');
				makeCurrentDiv('#undecidedResultPage');
				$('#nextButton').hide();
				$('#savePDFButton').show();
			}
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



$(document).ready(main);