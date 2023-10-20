function registerUser() {
    let firstName = document.registration.first_name.value;
    let lastName = document.registration.last_name.value;
    let surname = document.registration.surname.value;
    let email = document.registration.email.value;
    let phone = document.registration.phone.value;
    let sex = document.querySelector('input[name="sex"]:checked').value;
    let accountType = document.querySelector('input[name="account_type"]:checked').value;
    let age = document.registration.age.value;
    let referrer = document.registration.referrer.value;
    let bio = document.registration.bio.value;
    let id = new Date().getTime();

    let user = {
        id: id,
        firstName: firstName,
        lastName: lastName,
        surname: surname,
        email: email,
        phone: phone,
        sex: sex,
        accountType: accountType,
        age: age,
        referrer: referrer,
        bio: bio
    };

    // Отримання наявних користувачів із локального сховища або ініціалізування нового масиву, якщо їх немає
    let users = JSON.parse(localStorage.getItem('users')) || [];

    // Додавання нового юзера до існуючих юзерів
    users.push(user);

    // Зберігання оновленого списку юзерів
    localStorage.setItem('users', JSON.stringify(users));

    // Оновлення таблиці
    updateTable();

    // Очищення форми
    document.registration.reset();
}

// Функція для оновлення таблиці на основі локальних даних
function updateTable() {
    // Отримання існуючих юзерів із локального сховища
    let users = JSON.parse(localStorage.getItem('users')) || [];

    // Отримання елементів/тегів таблиці
    let table = document.getElementById("data_table").getElementsByTagName
    ("tbody")[0];

    // Очищення таблиці
    table.innerHTML = "";

    // Додавання кожного юзера до таблиці
    for (let user of users) {
        let newRow = table.insertRow();
        let newCell = newRow.insertCell();
        let checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.dataset.id = user.id;
        newCell.appendChild(checkbox);
        newRow.innerHTML += `<td>${user.id}</td><td>${user.firstName}</td><td>${user.lastName}</td><td>${user.surname}
        </td><td>${user.email}</td><td>${user.phone}</td><td>${user.sex}</td><td>${user.accountType}</td>
        <td>${user.age}</td><td>${user.referrer}</td><td>${user.bio}</td>`;
    }
}

$('#delete-button').click(() => {
    $(':checkbox:checked').each(function () {
        let row = $(this).closest('tr');
        let id = parseInt($(this).data('id'));
        let users = JSON.parse(localStorage.getItem('users'));

        let index = users.findIndex(user => user.id === id);

        if (index !== -1) {
            users.splice(index, 1);
            localStorage.setItem('users', JSON.stringify(users));
            row.remove();
        }
    });
});

$('#duplicate-button').click(() => {
    $(':checkbox:checked').each(function () {

        let row = $(this).closest('tr');
        let oldId = parseInt($(this).data('id'));
        let id = new Date().getTime(); // Генерація унікального ID
        let users = JSON.parse(localStorage.getItem('users'));
        let user = users.find(user => user.id === oldId);

        if (user) {
            let newUser = {...user, id};  // Дублювання юзера з новим ID
            users.push(newUser);
            localStorage.setItem('users', JSON.stringify(users));
        }

        let clonedRow = row.clone();
        clonedRow.find('input[type="checkbox"]').data('id', id); // Оновлення ID даних чекбоксу
        clonedRow.find('td:nth-child(1)').text(id); // Оновлення ID юзера в рядку
        $('#data_table tbody').append(clonedRow); // Занесення продубльованого рядка в таблицю
    });
    updateTable(); // Оновлення таблиці
});

// Виклик функції після завантаження сторінки
$(document).ready(updateTable);


