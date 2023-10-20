document.addEventListener("DOMContentLoaded", function () {
    function addValidationListener(inputId, errorId, pattern, errorMessage) {
        let input = document.getElementById(inputId);
        let error = document.getElementById(errorId);

        input.addEventListener('input', function () {
            if (!pattern.test(input.value)) {
                error.textContent = errorMessage;
            } else {
                error.textContent = "";
            }
        });
        input.addEventListener('input', function () {
            let inputValue = input.value;
            let currentDate = new Date();
            let enteredDate = new Date(inputValue);

            if (!pattern.test(inputValue) || currentDate.getFullYear() - enteredDate.getFullYear() < 18 || currentDate.getFullYear() - enteredDate.getFullYear() > 90) {
                error.textContent = errorMessage;
            } else {
                error.textContent = "";
            }
        });
    }

    addValidationListener('first_name', 'error-first-name', /^[A-Za-zА-Яа-яЁёІіЇїҐґ]{2,20}$/, "Ім'я повинно містити лише літери і бути не більше 20 символів.");
    addValidationListener('last_name', 'error-last-name', /^[A-Za-zА-Яа-яЁёІіЇїҐґ]{2,40}$/, "Прізвище повинно містити лише літери і бути не більше 40 символів.");
    addValidationListener('surname', 'error-surname', /^[A-Za-zА-Яа-яЁёІіЇїҐґ]{2,20}$/, "По батькові повинно містити лише літери і бути не більше 20 символів.");
    addValidationListener('email', 'error-email', /^[a-zA-Z0-9.]+@[a-zA-Z0]+\.[a-zA-Z]{2,}$/, "Введіть коректну електрону адресу");
    addValidationListener('new_password', 'error-password', /^(?=.*[A-Z])(?=.*\d).{8,}$/, "Введіть коректний пароль");
    addValidationListener('age', 'error-age', /^(\d{4}-\d{2}-\d{2})$/, "Вам має не менше 18 і не більше 90 років.");
});
