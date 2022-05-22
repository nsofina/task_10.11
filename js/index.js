// элементы в DOM можно получить при помощи функции querySelector
const fruitsList = document.querySelector('.fruits__list'); // список карточек
const shuffleButton = document.querySelector('.shuffle__btn'); // кнопка перемешивания
const filterButton = document.querySelector('.filter__btn'); // кнопка фильтрации
const sortKindLabel = document.querySelector('.sort__kind'); // поле с названием сортировки
const sortTimeLabel = document.querySelector('.sort__time'); // поле с временем сортировки
const sortChangeButton = document.querySelector('.sort__change__btn'); // кнопка смены сортировки
const sortActionButton = document.querySelector('.sort__action__btn'); // кнопка сортировки
const kindInput = document.querySelector('.kind__input'); // поле с названием вида
const colorInput = document.querySelector('.color__input'); // поле с названием цвета
const weightInput = document.querySelector('.weight__input'); // поле с весом
const addActionButton = document.querySelector('.add__action__btn'); // кнопка добавления

// список фруктов в JSON формате
let fruitsJSON = `[
  {"kind": "Мангустин", "color": "фиолетовый", "weight": 13},
  {"kind": "Дуриан", "color": "зеленый", "weight": 35},
  {"kind": "Личи", "color": "розово-красный", "weight": 17},
  {"kind": "Карамбола", "color": "желтый", "weight": 28},
  {"kind": "Тамаринд", "color": "светло-коричневый", "weight": 22}
]`;

// преобразование JSON в объект JavaScript
let fruits = JSON.parse(fruitsJSON);

/*** ОТОБРАЖЕНИЕ ***/

// отрисовка карточек
const display = () => {
  // очищаем fruitsList от вложенных элементов,
  // чтобы заполнить актуальными данными из fruits
  fruitsList.innerHTML = null;

  for (let i = 0; i < fruits.length; i++) {
    // формируем новый элемент <li> при помощи document.createElement,
    // и добавляем в конец списка fruitsList при помощи document.appendChild

    let liFruit = document.createElement('li'); //создаем элемент li

    //назначаем ему классы в зависимости от названия фрукта:
    switch(fruits[i].kind) {
      case 'Мангустин': liFruit.className = 'fruit__item fruit_violet'; break
      case 'Дуриан': liFruit.className = 'fruit__item fruit_green'; break
      case 'Личи': liFruit.className = 'fruit__item fruit_carmazin'; break
      case 'Карамбола': liFruit.className = 'fruit__item fruit_yellow'; break
      case 'Тамаринд': liFruit.className = 'fruit__item fruit_lightbrown'; break
      default: liFruit.className = 'fruit__item fruit_red';
    } 

    let divFruit = document.createElement('div'); //создаем div для описания одного фрукта
    divFruit.className = 'fruit__info'; //назначаем ему класс
    liFruit.appendChild(divFruit); //вставляем его после li

    //создаем дивы для свойств фрукта:
    let divIndex = document.createElement('div');
    let divKind = document.createElement('div');
    let divColor = document.createElement('div');
    let divWeight = document.createElement('div');
    
    //вставляем эти дивы в родительский див:
    divFruit.appendChild(divIndex);
    divFruit.appendChild(divKind);
    divFruit.appendChild(divColor);
    divFruit.appendChild(divWeight);

    //назначаем дивам текст:
    divIndex.textContent = 'Номер: ' + i;
    divKind.textContent = 'Название: ' + fruits[i].kind;
    divColor.textContent = 'Цвет: ' + fruits[i].color;
    divWeight.textContent = 'Вес (кг): ' + fruits[i].weight;

    fruitsList.appendChild(liFruit); // и вставляем li в ul
  }
};

// первая отрисовка карточек
display();

/*** ПЕРЕМЕШИВАНИЕ ***/

function shuffleFruits() {
  let fruitsForShuffle = fruits.slice();//копируем массив
  //перемешиваем:
  for (let y = fruitsForShuffle.length - 1; y > 0; y--) {
  let z = Math.floor(Math.random() * (y + 1));
  [fruitsForShuffle[y], fruitsForShuffle[z]] = [fruitsForShuffle[z], fruitsForShuffle[y]];
  }
  //сравниваем и, если новый массив совпадает со старым, то просим перемешать еще раз:
  if (JSON.stringify(fruits) === JSON.stringify(fruitsForShuffle)) {
    alert ('Перемешайте еще раз');
  }
  //возвращаем результат:
  fruits = fruitsForShuffle;
  return fruits;
}

//работает кнопка перемешивания
shuffleButton.addEventListener('click', () => {
  shuffleFruits();
  display();
});

/*** ФИЛЬТРАЦИЯ ***/

// фильтрация массива
const filterFruits = () => {
  fruits.filter((item) => {
    // TODO: допишите функцию
  });
};

filterButton.addEventListener('click', () => {
  filterFruits();
  display();
});

/*** СОРТИРОВКА ***/

let sortKind = 'bubbleSort'; // инициализация состояния вида сортировки
let sortTime = '-'; // инициализация состояния времени сортировки

const comparationColor = (a, b) => {
  // TODO: допишите функцию сравнения двух элементов по цвету
};

const sortAPI = {
  bubbleSort(arr, comparation) {
    // TODO: допишите функцию сортировки пузырьком
  },

  quickSort(arr, comparation) {
    // TODO: допишите функцию быстрой сортировки
  },

  // выполняет сортировку и производит замер времени
  startSort(sort, arr, comparation) {
    const start = new Date().getTime();
    sort(arr, comparation);
    const end = new Date().getTime();
    sortTime = `${end - start} ms`;
  },
};

// инициализация полей
sortKindLabel.textContent = sortKind;
sortTimeLabel.textContent = sortTime;

sortChangeButton.addEventListener('click', () => {
  // TODO: переключать значение sortKind между 'bubbleSort' / 'quickSort'
});

sortActionButton.addEventListener('click', () => {
  // TODO: вывести в sortTimeLabel значение 'sorting...'
  const sort = sortAPI[sortKind];
  sortAPI.startSort(sort, fruits, comparationColor);
  display();
  // TODO: вывести в sortTimeLabel значение sortTime
});

/*** ДОБАВИТЬ ФРУКТ ***/

addActionButton.addEventListener('click', () => {
  // создание и добавление нового фрукта в массив fruits
  // необходимые значения берем из kindInput, colorInput, weightInput
  //выводим предупреждение, если значения некорретны
  if (kindInput.value === '' || colorInput.value === '' ||  weightInput.value === '' || parseInt(weightInput.value) <= 0 || isNaN(parseInt(weightInput.value))) {
    alert ('Введите корректные значения');
  }
  else {
    //создаем новый объект-фрукт:
  let newFruit = {
    kind: kindInput.value,
    color: colorInput.value,
    weight: weightInput.value
  };
  // добавляем его к массиву фруктов и показываем на экране:
  fruits.push(newFruit);
  display();
  }
  //очищаем значения в полях ввода:
  kindInput.value = null; 
  colorInput.value = null;
  weightInput.value = null;
  });
