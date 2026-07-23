<?php

header("Content-Type: application/json");

// folder upload
$uploadDir = __DIR__ . "/uploaded/";

// buat folder jika belum ada
if (!file_exists($uploadDir)) {
    mkdir($uploadDir, 0777, true);
}

// file latest.json
$latestFile = $uploadDir . "latest.json";

// baca nomor terakhir
$latest = 0;

if (file_exists($latestFile)) {

    $json = json_decode(file_get_contents($latestFile), true);

    if (isset($json["latest"])) {
        $latest = intval($json["latest"]);
    }
}

// nomor baru
$latest++;

$id = str_pad($latest, 6, "0", STR_PAD_LEFT);

// ==============================
// SIMPAN FOTO
// ==============================

if (!isset($_FILES["photo"])) {

    echo json_encode([
        "success" => false,
        "message" => "Photo not found"
    ]);

    exit;
}

move_uploaded_file(
    $_FILES["photo"]["tmp_name"],
    $uploadDir . $id . ".png"
);

// ==============================
// SIMPAN PESAN
// ==============================

$message = "";

if (isset($_POST["message"])) {
    $message = trim($_POST["message"]);
}

file_put_contents(
    $uploadDir . $id . ".json",
    json_encode([
        "id" => $id,
        "message" => $message
    ], JSON_PRETTY_PRINT)
);

// ==============================
// UPDATE latest.json
// ==============================

file_put_contents(
    $latestFile,
    json_encode([
        "latest" => $latest
    ], JSON_PRETTY_PRINT)
);

// ==============================

echo json_encode([
    "success" => true,
    "id" => $id
]);