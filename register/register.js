function submitForm() {
    const firstNameElement = document.getElementById('firstName');
    const firstNameErrorElement = document.getElementById('firstName_error');

    const lastNameElement = document.getElementById('lastName');
    const lastNameErrorElement = document.getElementById('lastName_error');

    const phoneElement = document.getElementById('phoneNumber');
    const phoneErrorElement = document.getElementById('phoneNumber_error');

    const emailElement = document.getElementById('emailAddress');
    const emailErrorElement = document.getElementById('emailAddress_error');

    const passwordElement = document.getElementById('password');
    const passwordErrorElement = document.getElementById('password_error');

    const confirmPasswordElement = document.getElementById('confirmPassword');
    const confirmPasswordErrorElement = document.getElementById('confirmPassword_error');


    const iAgreeElement = document.getElementById('iagree');
    const iAgreeElementErrorElement = document.getElementById('iagree_error');

    let errorCount = 0;

    if (firstNameElement.value === '') {
        errorCount++;
        firstNameErrorElement.innerHTML = 'First name is required';
    } else {
        firstNameErrorElement.innerHTML = '';
    }

    if (lastNameElement.value === '') {
        errorCount++;
        lastNameErrorElement.innerHTML = 'Last name is required';
    } else {
        lastNameErrorElement.innerHTML = '';
    }

    if (phoneElement.value === '') {
        errorCount++;
        phoneErrorElement.innerHTML = 'Phone number is required';
    } else {
        if (phoneElement.value.length !== 10) {
            errorCount++;
            phoneErrorElement.innerHTML = 'Phone number is should contain 10 digits';
        } else {
            phoneErrorElement.innerHTML = '';
        }
    }

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

    if (passwordElement.value === '') {
        errorCount++;
        passwordErrorElement.innerHTML = 'Password is required';
    } else {
        if (passwordElement.value.length < 5 || passwordElement.value.length > 8) {
            errorCount++;
            passwordErrorElement.innerHTML = 'Password should be between 5 to 8 char';
        } else {
            passwordErrorElement.innerHTML = '';
        }

    }

    if (confirmPasswordElement.value === '') {
        errorCount++;
        confirmPasswordErrorElement.innerHTML = 'Confirm password is required';
    } else {
        if (confirmPasswordElement.value !== passwordElement.value) {
            errorCount++;
            confirmPasswordErrorElement.innerHTML = 'Confirm password should be equal to your password value';
        } else {
            confirmPasswordErrorElement.innerHTML = '';
        }

    }

    if (!iAgreeElement.checked) {
        errorCount++;
        iAgreeElementErrorElement.innerHTML = 'Please check this for registering';
    } else {
        iAgreeElementErrorElement.innerHTML = '';
    }

    if (errorCount === 0) {
        const recieveEmailsElement = document.getElementById('recieveEmails');
        const userDetails = {
            firstName: firstNameElement.value,
            lastName: lastNameElement.value,
            phoneNumber: phoneElement.value,
            email: emailElement.value,
            password: passwordElement.value,
            reciveEmails: recieveEmailsElement.checked
        };
        saveUser(userDetails);
    }
}

function saveUser(userDetails) {
    const duplicateError = document.getElementById('duplicate_error');
    const successElement = document.getElementById('success');
    const users = localStorage.getItem('users') ? JSON.parse(localStorage.getItem('users')) : [];
    if (users.length === 0) {
        users.push(userDetails);
        localStorage.setItem('users', JSON.stringify(users));
        duplicateError.innerHTML = '';
        successElement.innerHTML = 'Successfully registered';
        setTimeout(() => {
            login();
        }, 2000);
        clearForm();
    } else {
        const index = users.findIndex(obj => obj.email === userDetails.email);
        if (index === -1) {
            // No duplicate
            users.push(userDetails);
            localStorage.setItem('users', JSON.stringify(users));
            duplicateError.innerHTML = '';
            successElement.innerHTML = 'Successfully registered';
            setTimeout(() => {
                login();
            }, 2000);
            clearForm();
        } else {
            duplicateError.innerHTML = 'Already user exist with this email';
        }
    }
}

function clearForm() {
    const clearElement = document.getElementById('clear');
    clearElement.click();
}

function login() {
    location.assign('./../login/login.html');
}