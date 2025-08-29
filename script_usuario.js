let productos = [];
let carrito = [];

document.addEventListener('DOMContentLoaded', () => {
  const searchInput = document.getElementById('search');
  const suggestions = document.getElementById('suggestions');
  const cartList = document.getElementById('cart');

  // Cargar productos desde JSON
  fetch('productos_usuario.json')
    .then(res => res.json())
    .then(data => {
      productos = data;
    });

  // Buscar coincidencias al escribir
  searchInput.addEventListener('input', () => {
    const query = searchInput.value.toLowerCase().trim();
    if (query.length === 0) {
      suggestions.innerHTML = '';
      return;
    }

    const resultados = productos.filter(p => {
      const codigo = p.Código?.toLowerCase() || '';
      const nombre = p.Productos?.toLowerCase() || p.Concepto?.toLowerCase() || '';
      return codigo.includes(query) || nombre.includes(query);
    });

    mostrarSugerencias(resultados);
  });

  // Mostrar sugerencias en listado desplegable
  function mostrarSugerencias(lista) {
    suggestions.innerHTML = '';
    if (lista.length === 0) {
      suggestions.innerHTML = '<p>No se encontraron coincidencias.</p>';
      return;
    }

    lista.forEach(p => {
      const div = document.createElement('div');
      const nombre = p.Productos || p.Concepto;
      div.textContent = `${nombre} (${p.Código}) - ${p.Empresa}`;
      div.style.border = '1px solid #ccc';
      div.style.padding = '10px';
      div.style.marginBottom = '5px';
      div.style.cursor = 'pointer';
      div.onclick = () => agregarAlCarrito(p.Código, nombre);
      suggestions.appendChild(div);
    });
  }

  // Añadir al carrito
  function agregarAlCarrito(codigo, concepto) {
    carrito.push({ codigo, concepto });
    actualizarCarrito();
    suggestions.innerHTML = '';
    searchInput.value = '';
  }

  // Mostrar carrito
  function actualizarCarrito() {
    cartList.innerHTML = '';
    carrito.forEach(item => {
      const li = document.createElement('li');
      li.textContent = `${item.concepto} (${item.codigo})`;
      cartList.appendChild(li);
    });
  }

  // Enviar pedido
  window.submitOrder = function () {
    localStorage.setItem('pedido', JSON.stringify(carrito));
    alert('Pedido enviado.');
  };
});
