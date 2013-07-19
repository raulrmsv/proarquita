<?php
	// Include validator
	include 'validator.php';

	// Define receiver
	$receiver = "raulramos@bcrmadrid.com";

	// Define uploads directory
	$uploads = $_SERVER['DOCUMENT_ROOT'] . '/proarquita/uploads/';

	// Expected fields
	$validate = array(
		'nombre' => 'anything',
		'texto' => 'anything',
		'mail' => 'email'
	);

	$require = array(
		'nombre',  
		'texto', 
		'mail'
	);

	$sanitize = array(
		'nombre', 
		'texto'
	);

	// Instantiate validator
	$validator = new FormValidator($validate, $require, $sanitize);

	// Perform validation
	if ($validator->validate($_POST)){

		// Sanitize
 		$_POST = $validator->sanatize($_POST);

 		// Build base message
 		$subject = "Contacto (proarquita.com) - ".$_POST['nombre'];

 		// Manage attachment & build mail
 		if (isset($_FILES['cv']) && $_FILES['cv']['error'] == 0){ 
 			$filename = $_FILES['cv']['name'];
			$destination = $uploads . $filename;
			move_uploaded_file($_FILES['cv']['tmp_name'], $destination);
			$content = chunk_split(base64_encode(file_get_contents($destination))); 
			$size = filesize($destination);
			unlink($destination);
			$uid = md5(uniqid(time()));
			$message .=
				"From: web@proarquita.com\r\n"
		 		."Reply-To: ".$_POST['mail']."\r\n"
		      	."MIME-Version: 1.0\r\n"
		      	."Content-Type: multipart/mixed; boundary=\"".$uid."\"\r\n\r\n"
		      	."This is a multi-part message in MIME format.\r\n" 
		      	."--".$uid."\r\n"
		      	."Content-type:text/plain; charset=utf-8\r\n\r\n"
		      	.$_POST['texto']."\r\n\r\n"
		      	."--".$uid."\r\n"
		      	."Content-Type: application/octet-stream; name=\"".$filename."\"\r\n"
		      	."Content-Transfer-Encoding: base64\r\n"
		      	."Content-Disposition: attachment; filename=\"".$filename."\"\r\n\r\n"
		      	.$content."\r\n\r\n"
		      	."--".$uid."--";
 		} else {
 			// Plain mail
 			$message .=
				"From: web@proarquita.com\r\n"
		 		."Reply-To: ".$_POST['mail']."\r\n"
		      	."Content-type:text/plain; charset=utf-8\r\n"
		      	.$_POST['texto'];
 		}

 		// Send mail
 		if (mail($receiver, $subject, "", $message, "-fweb@proarquita.com")){
 			// Done, redirect home
	 		header('Location: http://www.proarquita.com/proarquita/', true, 301);
			exit;
 		} else {
 			// Error, redirect somewhere!
 			header('Location: http://www.proarquita.com/proarquita/contacto.html', 
	 			true, 301);
			exit;
 		}

 	} else {

 		// Didn't pass validation, die
 		die($validator->getScript());

 		// Redirect back to contact
 		header('Location: http://www.proarquita.com/proarquita/contacto.html', 
 			true, 301);
		exit;
 	}  