<?php

// Database connection parameters
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "sample";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Get the POST data from the request
$patientId = $_POST['patientId'];
$name = $_POST['name'];
$contactNo = $_POST['contactNo'];
$age = $_POST['age'];
$gender = $_POST['gender'];
$height = $_POST['height'];
$weight = $_POST['weight'];
$patientCase = $_POST['patientCase'];
$painDuration = $_POST['painDuration'];
$admittedOn = $_POST['admittedOn'];
$rbs = $_POST['rbs'];
$password = $_POST['password'];
$confirmPassword = $_POST['confirmPassword'];
$doctorId = $_POST['doctorId']; // Get doctorId from the POST data

// Validate form inputs
if (empty($patientId) || empty($name) || empty($contactNo) || empty($age) || empty($gender) || empty($height) || empty($weight) || empty($patientCase) || empty($painDuration) || empty($admittedOn) || empty($rbs) || empty($password) || empty($confirmPassword) || empty($doctorId)) {
    die(json_encode(["success" => false, "message" => "Please fill in all required fields."]));
}

// Check if passwords match
if ($password !== $confirmPassword) {
    die(json_encode(["success" => false, "message" => "Passwords do not match."]));
}

// Upload image
$imageDir = "uploads/";
$imagePath = $imageDir . basename($_FILES["image"]["name"]);

if (move_uploaded_file($_FILES["image"]["tmp_name"], $imagePath)) {
    // Image uploaded successfully, proceed with database insertion

    // Prepare SQL statement
    $sql = "INSERT INTO patients4 (patientId, name, contactNo, age, gender, height, weight, patientCase, painDuration, admittedOn, rbs, password, confirmPassword, image, doctorId) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
    $stmt = $conn->prepare($sql);

    // Bind parameters
    $stmt->bind_param("sssisdssssissss", $patientId, $name, $contactNo, $age, $gender, $height, $weight, $patientCase, $painDuration, $admittedOn, $rbs, $password, $confirmPassword, $imagePath, $doctorId); // Add doctorId to the bind parameters

    // Execute statement
    if ($stmt->execute()) {
        echo json_encode(["success" => true, "message" => "Form submitted successfully."]);
    } else {
        echo json_encode(["success" => false, "message" => "Error inserting data into database: " . $stmt->error]);
    }

    // Close statement
    $stmt->close();
} else {
    // Image upload failed
    die(json_encode(["success" => false, "message" => "Error uploading image."]));
}

// Close connection
$conn->close();

?>
