window.addEventListener('load', function () {
    let botaoAssistir = document.querySelector('.btn');
    console.log(botaoAssistir);
    console.log("ei teste")

    botaoAssistir.addEventListener('mouseover', function() {
        botaoAssistir.style.cursor = 'pointer';
        botaoAssistir.style.backgroundColor = '#ff9000';
    });

    botaoAssistir.addEventListener('mouseout', function() {        
        botaoAssistir.style.backgroundColor = 'rgba(51, 51, 51, 0.4)';
    });

    // let containerImagem = document.querySelector('.container');
    // console.log(containerImagem.style.backgroundImage);
    // containerImagem.style.backgroundImage = 'url(/public/images/catalogoFilmes/a_fera_do_mar.jpg)'

    // containerImagem.style.backgroundImage = ;

    // let container = document.querySelector('.banner');    
    // container.style.display = 'none';
    // console.log(container);
});