<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header('Content-Type: application/json');

require "dbh.php"; // Connect to the database

// Get the raw POST data as a string
$json_data = file_get_contents("php://input");

// Decode the JSON data into an associative array
$request_data = json_decode($json_data, true); 

// Check if 'adminId' and 'password' keys exist in $request_data
if (isset($request_data['adminId']) && isset($request_data['password'])) {
    // Get the adminId and password from the decoded JSON data
    $adminId = $request_data['adminId'];
    $password = $request_data['password'];

    // Query to check login credentials using prepared statements
    $sql = "SELECT * FROM admin WHERE adminId = :adminId AND password = :password";
    $stmt = $conn->prepare($sql); 
    $stmt->bindParam(':adminId', $adminId, PDO::PARAM_STR);
    $stmt->bindParam(':password', $password, PDO::PARAM_STR);
    $stmt->execute();

    // Check if login credentials are valid
    if ($stmt->rowCount() > 0) {
        $response['status'] = "success";
        $response['message'] = "Login successful!";
    } else {
        $response['status'] = "error";
        $response['message'] = "Invalid admin ID or password";
    }

    // Close the prepared statement
    $stmt->closeCursor();
} else {
    // Handle the case where 'adminId' or 'password' is missing
    $response['status'] = "error";
    $response['message'] = "Invalid request data";
}

// Close the database connection
$conn = null;

// Respond with JSON
echo json_encode($response);
?>
