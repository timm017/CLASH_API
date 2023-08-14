jQuery(document).ready(function () {
    $("#search-form-name").hide();
    $("input[name='searchtype']").on("click", function () {
        var searchtype = $(this).val();
        console.log("searchtype: " + searchtype);
        if (searchtype == "name") {
            $("#search-form-name").show();
            $("#search-form-tag").hide();
        } else {
            $("#search-form-name").hide();
            $("#search-form-tag").show();
        }
    });
});