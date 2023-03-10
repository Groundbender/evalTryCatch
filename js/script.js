const filterByType = (type, ...values) =>
    values.filter((value) => typeof value === type),
  // в ф-ию filterByType принимаем тип и с помощью rest оператора принимаем аргументы, которые будут в массиве values и с помощью filter находим тип данных value, который  будет совпадать с типом type

  hideAllResponseBlocks = () => {
    // функция скрывает элементы на странице
    const responseBlocksArray = Array.from(
      document.querySelectorAll("div.dialog__response-block")
    ); // формируем массив из nodelist полученного методом querySelectorALl
    responseBlocksArray.forEach((block) => (block.style.display = "none")); // перебираем массив и скрываем его все элементы
  },
  showResponseBlock = (blockSelector, msgText, spanSelector) => {
    // функция показывает элементы на странице  (принимает селектор блока, который нужно отобразить, текстовое содержимое, которое отобразится в span, который передали 3-м параметром )
    hideAllResponseBlocks(); // скрываем все блоки с помощью ф-ии выше
    document.querySelector(blockSelector).style.display = "block"; // задаем d-block элементу с классом, который мы передали в параметр ф-ии
    if (spanSelector) {
      document.querySelector(spanSelector).textContent = msgText;
    } // если span существует мы записываем в него переданный текст
  },
  showError = (msgText) =>
    showResponseBlock(".dialog__response-block_error", msgText, "#error"), // функция отображения ошибок
  showResults = (msgText) =>
    showResponseBlock(".dialog__response-block_ok", msgText, "#ok"), // функция показывающая успешное выполнение программы
  showNoResults = () => showResponseBlock(".dialog__response-block_no-results"), // функция выводи пока что нечего показать
  tryFilterByType = (type, values) => {
    // функция получает тип из селекта Этип данных и значение инпута "тип"
    try {
      const valuesArray = eval(`filterByType('${type}', ${values})`).join(", "); // в ф-ии eval вызываем ф-ию filterByType и с помощью join переводим массив, полученный из этой ф-ии в строку и записываем это значение в переменную valuesArray
      const alertMsg = valuesArray.length
        ? `Данные с типом ${type}: ${valuesArray}`
        : `Отсутствуют данные типа ${type}`; // если длина полученной строки не равна 0 в переменную alertMsg записываем строку и передаем в эту строку тип данных из селекта и значения из инпута, которые подходят под тип данных или сработает else и в alertMsg запишется сообщение что отсутсвует тип данных
      showResults(alertMsg); // вызываем showResults и передаем в нее текст из alertMsg
    } catch (e) {
      showError(`Ошибка: ${e}`);
    } // отлавливаем ошибку, если таковые есть и вызываем ф-ию показа ошибок showError
  };

const filterButton = document.querySelector("#filter-btn"); // получаем со страницы кнопку фильтровать

filterButton.addEventListener("click", (e) => {
  const typeInput = document.querySelector("#type");
  const dataInput = document.querySelector("#data"); // вешаем слушатель на кнопку и внутри обработчика находим на страинцы селект с "тип данных"  и инпут с "Данные"

  if (dataInput.value === "") {
    // проверка на пустую строку в инпуте "Данные"
    dataInput.setCustomValidity("Поле не должно быть пустым!"); // если поле пустое то запускаем метод setCustomValidity, который выведет сообщение с ошибкой, что поле пустое
    showNoResults();
  } else {
    dataInput.setCustomValidity(""); // иначе метод показывающий ошибку будет пустыми
    e.preventDefault(); // отменяем стандартное поведение при клике
    tryFilterByType(typeInput.value.trim(), dataInput.value.trim()); //запускаем ф-ию tryFilterByType, в которую передаем значения инпутов удаляя пробелы в начале и в конце
  }
});
