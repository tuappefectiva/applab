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
    const query = searchInput.value.toLowerCase();
    const resultados = productos.filter(p =>
      p.Código.toLowerCase().includes(query) ||
      p.Concepto.toLowerCase().includes(query)
    );
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
      div.textContent = `${p.Concepto} (${p.Código}) - ${p.Empresa}`;
      div.classList.add('suggestion-item');
      div.onclick = () => agregarAlCarrito(p.Código, p.Concepto);
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
