<?php
session_start();
require_once("db_connection.php");
// Проверка на совпадения логина
if (isset($_GET['mode']) && $_GET['mode'] == "check_login" && !empty($_GET['login'])) {
    $query = "select id from register where login LIKE '" . $_GET['login'] . "'";
    $result = db_connection($query);
    if ($result == false) {
        fail("Ошибка запроса");
    }
    if (mysqli_num_rows($result) > 0) {
        fail(1);
    }
    success(2);
    exit;
}
// Проверка на совпадения емайла
if (isset($_GET['mode']) && $_GET['mode'] == 'check_email' && !empty($_GET['email'])) {
    $query = "select id from register where email LIKE '" . $_GET['email'] . "%'";
    $result = db_connection($query);
    if ($result == false) {
        fail("Ошибка запроса");
    }
    if (mysqli_num_rows($result) > 0) {
        fail(1);
    }
    success(2);
    exit;
}
// Добавление пользователя в БД, проверка капчи, защита БД
if ($_SESSION['fraza'] == mb_strtolower($_POST['captcha'])) {
    if (!empty($_POST['f_name']) && !empty($_POST['l_name']) && !empty($_POST['login']) && !empty($_POST['email']) && !empty($_POST['birthday']) && !empty($_POST['phone']) && !empty($_POST['pass1']) && $_POST['pass1'] == $_POST['pass2']) {
        $query = "insert into register (first_name,last_name,login,email,birthday,phone,pass) value ('" . myprotect($_POST['f_name']) . "','" . myprotect($_POST['l_name']) . "','" . myprotect($_POST['login']) . "','" . myprotect($_POST['email']) . "','" . myprotect($_POST['birthday']) . "','" . myprotect($_POST['phone']) . "',sha1('" . myprotect($_POST['pass1']) . "'))";
        $result = db_connection($query);
        if ($result) {
            success("Вы успешно зарегистрированы");
        } else {
            fail("Ошибка запроса");
        }
        exit;
    } else {
        fail("Незаполненные обязательные поля");
    }
} else {
    fail("Неверно введена капча");
}
?>