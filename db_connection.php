<?php
// Функция выполняет подключение к базе данных
function db_connection($query)
{
    $dbc = mysqli_connect("localhost", "root", "", "TRLogicLLC") or fail("Cloud not connect to database");
    return mysqli_query($dbc, $query);
}
// Ответ json (успех)
function success($message)
{
    die(json_encode(array('status' => 'success', 'message' => $message)));
}
// Ответ json (неудача)
function fail($message)
{
    die(json_encode(array('status' => 'fail', 'message' => $message)));
}
// Защита базы данных
function myprotect($data)
{
    return htmlspecialchars(trim($data));
}
?>

