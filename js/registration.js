$(function () {
    // Выполнение регулярных выражений
    $("#f_name").on("blur", function () {
        if (check_name($("#f_name").val())) {
            $("#f_name").css("border-bottom", "1px solid #4f6072");
        } else {
            $("#f_name").css("border-bottom", "1px solid red");
        }
    });
    $("#l_name").on("blur", function () {
        if (check_name($("#l_name").val())) {
            $("#l_name").css("border-bottom", "1px solid #4f6072");
        } else {
            $("#l_name").css("border-bottom", "1px solid red");
        }
    });
    $("#login").on("blur", function () {
        check_login($("#login").val());
    });
    $("#email").on("blur", function () {
        check_email($("#email").val());
    });
    $("#birthday").on("blur change", function () {
        check_birthday($("#birthday").val());
    });
    $("#phone").on("blur", function () {
        if (check_phone($("#phone").val())) {
            $("#phone").css("border-bottom", "1px solid #4f6072");
        } else {
            $("#phone").css("border-bottom", "1px solid red");
        }
    });
    $("#pass1").on("blur", function () {
        if (check_pass1($("#pass1").val())) {
            $("#pass1").css("border-bottom", "1px solid #4f6072");
        } else {
            $("#pass1").css("border-bottom", "1px solid red");
        }
        if (check_pass2($("#pass2").val())) {
            $("#pass2").css("border-bottom", "1px solid #4f6072");
        } else {
            $("#pass2").css("border-bottom", "1px solid red");
        }
    });
    $("#pass2").on("blur", function () {
        if (check_pass2($("#pass2").val())) {
            $("#pass2").css("border-bottom", "1px solid #4f6072");
        } else {
            $("#pass2").css("border-bottom", "1px solid red");
        }
    });

    // jQveryUi
    $("#birthday").datepicker({
        regional: "ru",
        yearRange: "1901:2050",
        changeMonth: true,
        changeYear: true
    });
    $("#f_name,#l_name,#login,#email,#phone,#pass1,#pass2").tooltip();

    // Обработка клика по кнопке, вызов функций на выполнения регистрации
    $("#button").on("click", function () {
        register();
    })
});

// Проверка на регулярное выражение
function check_name(name) {
    var result = false;
    var regexp = /^[A-zА-я]{1,50}$/;
    result = name.match(regexp);
    if (result != null) {
        result = true;
    }
    return result;
};

function check_login(login) {
    var result = false;
    var regexp = /^[A-z0-9]{6,16}$/;
    result = login.match(regexp);
    if (result != null) {
        $.getJSON('../registration.php?mode=check_login&login=' + login, function (json) {
            if (json.status == "fail") {
                if (json.message == 1) {
                    $("#login").css("border-bottom", "1px solid red");
                } else {
                    alert(json.message);
                }
                result = false;
            }
            if (json.status == "success" && json.message == 2) {
                $("#login").css("border-bottom", "1px solid #4f6072");
                result = true;
            }
        })
    } else {
        $("#login").css("border-bottom", "1px solid red");
    }
    return result;
};

function check_email(email) {
    var result = false;
    var regexp = /^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/;
    result = email.match(regexp);
    if (result != null) {
        $.getJSON('../registration.php?mode=check_email&email=' + email, function (json) {
            if (json.status == "fail") {
                if (json.message == 1) {
                    $("#email").css("border-bottom", "1px solid red");
                } else {
                    alert(json.message);
                }
                result = false;
            }
            if (json.status == "success" && json.message == 2) {
                $("#email").css("border-bottom", "1px solid #4f6072");
                result = true;
            }
        })
    } else {
        $("#email").css("border-bottom", "1px solid red");
    }
    return result;
};

function check_birthday(birthday) {
    if (birthday == "" || birthday == null) {
        $("#birthday").css("border-bottom", "1px solid red");
    } else {
        $("#birthday").css("border-bottom", "1px solid #4f6072");
    }
}

function check_phone(phone) {
    var result = false;
    var regexp = /^\+380\d{3}\d{2}\d{2}\d{2}$/;
    result = phone.match(regexp);
    if (result != null) {
        result = true;
    }
    return result;
};

function check_pass1(pass1) {
    var result = false;
    var regexp = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&*]{8,}$/;
    result = pass1.match(regexp);
    if (result != null) {
        result = true;
    }
    return result;
};

function check_pass2(pass2) {
    var result = false;
    var regexp = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&*]{8,}$/;
    result = pass2.match(regexp);
    if (result != null && pass2 == $("#pass1").val()) {
        result = true;
    } else {
        result = false;
    }
    return result;
};

// Обработка регистрации (json)
function register() {
    var register_s = $("#r_form").serializeArray();
    $.post($("#r_form").attr("action"), register_s, function (json) {
        if (json.status == "success") {
            $("#error").text(json.message).css("color", "green");
            setTimeout(function () {
                location.href = ("../public/login.html")
            }, 1000);
        }
        if (json.status == "fail") {
            $("#error").text(json.message);
        }
    }, "json")
}