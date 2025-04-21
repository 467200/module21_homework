document.getElementById('fetchBtn').addEventListener('click', async () => {
    const userId = document.getElementById('userIdInput').value.trim();
    const taskList = document.getElementById('taskList');

    taskList.innerHTML = '';

    if (!userId) {
      alert('Пожалуйста, введите ID пользователя');
      return;
    }

    try {
      
      const userResponse = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`);
      
      
      if (!userResponse.ok) {
        
        taskList.innerHTML = '<li style="color:red;">Пользователь с указанным ID не найден</li>';
        return;
      }

      const user = await userResponse.json();

     
      if (!user.id) {
        taskList.innerHTML = '<li style="color:red;">Пользователь с указанным ID не найден</li>';
        return;
      }

      
      const tasksResponse = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}/todos`);
      const tasks = await tasksResponse.json();

     
      if (tasks.length === 0) {
        taskList.innerHTML = '<li style="color:red;">У пользователя нет задач</li>';
      } else {
        tasks.forEach(task => {
          const li = document.createElement('li');
          li.textContent = task.title;
          if (task.completed) {
            li.classList.add('completed');
          }
          taskList.appendChild(li);
        });
      }

    } catch (error) {
      console.error('Ошибка:', error);
      taskList.innerHTML = '<li style="color:red;">Произошла ошибка при получении данных</li>';
    }
});
