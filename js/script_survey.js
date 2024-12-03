const content = document.getElementById("content");
const surveys = JSON.parse(localStorage.getItem("surveys")) || [];

// Открытие страницы создания опроса
document
  .getElementById("create-survey")
  .addEventListener("click", showCreateSurveyPage);

// Открытие личного кабинета
document
  .getElementById("view-dashboard")
  .addEventListener("click", showDashboardPage);

// Удаление опроса
function deleteSurvey(index) {
  surveys.splice(index, 1);
  localStorage.setItem("surveys", JSON.stringify(surveys));
  showDashboardPage();
}


function showCreateSurveyPage() {
    content.innerHTML = `
        <div class="container">
            <h2>Создать Опрос</h2>
            <form id="survey-form">
                <div class="input-group">
                    <input type="text" id="survey-title" placeholder="Название опроса" required>
                </div>
                <div id="questions-container" class="input-group">
                    <div class="question">
                        <input type="text" placeholder="Введите вопрос" required>
                        <select class="question-type">
                            <option value="text">Текстовый ответ</option>
                            <option value="radio">Один из списка</option>
                            <option value="checkbox">Несколько из списка</option>
                        </select>
                        <div class="answer-container"></div>
                        <button type="button" class="add-answer-btn">Добавить вариант ответа</button>
                    </div>
                </div>
                <button type="button" id="add-question">Добавить вопрос</button>
                <div class="button-group">
                    <button type="submit">Сохранить Опрос</button>
                </div>
            </form>
        </div>
    `;

    document.getElementById("add-question").addEventListener("click", addQuestion);
    document.getElementById("survey-form").addEventListener("submit", saveSurvey);

    // Добавляем функциональность добавления вариантов для первого вопроса
    document.querySelector(".add-answer-btn").addEventListener("click", function () {
        addAnswer(this);
    });
}

// Добавление нового вопроса
function addQuestion() {
    const container = document.getElementById("questions-container");
    const questionDiv = document.createElement("div");
    questionDiv.className = "question";

    questionDiv.innerHTML = `
        <input type="text" placeholder="Введите вопрос" required>
        <select class="question-type">
            <option value="text">Текстовый ответ</option>
            <option value="radio">Один из списка</option>
            <option value="checkbox">Несколько из списка</option>
        </select>
        <div class="answer-container"></div>
        <button type="button" class="add-answer-btn">Добавить вариант ответа</button>
    `;

    container.appendChild(questionDiv);

    // Добавляем функциональность для кнопки добавления вариантов ответа
    questionDiv.querySelector(".add-answer-btn").addEventListener("click", function () {
        addAnswer(this);
    });
}

// Добавление варианта ответа
function addAnswer(button) {
    const answerContainer = button.previousElementSibling; // Контейнер для вариантов ответа
    const answerInput = document.createElement("input");
    answerInput.type = "text";
    answerInput.placeholder = "Введите вариант ответа";
    answerContainer.appendChild(answerInput);
}

// Сохранение опроса
function saveSurvey(event) {
    event.preventDefault();

    const title = document.getElementById("survey-title").value;
    const questions = [...document.querySelectorAll("#questions-container .question")].map(question => {
        const questionText = question.querySelector("input").value;
        const questionType = question.querySelector(".question-type").value;

        let answers = [];
        if (questionType === "radio" || questionType === "checkbox") {
            answers = [...question.querySelectorAll(".answer-container input")].map(input => input.value);
        }

        return { text: questionText, type: questionType, answers };
    });

    const survey = { title, questions };
    surveys.push(survey);

    localStorage.setItem("surveys", JSON.stringify(surveys));
    alert("Опрос сохранен!");
    showDashboardPage();
}

// Просмотр опроса (обновлено для отображения ответов)
function viewSurvey(index) {
    const survey = surveys[index];
    content.innerHTML = `
        <div class="container">
            <h2>${survey.title}</h2>
            <ul>
                ${survey.questions.map(question => `
                    <li>
                        <strong>${question.text}</strong>
                        ${question.answers.length > 0 ? `
                            <ul>
                                ${question.answers.map(answer => `<li>${answer}</li>`).join("")}
                            </ul>
                        ` : ""}
                    </li>
                `).join("")}
            </ul>
            <button onclick="showDashboardPage()">Назад</button>
        </div>
    `;
}
