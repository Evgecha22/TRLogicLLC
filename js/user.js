$(function () {
    // Передача данных через json
    $.getJSON("../user.php", function (json) {
        $("#f_name").text(json.first_name);
        $("#l_name").text(json.last_name);
        $("#birthday").text(json.birthday);
        $("#phone").text(json.phone);
        if (json.status == "fail") {
            $("#u_main").hide();
            $("#ERORR").text("404 ERROR");
        }
    })
});