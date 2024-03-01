<?php
    $conn = mysqli_connect("localhost", "root", "", "student");
    if (!$conn) {
        die("Connection failed: " . mysqli_connect_error());
    }
    $fac = $_POST['fac'];

    $q = 'select * from feedback where faculty_name = "'.$fac.'";';
    
    $res = mysqli_query($conn, $q);
    
    if(mysqli_num_rows($res) > 0){
        while ($row = mysqli_fetch_array($res)){
            echo $row["rating"]."+", $row["opinion"]."-";
        }
    }
?>