// Конфигурация OAuth для Яндекса
const yandexConfig = {
  clientID: "ВАШ_CLIENT_ID", // Получите в Яндекс OAuth
  redirectUri: "https://ваш-домен/callback",
  authUrl: "https://oauth.yandex.ru/authorize",
};

// Функция для инициализации авторизации через Яндекс
function initYandexAuth() {
  const authUrl = `${yandexConfig.authUrl}?response_type=token&client_id=${yandexConfig.clientID}&redirect_uri=${yandexConfig.redirectUri}`;
  window.location.href = authUrl;
}

// Обработчик callback от Яндекса
function handleYandexCallback() {
  const hash = window.location.hash.substring(1);
  const params = new URLSearchParams(hash);
  const accessToken = params.get("access_token");

  if (accessToken) {
    // Получаем информацию о пользователе
    fetch("https://login.yandex.ru/info?format=json", {
      headers: {
        Authorization: `OAuth ${accessToken}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        // Здесь обрабатываем данные пользователя
        console.log("Пользователь:", data);
        // Сохраняем данные в вашей системе
        saveUserData(data);
      })
      .catch((error) => console.error("Ошибка:", error));
  }
}
