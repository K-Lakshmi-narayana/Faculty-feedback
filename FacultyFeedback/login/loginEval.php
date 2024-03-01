<?php
    $conn = mysqli_connect("localhost", "root", "", "student");
    if (!$conn) {
        die("Connection failed: " . mysqli_connect_error());
    }
    $uname = $_POST['uname'];
    $pass = $_POST['pass'];
    $uq = 'select * from student_details where uname="'.$uname.'";';

    $ures = mysqli_query($conn, $uq);

    if (mysqli_num_rows($ures) == 0) {
        echo "Username doesn't exists!";
    }
    else{
        $q = 'select pass from student_details where uname="'.$uname.'";';
        $r = mysqli_query($conn, $q);
        if ($pass != mysqli_fetch_array($r)['pass']){
            echo "Invalid Password!";
        }
    }
?>