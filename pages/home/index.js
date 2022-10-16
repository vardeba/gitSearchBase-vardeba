getDataFromLocalstorage()

const ul = document.querySelector('.recentsList');

const button = document.getElementById('searchButton');

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
    a.setAttribute('id', `${user.id}`);
    a.setAttribute('href', `#`);

    const img = document.createElement('img');
    img.classList.add('dev-pic');
    img.setAttribute('id', `${user.id}`);
    img.setAttribute('src', `${user.avatar_url}`);
    img.setAttribute('alt', `Foto de ${user.name}`);

    const button = document.createElement('button');
    button.classList.add('showProfile');
    button.setAttribute('id', `${user.id}`);
    button.innerText = "Acessar este perfil";

    a.appendChild(img);
    li.append(a, button);

    return li;

};

showUserSearched(usersSearched);

function showFromList(array){
    const users = document.querySelectorAll('.recentSearched');
    users.forEach(button => {
        button.addEventListener('click', (event) => {
            let userToShow = array.filter((dev) => dev.id == event.target.id);
            let usersToHide = array.filter((dev) => dev.id != event.target.id);
            usersSearched = [...userToShow, ...usersToHide];
            setDataInLocalstorage();
            window.location.replace("../profile/index.html")
        });
    });
};

showFromList(usersSearched);

function changeButtonClass(){
    const searchInput = document.getElementById('searchInput');
    searchInput.addEventListener('input', () => {
        if (searchInput.value == ''){
            searchButton.classList.add('searchButton');
            searchButton.classList.remove('searchButton-active');
        }
        if (searchInput.value != ''){
            searchButton.classList.add('searchButton-active');
            searchButton.classList.remove('searchButton');
        };
    });
};

changeButtonClass();

function setDataInLocalstorage(){
    const arrayJson = JSON.stringify(usersSearched);
    localStorage.setItem("lastSearched", arrayJson);
};

function getDataFromLocalstorage(){
    const localStorageDataJSON = localStorage.getItem('lastSearched');
    if (localStorageDataJSON){
        const localStorageData = JSON.parse(localStorageDataJSON);
        usersSearched = [...localStorageData];
        showFromList(usersSearched);
    };
};
  
getDataFromLocalstorage();

function searchAnimationStart(){
    const button = document.getElementById('searchButton');
    button.innerHTML = '';
    const img = document.createElement('img');
    img.setAttribute('src', '../../assets/spinner.svg');
    img.setAttribute('alt', "spinner");
    img.classList.add('loading');
    button.appendChild(img);
};

function searchAnimationStop(){
    const button = document.getElementById('searchButton');
    button.innerHTML = '';
    button.classList.add('searchButton');
    button.setAttribute('id', "searchButton");
    button.innerText = "Ver perfil do github";
};

// function searchOnAPI(){
//     const searchInput = document.getElementById('searchInput');
//     const spanUserNotFound = document.querySelector('.user-not-found');
//     const button = document.getElementById('searchButton');
//     let userToSearch = '';
//     try {
//         button.addEventListener('click', () => {
//             searchAnimationStart();
//             userToSearch = searchInput.value;
//             console.log(userToSearch);
//             const userToShow = fetch(`https://api.github.com/users/${userToSearch}`, {
//                 method: 'GET',
//                 headers: {
//                     'Content-Type': 'application/json'
//                 }
//             })
//             .then(userJson => userToShow.json())
//             .then(userJson => {
//                 searchAnimationStop();
//                 usersSearched = [userJson, ...usersSearched];
//                 setDataInLocalstorage();
//                 window.location.replace("../profile/index.html");
//             }) 
//         });
//     }catch{
//         spanUserNotFound.classList.remove('hide');
//         spanUserNotFound.classList.add('show');
//     };
// };
// async function searchOnAPI(){
//     const searchInput = document.getElementById('searchInput');
//     const spanUserNotFound = document.querySelector('.user-not-found');
//     const button = document.getElementById('searchButton');
//     let userToSearch = '';
//     try {
//         button.addEventListener('click', () => {
//             searchAnimationStart();
//             userToSearch = searchInput.value;
//             console.log(userToSearch);
//         });
//         console.log(userToSearch);
//         let userToShow = await fetch(`https://api.github.com/users/${userToSearch}`);
//         if (userToShow.status != 200){
//             throw new Error('erro');
//         }
//         let userJson = userToShow.json();
//         button.innerHTML = '';
//         button.classList.add('searchButton');
//         button.setAttribute('id', "searchButton");
//         button.innerText = "Ver perfil do github";

//         usersSearched = [userJson, ...usersSearched];
//         setDataInLocalstorage();
//         window.location.replace("../profile/index.html")
//     }catch{
//         spanUserNotFound.classList.remove('hide');
//         spanUserNotFound.classList.add('show');
//     };
// };

// searchOnAPI('vardeba')

async function searchOnAPI(user){
    const spanUserNotFound = document.querySelector('.user-not-found');
    try{
        searchAnimationStart();
        let userToShow = await fetch(`https://api.github.com/users/${user}`);
        if (userToShow.status != 200){
            throw new Error('Erro');
        }
        let userJson = await userToShow.json();
        usersSearched = [userJson, ...usersSearched];
        lastSearched(usersSearched);
        window.location.replace("../profile/index.html")
        return userJson;
    }catch(err){
        spanUserNotFound.classList.remove('hide');
        spanUserNotFound.classList.add('show');
        searchAnimationStop();
    }
}

async function searchDev(){
    const searchInput = document.getElementById('searchInput');
    const button = document.getElementById('searchButton');
        button.addEventListener('click', () => {
            let userToSearch = searchInput.value;
            console.log(userToSearch);
            let userJson = searchOnAPI(userToSearch);
        });
}

searchDev();

function lastSearched(array){
    let newArray = [];
    array.forEach(element => {
        if (newArray.length < 3){
            newArray.push(element);
        };
    });
    usersSearched = [...newArray];
    setDataInLocalstorage();
}




