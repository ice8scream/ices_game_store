<?php
    $id = intval($_POST['id']);
    $title = $_POST['title'];
    $platformJSON = $_POST['platform'];
    $price = intval($_POST['price']);
    $key = intval($_POST['key']);

    
    


    header('Content-type: application/json');

    if (!$id || !($title || $platformJSON || $price && $price !== 0 || $key)) {
        header('HTTP/1.1 404 Not Found');
        echo json_encode([
            'status' => 'incorrect request'
        ]);
        exit();
    }

    //----------------------------------------------------
    $nowEditJson = file_get_contents('nowEdit.json');
    $nowEdit = json_decode($nowEditJson);
    

    for ($i = 0; $i < count($nowEdit); $i++) {
        if ($id === intval($nowEdit[$i]->id)) {
            if(intval($key) !== intval($nowEdit[$i]->key) ) {
                header('HTTP/1.1 404 Not Found');
                echo json_encode([
                    'status' => 'this game now edit with enother admin'
                ]);
                exit();
            }
        }
    }
    //-------------------------------------

    $databaseJson = file_get_contents('database.json');
    $database = json_decode($databaseJson);

    $found = false;

    for ($i = 0; $i < count($database); $i++) {
        if ($id === intval($database[$i]->id)) {
            $found = true;
            if ($title) {
                $database[$i]->title = $title;
            }
            if ($platformJSON) {
                $platform = json_decode($platformJSON);
                $database[$i]->platform = $platform;
            }
            if ($price || $price === 0) {
                $database[$i]->price = $price;
            }
        }
    }

    if (!$found) {
        header('HTTP/1.1 404 Not Found');
        echo json_encode([
            'status' => 'game not found'
        ]);
        exit();
    }

    $result = [];
    $found = false;
    for ($i = 0; $i < count($nowEdit); $i++) {
        if ($id === intval($nowEdit[$i]->id)) {
            $found = true;
            continue;
        }
        array_push($result, $nowEdit[$i]);
    }

    file_put_contents('nowEdit.json', json_encode($result));
    file_put_contents('database.json', json_encode($database));

    echo json_encode([
        'status' => 'ok'
    ]);
