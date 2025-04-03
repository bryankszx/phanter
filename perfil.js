document.addEventListener("DOMContentLoaded", async function () {
    const perfilNome = document.getElementById("perfilNome");
    const perfilBio = document.getElementById("perfilBio");
    const perfilImg = document.getElementById("perfilImg");
    const bannerImg = document.getElementById("bannerImg");
    const seguidoresCount = document.getElementById("seguidoresCount");
    const seguindoCount = document.getElementById("seguindoCount");

    try {
        const response = await fetch("https://back-spider.vercel.app/perfil");
        if (!response.ok) {
            throw new Error("Erro ao carregar perfil.");
        }

        const data = await response.json();

        perfilNome.textContent = data.nome;
        perfilBio.textContent = data.bio;
        perfilImg.src = data.fotoPerfil || "default-profile.png";
        bannerImg.src = data.banner || "default-banner.jpg";
        seguidoresCount.textContent = data.seguidores;
        seguindoCount.textContent = data.seguindo;
    } catch (error) {
        console.error(error);
    }
});
