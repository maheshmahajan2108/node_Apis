
$(document).ready(function () {



    $(document).on('focus', '.comments', function () {
        console.log("here")
        const value = $(this).html();
        let commentPlaceholder = $(this).attr("data-placeholder")
        console.log("now here", value)
        if (value === commentPlaceholder)
            value === commentPlaceholder && ($(this).html(''));
    })

    $(document).on('blur', '.comments', function () {
        const value = $(this).html();
        let commentPlaceholder = $(this).attr("data-placeholder")
        value === '' && ($(this).html(commentPlaceholder));
    })


    //Mapped charges placeholder
    $(document).on('focus', '.mappedCharges', function () {
        console.log("here")
        const value = $(this).html();
        let mapppedChargesPlaceholder = $(this).attr("data-placeholder")
        console.log("now here", value)
        if (value === mapppedChargesPlaceholder)
            value === mapppedChargesPlaceholder && ($(this).html(''));
    })

    $(document).on('blur', '.mappedCharges', function () {
        const value = $(this).html();
        let mapppedChargesPlaceholder = $(this).attr("data-placeholder")
        value === '' && ($(this).html(mapppedChargesPlaceholder));
    })





    //provider last placeholder
    $(document).on('focus', '.provideLastName', function () {
        console.log("here")
        const value = $(this).html();
        let provideLastNamePlaceholder = $(this).attr("data-placeholder")
        console.log("now here", value)
        if (value === provideLastNamePlaceholder)
            value === provideLastNamePlaceholder && ($(this).html(''));
    })

    $(document).on('blur', '.provideLastName', function () {
        const value = $(this).html();
        let provideLastNamePlaceholder = $(this).attr("data-placeholder")
        value === '' && ($(this).html(provideLastNamePlaceholder));
    })



    //provider first name placeholder
    $(document).on('focus', '.providerFirstName', function () {
        console.log("here")
        const value = $(this).html();
        let providerFirstNamePlaceholder = $(this).attr("data-placeholder")
        console.log("now here", value)
        if (value === providerFirstNamePlaceholder)
            value === providerFirstNamePlaceholder && ($(this).html(''));
    })

    $(document).on('blur', '.providerFirstName', function () {
        const value = $(this).html();
        let providerFirstNamePlaceholder = $(this).attr("data-placeholder")
        value === '' && ($(this).html(providerFirstNamePlaceholder));
    })


    /*
We want to preview images, so we need to register the Image Preview plugin
*/
FilePond.registerPlugin(
	
	// encodes the file as base64 data
  FilePondPluginFileEncode,
	
	// validates the size of the file
	FilePondPluginFileValidateSize,
	
	// corrects mobile image orientation
	FilePondPluginImageExifOrientation,
	
	// previews dropped images
  FilePondPluginImagePreview
);

// Select the file input and use create() to turn it into a pond
FilePond.create(
	document.querySelector('input')
);
})

