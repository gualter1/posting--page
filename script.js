class AcessarAPI {
    constructor (baseURL) {
        this.baseURL = baseURL
    }

    get(endpoint){
        this._endpoint = endpoint
        return fetch(this.baseURL + this._endpoint)
        .then(response => response.json())
    }
    
    post(endpoint, body){
     return this._send("post", endpoint, body)    
    }

    _send(method, endpoint, body) {
        return fetch(this.baseURL + endpoint, {
            method, 
            headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(body)  
            }).then(response => response.json());
        }
}

const titulo = document.querySelector("#meu-titulo")
const paragrafo = document.querySelector("#meu-paragrafo")
const form = document.querySelector("form")
const url = "https://jsonplaceholder.typicode.com"
const endpoint = "/posts"

const API = new AcessarAPI(url)
API.get(endpoint)
.then(data => {
    const dados = [...data]
    const ultimasPost = []
    console.log(ultimasPost)
    for (let a = 6; a >= 0; a--) {
        ultimasPost.push(dados.at(-a))
        
    }

    ultimasPost.forEach(x => publicar(padronizaTitulo(x.title), x.body))
    
    
})

form.addEventListener("submit", event => {

    event.preventDefault()

    
    API.post(endpoint, {title: padronizaTitulo(titulo.value), body: paragrafo.value, userId:1})
    .then(data => {
       
       publicar(data.title, data.body)
        titulo.value = ""
        paragrafo.value = ""
    })
    
})



function publicar (titulo, texto){
    const postagens = document.querySelector("#postagens")
    postagens.insertAdjacentHTML("afterbegin",`<section class="postagem"><h2 id="renderizador-titulo">${titulo}</h2>
        <p id="renderizador-paragrafo">${texto}</p></section>`)
} 

function padronizaTitulo (texto) {
    return texto.toUpperCase().trim()
}