const header = document.querySelector('header');

const ul = document.querySelector('ul');

function showDev(array){
    let newDev = array[0];
    let devSearched = makeDevTag(newDev);
    header.insertAdjacentHTML('afterbegin', devSearched)
}

async function showRepositories(array){
    let repositoriesList = await getRepositories(array);
    console.log(repositoriesList)
    repositoriesList.forEach(repository => {
        let newRepository = repository;
        ul.insertAdjacentHTML('beforeend', `
        <li class="repository">
            <h3 class="repository-name">${newRepository.name}</h3>
            <p class="repository-description">${newRepository.description}</p>
            <div class="repositoryButtons">
                <a href=${newRepository.url}>
                    <button class="btn-3">Repositório</button>
                </a>
                <a href=${newRepository.html_url}>
                    <button class="btn-3">Demo</button>
                </a>
            </div>
        </li>
        
        
        
        
        
        `);

        
    });
}

showDev(usersSearched);

showRepositories(usersSearched);

function makeDevTag(user){
    return `
    <div class="dev-data-img">
        <figure class="dev-img-container">
          <img class="dev-pic" src=${user.avatar_url} alt=${user.name}>
        </figure>
        <div class="dev-info">
          <h2 class="dev-name">${user.name}</h2>
          <p class="dev-bio">${user.bio}</p>
        </div>
    </div>
    
    
    `;
}