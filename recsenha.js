document.addEventListener("DOMContentLoaded", function () {
    const formRecuperar = document.getElementById('formRecuperarSenha');
    const formRedefinir = document.getElementById('formRedefinirSenha');

    if (formRecuperar) {
        formRecuperar.addEventListener('submit', async function (event) {
            event.preventDefault();

            const email = document.querySelector('input[placeholder="Email"]').value;
            const palavraChave = document.querySelector('input[placeholder="Palavra-chave"]').value;

            const data = {
                email: email,
                wordKey: palavraChave
            };

            const options = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            };

            try {
                const response = await fetch('https://back-spider.vercel.app/user/RememberPassword', options);
                const responseData = await response.json();
                console.log('Resposta da API (Recuperar Senha):', responseData);

                if (response.ok && responseData.id) { // Corrigido para pegar "id" em vez de "userId"
                    localStorage.setItem('userId', responseData.id); // Agora salva corretamente
                    alert('Palavra-chave confirmada! Agora redefina sua senha.');

                    document.getElementById('telaRecuperar').classList.add('hidden');
                    document.getElementById('telaRedefinir').classList.remove('hidden');
                } else {
                    alert('Erro: ' + (responseData.message || 'ID do usuário não encontrado.'));
                }
            } catch (error) {
                console.error('Erro ao conectar-se à API:', error);
                alert('Erro ao tentar recuperar a senha. Tente novamente.');
            }
        });
    }

    if (formRedefinir) {
        formRedefinir.addEventListener('submit', async function (event) {
            event.preventDefault();

            const novaSenha = document.querySelector('input[placeholder="Nova Senha"]').value;
            const confirmarSenha = document.querySelector('input[placeholder="Confirmar Nova Senha"]').value;
            const userId = localStorage.getItem('userId');

            if (!userId) {
                alert('Erro: ID do usuário não encontrado. Refaça o processo de recuperação.');
                return;
            }

            if (novaSenha !== confirmarSenha) {
                alert('As senhas não coincidem!');
                return;
            }

            const data = { novaSenha: novaSenha };
            const options = {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            };

            try {
                console.log(`Enviando requisição para: https://back-spider.vercel.app/user/newPassword/${userId}`);
                const response = await fetch(`https://back-spider.vercel.app/user/newPassword/${userId}`, options);
                const responseData = await response.json();
                console.log('Resposta da API (Redefinir Senha):', responseData);

                if (response.ok) {
                    alert('Senha redefinida com sucesso! Faça login novamente.');
                    localStorage.removeItem('userId');
                    window.location.href = 'login.html';
                } else {
                    alert('Erro: ' + (responseData.message || 'Não foi possível redefinir a senha.'));
                }
            } catch (error) {
                console.error('Erro ao conectar-se à API:', error);
                alert('Erro ao tentar redefinir a senha. Tente novamente.');
            }
        });
    }
});
