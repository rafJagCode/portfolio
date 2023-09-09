<?php
header('Content-Type: application/json');

function validateData($data){
	if(is_null($data)){
  		echo json_encode(array("message" => "BACKEND_DATA_PROBLEM"));
		return false;
	}
	return true;
}

function validateEmail($data){
	if (is_null($data->from) || !filter_var($data->from, FILTER_VALIDATE_EMAIL)) {
  		echo json_encode(array("message" => "BACKEND_EMAIL_PROBLEM"));
		return false;
	}
	return true;
}

function validateMessage($data){
	if(is_null($data->message) || empty(trim($data->message))){
  		echo json_encode(array("message" => "BACKEND_MESSAGE_PROBLEM"));
		return false;
	}
	return true;
}

$data = json_decode(file_get_contents('php://input'));

if(!validateData($data) || !validateEmail($data) || !validateMessage($data)){
	http_response_code(400);
	return;
}

$to = "jagielski.rafal.uwm@gmail.com";
$subject = "Message from portfolio website";
$message = $data->message;
$from = $data->from;

$emailSent = mail($to,$subject,$message, $from);

if ($emailSent){
	$status = 200;
	$message = "BACKEND_EMAIL_SENT_SUCCESSFULLY";
}
else{
	$status = 400;
	$message = "BACKEND_SOMETHING_WENT_WRONG";
}

http_response_code($status);

echo json_encode(array("message" => $message));
return;
?>