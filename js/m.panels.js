$(document).ready(
    function() {
        $("#projects").click(function() {
            $("#aboutme").hide();
			$("#other_projects").hide();
			$("#map_projects").show();
			$(myPanel).panel("close");
    });
});
$(document).ready(
    function() {
        $("#about").click(function() {
            $("#map_projects").hide();
			$("#other_projects").hide();
			$("#aboutme").show();
			$(myPanel).panel("close");
    });
});
$(document).ready(
    function() {
        $("#other").click(function() {
            $("#map_projects").hide();
			$("#aboutme").hide();
			$("#other_projects").show();
			$(myPanel).panel("close");
    });
});