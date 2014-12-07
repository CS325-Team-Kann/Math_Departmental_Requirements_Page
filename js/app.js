main = function() {
	
	setupInitialVisibility();

	var concentration;

	$('#nextButton').click(function() {
		if ($('#chooseConcentration').hasClass('currentDiv')) {
			concentration = $('#concentrationDropdown option:selected').text();
			console.log(concentration);
			removeCurrentDiv('#chooseConcentration');
			makeCurrentDiv('#chooseClasses');
			$('#backButton').show();
		}
		else if ($('#chooseClasses').hasClass('currentDiv')) {
			if (concentration === "Undecided") {
				removeCurrentDiv('#chooseClasses');
				makeCurrentDiv('#undecidedResultPage')
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
	});

	$("#savePDFButton").click(function() {
   		// // hope the server sets Content-Disposition: attachment!
    	window.open('../download/requirements.pdf','_blank');
	});
}

setupInitialVisibility = function() {
	$('#chooseConcentration').addClass('currentDiv');
	$('#chooseClasses').addClass('hidden');
	$('#undecidedResultPage').addClass('hidden');
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