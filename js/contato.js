$(document).ready(function(e){
    $("#mensagem-validacao-campo-vazio").hide();
    $("#mensagem-informativo-email").hide();
    $("#mensagem-erro-encaminhamento-email").hide();
    $("#informacoes-contato").click(function(e){
        e.preventDefault();
        debugger;
        recebe_nome_contato = $("#nome-contato").val();
        recebe_necessidade_contato = $("#necessidade-contato").val();

        if(recebe_nome_contato != "" && recebe_necessidade_contato != "")
        {
            $.ajax({
                url: "./encaminha_email.php",
                type: "POST",
                dataType: "json",
                data: { processo_contato: "email_encaminhado_necessidade_contato",valor_nome_contato:recebe_nome_contato,valor_necessidade_contato:recebe_necessidade_contato },
                success: function (retorno) 
                {
                    debugger;
                    if(retorno === "E-mail de contato encaminhado")
                    {
                        $("#mensagem-email-encminhado").html("E-mail encaminhado com sucesso");
                        $("#mensagem-informativo-email").show();
                        $("#mensagem-informativo-email").fadeOut(4000);
                    }else{
                        $("#mensagem-campo-erro-encaminhamento-email").html("Falha no encaminhamento do e-mail");
                        $("#mensagem-erro-encaminhamento-email").show();
                        $("#mensagem-erro-encaminhamento-email").fadeOut(4000);
                    }
                },
                error:function(xhr,status,error)
                {

                },
            });
        }else if(recebe_nome_contato === "")
        {
            $("#mensagem-campo-vazio").html("Favor preencher o campo nome");
            $("#mensagem-validacao-campo-vazio").show();
            $("#mensagem-validacao-campo-vazio").fadeOut(4000);
            $("#nome-contato").focus();
        }else if(recebe_necessidade_contato === "")
        {
            $("#mensagem-campo-vazio").html("Favor preencher oque você precisa");
            $("#mensagem-validacao-campo-vazio").show();
            $("#mensagem-validacao-campo-vazio").fadeOut(4000);
            $("#necessidade-contato").focus();
        }
    });
});