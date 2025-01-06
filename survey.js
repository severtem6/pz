document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("survey-form");
  const addQuestionBtn = document.getElementById("add-question");
  const questionContainer = document.querySelector(".question-container");

  // Функция создания полей для вариантов ответа
  function createOptionsContainer(questionDiv) {
    const optionsContainer = document.createElement("div");
    optionsContainer.className = "options-container";
    optionsContainer.innerHTML = `
      <div class="option">
        <input type="text" class="option-text" placeholder="Вариант ответа">
        <button type="button" class="delete-option">×</button>
      </div>
      <button type="button" class="add-option">Добавить вариант</button>
    `;

    // Обработчик добавления нового варианта ответа
    const addOptionBtn = optionsContainer.querySelector(".add-option");
    addOptionBtn.addEventListener("click", () => {
      const optionDiv = document.createElement("div");
      optionDiv.className = "option";
      optionDiv.innerHTML = `
        <input type="text" class="option-text" placeholder="Вариант ответа">
        <button type="button" class="delete-option">×</button>
      `;

      optionsContainer.insertBefore(optionDiv, addOptionBtn);

      // Обработчик удаления варианта ответа
      optionDiv
        .querySelector(".delete-option")
        .addEventListener("click", () => {
          optionDiv.remove();
        });
    });

    // Добавляем обработчик для первоначальной кнопки удаления
    const firstDeleteBtn = optionsContainer.querySelector(".delete-option");
    firstDeleteBtn.addEventListener("click", () => {
      firstDeleteBtn.closest(".option").remove();
    });

    return optionsContainer;
  }

  // Функция создания нового вопроса
  function createQuestion() {
    const questionDiv = document.createElement("div");
    questionDiv.className = "question";
    questionDiv.innerHTML = `
      <input type="text" class="question-title" placeholder="Вопрос без заголовка">
      <select class="question-type">
        <option value="text">Текст</option>
        <option value="radio">Один из списка</option>
        <option value="checkbox">Несколько из списка</option>
      </select>
      <button type="button" class="delete-question">Удалить</button>
    `;

    const typeSelect = questionDiv.querySelector(".question-type");
    let optionsContainer = null;

    // Функция обновления контейнера опций
    function updateOptionsContainer() {
      if (optionsContainer) {
        optionsContainer.remove();
        optionsContainer = null;
      }

      if (typeSelect.value === "radio" || typeSelect.value === "checkbox") {
        optionsContainer = createOptionsContainer(questionDiv);
        questionDiv.appendChild(optionsContainer);
      }
    }

    // Обработчик изменения типа вопроса
    typeSelect.addEventListener("change", updateOptionsContainer);

    questionContainer.appendChild(questionDiv);

    // Обработчик удаления вопроса
    const deleteBtn = questionDiv.querySelector(".delete-question");
    deleteBtn.addEventListener("click", () => {
      questionDiv.remove();
    });

    // Вызываем функцию обновления контейнера при создании вопроса
    updateOptionsContainer();
  }

  addQuestionBtn.addEventListener("click", createQuestion);

  // Обработчик отправки формы
  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const questions = [];
    const surveyTitle = document.getElementById("survey-title").value.trim();
    document.querySelectorAll(".question").forEach((questionDiv) => {
      const type = questionDiv.querySelector(".question-type").value;
      const question = {
        title: questionDiv.querySelector(".question-title").value,
        type: type,
      };

      if (type === "radio" || type === "checkbox") {
        question.options = Array.from(
          questionDiv.querySelectorAll(".option-text")
        ).map((input) => input.value);
      }

      questions.push(question);
    });

    const survey = {
      title: surveyTitle || "Опрос без названия",
      questions: questions,
      createdAt: new Date().toISOString(),
    };

    // Сохраняем опрос в localStorage
    const surveys = JSON.parse(localStorage.getItem("surveys") || "[]");
    surveys.push(survey);
    localStorage.setItem("surveys", JSON.stringify(surveys));

    // Перенаправляем на страницу со списком опросов
    window.location.href = "surveys.html";
  });
});
