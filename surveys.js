document.addEventListener("DOMContentLoaded", function () {
  const surveysList = document.getElementById("surveys-list");

  function displaySurveys() {
    const surveys = JSON.parse(localStorage.getItem("surveys") || "[]");
    surveysList.innerHTML = "";

    if (surveys.length === 0) {
      surveysList.innerHTML =
        '<p class="no-surveys">У вас пока нет опросов</p>';
      return;
    }

    surveys.forEach((survey, index) => {
      const surveyCard = document.createElement("div");
      surveyCard.className = "survey-card";
      surveyCard.innerHTML = `
        <h2>${survey.title || "Опрос без названия"}</h2>
        <p>${survey.questions.length} вопросов</p>
        <div class="survey-actions">
          <button onclick="takeSurvey(${index})" class="take-btn">Пройти</button>
          <button onclick="viewSurvey(${index})" class="view-btn">Просмотреть</button>
          <button onclick="deleteSurvey(${index})" class="delete-btn">Удалить</button>
        </div>
      `;
      surveysList.appendChild(surveyCard);
    });
  }

  // Первоначальное отображение опросов
  displaySurveys();

  // Добавляем функции в глобальную область видимости
  window.viewSurvey = function (index) {
    const surveys = JSON.parse(localStorage.getItem("surveys") || "[]");
    const survey = surveys[index];

    // Сохраняем текущий опрос для просмотра
    localStorage.setItem("currentSurvey", JSON.stringify(survey));
    window.location.href = "view-survey.html";
  };

  window.deleteSurvey = function (index) {
    if (confirm("Вы уверены, что хотите удалить этот опрос?")) {
      const surveys = JSON.parse(localStorage.getItem("surveys") || "[]");
      surveys.splice(index, 1);
      localStorage.setItem("surveys", JSON.stringify(surveys));
      displaySurveys();
    }
  };

  window.takeSurvey = function (index) {
    const surveys = JSON.parse(localStorage.getItem("surveys") || "[]");
    const survey = surveys[index];

    localStorage.setItem("currentSurvey", JSON.stringify(survey));
    window.location.href = "take-survey.html";
  };
});
