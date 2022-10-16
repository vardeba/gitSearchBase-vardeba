const ul = document.querySelector('.recentsList');

function showUserSearched(array){
    array.forEach(user => {
        let newUser = user;
        let userReady = createUser(newUser);
        ul.appendChild(userReady);
    });
};

function createUser(user){
    const li = document.createElement('li');
    li.classList.add('recentSearched');
    li.setAttribute('id', `${user.id}`);

    const a = document.createElement('a');
    a.classList.add('dev-img-container');
    a.setAttribute('href', `#`);

    const img = document.createElement('img');
    img.classList.add('dev-pic');
    img.setAttribute('src', `${user.avatar_url}`);
    img.setAttribute('alt', `Foto de ${user.name}`);

    const button = document.createElement('button');
    button.classList.add('showProfile');
    button.innerText = "Acessar este perfil";

    a.appendChild(img);
    li.append(a, button);

    return li;

}

showUserSearched(usersSearched);

function search(){
    const button = document.getElementById('searchButton');

    button.addEventListener('click', () => {
        button.innerHTML = '';

        const img = document.createElement('img');
        img.setAttribute('src', '../../assets/spinner.svg');
        img.setAttribute('alt', "spinner");
        img.classList.add('loading');

        button.appendChild(img);
    })
}

search();




















