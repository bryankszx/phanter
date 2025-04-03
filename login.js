'use strict'

document.getElementById('FormularioLogin').addEventListener('submit', async function (event) {
    event.preventDefault();

    const email = document.getElementById('email').value;
    const senha = document.getElementById('senha').value;
    
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email: email, senha: senha })
    };

    try {
        const response = await fetch('https://back-spider.vercel.app/login', options);
        const responseData = await response.json();

        console.log('Resposta da API:', responseData); // Debug para verificar o que a API retorna

        if (response.ok) {
            localStorage.setItem('userData', JSON.stringify(responseData)); 
            alert('Login feito com sucesso!!');
            window.location.href = 'perfil.html';
        } else {
            alert('Erro: ' + (responseData.message || 'Não foi possível realizar o login!'));
        }
    } catch (error) {
        console.error('Erro na requisição:', error);
        alert('Erro ao conectar com o servidor. Tente novamente mais tarde.');
    }
});
