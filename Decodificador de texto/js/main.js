
let arr = [];


document.body.addEventListener('keypress', function(event){
   const key = event.key;
   const code = event.keyCode;
   if(code == 92 || code == 47 || code == 124 || code == 167 || code == 60 || code == 62 || code == 42 || code == 38 || code == 64 || code == 35){
      alert(`O caracter  ${key}  é invalido!\nNão use os seguintes caracteres / \ | § < > * & @ #`);
      return; 
   }
})
function removeAcento (text){
   
    text = text.toLowerCase().replace(new RegExp('[ÁÀÂÃ]','gi'), 'a')
    .replace(new RegExp('[ÉÈÊ]','gi'), 'e')
    .replace(new RegExp('[ÍÌÎ]','gi'), 'i')
    .replace(new RegExp('[ÓÒÔÕ]','gi'), 'o')
    .replace(new RegExp('[ÚÙÛ]','gi'), 'u');
    return text;
}

function codificador(frase){
   for(let i = 0; i < frase.length; i++){

      if(frase[i] == 'e'){
         arr.push('enter')
      }else if(frase[i] == 'i'){
         arr.push('imes')
      }else if(frase[i] == 'a'){
         arr.push('ai')
      }else if(frase[i] == 'o'){
         arr.push('ober')
      }
      else if(frase[i] == 'u'){
         arr.push('ufat')
      }
      else{
         arr.push(frase[i])
      }
   }
   return formatar(arr);
}

//tira as palavrar do array  e forma uma frase formatada
function formatar(codificada){
   let fraseCodificada = '';
   for(let i = 0; i < codificada.length; i++){
         fraseCodificada += codificada[i].replace(',', '');
   }
   return fraseCodificada;
}

//Esconde o texto e a imagem inicial do campo saida de dados e mostra o botão copiar
function mudarSaida(){
   let img = document.querySelector('.saida-1-img');
   img.style.display = 'none';

   let h2 = document.querySelector('.saida-1-info-h2');
   h2.style.display = 'none';

   let p = document.querySelector('.texto-desejado');
   p.style.display = 'none';
   
   let saida = document.querySelector('.texto-criptografado');
   saida.style.display = 'block';

   let botaoCopiar = document.querySelector('.botao-copiar');
   botaoCopiar.style.display = 'block';
}


//Mostar na tela
function renderizar(){
   
   let saida = document.querySelector('.texto-criptografado');

   let input = document.querySelector('.input');
   let text = input.value;
   input.value = "";

   let frase = removeAcento (text);
   text = "";
   let fraseCodificada = codificador(frase);
   frase = "";

   mudarSaida();

   saida.innerText = fraseCodificada;

   fraseCodificada = "";
   arr = [];
   
}

//Copiar
function copiar(){
   let saida = document.querySelector('.texto-criptografado');
  
   if(navigator.clipboard.writeText(saida.innerText)){

      let botao_copiar = document.querySelector('.botao-copiar');
      botao_copiar.innerText = 'Copiado';
      botao_copiar.style.color = 'red'

      criarBotaoColar()


      setInterval(function(){
         botao_copiar.innerText = 'Copiar';
         botao_copiar.style.color = '#0A3871'
      }, 5000)
   }
}

// Descriptografar
function descriptografar(){
   
   let input = document.querySelector('.input');
   let text = input.value;

   text = removeAcento(text)

   let fraseDescriptografada = text.replace(/ai/g, 'a').replace(/enter/g, 'e').replace(/imes/g, 'i').replace(/ober/g, 'o').replace(/ufat/g, 'u');
   
   let saida = document.querySelector('.texto-criptografado');
   saida.innerText = fraseDescriptografada;
   
   mudarSaida();
   input.value = "";

   return fraseDescriptografada;
}


//Cria um botão para colar o que esta na area de tranferencia
function criarBotaoColar(){

   let botao_criptografar = document.querySelector('.botao-criptografar');
   botao_criptografar.style.display = 'none';

   let container_botao = document.querySelector('.container-botao');

   let botaoColar = document.createElement('button');
   botaoColar.innerText = 'Colar';
   botaoColar.classList.add('botao-criptografar');

   container_botao.appendChild(botaoColar)



   botaoColar.addEventListener('click', async (e) => {
      e.preventDefault();

      let input = document.querySelector('.input');
      
      let response = await navigator.clipboard.readText();
     
      input.value = response;
    });
}


