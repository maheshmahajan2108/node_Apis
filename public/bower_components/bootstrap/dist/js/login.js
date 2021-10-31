var LogIPAddress = "";
$(document).ready(function () {
    $("#txtpassword").change(function () {
        if ($('#txtpassword').val().toString().trim() != "") {
            $('#txtpassword').addClass('has-val');
        }
    });


    $.getJSON("https://jsonip.com/?callback=?", function (data) {
        LogIPAddress = data.ip;
    });
    var login = "0";
    $.post("ReportData.ashx?getmode=CheckLoggedIn", { login: login }, function (data) {
        // var data = JSON.parse(data);
        //data = JSON.parse(data);
        if (data[0].user != "") {
            $(location).attr('href', data[0].homeurl.toString());
        }
        else {

        }
    });

    $("#loginform").submit(function (event) {
        //if (LoginValidation()) {
        //    check_login($('#txtusername').val().toString().trim(), $('#txtpassword').val().toString().trim(), jQuery("#hidden-grecaptcha").val())
        //}
        event.preventDefault();
    });
});

function Login_Click() {
    if (Login_Validation()) {
        check_login($('#txtusername').val().toString().trim(), $('#txtpassword').val().toString().trim())
    }
}

function Login_Validation() {

    var P_result = true;
    var P_Error = "";
    $('#div_msg').hide();
    if ($('#txtusername').val().toString().trim() == '') {
        P_Error += 'Please enter username';
        P_result = false;
    }
    else {
        $('#txtusername').css('border', 'none');
        $('#txtusername').css('border', '');
    }

    if ($('#txtpassword').val().toString().trim() == '') {
        P_Error += '<br>Please enter password';
        P_result = false;
    }
    else {
        $('#txtpassword').css('border', 'none');
        $('#txtpassword').css('border', '');
    }

    if (P_Error != "")
        $.confirm({
            title: 'Validation!',
            content: P_Error,
            buttons: {
                Ok: function () {

                }
            }
        });
    return P_result;
}
function b64EncodeUnicode(str) {
    return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, function (match, p1) {
        return String.fromCharCode('0x' + p1);
    }));
}
function check_login(unm, pwd) {
    try {


            var qrystring = '';
            showLoading()
            qrystring = "/authenticate"
            var p_ipaddress = LogIPAddress;
            var p_url = "";//location.href
            var Password_string = "";
            
              //  Password_string = pwd;
            
              Password_string = sha256(pwd);
            
           
            //b64EncodeUnicode(b64EncodeUnicode(b64EncodeUnicode(pwd)))
            var DeviceInformation = { "deviceToken": createToken() };
            $.post(qrystring, {
                username: unm, password: Password_string, ipaddress: p_ipaddress, url: p_url, ismobile: (IsMobileBroser()), DeviceInformation: DeviceInformation, browsertype: Isbrowsertype()
            }, function (data) {
               ClearLocalStorage(); //Added Changes by Arpit on 11-04-2020

                try {
                    //var data = JSON.parse(data);
                    //var data = JSON.parse(data);
                    data = data.data
                    hideLoading()
                    if (data[0].result.toString().toLowerCase().trim() == "1") {
 try{
                            var P_user = "";
                            if (data[0].firstname != undefined) {
                                P_user = (data[0].firstname + " " + data[0].lastname).toString().toUpperCase();
                            }   
                            ActivityLog += P_user + " Logged in";
                            GanrateLog(ActivityLog);
                        }catch(ex)
                        {
                        }

if (IsMobileBroser()) {
                                $(location).attr('href', "/"); //Added Changes by Arpit on 12-08-2020
                            } else {
                                $(location).attr('href', "/");
                            }                       

 //$(location).attr('href', data[0].homeurl.toString());
                    }
                    else {

                        if (data[0].errormessage.toString() != "")
                        {
                            ErrorMsg = data[0].errormessage.toString();
                            
                        }

                        if (data[0].userattempts.toString().toLowerCase().trim() >= 1 && data[0].userattempts.toString().toLowerCase().trim() <= 2 || (data[0].ipattempts.toString().toLowerCase().trim() >= 1 && data[0].ipattempts.toString().toLowerCase().trim() <= 4))
                        {
                            //$('#divrecaptcha')[0].style.display = 'block';
                           
                            
                            var ErrorMsg = "";

                            if (data[0].userattempts.toString().toLowerCase().trim() != 0)
                                ErrorMsg = 'After ' + (3 - data[0].userattempts.toString().toLowerCase().trim()) + ' attempt of worng password your account will block';
                            else
                                ErrorMsg = 'After ' + (5 - data[0].ipattempts.toString().toLowerCase().trim()) + ' attempt of wrong user name your ip will block';
                            
                            grecaptcha.reload();
                            //$('#divrecaptcha').show();

                        }
                           
                        else {
                            //$('#divrecaptcha')[0].style.display = 'none';
                            grecaptcha.reset();

                        }
                        if (ErrorMsg != "") {
                            $.alert({
                                title: 'Information!',
                                content: ErrorMsg,
                                buttons: {
                                    cancelAction: {
                                        text: 'OK',
                                        action: function () {

                                        }
                                    }
                                }
                            });
                        }
                        $('#span_msg').html(data[0].Error);
                        $('#form_username').css('border', 'none');
                        $('#form_password').css('border', 'none');
                        $('#div_msg').show();
                        $('#divpopup').fadeOut(350);
                    }
                }
                catch (e) {
                    $.alert({
                        title: 'Information!',
                        content: e.message,
                        buttons: {
                            cancelAction: {
                                text: 'OK',
                                action: function () {

                                }
                            }
                        }
                    });
                }
                grecaptcha.reset();
            }).fail(function (e) {
                grecaptcha.reset();
                if (true) {
                    $.alert({
                        title: 'Information!',
                        content: e.message,
                        buttons: {
                            cancelAction: {
                                text: 'OK',
                                action: function () {

                                }
                            }
                        }
                    });
                }
            });
        
       

    }
    catch (e) {

    }
}

