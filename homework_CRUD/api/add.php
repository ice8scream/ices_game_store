<?php

    echo empty($_POST);

    $title = $_POST['title'];
    $platformJSON = $_POST['platform'];
    $price = intval($_POST['price']);

    header('Content-type: application/json');
    
    if (!$title || !$platformJSON || (!$price && $price !== 0 )) {
        header('HTTP/1.1 404 Not Found');
        echo json_encode([
            'status' => 'incorrect request'
        ]);
        
        exit();
    }

    $platform = json_decode($platformJSON);

    $databaseJson = file_get_contents('database.json');
    $database = json_decode($databaseJson);
// изменил гет/сет id-шника
    $id = json_decode(file_get_contents('lastGameId.json'));
    $id++;

    array_push($database, [
        'id' => $id,
        'title' => $title,
        'platform' => $platform,
        'price' => $price,
        'votes' => 0,
        'raiting' => 0
    ]);
    
    file_put_contents('lastGameId.json', json_encode($id));
    
    file_put_contents('database.json', json_encode($database));

    echo json_encode([
        'status' => 'ok'
    ]);
