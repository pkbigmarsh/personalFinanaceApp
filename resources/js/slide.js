$(document).ready(function() {
    window.columns = [];


    $(".column").each(function(index, value) {
            window.columns.push(value);
    });

    $(columns[1]).toggle();
    $(columns[2]).toggle();

    slide(columns[1]);
    slide(columns[2]);
});


var slide = function(column) {
    $(column).toggle({
            effect: "slide",
            duration: 1000,
            direction: "left"
    });
}
