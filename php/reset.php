<?php

$folder = "../uploaded/";

$files = scandir($folder);

foreach($files as $file){

    if(
        preg_match('/^\d{6}\.(png|json)$/',$file)
    ){

        if($file=="000000.png") continue;

        if($file=="000000.json") continue;

        unlink($folder.$file);

    }

}

file_put_contents(

    $folder."latest.json",

    json_encode([
        "latest"=>0
    ])

);

echo "RESET SUCCESS";

?>