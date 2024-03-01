<?php
    $conn = mysqli_connect("localhost", "root", "", "student");
    if (!$conn) {
        die("Connection failed: " . mysqli_connect_error());
    }
    $email = $_POST['email'];
    $uname = $_POST['uname'];
    $pass = $_POST['pass'];
    $id = substr($email, 0, 7);

    $q = 'insert into student_details values("'.$id.'","'.$uname.'","'.$pass.'");';
    mysqli_query($conn, $q);
?>