document.addEventListener("DOMContentLoaded", () => {
  createTable();
});

// Функція для створення таблиці 6x6
function createTable() {
  const table = document.getElementById("colorTable");
  let cellNumber = 1;

  for (let i = 0; i < 6; i++) {
    const row = table.insertRow();
    for (let j = 0; j < 6; j++) {
      const cell = row.insertCell();
      cell.innerText = cellNumber;
      cell.dataset.cellNumber = cellNumber;
      cellNumber++;

      // Обробка подій для клітинки з номером 7
      if (cell.dataset.cellNumber == 7) {
        cell.addEventListener("mouseover", () => changeColorRandom(cell));
        cell.addEventListener("click", () => changeColorSelected(cell));
        cell.addEventListener("dblclick", () => changeRowColors(i));
      }
    }
  }
}

// Зміна кольору на випадковий при наведенні
function changeColorRandom(cell) {
  cell.style.backgroundColor = getRandomColor();
}

// Зміна кольору на вибраний з палітри при кліку
function changeColorSelected(cell) {
  const color = document.getElementById("colorPicker").value;
  cell.style.backgroundColor = color;
}

// Зміна кольору рядків таблиці починаючи з обраного, через один
function changeRowColors(startRowIndex) {
  const table = document.getElementById("colorTable");
  const color = document.getElementById("colorPicker").value;

  for (let i = startRowIndex; i < table.rows.length; i += 2) {
    for (let j = 0; j < table.rows[i].cells.length; j++) {
      table.rows[i].cells[j].style.backgroundColor = color;
    }
  }
}

// Функція для отримання випадкового кольору
function getRandomColor() {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

// Перевірка форми
function validateForm() {
  const fullName = document.getElementById("fullName");
  const variant = document.getElementById("variant");
  const phone = document.getElementById("phone");
  const faculty = document.getElementById("faculty");
  const adress = document.getElementById("adress");

  let valid = true;

  // Перевірка ПІБ
  if (
    !/^[А-ЯІЇЄҐа-яіїєґA-Za-z]{2,}\s[А-ЯІЇЄҐа-яіїєґA-Za-z]\.[А-ЯІЇЄҐа-яіїєґA-Za-z]\.$/.test(
      fullName.value
    )
  ) {
    fullName.classList.add("error");
    valid = false;
  } else {
    fullName.classList.remove("error");
  }

  // Перевірка Варіанту
  if (!/^\d{2}$/.test(variant.value)) {
    variant.classList.add("error");
    valid = false;
  } else {
    variant.classList.remove("error");
  }

  // Перевірка Телефону
  if (!/^\(\d{3}\)-\d{3}-\d{2}-\d{2}$/.test(phone.value)) {
    phone.classList.add("error");
    valid = false;
  } else {
    phone.classList.remove("error");
  }

  // Перевірка Факультету
  if (!/^[А-ЯІЇЄҐа-яіїєґA-Za-z]{4}$/.test(faculty.value)) {
    faculty.classList.add("error");
    valid = false;
  } else {
    faculty.classList.remove("error");
  }

  // Перевірка Адреси
  if (!/^м. \d{6}$/.test(adress.value)) {
    adress.classList.add("error");
    valid = false;
  } else {
    adress.classList.remove("error");
  }

  const resultMessage = document.getElementById("resultMessage");
  if (valid) {
    resultMessage.innerHTML = `<strong>Введені дані:</strong><br>ПІБ: ${fullName.value}<br>Варіант: ${variant.value}<br>Телефон: ${phone.value}<br>Факультет: ${faculty.value}<br>Адрест: ${adress.value}`;
  } else {
    resultMessage.innerHTML =
      "<strong>Помилка:</strong> Перевірте введені дані та спробуйте ще раз.";
  }
}
