let productos = [];
let carrito = [];

fetch('productos_usuario.json')
  .then(res => res.json())
  .then(data => {
    productos = data;
  });

document.getElementById('search').addEventListener('input', function () {
  const query = this.value.toLowerCase();
  const resultados = productos.filter(p =>
    p.Código.toLowerCase().includes(query) ||
    p.Concepto.toLowerCase().includes(query)
  );
  mostrarSugerencias(resultados);
});

function mostrarSugerencias(lista) {
  const contenedor = document.getElementById('suggestions');
  contenedor.innerHTML = '';
  if (lista.length === 0) {
    contenedor.innerHTML = '<p>No se encontraron coincidencias.</p>';
    return;
  }
  lista.forEach(p => {
    const div = document.createElement('div');
    div.textContent = `${p.Concepto} (${p.Código}) - ${p.Empresa}`;
    div.onclick = () => agregarAlCarrito(p.Código, p.Concepto);
    contenedor.appendChild(div);
  });
}

function agregarAlCarrito(codigo, concepto) {
  carrito.push({ codigo, concepto });
  actualizarCarrito();
}

function actualizarCarrito() {
  const ul = document.getElementById('cart');
  ul.innerHTML = '';
  carrito.forEach(item => {
    const li = document.createElement('li');
    li.textContent = `${item.concepto} (${item.codigo})`;
    ul.appendChild(li);
  });
}

function submitOrder() {
  localStorage.setItem('pedido', JSON.stringify(carrito));
  alert('Pedido enviado.');
}
