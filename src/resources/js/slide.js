$(document).ready(function() {
    window.columns = [];

    $(".column").each(function(index, value) {
            window.columns.push(value);
    });
});


var slideRight = function(column) {
    $(column).toggle({
            effect: "slide",
            duration: 1000,
            direction: "right"
    });
}

var slideLeft = function(column) {
    $(column).toggle({
            effect: "slide",
            duration: 1000,
            direction: "right"
    });
}
