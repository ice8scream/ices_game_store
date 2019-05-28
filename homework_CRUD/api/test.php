<?php

$date = new DateTime();
$date2 = new DateTime('2019-05-13');
echo ($date->getTimestamp() - $date2->getTimestamp()) / 3600 . '<br>';
echo (($date->getTimestamp() - $date2->getTimestamp()) / 60) % 60;
