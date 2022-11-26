<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: *');
$db_conn = NULL;

function connectToDB() {
    global $db_conn;
    global $login_request;

    $db_conn = oci_connect($login_request->uname, $login_request->pword, "dbhost.students.cs.ubc.ca:1522/stu");

    if ($db_conn) {
        return true;
    } else {        
        return false;
    }    
}

function disconnectFromDB() {
    global $db_conn;

    oci_close($db_conn);
}

function handleLogin() {    
    global $login_request;
    $login_request->uname = $_POST["uname"];
    $login_request->pword = $_POST["pword"];
    $login_request->authenticated = connectToDB();
    disconnectFromDB();
    $myJSON = json_encode($login_request);
    echo $myJSON;
    exit();
}

if (isset($_POST["uname"]) || isset($_POST["pword"])) {
    handleLogin();
}
?>