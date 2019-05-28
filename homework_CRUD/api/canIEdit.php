<?php
    $id = intval($_POST['id']);
    $adminKey = $_POST['key'];
    $lastTime = $_POST['time'];

    $nowEditJson = file_get_contents('nowEdit.json');
    $nowEdit = json_decode($nowEditJson);

    header('Content-type: application/json');
    
    if (!$id || !$adminKey || !$lastTime) {
        header('HTTP/1.1 404 Not Found');
        echo json_encode([
            'status' => 'incorrect request'
        ]);
        exit();
    }

    $found = false;
    for ($i = 0; $i < count($nowEdit); $i++) {
        if($id === intval($nowEdit[$i]->id)){
            if(intval($adminKey) !== intval($nowEdit[$i]->key) ||
                intval($lastTime) - intval($nowEdit[$i]->time) < 1200) {
                    header('HTTP/1.1 404 Not Found');
                    echo json_encode([
                        'status' => 'this game now edit with enother admin'
                    ]);
                    exit();
                }
            $found = true;
            $nowEdit[$i]->key = $adminKey;
            $nowEdit[$i]->time = $lastTime;
        }
    }
    if(!$found) {
        array_push($nowEdit, [
            'id' => $id,
            'key' => $adminKey,
            'time' => $lastTime,
        ]);
    }
    file_put_contents('nowEdit.json', json_encode($nowEdit));
    
    echo json_encode([
        'status' => 'ok'
    ]);
