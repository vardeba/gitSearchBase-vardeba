function getDataFromLocalstorage(){
    const localStorageDataJSON = localStorage.getItem('lastSearched');
    if (localStorageDataJSON){
        const localStorageData = JSON.parse(localStorageDataJSON);
        usersSearched = [...localStorageData];
    };
};

getDataFromLocalstorage();

const body = document.querySelector('body');

const ul = document.querySelector('ul');

const titleTag = document.querySelector('title');

async function getRepositories(array){
    try{
        let repositoriesList = await fetch(array[0].repos_url);
        let repositoriesListJson = repositoriesList.json();
        return repositoriesListJson;
    }catch(error){
        return error;
    }
}

function showDev(array){
    let newDev = array[0];
    showName(newDev);
    let devSearched = makeDevTag(newDev);
    body.insertAdjacentElement('afterbegin', devSearched);
    showRepositories(array);
}

async function showRepositories(array){
    let repositoriesList = await getRepositories(array);
    repositoriesList.forEach(repository => {
        let newRepository = repository;
        let repositoryReady = createRepository(newRepository);
        ul.appendChild(repositoryReady);
    });
}

function createRepository(repository){
    const li = document.createElement('li');
    li.classList.add('repository');

    const h3RepositoryName = document.createElement('h3');
    h3RepositoryName.classList.add('repository-name');
    h3RepositoryName.innerText = `${repository.name}`;

    const pRepositoryDescription = document.createElement('p');
    pRepositoryDescription.classList.add('repository-description');
    if (repository.description == null){
        pRepositoryDescription.innerText = "Sem descrição";
    }else{
        pRepositoryDescription.innerText = `${repository.description}`;
    }

    const divRepositoryButtons = document.createElement('div');
    divRepositoryButtons.classList.add('repositoryButtons');

    const aRepositoryLink = document.createElement('a');
    aRepositoryLink.setAttribute('href', `${repository.html_url}`);
    aRepositoryLink.setAttribute('target', "_blank");

    const buttonRepositoryLink = document.createElement('button');
    buttonRepositoryLink.classList.add('btn-3');
    buttonRepositoryLink.innerText = "Repositório";

    const aPageLink = document.createElement('a');
    aPageLink.setAttribute('href', `https://${repository.owner.login}.github.io/${repository.name}`);
    aPageLink.setAttribute('target', "_blank");

    const buttonPageLink = document.createElement('button');
    buttonPageLink.classList.add('btn-3');
    buttonPageLink.innerText = "Demo";
    
    aPageLink.appendChild(buttonPageLink);
    aRepositoryLink.appendChild(buttonRepositoryLink);
    divRepositoryButtons.append(aRepositoryLink, aPageLink);
    li.append(h3RepositoryName, pRepositoryDescription, divRepositoryButtons);

    return li;
}

function makeDevTag(user){
    const header = document.createElement('header');

    const divDevDataImg = document.createElement('div');
    divDevDataImg.classList.add('dev-data-img');

    const figureDevImgContainer = document.createElement('figure');
    figureDevImgContainer.classList.add('dev-img-container');

    const imgDevImg = document.createElement('img');
    imgDevImg.classList.add('dev-pic');
    imgDevImg.setAttribute('src', `${user.avatar_url}`);
    imgDevImg.setAttribute('alt', `${user.name}`);

    const divDevInfo = document.createElement('div');
    divDevInfo.classList.add('dev-info');

    const h2DevName = document.createElement('h2');
    h2DevName.classList.add('dev-name');
    h2DevName.innerText = `${user.name}`;

    const pDevBio = document.createElement('p');
    pDevBio.classList.add('dev-bio');
    if (user.bio == null){
        pDevBio.innerText = `${user.login}`;
    }else{
        pDevBio.innerText = `${user.bio}`;
    }

    const navDevButtons = document.createElement('nav');
    navDevButtons.classList.add('nav-header');

    const aDevEmail = document.createElement('a');
    aDevEmail.setAttribute('href', `mailto:${user.email}`);

    const buttonDevEmail = document.createElement('button');
    buttonDevEmail.classList.add('btn-1');
    buttonDevEmail.innerText = "Email";

    const aHome = document.createElement('a');
    aHome.setAttribute('href', "../home/index.html");
    

    const buttonHome = document.createElement('button');
    buttonHome.classList.add('btn-2');
    buttonHome.innerText = "Trocar de usuário";

    divDevInfo.append(h2DevName, pDevBio);
    figureDevImgContainer.appendChild(imgDevImg);
    divDevDataImg.append(figureDevImgContainer, divDevInfo);

    aHome.appendChild(buttonHome);
    aDevEmail.appendChild(buttonDevEmail);
    navDevButtons.append(aDevEmail, aHome);

    header.append(divDevDataImg, navDevButtons);

    return header;
}

function showName(user){
    titleTag.innerText = `Git Search - ${user.name}`;
}

showDev(usersSearched);
