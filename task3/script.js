const userName = localStorage.getItem('userName');
const lastVisit = localStorage.getItem('lastVisit');


const now = new Date();
const formattedDate = now.toLocaleString('ru-RU', {
  day: '2-digit',
  month: 'long',
  year: 'numeric',
  hour: '2-digit',
  minute: '2-digit'
});

if (!userName || !lastVisit) {
  // пользователь зашел в первый раз
  const name = prompt("Добро пожаловать! Назовите, пожалуйста, ваше имя");
  if (name) {
    localStorage.setItem('userName', name);
    localStorage.setItem('lastVisit', formattedDate);
  }
} else {
  // пользователь открывает страницу не впервые
  alert(`Добрый день, ${userName}! Давно не виделись. В последний раз вы были у нас ${lastVisit}`);
  localStorage.setItem('lastVisit', formattedDate); // Обновляем дату визита
}
