$(document).ready(function () {
	$('#SMSContainer').watermark('Paste your Texts XML here.');
	$('input[type="button"]').button();
	//$('#ddlFrom').selectmenu();
	$('#ddlFrom').hide();
    $('#start').click(function () {
		
	var xml = $('#SMSContainer').val();
	if($.trim(xml) === "")
	{
		showModalDialog("Please enter your XML");
		
		return;
	}
        $('#loading').show();
        
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
			
			//$('#ddlFrom').selectmenu( "refresh" );
			
            if ($(val).attr('type') == 1) addFromMessage(body, addr, time);
            else addToMessage(body, addr, time);
        });

        $('#loading').hide();
        $('#ddlFrom').show();

		
		$('#ddlFrom').on('change', function() {//.on( "selectmenuchange", function( event, ui ) {
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
		$('#ddlFrom').find('option:not(:first)').remove();
		
    });
});

function showModalDialog(msg)
{
	$( "#dialog-message" ).dialog({
		  modal: true,
		  buttons: {
			Ok: function() {
			  $( this ).dialog( "close" );
			}
		  }
		});
}

function addFromMessage(msg, addr, time) {
    $('.container[name="' + addr + '"]').append('<div class="text-left" title="'+time+'"><p class="white-shadow">' + msg + '</p></div>');
}

function addToMessage(msg, addr, time) {
    $('.container[name="' + addr + '"]').append('<div class="text-right" title="'+time+'"><p class="white-shadow">' + msg + '</p></div>');
}

function addContainer(addr, name) {
    if ($.trim(name) == "") name = addr;
    $('#SMSHolder').append('<div class="container" name="' + addr + '" style="display:none;"><H3 class="ui-state-error">' + name + '</H3></div>');
}