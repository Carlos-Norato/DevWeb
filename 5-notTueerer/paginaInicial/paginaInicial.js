const inputNovoPost = document.querySelector('#novoPostConteudo');
const btnCriaPost = document.querySelector('#criarPost');
const token =   localStorage.getItem('token');
const timeline = document.querySelector('.timeline');
const btnLogout = document.querySelector('#logout');
const btnPerfil = document.querySelector('#perfil');
const url= 'https://notueere.onrender.com/post';

function recuperaPost(){
    

    fetch(url, { method: 'GET', headers: { "Content-type": "application/json", Authorization: "Bearer " + token }})
    .then((response)=> response.json())
    .then((posts)=>{
        let html = '';
        console.log(posts);
        posts.responsePost.map((post)=>{
           html +=`
           <div>
                <h4>${post.autor}</h4>
                <p>${post.conteudo}</p>
           </div>
           ` 
        });
        timeline.innerHTML = html;
    });
}

function criaPost(){
    let conteudo = inputNovoPost.value;

    if(!conteudo){
        alert('Conteudo vazio')
        return
    }
    fetch(url,{ method: 'POST', body : JSON.stringify({ conteudo }), headers: { "Content-type": "application/json", Authorization: "Bearer " + token }})
    .then((response)=> response.json())
    .then(()=>{
        inputNovoPost.value = '';
        recuperaPost();
    });
}


btnCriaPost.addEventListener('click', criaPost);

btnLogout.addEventListener('click', ()=>{
    localStorage.removeItem('token');
    window.location.href = '../index.html';
});

btnPerfil.addEventListener('click',()=>{
    window.location.href = '../perfil/index.html';
});

recuperaPost();
