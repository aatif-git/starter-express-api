// check password is string otherwise return false
function isStrongPassword(password) {
    const passwordRegex =
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=\[\]{};:"\\|,.<>\/?]).{8,}$/;
    return passwordRegex.test(password);
}

module.exports = { isStrongPassword };
