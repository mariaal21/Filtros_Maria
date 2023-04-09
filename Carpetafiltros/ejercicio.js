const viajes = document.querySelector(".viajes");
const fragment = document.createDocumentFragment();
const filterContainer = document.querySelector("#filtros");
const searchResultDiv = document.querySelector("#fotosBuscadas");

//arrays de las fotos
const arrayFotos = [
    { foto: "viajes-1.jpg", texto: "playa tomando el sol", filtros: ["mar", "azul", "cielo"] },
    { foto: "viajes-2.jpg", texto: "baleares o cancun", filtros: ["mar", "azul", "nubes", "paisaje"] },
    { foto: "viajes-3.jpg", texto: "señales ciudad", filtros: ["nubes", "ciudad"] },
    { foto: "viajes-4.jpg", texto: "Imagen postal", filtros: ["puente", "azul", "ciudad"] },
    { foto: "viajes-5.jpg", texto: "punete precioso", filtros: ["puente", "cielo", "ciudad",] },
    { foto: "viajes-6.jpg", texto: "montañas", filtros: ["paisaje", "mar", "nubes", "azul"] },
    { foto: "viajes-7.jpg", texto: "ciudad en la montaña", filtros: ["azul", "ciudad", "paisaje"] }
];

const filtros = [
    "mar",
    "cielo",
    "paisaje",
    "ciudad",
    "azul",
    "puente",
    "nubes",
    "vacio",
];

document.addEventListener("click", ({ target }) => {
    if (target.matches(".filter")) {
        const id = target.id;
        filter(id);
    }
});

function pintarfotos(imageArray) {
    let html = "";
    imageArray.forEach((item) => {
      html += `
        <img alt="${item.texto}" src="viajes/${item.foto}" title="${item.texto}" class="card">
      `;
    });
    viajes.innerHTML = html;
  }
  


const filter = (id) => {
    viajes.innerHTML = "";
    searchResultDiv.innerHTML = "";
    let filteredImages = arrayFotos.filter((element) =>
        element.filtros.includes(id)
    );
    dibujarfiltradas(filteredImages, id);
};


const dibujarfiltradas = (imageArray, id) => {
    searchResultDiv.innerHTML = "";
  
    const filteredImages = imageArray.filter((item) => {
      return item.filtros.includes(id);
    });
  
    const searchResult = document.createElement("P");
    searchResult.innerHTML = `Su busqueda ha encontrado <strong>${filteredImages.length}</strong> imagenes de <strong>${id}</strong>`;
    searchResultDiv.append(searchResult);
  
    if (filteredImages.length === 0) {
      const noResult = document.createElement("P");
      noResult.innerHTML = `Su busqueda no ha encontrado ningun imagen de <strong>${id}</strong>`;
      searchResultDiv.append(noResult);
      return;
    }
  
    const fragment = document.createDocumentFragment();
    filteredImages.forEach((item) => {
      const cardImg = document.createElement("IMG");
      cardImg.alt = item.texto;
      cardImg.src = `viajes/${item.foto}`;
      cardImg.title = item.texto;
      cardImg.classList.add("card");
      fragment.append(cardImg);
    });
  
    viajes.innerHTML = "";
    viajes.append(fragment);
  };
  

  const pintarbotones = () => {
    const filterTitle = document.createElement("H2");
    filterTitle.textContent = "Filtrar";
    const botonfiltros = filtros.map(word => {
      const botonfiltros = document.createElement("BUTTON");
      botonfiltros.textContent = word;
      botonfiltros.setAttribute("id", word);
      botonfiltros.classList.add("filter");
      return botonfiltros;
    });
    filterContainer.append(filterTitle, ...botonfiltros);
  };
  

  const ampliarImagen = () => {
    const imagenes = document.querySelectorAll(".card");
    imagenes.forEach((item) => {
      item.addEventListener("click", () => {
        item.classList.toggle("ampliada");
      });
    });
  };


document.addEventListener("DOMContentLoaded", () => {
    pintarbotones();
    pintarfotos(arrayFotos);
    ampliarImagen()
});
