<?php
require 'dbh.php'; // Assuming this is your config file

// Check if POST variables are set
if(isset($_POST['patientId'], $_POST['name'], $_POST['contactNo'], $_POST['age'], $_POST['gender'], $_POST['height'], $_POST['weight'], $_POST['patientCase'], $_POST['painDuration'], $_POST['admittedOn'])) {
    // Extract values from POST
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
    
    // Prepare SQL statement
    $sql = "UPDATE patients3 SET 
            name = :name, 
            contactNo = :contactNo, 
            age = :age, 
            gender = :gender, 
            height = :height, 
            weight = :weight, 
            patientCase = :patientCase, 
            painDuration = :painDuration, 
            admittedOn = :admittedOn 
            WHERE patientId = :patientId";

    // Prepare the statement
    $stmt = $conn->prepare($sql);

    // Debugging: Print the prepared statement and its parameters
    echo "Prepared Statement: ";
    print_r($stmt);
    echo "<br><br>";
    echo "Parameters: ";
    var_dump(array(
        ':name' => $name,
        ':contactNo' => $contactNo,
        ':age' => $age,
        ':gender' => $gender,
        ':height' => $height,
        ':weight' => $weight,
        ':patientCase' => $patientCase,
        ':painDuration' => $painDuration,
        ':admittedOn' => $admittedOn,
        ':patientId' => $patientId
    ));
    echo "<br><br>";

    // Bind parameters
    $stmt->bindParam(':name', $name);
    $stmt->bindParam(':contactNo', $contactNo);
    $stmt->bindParam(':age', $age);
    $stmt->bindParam(':gender', $gender);
    $stmt->bindParam(':height', $height);
    $stmt->bindParam(':weight', $weight);
    $stmt->bindParam(':patientCase', $patientCase);
    $stmt->bindParam(':painDuration', $painDuration);
    $stmt->bindParam(':admittedOn', $admittedOn);
    $stmt->bindParam(':patientId', $patientId);

    // Execute the statement
    try {
        $stmt->execute();
        // Check if any row was updated
        if ($stmt->rowCount() > 0) {
            echo json_encode(array("status" => "success", "message" => "Details updated successfully"));
        } else {
            echo json_encode(array("status" => "error", "message" => "No rows were updated"));
        }
    } catch (PDOException $e) {
        echo json_encode(array("status" => "error", "message" => "Error updating details: " . $e->getMessage()));
    }
} else {
    // If required POST variables are not set, echo an error message
    echo json_encode(array("status" => "error", "message" => "Required POST variables are not set"));
}

// Close connection
$conn = null;
?>
