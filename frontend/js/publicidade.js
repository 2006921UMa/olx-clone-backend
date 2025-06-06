// js/publicidade.js

fetch(`${API_BASE}/api/publicidade`)
  .then(res => res.json())
  .then(publicidades => {

    console.log("PUBLICIDADES:", publicidades); // ###### Teste  #######

    const pubDiv = document.getElementById("publicidade");
    if (!Array.isArray(publicidades) || publicidades.length === 0) return;
    publicidades.forEach(pub => {
      const banner = document.createElement("div");
      banner.className = "banner-publicidade";
      banner.innerHTML = `
        <a href="${pub.link}" target="_blank">
          <img src="${BACKEND_URL}/uploads/${pub.image_url}" alt="${pub.descricao || "Publicidade"}" class="img-fluid">
        </a>
      `;
      pubDiv.appendChild(banner);
    });
  });
