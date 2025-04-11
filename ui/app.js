const API_BASE = 'http://localhost:3000/api/todos';

async function fetchTodos() {
  try {
    const response = await fetch(API_BASE);
    if (!response.ok) throw new Error('Failed to fetch todos');
    const todos = await response.json();
    displayTodos(todos);
  } catch (error) {
    console.error('Error:', error);
  }
}

function displayTodos(todos) {
  const todoList = document.getElementById('todo-list');
  todoList.innerHTML = '';

  todos.forEach(todo => {
    const card = document.createElement('div');
    card.className = `
      bg-white p-4 rounded-lg shadow-md flex flex-col justify-between h-full
      transform transition duration-500 ease-in-out
      ${todo.completed ? 'border-l-4 border-green-400' : 'border-l-4 border-yellow-400'}
      hover:scale-[1.02] hover:shadow-lg
    `;
    card.style.opacity = 0;

    card.innerHTML = `
      <div>
        <h3 class="text-lg font-semibold text-gray-800">${todo.title}</h3>
        <p class="text-sm text-gray-600 mt-1">${todo.description || ''}</p>
        <p class="text-sm text-gray-500 mt-2"><strong>Due:</strong> ${todo.dueDate?.split('T')[0] || 'N/A'}</p>
        <p class="text-sm mt-1 transition-colors duration-300 ${todo.completed ? 'text-green-600' : 'text-yellow-600'}">
          <strong>Status:</strong> ${todo.completed ? '✅ Completed' : '🕒 Pending'}
        </p>
      </div>
      <div class="flex gap-2 mt-4">
        <button onclick="toggleDone(${todo.id})" 
          class="transition-all duration-300 ease-in-out px-3 py-1 rounded text-sm text-white 
          ${todo.completed ? 'bg-yellow-500 hover:bg-yellow-600' : 'bg-green-500 hover:bg-green-600'}">
          ${todo.completed ? 'Undo' : 'Mark as Done'}
        </button>
        <button onclick="enableEdit(${todo.id})" 
          class="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm">
          Edit
        </button>
      </div>
    `;

    todoList.appendChild(card);
    setTimeout(() => {
      card.style.opacity = 1;
    }, 50);
  });
}

async function toggleDone(id) {
  try {
    await fetch(`${API_BASE}/${id}/done`, { method: 'PATCH' });
    showToast('Todo updated');
    fetchTodos();
  } catch (err) {
    console.error('Error toggling status:', err);
  }
}

function enableEdit(id) {
  fetch(`${API_BASE}/${id}`)
    .then(res => res.json())
    .then(todo => {
      const form = document.getElementById('edit-form');
      form.id.value = todo.id;
      form.title.value = todo.title;
      form.description.value = todo.description || '';
      form.dueDate.value = todo.dueDate?.split('T')[0] || '';
      openDrawer();
    })
    .catch(err => console.error('Failed to load todo for editing:', err));
}

function openDrawer() {
  document.getElementById('edit-drawer').classList.remove('translate-x-full');
}

function closeDrawer() {
  document.getElementById('edit-drawer').classList.add('translate-x-full');
}

async function submitEdit(e) {
  e.preventDefault();
  const form = e.target;
  const id = form.id.value;

  const data = {
    title: form.title.value,
    description: form.description.value,
    dueDate: form.dueDate.value
  };

  try {
    const res = await fetch(`${API_BASE}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });

    if (!res.ok) throw new Error('Update failed');
    closeDrawer();
    showToast('Todo updated');
    fetchTodos();
  } catch (err) {
    console.error('Error updating todo:', err);
  }
}

function showToast(message) {
  const toast = document.getElementById('toast');
  toast.textContent = message;
  toast.classList.remove('opacity-0');
  toast.classList.add('opacity-100');

  setTimeout(() => {
    toast.classList.remove('opacity-100');
    toast.classList.add('opacity-0');
  }, 2000);
}

document.addEventListener('DOMContentLoaded', fetchTodos);
