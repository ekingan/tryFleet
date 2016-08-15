$(document).ready(function() {

$("#ship-table td:nth-child(1)").click(function(event){

//Prevent the hyperlink to perform default behavior
event.preventDefault();
//alert($(event.target).text())

var $td= $(this).closest('tr').children('td');


var sr= $td.eq(0).text();

var name= $td.eq(1).text();

var city= $td.eq(2).text();

alert(sr);

alert(name);

alert(city);
}

);

});