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

// Function to fetch doctor details by ID
function fetchDoctorDetails($conn, $doctorId) {
    $sql = "SELECT name, phoneno, gender, age, experience, password, confirmpassword, image FROM doctors WHERE doctorId = $doctorId";
    $result = $conn->query($sql);

    if ($result->num_rows > 0) {
        // Output data of each row
        $row = $result->fetch_assoc();
        return $row;
    } else {
        return null;
    }
}

// Example usage
$doctorId = $_GET['doctorId']; // Assuming doctorId is passed via GET request, you can adjust it as needed

$doctorDetails = fetchDoctorDetails($conn, $doctorId);

if ($doctorDetails) {
    // Output JSON response
    header('Content-Type: application/json');
    echo json_encode($doctorDetails);
} else {
    echo "Doctor not found";
}

// Close connection
$conn->close();
?>
