//Função para limpar dados
function limpaForm(){
    document.getElementById('cep').value=("");
    document.getElementById('logradouro').value=("");
    document.getElementById('bairro').value=("");
    document.getElementById('cidade').value=("");
    document.getElementById('estado').value=("");
}

//Ouvir o evento de saída do campo CEP
document.getElementById("cep").addEventListener("blur",(evento) =>{
    //Armazenando o evento em uma variável
    const elemento = evento.target;
    //Armazenando o valor digitado no campo CEP após o evento
    const cepDigitado = elemento.value;

    //Validando quantidade de caracteres do CEP
    if(!(cepDigitado.length === 8)){
        limpaForm();
        return alert ("CEP informado com menos de 8 dígitos");
    }

    //Armazenando o CEP no localStorage
    localStorage.setItem('salvaCep',cepDigitado);


    //Promessa de buscar recurso
    fetch(`https://viacep.com.br/ws/${cepDigitado}/json/`)
        .then(resposta => resposta.json())
        .then(data => {

            //Carregando dados na página - verificando que não hava erro em 'data'
            if(!data.erro){
                document.getElementById('logradouro').value = data.logradouro;
                document.getElementById('bairro').value =data.bairro;
                document.getElementById('cidade').value =data.localidade;
                document.getElementById('estado').value = data.uf;

                //Armazenando os demais campos ao localStorage
                localStorage.setItem('salvaLogradouro', data.logradouro);
                localStorage.setItem('salvaBairro', data.bairro);
                localStorage.setItem('salvaCidade', data.localidade);
                localStorage.setItem('salvaEstado', data.uf);
            }
            else{
                limpaForm();
                alert("CEP não encontrado.")
            }
        })
        .catch(erroCapturado => console.error("Erro ao buscar o endereço.", erroCapturado));
})

//Recuperando os dados após carregando da página
document.addEventListener('DOMContentLoaded', () => {
    // Recupera o CEP salvo
    const cepSalvo = localStorage.getItem('salvaCep');
    if (cepSalvo) {
        document.getElementById('cep').value = cepSalvo;

        // Recupera e preenche os outros campos se estiverem salvos
        const logradouroSalvo = localStorage.getItem('salvaLogradouro');
        if (logradouroSalvo) {
            document.getElementById('logradouro').value = logradouroSalvo;
        }
        const bairroSalvo = localStorage.getItem('salvaBairro');
        if (bairroSalvo) {
            document.getElementById('bairro').value = bairroSalvo;
        }
        const cidadeSalva = localStorage.getItem('salvaCidade');
        if (cidadeSalva) {
            document.getElementById('cidade').value = cidadeSalva;
        }
        const estadoSalvo = localStorage.getItem('salvaEstado');
        if (estadoSalvo) {
            document.getElementById('estado').value = estadoSalvo;
        }
    }
});