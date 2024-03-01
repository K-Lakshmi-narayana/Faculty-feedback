<?php
    $conn = mysqli_connect("localhost", "root", "", "student");
    if (!$conn) {
        die("Connection failed: " . mysqli_connect_error());
    }
    $email = $_POST['email'];
    $uname = $_POST['uname'];
    $pass = $_POST['pass'];
    $id = substr($email, 0, 7);
    $query = 'select * from student_details where id="'.$id.'";';
    $uq = 'select * from student_details where uname="'.$uname.'";';

    $res = mysqli_query($conn, $query);
    $ures = mysqli_query($conn, $uq);

    if(mysqli_num_rows($res) > 0){
        echo "Account already exists!";
    }else if (mysqli_num_rows($ures) > 0) {
        echo "Username must be unique!";
    }
?>
