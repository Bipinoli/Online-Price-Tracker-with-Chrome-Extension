<?php

header('Content-Type: text/event-stream');
header('Cache-Control: no-cache');
header('Connection: keep-alive\n\n');

function sendUpdateToClient($msg) {
    echo "data: {$msg}\n\n";
    ob_flush(); // php to apache
    flush(); // apache to browser
}

// without Connection: keep-alive
// after some time the connection to the client will be dropped
// but client like Google chrome
// will reinitiate the the connection again in 3 seconds


// well it turned out
// that the instance of this php file for client 
// and the one post requesting here
// lies in different thread/instances
// that way the post data will not be accessible 
// to the client

// one workaround to this is
// to use a shared memory (eg. global database)



$sharedMemoryFile = "sharedMemory.txt";


// continuously check for the update in the shared memory
while (true) {
    sleep(1);
    if (file_exists($sharedMemoryFile)) {
        // read the file 
        $data = file_get_contents($sharedMemoryFile);
        // delete the file
        // since the update has been handled
        unlink($sharedMemoryFile);
        sendUpdateToClient($data);
    }
    else {
        sendUpdateToClient("no events in server");   
    }
}



?>