function debounce(func, wait, immediate) {
    var timeout;
    return function () {
        var context = this, args = arguments;
        var later = function () {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        var callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
};
function recaptchaCallback() {
    //grecaptcha.render("recaptcha", {
    //    'sitekey': '6LeBQroZAAAAAI3FFOM6Nl8o1mvXmFMIujsvHWMZ',
    //});

    //var response = grecaptcha.getResponse(),
	//	$button = jQuery(".button-register");
    //jQuery("#hidden-grecaptcha").val(response);
}
function recaptchaExpired() {
    //var $button = jQuery(".button-register");
    //jQuery("#hidden-grecaptcha").val("");
}
function submitRegister() {
    //ajax stuff
}
function hideLoading() {
    $('body').removeClass("loading");
}
function showLoading() {
    $('body').addClass("loading");
}
function IsMobileBroser() {
    var Browser = navigator.userAgent.match(/Mozilla/i) != null; var iPadAgent = navigator.userAgent.match(/iPad/i) != null;
    var iPodAgent = navigator.userAgent.match(/iPhone/i) != null; var AndroidAgent = navigator.userAgent.match(/Android/i) != null;
    var webOSAgent = navigator.userAgent.match(/webOS/i) != null;
    if (AndroidAgent + iPadAgent + iPodAgent) {
        Browser = 1;
    }
    else
        Browser = 0;

    return Browser;
}

function createToken() {
    function S4() {
        return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    }
    return (S4() + S4() + "-" + S4() + "-4" + S4().substr(0, 3) + "-" + S4() + "-" + S4() + S4() + S4()).toLowerCase();
}
function ClearLocalStorage() {
    localStorage.removeItem("DashboardFilter");
    localStorage.removeItem("CurrentPageID");
    localStorage.removeItem("logActivity");
}

var TOUpdateActivityLog_IsInProgress = false;
function GanrateLog(Log) {
    if (TOUpdateActivityLog_IsInProgress == true)
        return;
    TOUpdateActivityLog_IsInProgress = true;
    try {
        var AjaxData = [{
            "loginuserid": "p_LoginUserId",
            "TokenID": "p_TokenId",
            "Orgid": "p_Orgid",
            "Pagename": document.location.href.match(/[^\/]+$/)[0],
            "PageID": "",
            "Pageloadon": new Date().toISOString(),
            "Action": [{
                "ActionTypeID": 6,
                "Actionvalue": "Login",
                "SubActionTypeID": "-1",
                "SubActionvalue": "",
                "ActionOn": new Date().toISOString(),
                "Description": Log
            }]
        }];
        $.ajax({
            type: "Post",
            url: '../../ReportData.ashx?getmode=setuseractivity&Ran=' + Math.random(),
            data: { "inputJSON": JSON.stringify(AjaxData) }
        }).done(function (data) {
            TOUpdateActivityLog_IsInProgress = false;
        }).fail(function (data) {
            TOUpdateActivityLog_IsInProgress = false;
        });
    } catch (ex) {
        TOUpdateActivityLog_IsInProgress = false;
    }
}
function Isbrowsertype() {
    var P_Result = "0";
    try {
        var standalone = window.navigator.standalone,
         userAgent = window.navigator.userAgent.toLowerCase(),
         safari = /safari/.test(userAgent),
         ios = /iphone|ipod|ipad/.test(userAgent);
        if (ios) {
            if (!standalone && safari) {
                P_Result = "0";
                //P_Result = "Safari";
                // Safari
            } else if (!standalone && !safari) {
                P_Result = "1";
                //P_Result = "IOS webview";
                // iOS webview
            };
        } else {
            if (userAgent.includes('wv')) {
                P_Result = "1";
                //P_Result = "Android webview";
                // Android webview
            } else {
                P_Result = "0";
                //P_Result = "Chrome";
                // Chrome
            }
        };
    } catch (ex) {

    }
    return P_Result;
}

