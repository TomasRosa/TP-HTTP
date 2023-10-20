document.addEventListener("DOMContentLoaded", () => {

const urlApi = "https://jsonplaceholder.typicode.com/posts";

const table = document.querySelector('table');

let posts;

let nuevoPost = {
    userId: 5,
    id: 101,
    title: "Bocaaaaaaaaaa",
    body: "Dale daledale dale dale dale dale boca"
}
let postActualizado = {
    userId: 10,
    id: 105,
    title: "Boca",
    body: "River sos de la B."
}

fetch(urlApi)
.then(data => data.json())
.then(data => {
    posts = data;

    posts.forEach(post => {
        const newRow = table.insertRow()

        const userIdCell = newRow.insertCell();
        userIdCell.innerHTML = post.userId;

        const idCell = newRow.insertCell();
        idCell.innerHTML = post.id;

        const titleCell = newRow.insertCell();
        titleCell.innerHTML = post.title;

        const bodyCell = newRow.insertCell();
        bodyCell.innerHTML = post.body;
    })

    deletePost (5);
    postPost (nuevoPost);
    updatePost (101,postActualizado);
    mostrarContenidoSegunID(9);
})
async function postPost (nuevoPost)
{
    const opciones = {
        method: "POST",
        headers: {
            "Content-Type" : "application/json"
        },
        body: JSON.stringify(nuevoPost)
    }
    const response = await fetch(urlApi,opciones);

    if(response.ok)
    {
        console.log(`Datos del usuario posteado correctamente: 
            userId: ${nuevoPost.userId},
            id: ${nuevoPost.id},
            title: ${nuevoPost.title},
            body: ${nuevoPost.body}`);
        posts.push(nuevoPost);
    }
    else
    {
        console.log("Error al agregar el post. ")
    }
}
async function deletePost (idPost)
{
    const urlDelete = `${urlApi}/${idPost}`;

    let response = await fetch(urlDelete,{
        method : "DELETE"
    })

    if(response.ok)
    {
        posts.splice(idPost,1);
        console.log(`Post con id ${idPost} eliminado. `);
    }
    else
    {
        console.log(`Error al eliminar el post ${idPost} de la API.`);
    }
}
async function updatePost (idPost,postActualizado)
{
    const urlUpdate = `${urlApi}/${idPost}`;

    const opciones = {
        method: "PUT",
        headers: {
            "Content-Type":"application/json"
        },
        body: JSON.stringify(postActualizado)
    }
    const response = await fetch(urlUpdate,opciones);
    if(response.ok)
    {
        posts[idPost] = postActualizado;
        console.log("Post actualizado correctamente con nueva informacion. ");
    }
    else
    {
        console.log("No se ha actualizado correctamente el post.");
    }
}
function mostrarContenidoSegunID (idUsuario)
{
    posts.forEach(post => {
        if(post.userId === idUsuario)
        {
            console.log(`Datos del usuario buscado: 
            userId: ${post.userId},
            id: ${post.id},
            title: ${post.title},
            body: ${post.body}`);
        }
    })
}
})