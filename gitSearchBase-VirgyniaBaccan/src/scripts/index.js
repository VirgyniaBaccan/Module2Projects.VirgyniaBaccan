let baseUrl = `https://api.github.com/users`;

async function searchGitUser(username) {
  const user = await fetch(`${baseUrl}/${username}`, {
    method: "GET",
  }).then(async (response) => {
    if (response.ok) {
      response = await response.json();
      localStorage.setItem("user", JSON.stringify(response));
      await getUserRepos();
      location.replace("./src/pages/profile.html");
      return response;
    } else {
      return location.replace("./src/pages/error.html");
    }
  });
  return user;
}

function handleGitSearch() {
  const button = document.querySelector(".button__search");
  const input = document.querySelector(".input__search");
  button.addEventListener("click", async () => {
    const username = input.value;
    await searchGitUser(username);
  });
}

handleGitSearch();

async function getUserRepos() {
  const userInfos = JSON.parse(localStorage.getItem("user"));
  const userLogin = userInfos.login;
  const repos = await fetch(`${baseUrl}/${userLogin}/repos`, {
    method: "GET",
  }).then(async (response) => {
    response = await response.json();
    localStorage.setItem("repos", JSON.stringify(response));
    console.log("responseGetUsersRepo", response);

    return response;
  });
  return repos;
}
