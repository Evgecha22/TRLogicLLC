<?php
session_start();
require_once("db_connection.php");
// Вывод данных пользователя с БД
if (isset($_SESSION['id'])) {
    $query = "select first_name,last_name,birthday,phone from register where id=" . $_SESSION['id'];
    $result = db_connection($query);
    $next = mysqli_fetch_array($result, MYSQLI_ASSOC);
    $out_user = array("first_name" => $next['first_name'], "last_name" => $next['last_name'], "birthday" => $next['birthday'], "phone" => $next['phone']);
    echo json_encode($out_user);
    exit;
} else {
    fail("404 ERROR");
}
?>