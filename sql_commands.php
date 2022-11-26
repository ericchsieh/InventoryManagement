<?php
// Referenced from oracle-test.php from the CS department PHP tutorial

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: *');

$db_conn = NULL;

function failureExit() {
    echo json_encode("false"); // will always return false if a command fails
    disconnectFromDB();
    exit();
}

function executePlainSQL($cmdstr) {
    global $db_conn;

    $stid = oci_parse($db_conn, $cmdstr);
    if (!$stid) {
        failureExit();
    }

    $r = oci_execute($stid, OCI_COMMIT_ON_SUCCESS);
    if (!r) {
        failureExit();
    }

    return $stid;
}

function executeBoundSQL($cmdstr, $tuple) {
    global $db_conn;

    $stid = oci_parse($db_conn, $cmdstr);
    if (!$stid) {
        failureExit();
    }

    foreach ($tuple as $key => $val) {
        oci_bind_by_name($stid, $key, $tuple[$key]);
    }

    $r = oci_execute($stid);
    if (!r) {
        failureExit();
    }
    oci_free_statement($stid);
}

function handleGetRequest() {
    global $db_conn;

    $table = $_POST['get'];

    $stid = executePlainSQL("SELECT * FROM " . $table);

    $rows = array();
    while($data = oci_fetch_assoc($stid)) {
        $rows[] = $data;
    }
    $jsonData = json_encode($rows);
    echo $jsonData;
}

function handleGetSoftware() {
    global $db_conn;

    $table = $_POST['get_software'];

    $stid = executePlainSQL("SELECT SL.inv_number, PA.cost, PA.name, PA.model, PA.dept, SL.license_code 
    FROM Purchased_Asset PA, Software_License SL
    WHERE PA.inv_number = SL.inv_number");

    $rows = array();
    while($data = oci_fetch_assoc($stid)) {
        $rows[] = $data;
    }
    $jsonData = json_encode($rows);
    echo $jsonData;
}

function handleGetTickets() {
    global $db_conn;

    $resolved = $_POST['getTickets'];

    $query = "SELECT
        t.ticket_number, t.status, t.date_created, t.date_resolved, m.full_name
    FROM
        Ticket t, Faculty_Member m
    WHERE
        t.submitted_by = m.user_id AND t.status {$resolved} 'Resolved'";

    $stid = executePlainSQL($query);
    
    $rows = array();
    while($data = oci_fetch_assoc($stid)) {
        $rows[] = $data;
    }
    oci_free_statement($stid);
    $jsonData = json_encode($rows);
    echo $jsonData;
}

function handlePurchaseRequest() {
    global $db_conn;

    $tuple = array (
        ":id" => $_POST['catalogue_id'],
        ":name" => $_POST['catalogue_name'],
        ":model" => $_POST['catalogue_model'],
        ":insert_into" => $_POST['catalogue_insert_into'],
        ":cost" => $_POST['catalogue_cost']
    );

    $query = "INSERT INTO 
        Purchased_Asset (inv_number, cost, name, model, dept)
    VALUES
        (:id, :cost, :name, :model, 'Computer Science')";

    executeBoundSQL($query, $tuple);
}

function handleSellAsset() {
    global $db_conn;

    // $tuple = array(
    //     ":id" => $_POST['catalogue_id']
    // );

    $id = $_POST['catalogue_id'];
    
    
    $query = "DELETE FROM
        Purchased_Asset
    WHERE
        inv_number = {$id}";
    
    //echo json_encode($query);

    //executeBoundSQL($query, $tuple);
    executePlainSQL($query);
}

function connectToDB() {
    global $db_conn;

    $db_conn = oci_connect("ora_ndsz", "a22451884", "dbhost.students.cs.ubc.ca:1522/stu");

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

function handleRequest() {
    if (connectToDB()) {
        if (isset($_POST['get'])) {
            handleGetRequest();
        } 
        if (isset($_POST['get_software'])) {
            handleGetSoftware();
        } 
        if (isset($_POST['getTickets'])) {
            handleGetTickets();
        }
        if (isset($_POST['sell_asset'])) {
            handleSellAsset();
        } else { 
            handlePurchaseRequest();
        } 
        disconnectFromDB();
    }    
}

handleRequest();
?>