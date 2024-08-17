// Selecciona el contenedor en el HTML donde se mostrará la lista de Pokémon.
const listaPokemon = document.querySelector("#listaPokemon"); 

// Selecciona todos los botones del menú de tipos de Pokémon en la cabecera.
const botonesHeader = document.querySelectorAll(".btn-header"); 

// Define la URL base para acceder a la API de Pokémon.
let URL = "https://pokeapi.co/api/v2/pokemon/";

// Hace una petición a la API para obtener datos de los primeros 151 Pokémon. 
// Por cada Pokémon, llama a la función `mostrarPokemon` para renderizarlo en la página.
for (let i = 1; i <= 151; i++) { 
    fetch(URL + i)
        .then((response) => response.json())
        .then(data => mostrarPokemon(data));
}

function mostrarPokemon(poke) {
    // Genera un string con el tipo o los tipos del Pokémon, aplicando clases CSS correspondientes al tipo.
    let tipos = poke.types.map((type) => `<p class="${type.type.name} tipo">${type.type.name}</p>`);
    tipos = tipos.join('');

    // Formatea el ID del Pokémon para que siempre tenga 3 dígitos, añadiendo ceros si es necesario.
    let pokeId = poke.id.toString();
    if (pokeId.length === 1) {
        pokeId = "00" + pokeId;
    } else if (pokeId.length === 2) {
        pokeId = "0" + pokeId;
    }

      // Crea un nuevo elemento `div` para cada Pokémon, y lo inserta en el contenedor `listaPokemon`.
    const div = document.createElement("div");
    div.classList.add("pokemon");
    div.innerHTML = `
        <p class="pokemon-id-back">#${pokeId}</p>
        <div class="pokemon-imagen">
            <img src="${poke.sprites.other["official-artwork"].front_default}" alt="${poke.name}">
        </div>
        <div class="pokemon-info">
            <div class="nombre-contenedor">
                <p class="pokemon-id">#${pokeId}</p>
                <h2 class="pokemon-nombre">${poke.name}</h2>
            </div>
            <div class="pokemon-tipos">
                ${tipos}
            </div>
            <div class="pokemon-stats">
                <p class="stat">${poke.height}m</p>
                <p class="stat">${poke.weight}kg</p>
            </div>
        </div>
    `;
    listaPokemon.append(div);
}

// Añade un evento de clic a cada botón del menú. 
// Dependiendo del botón clickeado, filtra los Pokémon según su tipo y los muestra en la página.
botonesHeader.forEach(boton => boton.addEventListener("click", (event) => {
    const botonId = event.currentTarget.id;
    listaPokemon.innerHTML = "";
    // Vacia la lista de Pokémon cuando se hace clic en cualquier botón del menú.

    for (let i = 1; i <= 151; i++) {
        fetch(URL + i)
            .then((response) => response.json())
            .then(data => {
                if (botonId === "ver-todos") {
                    mostrarPokemon(data);
                } else {
                    const tipos = data.types.map(type => type.type.name);
                    if (tipos.some(tipo => tipo.includes(botonId))) {
                        mostrarPokemon(data);
                    }
                }
            });
    }
}));

