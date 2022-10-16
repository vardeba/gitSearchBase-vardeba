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
























