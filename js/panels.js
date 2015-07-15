$(document).ready(
    function() {
        $("#close").click(function() {
           $("#sidepanel").fadeOut();
            $("#open").fadeIn();
            $("#close").fadeOut();
    });
});
$(document).ready(
    function() {
        $("#open").click(function() {
            $("#sidepanel").fadeIn();
            $("#close").fadeIn();
            $("#open").fadeOut();
    });
});
$(document).ready(
    function() {
        $("#control1").click(function() {
            $("#main").fadeIn();
			$("#panel2").fadeOut();
			$("#panel3").fadeOut();	
    });
});
$(document).ready(
    function() {
        $("#control2").click(function() {
            $("#main").fadeOut();
			$("#panel2").fadeIn();
			$("#panel3").fadeOut();	
    });
});
$(document).ready(
    function() {
        $("#control3").click(function() {
            $("#main").fadeOut();
			$("#panel2").fadeOut();
			$("#panel3").fadeIn();	
    });
});

