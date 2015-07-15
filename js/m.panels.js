$(document).ready(
    function() {
        $("#projects").click(function() {
            $("#aboutme").hide();
			$("#map_projects").show();
			$(myPanel).panel("close");
    });
});
$(document).ready(
    function() {
        $("#about").click(function() {
            $("#map_projects").hide();
			$("#aboutme").show();
			$(myPanel).panel("close");
    });
});
