<?php
$secretword = $_POST['w'];
$remotehost = $_SERVER["REMOTE_ADDR"];
print $secretword .'<br>'. $remotehost;


