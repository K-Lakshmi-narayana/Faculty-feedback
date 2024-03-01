<?php
    $conn = mysqli_connect("localhost", "root", "", "student");
    if (!$conn) {
        die("Connection failed: " . mysqli_connect_error());
    }
    $fac = $_POST['fac'];
    $rat = $_POST['rat'];
    $op = $_POST['op'];
    $un = $_POST['uname'];

    $q = 'insert into feedback values("'.$un.'","'.$fac.'","'.$rat.'","'.$op.'");';
    
    mysqli_query($conn, $q);
?>