<?php
session_start();
require_once("db_connection.php");
// Вывод данных пользователя с БД, проверка на совпадения полей
if (!empty($_POST['login']) && !empty($_POST['pass'])) {
    $query = "select id,first_name from register where login='" . $_POST['login'] . "' and pass=sha1('" . $_POST['pass'] . "')";
    $result = db_connection($query);
    if (mysqli_num_rows($result) == 1) {
        $next = mysqli_fetch_array($result, MYSQLI_ASSOC);
        setcookie("id", $next['id'], time() + 60 * 60 * 24 * 30);
        setcookie("name", $next['first_name'], time() + 60 * 60 * 24 * 30);
        $_SESSION['id'] = $next['id'];
        $_SESSION['name'] = $next['first_name'];
        success("yes");
    } else {
        fail("Неверный логин или пароль");
    }
} else {
    fail("Недостаточно данных для входа");
}
?>