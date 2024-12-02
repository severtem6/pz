document.querySelectorAll('.input-group input').forEach(input => {
    input.addEventListener('focus', () => {
        input.parentNode.classList.add('focused');
    });
    input.addEventListener('blur', () => {
        input.parentNode.classList.remove('focused');
    });
});

const loginButton = document.querySelector('.login-button');
loginButton.addEventListener('mouseover', () => {
    loginButton.style.transform = 'scale(1.05)';
});
loginButton.addEventListener('mouseout', () => {
    loginButton.style.transform = 'scale(1)';
});
