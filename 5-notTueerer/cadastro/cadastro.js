const user = document.querySelector('#user');
const senha = document.querySelector('#senha');
const btnCadastrar = document.querySelector('#cadastro');


function cadastrar(){
    let url = "https://notueere.onrender.com/cadastro";
    let username = user.value;
    let password = senha.value;

    fetch(url, { method: 'POST', body : JSON.stringify({username, password}), headers: {"Content-type": "application/json"}})
    .then((response)=> response.json())
    .then((user)=>{
        if(user.error){
            alert(user.error.erro);
        }else{
            window.location.href = "../index.html";
        }
    })


}


btnCadastrar.addEventListener('click', cadastrar);