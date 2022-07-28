window.addEventListener('load', () => {
    let buttonSubmit = document.querySelector('.button-cta');
    // console.log(buttonSubmit);

    buttonSubmit.addEventListener('mouseover', function() {
        buttonSubmit.style.cursor = 'pointer';        
    });

    // Captura lista com os produtos ofertados e cria eventos para todos eles:
    // Principal evento: se clicar na li do produto, preenche o valor total com o valor do produto e duas tags input com display: none
    // na qual carregam o id_produto e o valor total.
    let produtos = document.querySelectorAll('.order-list li');
    // console.log(produtos);    
    // produtos.forEach(produto => console.log(produto))
    produtos.forEach(produto => {
        produto.addEventListener('mouseover', () => {
            produto.style.cursor = 'pointer';
        })
        
        produto.addEventListener('click', () => {                        
            // 1. captura o preço do produto selecionado e insere no campo total (visível para usuário)
            // e no input do valor total

            // 1.1 Captura preço do produto
            let produto_preco = produto.querySelector('h5')            

            // 1.2 captura campo visível para usuário e insere o preço do produto selecionado
            let total = document.querySelector('#total_valor');
            total.innerHTML = produto_preco.innerText
            
            // 1.3 captura campo input do formulário com o preço (não visível para usuário) e insere o preço do produto.
            let input_total = document.querySelector('#input_total');
            input_total.value= produto_preco.innerText
            input_total.style.display="none";

            //2. captura o id do produto selecionado e insere no input id (não visível para usuário)
            let produto_id = produto.querySelector('div');
            let input_id = document.querySelector('#input_id');
            input_id.style.display="none";
            
            input_id.value = produto_id.innerText;

        })
    })

    let cardNumber = document.getElementById('cardnumber');
    cardNumber.addEventListener('keydown', () => {
        // console.log(cardNumber.maxLength, cardNumber.value.length);
        let valor = cardNumber.value.replace(/[^\d]/g, "").replace(/(\d{4})(\d{4})(\d{4})(\d{4})/, "$1 $2 $3 $4")
        cardNumber.value = valor;

        if(cardNumber.maxLength == cardNumber.value.length){

            document.querySelector('#label-cardnumber').innerText = cardNumber.value;
        }        
    }) 

    let cardExpiration =document.getElementById('cardexpiration');
    cardExpiration.addEventListener('keydown', () => {
        let valor = cardExpiration.value.replace(/[^\d]/g, "").replace(/(\d{2})(\d{4})/, "$1/$2")
        cardExpiration.value = valor;
        
        if(cardExpiration.maxLength == cardExpiration.value.length){            
            // console.log(document.querySelector('#label-cardexpiration').innerHTML);
            // console.log(document.querySelector('#label-cardexpiration').innerText);
            document.querySelector('#label-cardexpiration').innerHTML = cardExpiration.value + '<span>'+ document.querySelector('#label-cardexpiration span').innerText +'</span>';
            // document.querySelector('#label-cardexpiration').innerHTML = document.querySelector('#label-cardexpiration').innerText.replace(/$(\d{2}).(\d{4})/ , cardExpiration.value);
        }        
    }) 

    let cardCVC =document.getElementById('cardcvc');
    cardCVC.addEventListener('keydown', () => {
        let valor = cardCVC.value.replace(/[^\d]/g, "");
        cardCVC.value = valor;

        if(cardCVC.maxLength == cardCVC.value.length){            
            document.querySelector('#label-cardexpiration span').innerText = cardCVC.value;
        };
    })

    let form = document.querySelector('.card-form');
    form.addEventListener('submit', (event) => {
        
        let cardNumber = document.querySelector('#cardnumber');
        // console.log(cardNumber);
        let cardExpiration = document.querySelector('#cardexpiration');
        // console.log(cardExpiration);
        let cardCVC = document.querySelector('#cardcvc');
        // console.log(cardCVC);
        
        let inputId = document.querySelector('#input_id');
        // console.log(inputId);
        
        let errorMessages = [];
        
        if(cardNumber.value.length === 0) {
            errorMessages.push("Digite o número do cartão de crédito")
        }
        else if(cardNumber.value.length !== cardNumber.maxLength){
            //em tese o patter (regex) do html já está validando essa situação
            errorMessages.push("Confira se você digitou o número do cartão corretamente");
        }

        if(cardExpiration.value.length === 0) {
            errorMessages.push("Digite a data de validade do seu cartão")
        }
        else if(cardExpiration.value.length !== cardExpiration.maxLength){
            //em tese o patter (regex) do html já está validando essa situação
            errorMessages.push("Confira se você digitou a data de vencimento corretamente");
        }
        else {
            let mesAnoCartao = cardExpiration.value.split('/');
            let mesCartao = parseInt(mesAnoCartao[0]);
            let anoCartao = parseInt(mesAnoCartao[1]);

            let dataAtual = new Date();
            let anoAtual = dataAtual.getFullYear();
            let mesAtual = dataAtual.getMonth()+1; // getMonth retorna 0-11

            if(anoCartao < anoAtual){
                errorMessages.push('A data de validade é inferior a data atual.')
            }
            else if (anoCartao == anoAtual){
                // console.log(mesCartao, mesAtual)
                if(mesCartao < mesAtual) {
                    errorMessages.push('A data de validade é inferior a data atual.')
                }
            }
        }


        if(cardCVC.value.length === 0) {
            errorMessages.push("Digite o código de segurança de seu cartão")
        }
        else if(cardCVC.value.length !== cardCVC.maxLength){            
            //em tese o patter (regex) do html já está validando essa situação
            errorMessages.push("Confira se você digitou o código de segurança corretamente");
        }

        if(inputId.value.length === 0) {
            errorMessages.push("Escolha sua assinatura no quadro ao lado esquerdo");
        }

        errorMessages.forEach(error => console.log(error));        

        if (errorMessages.length > 0){
            event.preventDefault(); //suspende o evento padrão       

            // let divErrors = document.getElementById('div-errors');
            // divErrors.classList.remove('no-errors');
            // divErrors.classList.add('errors');

            //captura a ul interna da div errors            
            let errorMessageUnificada = '';
            for (let i=0; i < errorMessages.length; i++){
                errorMessageUnificada = errorMessageUnificada + ' \n' + errorMessages[i];
            }
            alert(errorMessageUnificada);
        }


    })

    
})