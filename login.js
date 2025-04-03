'use strict'

document.getElementById('FormularioLogin').addEventListener('submit', async function (event) {
    event.preventDefault()

    const email = document.getElementById('email').value
    const senha = document.getElementById('senha').value
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, senha })
    }
    const response = await fetch('https://back-spider.vercel.app/login', options )

    if (response.ok) {
        alert('Login feito com sucesso!!')
        
    } else {
        alert('nao foi possivel realizar o login!')
    }
})