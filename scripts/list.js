let usersSearched = [
    {
        id: 86993356,
        login: "vardeba",
        avatar_url: "https://avatars.githubusercontent.com/u/86993356?v=4",
        repos_url: "https://api.github.com/users/vardeba/repos",
        name: "Valdecir Teixeira",
        bio: "Web Developer",
    }
];

async function getRepositories(array){
    try{
        let repositoriesList = await fetch(array[0].repos_url);
        let repositoriesListJson = repositoriesList.json();
        return repositoriesListJson;
    }catch(error){
        return error;
    }
}