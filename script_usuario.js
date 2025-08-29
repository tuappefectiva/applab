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
  mostrarResultados(resultados);
});

function mostrarResultados(lista) {
  const contenedor = document.getElementById('product-list');
  contenedor.innerHTML = '';
  lista.forEach(p => {
    const div = document.createElement('div');
    div.innerHTML = `<strong>${p.Concepto}</strong> (${p.Código}) - ${p.Empresa}
      <button onclick='agregarAlCarrito("${p.Código}", "${p.Concepto}")'>Agregar</button>`;
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
  alert('Pedido enviado.');
}