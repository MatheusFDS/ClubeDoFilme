window.addEventListener('load', function () {
    // ================ botao Assistir, eventos de mouse ========
    let botaoAssistir = document.querySelector('.btn');        

    //altera estilo ao passar o mouse
    botaoAssistir.addEventListener('mouseover', function() {
        botaoAssistir.style.cursor = 'pointer';
        botaoAssistir.style.backgroundColor = '#ff9000';
    });
    
    //retorna ao estilo padrão ao retirar o mouse
    botaoAssistir.addEventListener('mouseout', function() {        
        botaoAssistir.style.backgroundColor = 'rgba(51, 51, 51, 0.4)';
    });
    // ===================================================================    

    let avatarFilme = document.getElementById('avatar');
    let stringAvatarFilme = avatarFilme.innerHTML;
    console.log(stringAvatarFilme);

    let containerImagem = document.querySelector('.container');
    // console.log(containerImagem.style.backgroundImage);
    // containerImagem.style.backgroundImage = "linear-gradient(to bottom, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.2) 20%, rgba(20,20,20,0.2) 80%, rgba(20,20,20,1) 100%), url('../../images/catalogoFilmes/a_fera_do_mar.jpg')";
    containerImagem.style.backgroundImage = "linear-gradient(to bottom, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.2) 20%, rgba(20,20,20,0.2) 80%, rgba(20,20,20,1) 100%), url('../../images/catalogoFilmes/"+stringAvatarFilme+"')"

    // dispara evento ao clicar no botão de assistir filme
    botaoAssistir.addEventListener('click', function() {        
        // Esconde div exibida
        let divPrincipal = document.querySelector('.container');
        divPrincipal.style.display="none";

        // Exibe a div com o filme
        let divPlayer = document.querySelector('.player');
        divPlayer.style.display="flex";

    });    

    // let divPrincipal = document.querySelector('.container');
    // divPrincipal.style.display="none";

});