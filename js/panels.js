$(document).ready(
    function() {
        $("#close").click(function() {
           $("#sidepanel").hide();
            $("#open").show();
            $("#close").hide();
    });
});
$(document).ready(
    function() {
        $("#open").click(function() {
            $("#sidepanel").fadeIn();
            $("#close").show();
            $("#open").hide();
    });
});
$(document).ready(
    function() {
        $("#control1").click(function() {
            $("#main").show();
			$("#panel2").hide();
			$("#panel3").hide();	
			$("#sidepanel").hide();
            $("#close").hide();
            $("#open").show();
    });
});
$(document).ready(
    function() {
        $("#control2").click(function() {
            $("#main").hide();
			$("#panel2").show();
			$("#panel3").hide();
			$("#sidepanel").hide();
            $("#close").hide();
            $("#open").show();
    });
});
$(document).ready(
    function() {
        $("#control3").click(function() {
            $("#main").hide();
			$("#panel2").hide();
			$("#panel3").show();
			$("#sidepanel").hide();
            $("#close").hide();
            $("#open").show();
    });
});

