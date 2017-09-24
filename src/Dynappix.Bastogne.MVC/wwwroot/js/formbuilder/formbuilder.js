
(function () {
    'use strict'
    var $controlscolsrows = $("#edit-wrapper .builder-col, #edit-wrapper .form-group");

    $controlscolsrows.on('keydown', function () {
        var key = event.keyCode || event.charCode;

        if (key === 8 || key === 46)
            console.log("Delete")
    });

    //Show element that is being hovered.
    $controlscolsrows.hover(function (event) {
        $(this).addClass("control-hover");
        $(this).focus();
        event.stopPropagation();
    }, function () {
        $(this).removeClass("control-hover");
        $(this).blur();
        event.stopPropagation();
    });

    //Remove styles added by Jquery UI
    var onfinishDrag = function () {
        $(".sortable").sortable({
            connectWith: ".sortable",
            revert: true
        });
        $(".row.builder-row").sortable({
            connectWith: ".row.builder-row",
            revert: true
        });
        $(".builder-col").attr('style', '');
        $(".form-group").css({
            "width": "auto",
            "height": "auto"
        });
        $controlscolsrows = $("#edit-wrapper .row.builder-row, #edit-wrapper .builder-col, #edit-wrapper .form-group");
        $controlscolsrows.hover(function (event) {
            event.stopPropagation();
            $(this).addClass("control-hover");
        }, function () {
            event.stopPropagation();
            $(this).removeClass("control-hover");
        });

        $controlscolsrows.on('keydown', function () {
            var key = event.keyCode || event.charCode;

            if (key === 8 || key === 46)
                console.log("Delete")
        });

        //Show element that is being hovered.
        $controlscolsrows.hover(function (event) {
            $(this).addClass("control-hover");
            $(this).focus();
            event.stopPropagation();
        }, function () {
            $(this).removeClass("control-hover");
            $(this).blur();
            event.stopPropagation();
        });

    }

    //Ui-Sortable For New Elements

    $("#addrow").on("click", function () {
        $("#edit-wrapper").append('<div class="row builder-row"></div>')
        onfinishDrag();
    });

    //Row Sortable and dragable
    $(".row.builder-row").sortable({
        connectWith: ".row.builder-row",
        revert: true
    });

    //Cols
    $("#draggable-col .builder-col").draggable({
        connectToSortable: ".row.builder-row",
        helper: function () {
            var helper = $(this).clone();
            helper.css({ "width": $("#sortable").width });
            return helper;
        },
        revert: "invalid",
        refreshPositions: true,
        stop: onfinishDrag
    });

    $("#draggable-col, .form-group").disableSelection();

    //Controls
    $(".sortable").sortable({
        connectWith: ".sortable",
        revert: true
    });

    $("#draggable-control .form-group").draggable({
        connectToSortable: "#edit-wrapper .sortable",
        helper: function () {
            var helper = $(this).clone();
            helper.css({ "width": $("#sortable").width });
            return helper;
        },
        revert: "invalid",
        refreshPositions: true,
        stop: onfinishDrag
    });

    $("#draggable-control, .form-group").disableSelection();

    var saveform = function () {
        var $rows = $('#edit-wrapper .row')
        var json = '{';

        for(var i = 0; i < $rows.length; i++)
        {
            $columns = ""
            json += 'row: {'

            json += jsonifyColumns();

            json += '}'
        }

        json += '}'
    }

    var jsonifyColumns = function() {

    }

})();
