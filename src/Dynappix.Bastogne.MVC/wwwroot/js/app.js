//app.js

(function () {

    var $sidebarandwrapper = $("#sidebar,#wrapper");
    var $icon = $("#sidebar-toggle i.fa");

    var $sidebarwrapperandusername = $("#sidebar,#username,#wrapper");

    $("#sidebar").mouseenter(function () {
        $sidebarwrapperandusername.addClass("show-sidebar");
    }).mouseleave(function () {
        $sidebarwrapperandusername.removeClass("show-sidebar");
    });

    $("#sidebar-toggle").on("click", function () {
        $sidebarandwrapper.toggleClass("hide-sidebar");

        if ($sidebarandwrapper.hasClass("hide-sidebar")) {
            $icon.removeClass("fa-angle-left");
            $icon.addClass("fa-angle-right");
        }
        else {
            $icon.removeClass("fa-angle-right");
            $icon.addClass("fa-angle-left");
        }
    });

    
})();
