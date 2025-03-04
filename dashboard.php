<?php
$dataFile = 'data.json';

// قراءة البيانات من JSON
$jsonData = file_get_contents($dataFile);
$data = json_decode($jsonData, true);

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $data = $_POST;
    file_put_contents($dataFile, json_encode($data, JSON_PRETTY_PRINT));
    echo json_encode(["success" => true, "message" => "تم تحديث البيانات بنجاح!"]);
    exit;
}
?>

<!DOCTYPE html>
<html lang="ar">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>لوحة التحكم</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            text-align: center;
            padding: 20px;
        }
        .container {
            width: 50%;
            background: white;
            padding: 20px;
            border-radius: 10px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            margin: auto;
        }
        h2 {
            color: #333;
        }
        label {
            display: block;
            margin-top: 15px;
            font-weight: bold;
        }
        input, textarea {
            width: 100%;
            padding: 10px;
            margin-top: 5px;
            border: 1px solid #ddd;
            border-radius: 5px;
            font-size: 16px;
        }
        button {
            margin-top: 20px;
            padding: 10px 20px;
            background: #007bff;
            color: white;
            border: none;
            cursor: pointer;
            border-radius: 5px;
            font-size: 18px;
        }
        button:hover {
            background: #0056b3;
        }
        .message {
            margin-top: 10px;
            font-size: 18px;
            color: green;
        }
    </style>
</head>
<body>

    <div class="container">
        <h2>لوحة التحكم</h2>
        <form id="settingsForm">
            <label>عنوان اللوجو</label>
            <input type="text" name="logoTitle" value="<?= $data['logoTitle'] ?>">

            <label>عنوان الصفحة الرئيسية</label>
            <input type="text" name="landingHeading" value="<?= $data['landingHeading'] ?>">

            <label>وصف الصفحة الرئيسية</label>
            <textarea name="landingDescription"><?= $data['landingDescription'] ?></textarea>

            <label>القسم 1</label>
            <input type="text" name="section_one_title" value="<?= $data['section_one_title'] ?>">

            <label>القسم 2</label>
            <input type="text" name="section_two_title" value="<?= $data['section_two_title'] ?>">

            <label>القسم 3</label>
            <input type="text" name="section_three_title" value="<?= $data['section_three_title'] ?>">

            <label>القسم 4</label>
            <input type="text" name="section_four_title" value="<?= $data['section_four_title'] ?>">

            <label>القسم 5</label>
            <input type="text" name="section_five_title" value="<?= $data['section_five_title'] ?>">

            <label>القسم 6</label>
            <input type="text" name="section_six_title" value="<?= $data['section_six_title'] ?>">

            <label>القسم 7</label>
            <input type="text" name="section_seven_title" value="<?= $data['section_seven_title'] ?>">

            <label>المهارة 1</label>
            <input type="text" name="skill_one" value="<?= $data['skill_one'] ?>">

            <label>المهارة 2</label>
            <input type="text" name="skill_two" value="<?= $data['skill_two'] ?>">

            <label>المهارة 3</label>
            <input type="text" name="skill_three" value="<?= $data['skill_three'] ?>">

            <label>المهارة 4</label>
            <input type="text" name="skill_four" value="<?= $data['skill_four'] ?>">

            <button type="submit">حفظ التغييرات</button>
        </form>

        <p class="message" id="message"></p>
    </div>

    <script>
        document.getElementById("settingsForm").addEventListener("submit", function(event) {
            event.preventDefault();
            let formData = new FormData(this);

            fetch("dashboard.php", {
                method: "POST",
                body: new URLSearchParams(formData)
            })
            .then(response => response.json())
            .then(data => {
                document.getElementById("message").textContent = data.message;
                setTimeout(() => location.reload(), 1000);
            })
            .catch(error => console.error("Error:", error));
        });
    </script>

</body>
</html>
