<?php
   $sharedMemoryFile = "sharedMemory.txt";


   if (isset($_POST["data"])) {
   
       // write data to the file (shared memory)
       // file should be deleted once read
       if (file_put_contents($sharedMemoryFile, $_POST["data"])) {
           echo $_POST["data"];
       } 
       else {
           echo "data couldn't be saved to the shared memory";
       }
   }
?>