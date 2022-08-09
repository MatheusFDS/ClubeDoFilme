window.addEventListener('load', () => {
    let inputLabelFoto = document.querySelector('label[for=avatar]');
    // console.log(inputLabelFoto);

    let inputFoto = document.querySelector('input[type=file]');

    // inputLabelFoto.addEventListener('mouseover', () => {
    //     inputLabelFoto.style.cursor = 'pointer';
    //     console.log(inputFoto.value.length);
    // })

    let btnSubmit = document.querySelector('button[class=btn-submit-avatar]');
    // console.log(btnSubmit);


    btnSubmit.addEventListener('mouseover', () => {
        if(inputFoto.value.length !== 0){
           btnSubmit.style.cursor = 'pointer';
        }
    })

    btnSubmit.addEventListener('click', (event) => {
        if(inputFoto.value.length === 0){
            event.preventDefault();
         }
    })

})
