main = function() {
	
	setupInitialVisibility();

	var concentration;
	var coursesTaken = [];

	$('#nextButton').click(function() {
		if ($('#chooseConcentration').hasClass('currentDiv')) {
			concentration = $('#concentrationDropdown option:selected').text();
			console.log(concentration);
			removeCurrentDiv('#chooseConcentration');
			makeCurrentDiv('#chooseClasses');
			$('#backButton').show();
		}
		else if ($('#chooseClasses').hasClass('currentDiv')) {
			coursesTaken = getCoursesTaken();
			if (concentration === "Undecided") {
				removeCurrentDiv('#chooseClasses');
				makeCurrentDiv('#undecidedResultPage');
				makeCurrentDiv('#coursesTaken');
				$('#nextButton').hide();
				$('#savePDFButton').show();
			}
		}
	});

	$('#backButton').click(function() {
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

getCoursesTaken = function() {

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