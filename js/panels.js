$(document).ready(
    function() {
        $("#close").click(function() {
           $("#sidepanel").hide();
            $("#open").show();
            $("#close").hide();
            $("#main,#panel2,#panel3").css("color","rgba(0,0,0,1)");
    });
});
$(document).ready(
    function() {
        $("#open").click(function() {
            $("#sidepanel").fadeIn();
            $("#close").show();
            $("#open").hide();
            $("#main,#panel2,#panel3").css("color","rgba(0,0,0,0.2)");
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
            $("#main,#panel2,#panel3").css("color","rgba(0,0,0,1)");
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
            $("#main,#panel2,#panel3").css("color","rgba(0,0,0,1)");
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
            $("#main,#panel2,#panel3").css("color","rgba(0,0,0,1)");
    });
});

