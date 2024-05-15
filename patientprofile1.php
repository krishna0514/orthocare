<?php
// Database connection parameters
$servername = "localhost";
$username = "root";
$password = "";
$database = "sample";

// Create connection
$conn = new mysqli($servername, $username, $password, $database);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Function to fetch patient details by ID
function fetchPatientDetails($conn, $patientId) {
    // Escape the patientId to prevent SQL injection
    $patientId = $conn->real_escape_string($patientId);

    $sql = "SELECT name, contactNo, gender, age, height, weight, patientCase, admittedOn, rbs, password, confirmPassword, image FROM patients3 WHERE patientId = '$patientId'";
    $result = $conn->query($sql);

    if ($result && $result->num_rows > 0) {
        // Output data of the first row
        $row = $result->fetch_assoc();
        return $row;
    } else {
        return null;
    }
}

// Check if patientId is provided in the request
if (isset($_GET['patientId'])) {
    $patientId = $_GET['patientId'];
    $patientDetails = fetchPatientDetails($conn, $patientId);

    if ($patientDetails) {
        // Add image URI to patient details
        $patientDetails['imageUri'] = 'http://192.168.198.82/demo/' . $patientDetails['image']; // Replace 'http://your_domain/' with the actual URL to your images

        // Output JSON response
        header('Content-Type: application/json');
        echo json_encode($patientDetails);
    } else {
        echo "Patient not found";
    }
} else {
    echo "Patient ID is not provided";
}

// Close connection
$conn->close();
?>
