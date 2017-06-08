
(function ($) {

    $.fn.extend({
        message: function (messageString, TypeMessage, title) {

            var $showDuration = "400";

            var msg = messageString;
            var shortCutFunction = TypeMessage;

            if ($showDuration.length) {
                toastr.options.showDuration = $showDuration;
            }

            $("#toastrOptions").text("Command: toastr["
                    + shortCutFunction
                    + "](\""
                    + msg
                    + (title ? "\", \"" + title : '')
                    + "\")\n\ntoastr.options = "
                    + JSON.stringify(toastr.options, null, 2)
            );
            var $toast = toastr[shortCutFunction](msg, title); // Wire up an event handler to a button in the toast, if it exists
            $toastlast = $toast;
            if ($toast.find('#okBtn').length) {
                $toast.delegate('#okBtn', 'click', function () {
                    alert('you clicked me. i was toast #' + toastIndex + '. goodbye!');
                    $toast.remove();
                });
            }
            if ($toast.find('#surpriseBtn').length) {
                $toast.delegate('#surpriseBtn', 'click', function () {
                    alert('Surprise! you clicked me. i was toast #' + toastIndex + '. You could perform an action here.');
                });
            }
        }
    })

})(jQuery);