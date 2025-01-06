document.addEventListener("DOMContentLoaded", function () {
  const surveysCount = document.getElementById("surveys-count");
  const responsesCount = document.getElementById("responses-count");
  const recentSurveys = document.getElementById("recent-surveys");

  function updateStats() {
    const surveys = JSON.parse(localStorage.getItem("surveys") || "[]");
    const responses = JSON.parse(
      localStorage.getItem("surveyResponses") || "[]"
    );

    surveysCount.textContent = surveys.length;
    responsesCount.textContent = responses.length;

    // Показываем последние 5 опросов
    const recentSurveysList = surveys.slice(-5).reverse();

    if (recentSurveysList.length === 0) {
      recentSurveys.innerHTML =
        '<p class="no-surveys">У вас пока нет опросов</p>';
      return;
    }

    recentSurveys.innerHTML = recentSurveysList
      .map(
        (survey, index) => `
        <div class="recent-survey-item">
          <div class="survey-info">
            <h3>${survey.title || "Опрос без названия"}</h3>
            <p>${survey.questions.length} вопросов</p>
            <p class="survey-date">Создан: ${new Date(
              survey.createdAt
            ).toLocaleDateString()}</p>
          </div>
          <div class="survey-actions">
            <button onclick="viewSurvey(${
              surveys.length - 5 + index
            })" class="view-btn">Просмотреть</button>
          </div>
        </div>
      `
      )
      .join("");
  }

  updateStats();

  // Добавляем функцию просмотра в глобальную область
  window.viewSurvey = function (index) {
    const surveys = JSON.parse(localStorage.getItem("surveys") || "[]");
    const survey = surveys[index];
    localStorage.setItem("currentSurvey", JSON.stringify(survey));
    window.location.href = "view-survey.html";
  };
});
