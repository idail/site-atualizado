<?php
//O valor diz aos navegadores para permitir que o código de solicitação de qualquer origem acesse o recurso
header("Access-Control-Allow-Origin: *");
//Especifica um ou mais métodos permitidos ao acessar um recurso em resposta a uma solicitação de comprovação
header("Access-Control-Allow-Methods: *");
//require("./vendor/phpmailer/phpmailer/src/");
require("./vendor/phpmailer/phpmailer/src/PHPMailer.php");
require("./vendor/phpmailer/phpmailer/src/SMTP.php");
require("./vendor/phpmailer/phpmailer/src/Exception.php");

use PHPMailer\PHPMailer\PHPMailer;
use PHPmailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

if($_SERVER["REQUEST_METHOD"] === "POST")
{
    if(isset($_POST["processo_contato"]))
    {
        $recebe_processo_contato = $_POST["processo_contato"];
        if($recebe_processo_contato === "email_encaminhado_necessidade_contato")
        {
            $recebe_valor_nome_contato = $_POST["valor_nome_contato"];
            $recebe_valor_necessidade_contato = $_POST["valor_necessidade_contato"];

            $retorno_encaminhar_email_contato = encaminhar_email_contato($recebe_valor_nome_contato,$recebe_valor_necessidade_contato);
            echo json_encode($retorno_encaminhar_email_contato);
        }
    }
}

function encaminhar_email_contato($recebe_nome,$recebe_necessidade):string
{
            $mail = new PHPMailer(true);
            $mail->SMTPDebug = 0;
            $mail->isSMTP();
            $mail->CharSet = 'UTF-8';
            $mail->Host = "smtp.kinghost.net";
            
            $mail->SMTPAuth = true;
            $mail->Username = "idailneto@idailneto.com.br";
            $mail->Password = "Sei#20020615";
            //$mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
            $mail->SMTPSecure = "ssl";
            $mail->Port = 465;
            //$mail->Port = 587;
            $mail->setFrom("idailneto@idailneto.com.br","E-mail da necessidade da pessoa");
            $mail->addAddress("neto_br_8@hotmail.com");
            $mail->isHTML(true);
            $mail->Subject = "E-mail de contato do site";
            $mail->Body = "Olá, meu nome é:".$recebe_nome."<br>Preciso:".$recebe_necessidade;
            $mail->AltBody = "Sistema de Terapia Intensiva";
            
            if ($mail->send()) {
                return "E-mail de contato encaminhado";
            } else {
                return "E-mail de contato não encaminhado";
            }
        
    //caso ocorra algum erro na execução do try sobre o pdo será retornado a mensagem de erro
    
}
