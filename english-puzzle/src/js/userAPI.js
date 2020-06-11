const createUser = async (user) => {
  const rawResponse = await fetch('https://afternoon-falls-25894.herokuapp.com/users', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user),
  });
  console.log(rawResponse.status);
  if (rawResponse.status === 417) {
    document.querySelector('.error-message').innerHTML = 'You are already registered! Please sign in!';
    return undefined;
  }
  const content = await rawResponse.json();
  console.log(content);
  if (content.error !== undefined) {
    let errorMessage = '';
    Array.from(content.error.errors).forEach((element) => {
      errorMessage += `${element.message} <br>`;
    });
    document.querySelector('.error-message').innerHTML = errorMessage;
  }
  return content;
};

const loginUser = async (user) => {
  const rawResponse = await fetch('https://afternoon-falls-25894.herokuapp.com/signin', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user),
  });
  const content = await rawResponse.json();
  return content;
};

const setGameProgressToUserSetting = async ({ userId, userToken, gameProgress }) => {
  const rawResponse = await fetch(`https://afternoon-falls-25894.herokuapp.com/users/${userId}/settings`, {
    method: 'PUT',
    withCredentials: true,
    headers: {
      'Authorization': `Bearer ${userToken}`,
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(gameProgress),
  });
  const content = await rawResponse.json();
  console.log('setGameProgressToUserSetting');
  console.log(content);
};


const getGameProgressFromUserSetting = async ({ userId, userToken }) => {
  const rawResponse = await fetch(`https://afternoon-falls-25894.herokuapp.com/users/${userId}/settings`, {
    method: 'GET',
    withCredentials: true,
    headers: {
      'Authorization': `Bearer ${userToken}`,
      'Accept': 'application/json',
    },
  });
  console.log(rawResponse);
  if (rawResponse.status === 401) {
    console.log('status 401');
    return undefined;
  }
  const content = await rawResponse.json();
  console.log('getGameProgressToUserSetting');
  console.log(content.optional);
  return content.optional;
};

export {
  createUser, loginUser, setGameProgressToUserSetting, getGameProgressFromUserSetting
};
