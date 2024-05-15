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

// Function to fetch doctor details (name and image URI) by doctorId
function fetchDoctorDetailsById($conn, $doctorId) {
    // Escape the doctorId to prevent SQL injection
    $doctorId = $conn->real_escape_string($doctorId);

    // Fetch doctor details based on doctorId
    $sql = "SELECT name, image FROM doctors WHERE doctorId = '$doctorId'";
    $result = $conn->query($sql);

    if ($result && $result->num_rows > 0) {
        // Output data of the first row
        $row = $result->fetch_assoc();
        return array(
            'name' => $row['name'],
            'image' => $row['image'] ? 'http://192.168.122.82/demo/' . $row['image'] : null // Replace 'http://your_domain/' with the actual URL to your images
        );
    } else {
        return null;
    }
}

// Check if doctorId is provided in the request
if (isset($_GET['doctorId'])) {
    $doctorId = $_GET['doctorId'];
    $doctorDetails = fetchDoctorDetailsById($conn, $doctorId);

    if ($doctorDetails) {
        // Output doctor details (name and image URI)
        header('Content-Type: application/json');
        echo json_encode($doctorDetails);
    } else {
        echo "Doctor details not found for the provided ID";
    }
} else {
    echo "Doctor ID is not provided";
}

// Close connection
$conn->close();
?>
