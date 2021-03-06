console.log("Sanity Check");

$(document).ready(function () {

	//create an array of origins
	var origins = [];
	$('tbody tr').each(function() {	
    origins.push($(this).find(".origin").html()); 

 	});

 	//create an array of desinations
 	var destinations = [];
 	$('tbody tr').each(function() {
 		destinations.push($(this).find('.destination').html());
 		
 	});
	
	//turns selected rows yellow
	$("tbody tr").click(function () {
    $(this).toggleClass('selected');
    
    //Create total cost array based on selected rows
    var totalCost = [];
    $("tr.selected").each(function() {
    	//grabs currancy string from last column in row
			var currency = $("td:last", this).html();
			//converts currancy string to number
			var number = Number(currency.replace(/[^0-9\.]+/g,""));
			//pushes all numbers into array
			totalCost.push(number);
			//adds numbers from the array to arrive at total cost for selected
			var total = 0;
			$.each(totalCost,function() {
    		total += this;
			});

			//converts number back into currancy
			var totalCurrency = total.toFixed(2).replace(/./g, function(c, i, a) {
    		return i && c !== "." && ((a.length - i) % 3 === 0) ? ',' + c : c;
			});

			//displays total currancy in DOM
			$('#total').html("$" + totalCurrency);
	 	});

  });

//sorts locations by frequency, returns object of cities and frequency of each occurrance
  function sortByFrequency(array) {
    var frequency = {};
    array.forEach(function(value) { frequency[value] = 0; });
    var uniques = array.filter(function(value) {
        return ++frequency[value] == 1;
    });
    //return frequency;
    delete frequency.undefined;
    return frequency;
    
	}

//show modal containing most popular origins
	$('#originModalBtn').click(function () {
		var data = {};
		data = sortByFrequency(origins);
		createTable(data, '#originTableBody');
	});

	//show modal containing most popular destinations
	$('#destinationModalBtn').click(function () {
		var data = {};
		data = sortByFrequency(destinations);
		createTable(data, '#destinationTableBody');
	});

//creates table out of object of cities and their frequencies
	function createTable(data, id) {
     var tr;
     $.each(data, function(k, v) {
     		tr = $('<tr/>');
        tr.append("<td>" + k + "</td>" + "<td>" + v + "</td>" );
        $(id).append(tr);
      });
  }

});