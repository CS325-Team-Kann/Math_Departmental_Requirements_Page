main = function() {
	
	setupInitialVisibility();

	var concentration;

	$('#nextButton').click(function() {
		if($('#chooseConcentration').hasClass('currentDiv')) {
			concentration = $('#concentrationDropdown option:selected').text();
			console.log(concentration);
			$('#chooseConcentration').removeClass('currentDiv');
			$('#chooseConcentration').addClass('hidden');
			$('#chooseClasses').removeClass('hidden');
			$('#chooseClasses').addClass('currentDiv');
			$('#backButton').removeClass('hidden');
		}
	});



}

setupInitialVisibility = function() {
	$('#chooseConcentration').addClass('currentDiv');
	$('#chooseClasses').addClass('hidden');
}

$(document).ready(main);