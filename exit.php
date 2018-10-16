<?php
// Защита пользователя SC
if (isset($_COOKIE['id'])) {
    setcookie("id", "", time() - 60 * 60 * 2);
}
if (isset($_COOKIE['name'])) {
    setcookie("name", "", time() - 60 * 60 * 2);
}
session_start();
if (isset($_COOKIE[session_name()])) {
    setcookie(session_name(), "", time() - 7200);
}
$_SESSION = array();
session_destroy();
header("location: public/login.html");
?>