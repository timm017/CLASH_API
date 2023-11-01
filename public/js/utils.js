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

    /**
     * If usbmitting clan (tag|name) is blank then error report and prevent form submission
     * TODO: should we have minimum length for clan name or tag?
     */
    $("button#clan-search").on("click", function (e) {
        var searchNameValue = $("input[name='clanname'").val();
        var searchTagValue = $("input[name='clantag'").val();

        if ($("#search-form-name").is(":visible")) {
            if (searchNameValue == "") {
                alert('Please enter a clan name to search for.');
                e.preventDefault();
                return false;
            }
        } else {
            if (searchTagValue == "") {
                alert('Please enter a tag name to search for.');
                e.preventDefault();
                return false;
            }
        }

    });
});