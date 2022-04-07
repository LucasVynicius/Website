let spinnerLoader = document.querySelector ('#loader');
let mainDiv = document.querySelector ('#main-loader');

const imagemPersonagem1 = document.querySelector('#personagem-imagem-1');
const imagemPersonagem2 = document.querySelector('#personagem-imagem-2');
const imagemPersonagem3 = document.querySelector('#personagem-imagem-3');
const imagemPersonagem4 = document.querySelector('#personagem-imagem-4');

const nomePersonagem1 = document.querySelector('#nomePersonagem1');
const nomePersonagem2 = document.querySelector('#nomePersonagem2');
const nomePersonagem3 = document.querySelector('#nomePersonagem3');
const nomePersonagem4 = document.querySelector('#nomePersonagem4');

const numeroMaximoDePersonagens = 671;
let idsPersonagens = [];
let contadorImagensResolvidas = 0;


gerarPersonagensAleatorio = () => {
    return Math.floor(Math.random() * numeroMaximoDePersonagens);
}
pegarPersonagens = (imgElement, nameElement) =>{

    console.log('ids dos personagens', idsPersonagens);

    fetch(`https://rickandmortyapi.com/api/character/${idsPersonagens.pop()}`,{
        method:'GET',
        headers: {
            accept: 'application/json', "content-Type" : 'application/json'
        }
    }).then((response) => response.json())
    .then((response) => {
        contadorImagensResolvidas++;
        imgElement.src = response.image;
        nameElement.innerText = response.name;
        if (contadorImagensResolvidas == 4) {
            setTimeout(() => { 
                spinnerLoader.style.display = "none";
                mainDiv.style.display = "flex";
            }, 1000);
        }
    });
}
gerarIds = () => {

    while (idsPersonagens.length < 4) {
        let idAux = gerarPersonagensAleatorio();
        if (!idsPersonagens.includes(idAux)) {
            idsPersonagens.push(idAux);
        }
    }

}

main = () => {
    gerarIds();
    pegarPersonagens(imagemPersonagem1, nomePersonagem1);
    pegarPersonagens(imagemPersonagem2, nomePersonagem2);
    pegarPersonagens(imagemPersonagem3, nomePersonagem3);
    pegarPersonagens(imagemPersonagem4, nomePersonagem4);
}

main();