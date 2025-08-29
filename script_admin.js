const pedidos = JSON.parse(localStorage.getItem('pedido')) || [];
const contenedor = document.getElementById('pedidos');

if (pedidos.length === 0) {
  contenedor.innerHTML = '<p>No hay pedidos registrados.</p>';
} else {
  const ul = document.createElement('ul');
  pedidos.forEach(item => {
    const li = document.createElement('li');
    li.textContent = `${item.concepto} (${item.codigo})`;
    ul.appendChild(li);
  });
  contenedor.appendChild(ul);
}
