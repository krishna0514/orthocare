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

// Function to fetch patient image URI by ID
function fetchPatientImage($conn, $patientId) {
    // Escape the patientId to prevent SQL injection
    $patientId = $conn->real_escape_string($patientId);

    $sql = "SELECT image FROM patients3 WHERE patientId = '$patientId'";
    $result = $conn->query($sql);

    if ($result && $result->num_rows > 0) {
        // Output data of the first row
        $row = $result->fetch_assoc();
        return $row['image'] ? 'http://192.168.198.82/demo/' . $row['image'] : null; // Replace 'http://your_domain/' with the actual URL to your images
    } else {
        return null;
    }
}

// Check if patientId is provided in the request
if (isset($_GET['patientId'])) {
    $patientId = $_GET['patientId'];
    $imageUri = fetchPatientImage($conn, $patientId);

    if ($imageUri) {
        // Output image URI
        header('Content-Type: application/json');
        echo json_encode(array('image' => $imageUri));
    } else {
        echo "Image not found for the patient";
    }
} else {
    echo "Patient ID is not provided";
}

// Close connection
$conn->close();
?>
