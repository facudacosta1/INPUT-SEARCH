const searchInput = document.getElementById('search-input');
const searchResult = document.getElementById('search-result');

async function fetchData(){
    try{
        const response = await fetch('data.json')
        if(!response.ok){
            throw new Error('Error al obtener json.')
        }
        data = await response.json(); // Asignar datos a la variable data
        mostrarFamiliares();
        alertaBtn();
        filterData('');
        
    } catch(error){
        console.error('Error:', error);
    }
}
fetchData();

function mostrarFamiliares(){
    const searchResult = document.getElementById('search-result');
    let content = `
        <p>${data.familia} ${data.miembros[0].nombre} </p>
        <p>${data.familia} ${data.miembros[1].nombre} </p>
        <p>${data.familia} ${data.miembros[2].nombre} </p>
        <p>${data.familia} ${data.miembros[3].nombre} </p>
        <p>${data.familia} ${data.miembros[4].nombre} </p>
    `; 
    searchResult.innerHTML = content; 
}

function alertaBtn (){
    const btn = document.getElementById('btn');
    btn.addEventListener('click', function(e){
        e.preventDefault();
        alert(data.familia);
    })
}

function filterData(searchTerm) {
    // Filtra los miembros de la familia que coinciden con el término de búsqueda
    const filteredMembers = data.miembros.filter(member => {
      return member.nombre.toLowerCase().includes(searchTerm.toLowerCase());
    });
  
    // Limpia cualquier contenido previo en el contenedor de resultados
    searchResult.innerHTML = '';
  
    // Muestra los resultados filtrados en el contenedor de resultados
    filteredMembers.forEach(member => {
      const memberDiv = document.createElement('div');
      memberDiv.textContent = `Nombre: ${member.nombre}, Edad: ${member.edad}, En Pareja: ${member.enPareja}`;
      searchResult.appendChild(memberDiv);
    });
  
    // Si no hay resultados, muestra un mensaje indicando que no se encontraron resultados
    if (filteredMembers.length === 0) {
      const noResultsDiv = document.createElement('div');
      noResultsDiv.textContent = 'No se encontraron resultados.';
      searchResult.appendChild(noResultsDiv);
    }
  }
  
  // Agrega un event listener al campo de búsqueda para filtrar los datos en respuesta a la entrada del usuario
  searchInput.addEventListener('input', function () {
    // Obtén el valor actual del campo de búsqueda
    const searchTerm = searchInput.value;
    
    // Llama a la función para filtrar los datos con el término de búsqueda actual
    filterData(searchTerm);
  });




