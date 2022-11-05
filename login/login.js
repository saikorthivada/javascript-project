function validateAndSubmit() {
    const emailElement = document.getElementById('login_emailAddress');
    const emailErrorElement = document.getElementById('login_emailAddress_error');

    const passwordElement = document.getElementById('login_password');
    const passwordErrorElement = document.getElementById('login_password_error');

    let errorCount = 0;
    if (emailElement.value === '') {
        errorCount++;
        emailErrorElement.innerHTML = 'Email is required';
    } else {
        const regex = new RegExp(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/);
        if (!regex.test(emailElement.value)) {
            errorCount++;
            emailErrorElement.innerHTML = 'Email is not valid';
        } else {
            emailErrorElement.innerHTML = '';
        }
    }

    if(passwordElement.value === '') {
        errorCount++;
        passwordErrorElement.innerHTML = 'Password is required';
    } else {
        passwordErrorElement.innerHTML = '';
    }

    if(errorCount === 0) {
        let obj = {
            email: emailElement.value,
            password: passwordElement.value
        };
        login(obj);
    }
}

function login(userDetails) {
    const usersList = localStorage.getItem('users') ? JSON.parse(localStorage.getItem('users')) : [];
    if(usersList.length <= 0) {
        // No users exist
        showMessage('Invalid user credentials', 'no_user_error');
        showMessage('', 'success');
    } else {
        const index = usersList.findIndex(obj => obj.email === userDetails.email && obj.password === userDetails.password);
        if(index !== -1) {
            // There is a user exist
            showMessage('Login Success', 'success');
            localStorage.setItem('loggedInUser', userDetails.email);
            const login_clear_btn = document.getElementById('login_clear_btn');
            login_clear_btn.click();
            setTimeout(() => {
                navigateToDashboard();
            }, 1000);
            showMessage('', 'no_user_error');
        } else {
            // No user exist
            showMessage('Invalid user credentials', 'no_user_error');
            showMessage('', 'success');
        }
    }
}

function navigateToDashboard() {
    location.assign('./../dashboard/dashboard.html');
}

function navigateToRegister() {
    location.assign('./../register/register.html');
}

function showMessage(message, id) {
    const messageElement = document.getElementById(id);
    messageElement.innerHTML = message;
}

function showPassword(event) {
    const password_element = document.getElementById('login_password');
    password_element.type = event.target.checked ? 'text' : 'password';
}