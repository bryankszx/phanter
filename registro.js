'use strict'

document.getElementById('FormularioRegistro').addEventListener('submit', async function (event) {
    event.preventDefault()

    const usuario = document.querySelector('input[placeholder="Usuário"]').value
    const email = document.querySelector('input[placeholder="Email"]').value
    const senha = document.querySelector('input[placeholder="Senha"]').value
    const palavraChave = document.querySelector('input[placeholder="Palavra-chave"]').value

    const data = {
        nome: usuario,
        email: email,
        senha: senha,
        premium: 1,
        imagemPerfil: "https://preview.redd.it/is-there-a-sniper-default-pfp-that-someone-made-v0-78az45pd9f6c1.jpg?width=396&format=pjpg&auto=webp&s=5be4618605b25e0546d72dff52a7b897c3d4e1d4",
        senhaRecuperacao: palavraChave
    }

    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data) 
    }

    const response = await fetch('https://back-spider.vercel.app/user/cadastrarUser', options)

    if (response.ok) {
        alert('Registro feito com sucesso!')
        window.location.href = 'login.html'
    } else {
        alert('Não foi possível realizar o registro!')
    }
})
