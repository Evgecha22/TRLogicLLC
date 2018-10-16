<?php
session_start();
// Создание капчи
define("CAP_NUM_CHAR", 4);
define("CAP_WIDTH", 100);
define("CAP_HEIG", 30);
$fraza = "";
for ($i = 0; $i < CAP_NUM_CHAR; $i++) {
    $fraza = $fraza . chr(rand(97, 122));
}
$_SESSION['fraza'] = $fraza;
$img = imagecreatetruecolor(CAP_WIDTH, CAP_HEIG);
$fon_color = imagecolorallocate($img, 46, 55, 64);
$text_color = imagecolorallocate($img, 111, 115, 119);
$gr_color = imagecolorallocate($img, 46, 55, 60);
imagefilledrectangle($img, 0, 0, CAP_WIDTH, CAP_HEIG, $fon_color);
for ($i = 0; $i < 5; $i++) {
    imagesetthickness($img, 1);
    imageline($img, 0, rand() % CAP_HEIG, CAP_WIDTH, rand() % CAP_HEIG, $gr_color);
}
for ($i = 0; $i < 50; $i++) {
    imagesetpixel($img, rand() % CAP_WIDTH, rand() % CAP_HEIG, $gr_color);
}
imagettftext($img, 20, 0, 10, CAP_HEIG - 5, $text_color, realpath("./a_Albionic.ttf"), $fraza);
header("content-type:image/png");
imagepng($img);
imagedestroy($img);
?>