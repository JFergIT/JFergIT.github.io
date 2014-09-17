$(document).ready(function () {
    $('#start').click(function () {
        $('#loading').show();
        var xml = $('#SMSContainer').val();
        var name = "";

        $.each($(xml).find('sms'), function (ind, val) {
            var name = $(val).attr('name'),
                addr = $(val).attr('address'),
                body = $(val).attr('body'),
                time = $(val).attr('time'),
                Xname = name;

            if ($('.container[name="' + addr + '"]').size() == 0) {
                addContainer(addr, name);
                if ($.trim(name) == "") Xname = addr;
                $('#ddlFrom').append('<option value="' + addr + '">' + Xname + '</option>');
            }

            if ($(val).attr('type') == 1) addFromMessage(body, addr, time);
            else addToMessage(body, addr, time);
        });

        $('#loading').hide();
        $('#ddlFrom').show();

        $('#ddlFrom').change(function () {
            $('.container').hide();
            $('.container[name="' + $(this).val() + '"]').show();
        });
        $('#reset').show();
        $('#SMSContainer, #start').hide();
    });
    $('#reset').click(function() {
       $('#SMSContainer, #start').show();
        $('.container').remove();
        $('#ddlFrom, #reset').hide();
    });
});

function addFromMessage(msg, addr, time) {
    $('.container[name="' + addr + '"]').append('<div class="text-left" title="'+time+'"><p class="white-shadow">' + msg + '</p></div>');
}

function addToMessage(msg, addr, time) {
    $('.container[name="' + addr + '"]').append('<div class="text-right" title="'+time+'"><p class="white-shadow">' + msg + '</p></div>');
}

function addContainer(addr, name) {
    if ($.trim(name) == "") name = addr;
    $('body').append('<div class="container" name="' + addr + '" style="display:none;"><H3>' + name + '</H3></div>');
}