$(function () {
    // Обработка клика по кнопке, вызов функции
    $("#button").on("click", function () {
        log();
    })
});

// Оброботка логина (json)
function log() {
    var log_s = $("#o_form").serializeArray();
    $.post($("#o_form").attr("action"), log_s, function (json) {
        if (json.status == "success") {
            location.href = ("../public/user.html")
        }
        if (json.status == "fail") {
            $("#login,#pass").css("border-bottom", "1px solid red");
            $("#fail").text(json.message);
        }
    }, "json")
}