<?php
// MySQL database connection parameters
$servername = "localhost";
$username = "root"; // Your MySQL username
$password = ""; // Your MySQL password
$database = "sample"; // Your MySQL database name

// Create connection
$conn = new mysqli($servername, $username, $password, $database);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Check if POST variables are set
if(isset($_POST['doctorId'], $_POST['name'], $_POST['phoneno'], $_POST['gender'], $_POST['age'], $_POST['experience'], $_POST['specialization'], $_POST['password'], $_POST['confirmPassword'])) {
    // Extract values from POST
    $doctorId = $_POST['doctorId'];
    $name = $_POST['name'];
    $phoneno = $_POST['phoneno'];
    $gender = $_POST['gender'];
    $age = $_POST['age'];
    $experience = $_POST['experience'];
    $specialization = $_POST['specialization'];
    $password = $_POST['password'];
    $confirmPassword = $_POST['confirmPassword'];
    
    // Check if image file is uploaded
    if(isset($_FILES['image']) && $_FILES['image']['error'] === UPLOAD_ERR_OK) {
        // Specify the directory for storing the uploaded images
        $uploadDir = "uploads/";

        // Get the temporary filename of the uploaded file
        $tempFilename = $_FILES['image']['tmp_name'];

        // Generate a unique filename for the uploaded image
        $newFilename = uniqid() . '_' . basename($_FILES['image']['name']);
        
        // Move the uploaded file to the specified directory with the new filename
        if(move_uploaded_file($tempFilename, $uploadDir . $newFilename)) {
            // Get the existing image filename for the doctor
            $getImageSql = "SELECT `image` FROM `doctors` WHERE `doctorId` = '$doctorId'";
            $result = $conn->query($getImageSql);
            if ($result->num_rows > 0) {
                $row = $result->fetch_assoc();
                $existingImage = $row["image"];
                // Delete the existing image file
                if (file_exists($existingImage)) {
                    unlink($existingImage);
                }
            }
            // Update the image field in the database with the new filename
            $image = $uploadDir . $newFilename;
            $sql = "UPDATE `doctors` SET `name` = '$name', `phoneno` = '$phoneno', `gender` = '$gender', `age` = '$age', `experience` = '$experience', `specialization` = '$specialization', `password` = '$password', `confirmpassword` = '$confirmPassword', `image` = '$image' WHERE `doctorId` = '$doctorId'";
        } else {
            // Error moving uploaded file
            echo "Error: Failed to move uploaded file.";
            exit();
        }
    } else {
        // If image file is not uploaded or an error occurred, proceed without updating the image field
        $sql = "UPDATE `doctors` SET `name` = '$name', `phoneno` = '$phoneno', `gender` = '$gender', `age` = '$age', `experience` = '$experience', `specialization` = '$specialization', `password` = '$password', `confirmpassword` = '$confirmPassword' WHERE `doctorId` = '$doctorId'";
    }

    // Execute the query
    if ($conn->query($sql) === TRUE) {
        // All fields updated successfully
        echo "Doctor details updated successfully";
    } else {
        // Error updating fields
        echo "Error: " . $sql . "<br>" . $conn->error;
    }
} else {
    // If POST variables are not set, echo an error message
    echo "Error: Required POST variables are not set";
}

// Close connection
$conn->close();
?>
