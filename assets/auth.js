console.clear()

//listening to authentication status changes
auth.onAuthStateChanged(user => {
    if(user) {
        console.log('user logged in: ', user);
        setUI(user);
    } else {
        console.log('user logged out: ', user);
        setUI();
    }
});

//Sign up
const signupform= document.getElementById("form-signup");
signupform.addEventListener('submit', (e) => {
    e.preventDefault();

    //Getting info
    const email= signupform['signup-email'].value;
    const password= signupform['signup-password'].value;

    console.log(email,password);

    //signing up
    auth.createUserWithEmailAndPassword(email, password).then(cred => {
        $('#Modal-signup').modal('hide');
        signupform.reset();
    })
});

//Signing out
const signout= document.getElementById('signout');
signout.addEventListener('click', (e) => {
    e.preventDefault();
    auth.signOut();
})

const loginform = document.getElementById('form-login');
loginform.addEventListener('submit', (e) => {
    e.preventDefault();

    //Getting info
    const email= loginform['login-email'].value;
    const password= loginform['login-password'].value;

    auth.signInWithEmailAndPassword(email, password).then(cred => {
        $('#Modal-login').modal('hide');
        loginform.reset();
    })
})