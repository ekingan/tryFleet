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


 //  function sortByFrequency(array) {
 //    var frequency = {};

 //    array.forEach(function(value) { frequency[value] = 0; });
 //    var uniques = array.filter(function(value) {
 //        return ++frequency[value] == 1;
 //    });
 //    //return frequency;
 //    return uniques.sort(function(a, b) {
 //        return frequency[b] - frequency[a];

 //    });
	// }

	function sortByFrequency (array) {
    var cities = [], frequencies = [], prev;

    array.sort();
    for ( var i = 0; i < array.length; i++ ) {
      if ( array[i] !== prev ) {
        cities.push(array[i]);
          frequencies.push(1);
      } else {
        frequencies[frequencies.length-1]++;
      }
      prev = array[i];
    }
    
    return [cities, frequencies];
	}
	
	$('#originModalBtn').click(function () {
		// $('#originModal').modal('show');
		var data = sortByFrequency(origins);
		console.log(data);
		createTable(data, '#originTableBody');
	});

	
	// sortByFrequency(destinations);
	// console.log(sortByFrequency(origins));

	$("#filterOrigin").change(function () {
		if ($(this).val() == "#busyOrigin") {
			$('#originModal').modal('show');
			var originList = sortByFrequency(origins);
			console.log(originList);
			var table = createTable(originList);
			console.log(table);

		}
	});

	function createTable(data, id) {
     var tr;
     for (var i = 0; i < data[0].length-1; i++) {
        tr = $('<tr/>');
        tr.append("<td>" + data[0][i] + "</td>" + "<td>" + data[1][i] + "</td>" );
        $(id).append(tr);
      }
  }
	


});