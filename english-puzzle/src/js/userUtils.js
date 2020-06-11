import { loginUser, setGameProgressToUserSetting } from './userAPI';
import { LOGINSECTION, STARTGAMESECTION } from './constants';

export default async function signIn(userData) {
  const loginResult = await loginUser(userData);
  console.log(loginResult);
  localStorage.setItem('userId', loginResult.userId);
  localStorage.setItem('userToken', loginResult.token);
  if (loginResult.message === 'Authenticated') {
    const obj = {
      userId: localStorage.getItem('userId'),
      userToken: localStorage.getItem('userToken'),
      gameProgress: {
        wordsPerDay: 100,
        optional: {
          level: 0,
          page: 0,
        },
      },
    };
    setGameProgressToUserSetting(obj);
    LOGINSECTION.classList.add('hidden');
    STARTGAMESECTION.classList.remove('hidden');
  }
}
