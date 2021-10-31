function handlePasteOTP(e) {
	var clipboardData = e.clipboardData || window.clipboardData ||     e.originalEvent.clipboardData;
	var pastedData = clipboardData.getData('Text');
	var arrayOfText = pastedData.toString().split('');
	/* for number only */
	if (isNaN(parseInt(pastedData, 10))) {
		e.preventDefault();
		return;
	}
	for (var i = 0; i < arrayOfText.length; i++) { 
		if (i >= 0) {
			document.getElementById('otp-number-input-' + (i + 1)).value = arrayOfText[i];
		} else {
			return;
		}
	}
	e.preventDefault();
}

$(document).ready(function() {
	$('.otp-event').each(function(){
	 var $input = $(this).find('.otp-number-input');
	 var $submit = $(this).find('.otp-submit');
	 $input.keydown(function(ev) {
		otp_val = $(this).val();
		if (ev.keyCode == 37) {
			$(this).prev().focus();
			ev.preventDefault();
		} else if (ev.keyCode == 39) {
			$(this).next().focus();
			ev.preventDefault();
		} else if (otp_val.length == 1 && ev.keyCode != 8 && ev.keyCode != 46) {
			otp_next_number = $(this).next();
			if (otp_next_number.length == 1 && otp_next_number.val().length == 0) {
				otp_next_number.focus();
			}
		} else if (otp_val.length == 0 && ev.keyCode == 8) {
			$(this).prev().val("");
			$(this).prev().focus();
		} else if (otp_val.length == 1 && ev.keyCode == 8) {
			$(this).val("");
		} else if (otp_val.length == 0 && ev.keyCode == 46) {
			next_input = $(this).next();
			next_input.val("");
			while (next_input.next().length > 0) {
				next_input.val(next_input.next().val());
				next_input = next_input.next();
				if (next_input.next().length == 0) {
					next_input.val("");
					break;
				}
			}
		}
		
	}).focus(function() {
		$(this).select();
		var otp_val = $(this).prev().val();
		if (otp_val === "") {
			$(this).prev().focus(); 
		}else if($(this).next().val()){
			 $(this).next().focus();  
		}
	}).keyup(function(ev) {
		otpCodeTemp = "";
		$input.each(function(i) {
			if ($(this).val().length != 0) {
				$(this).addClass('otp-filled-active');
			} else {
				$(this).removeClass('otp-filled-active');
			}
			otpCodeTemp += $(this).val();
		});
		if ($(this).val().length == 1 && ev.keyCode != 37 && ev.keyCode != 39) {
			$(this).next().focus();
			ev.preventDefault(); 
		}
		$input.each(function(i) {
		 if($(this).val() != ''){
			$submit.prop('disabled', false); 
		 }else{
			$submit.prop('disabled', true);
	 	 }
		});
		 
	});
	$input.on("paste", function(e) { 
		window.handlePasteOTP(e);
	});
	});
	
});