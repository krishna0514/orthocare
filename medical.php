<?php
// Assuming form submission method is POST

// Check if form is submitted
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Retrieve the selected radio option
    $option = $_POST['option'];

    // Depending on the selected option, perform different actions
    if ($option == 'yes') {
        // If 'Yes' is selected, retrieve the input value
        $inputValue = $_POST['input_value'];

        // Perform database insertion
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

        // Prepare and bind statement
        $stmt = $conn->prepare("INSERT INTO questionnaire (option_selected, input_value) VALUES (?, ?)");
        $stmt->bind_param("ss", $option, $inputValue);

        // Execute statement
        $stmt->execute();

        echo "Data inserted successfully";

        // Close statement and connection
        $stmt->close();
        $conn->close();
    } else {
        // If 'No' is selected, no input value is provided
        echo "You selected 'No'";
    }
}
?>
