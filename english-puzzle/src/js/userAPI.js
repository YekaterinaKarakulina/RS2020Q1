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
  console.log(content);
  return content;
};

export { createUser, loginUser };
