$(function() {

    var money_add_minus = new AddMinus({
        "add": $("#add"),
        "minus": $("#minus"),
        "input": $("#money"),
        action: function(val) {
            $("#deposit").html("￥ " + (val * 10000 * 0.01).toLocaleString());
        }
    });

});
