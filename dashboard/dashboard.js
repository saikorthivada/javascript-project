function navigateUserList() {
    location.assign('./../users/users.html');
}

function navigateToResetPassword() {
    location.assign('./../reset-password/reset-password.html');
}

function navigateToProfile() {
    location.assign('./../profile/profile.html');
}

function logout() {
    const confirmResult = confirm('Are you sure to logout');
    if(confirmResult) {
        localStorage.removeItem('loggedInUser');
        location.assign('./../login/login.html');
    }
}