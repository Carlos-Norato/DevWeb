const posts = document.querySelector('.posts');
const paginaInicial = document.querySelector('#paginaInicial');
const token =   localStorage.getItem('token');



function deletar(id){
    let url = `https://notueere.onrender.com/post/${id}`;

    fetch(url, { method: 'DELETE', headers: { "Content-type": "application/json", Authorization: "Bearer " + token } })
    .then((response)=> response.json())
    .then((post)=>{
        recuperaPost()
    })

}

function editar(id){
    let url = `https://notueere.onrender.com/post/${id}`;
    let postEditar = document.querySelector(`#id${id}`);

    postEditar.innerHTML += `
        <input type="text" id="editarPost">
        <button id="editar">Editar</button>
    `;

    let inputEditar = document.querySelector('#editarPost');
    let btnEditar = document.querySelector('#editar');
    


    btnEditar.addEventListener('click',()=>{
        let conteudo = inputEditar.value;
        fetch(url, { method:'PUT', body: JSON.stringify({conteudo}) , headers: { "Content-type": "application/json", Authorization: "Bearer " + token }})
        .then((response)=> recuperaPost());
    });

}

function recuperaPost(){

    let url = 'https://notueere.onrender.com/meusPost';

    fetch(url, { method: 'GET', headers: { "Content-type": "application/json", Authorization: "Bearer " + token }})
    .then((response)=> response.json())
    .then((post)=>{
        let html = '';
        console.log(post);
        post.responsePost.map((post)=>{
           html +=`
           <div id='id${post.id}'>
                <h4>${post.autor} <button class='delete' onclick='deletar(${post.id})'>Apagar</button><button class='editar' onclick='editar(${post.id})'>Editar</button></h4>
                <p>${post.conteudo}</p>
           </div>
           ` 
        });
        posts.innerHTML = html;
    });
}

paginaInicial.addEventListener('click', ()=>{
    window.location.href = '../paginaInicial/index.html';
});

recuperaPost();
