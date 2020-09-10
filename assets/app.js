// setTimeout(window.stop(),2000);

const gamedata= document.getElementById('Blogz');
const form= document.getElementById('add-game');
const loggedOut= document.querySelectorAll('.logged-out');
const loggedIn= document.querySelectorAll('.logged-in');
const entry= document.querySelector('.entryz');

var flag= 0;

const setUI= (user) => {
    //toggle UI elements
    if(user) {
        loggedIn.forEach(item => item.style.display='block');
        loggedOut.forEach(item => item.style.display='none');
        entry.style.display='block';
        flag= 1;
    } else {
        loggedIn.forEach(item => item.style.display='none');
        loggedOut.forEach(item => item.style.display='block');
        entry.style.display='none';
    }
}


// create elements & render games for logged in users
function render(doc){
    let ul = document.createElement('ul');
    let category = document.createElement('strong');
    let name = document.createElement('h3');
    let about = document.createElement('p');
    let cross = document.createElement('div');

    ul.setAttribute('data-id', doc.id);
    ul.setAttribute('class', "col p-4 d-flex flex-column position-static  no-gutters border rounded overflow-hidden  mb-4 shadow-sm h-md-250 position-relative");
    category.setAttribute('class', "d-inline-block mb-2 text-success");
    name.setAttribute('class', "mb-3");
    about.setAttribute('class', "mb-auto")
    cross.setAttribute('class', "del")
    cross.setAttribute("style", "text-align: end; cursor: pointer; color: red !important; margin-top: -15px; font-weight: 700; font-size: x-large;");

    category.textContent = doc.data().category;
    name.textContent = doc.data().name;
    about.textContent = doc.data().about; 
    cross.textContent = 'x';

    ul.appendChild(category);
    ul.appendChild(name);
    ul.appendChild(about);
    
    if(flag===1){
        ul.appendChild(cross);
    } 

    gamedata.appendChild(ul);

    //delete data
    cross.addEventListener('click', (e) => {
        e.stopPropagation();
        let id= e.target.parentElement.getAttribute('data-id');
        db.collection('Games').doc(id).delete();
    })
}



//Save data
form.addEventListener('submit', (e) => {
    e.preventDefault();
    db.collection('Games').add({
        category: form.category.value,
        name: form.name.value,
        about: form.about.value
    });
    form.category.value= '';
    form.name.value= '';
    form.about.value= '';
});

//real-time listner
db.collection('Games').orderBy('category').onSnapshot(snapshot => {
    let changes= snapshot.docChanges();
    changes.forEach(change => {
        if(change.type == 'added'){
            render(change.doc);
        }
        else if(change.type == 'removed'){
            let ul= gamedata.querySelector('[data-id='+change.doc.id + ']');
            gamedata.removeChild(ul);
        }
    })
})
