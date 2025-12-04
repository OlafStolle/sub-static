<?php
$data = file_get_contents('php://input');
file_put_contents('plz.json', $data);
echo 'PLZ-Daten erfolgreich gespeichert.';
?>
