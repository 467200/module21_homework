const randomNumberPromise = new Promise((resolve, reject) => {
    setTimeout(() => {
      const number = Math.floor(Math.random() * 100) + 1;
  
      if (number % 2 === 0) {
        resolve(number);
      } else {
        reject(number);
      }
    }, 3000);
  });
  
  randomNumberPromise
    .then((number) => {
      console.log(`Завершено успешно. Сгенерированное число — ${number}`);
    })
    .catch((number) => {
      console.log(`Завершено с ошибкой. Сгенерированное число — ${number}`);
    });
  
