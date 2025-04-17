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
      perfilImg.src = data.fotoPerfil || "https://preview.redd.it/is-there-a-sniper-default-pfp-that-someone-made-v0-78az45pd9f6c1.jpg?width=396&format=pjpg&auto=webp&s=5be4618605b25e0546d72dff52a7b897c3d4e1d4";
  
      if (data.banner) {
        bannerImg.style.backgroundImage = `url('${data.banner}')`;
        bannerImg.style.backgroundSize = "cover";
        bannerImg.style.backgroundPosition = "center";
      }
  
      seguidoresCount.textContent = data.seguidores;
      seguindoCount.textContent = data.seguindo;
  
    } catch (error) {
      console.error(error);
    }
  });
   