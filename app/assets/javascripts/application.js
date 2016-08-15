console.log("Sanity Check");

$(document).ready(function () {
	
	$("tr").click(function () {
    $(this).toggleClass('selected');
    
    var totalCost = [];
    $("tr.selected").each(function() {

			var currency = $("td:last", this).html();
			var number = Number(currency.replace(/[^0-9\.]+/g,""));
			totalCost.push(number);

			console.log(totalCost);

			var total = 0;
				$.each(totalCost,function() {
    		total += this;
				});
			console.log(total);

			$('#total').html("$" + parseFloat(total));
	 	});

  });

	
	


});