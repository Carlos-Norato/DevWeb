const user = document.querySelector('#user');
const senha = document.querySelector('#senha');
const btnEntrar = document.querySelector('#login');



function logar(){
    let url = 'https://notueere.onrender.com/login';
    let username = user.value;
    let password = senha.value;


    fetch(url, { method: 'POST', body : JSON.stringify({username, password}), headers: {"Content-type": "application/json"}})
    .then((response) => response.json())
    .then((user)=>{
        if(user.token){
            localStorage.setItem('token', user.token);
            window.location.href = './paginaInicial/index.html';
        }else{
            alert(user.error.erro);
        }
    });

}



btnEntrar.addEventListener('click',logar);


