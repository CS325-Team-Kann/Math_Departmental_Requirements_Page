main = function() {
	
	setupInitialVisibility();

	var concentration;

	$('#nextButton').click(function() {
		if($('#chooseConcentration').hasClass('currentDiv')) {
			concentration = $('#concentrationDropdown option:selected').text();
			console.log(concentration);
			removeCurrentDiv('#chooseConcentration');
			makeCurrentDiv('#chooseClasses');
			$('#backButton').show();
		}
	});

	$('#backButton').click(function() {
		if($('#chooseClasses').hasClass('currentDiv')) {
			removeCurrentDiv('#chooseClasses');
			makeCurrentDiv('#chooseConcentration');
			$('#backButton').hide();
		}
	});



}

setupInitialVisibility = function() {
	$('#chooseConcentration').addClass('currentDiv');
	$('#chooseClasses').addClass('hidden');
	$('#backButton').hide();
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