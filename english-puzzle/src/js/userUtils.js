import { loginUser } from './userAPI';
import { LOGINSECTION, STARTGAMESECTION } from './constants';

export default async function signIn(userData) {
  const loginResult = await loginUser(userData);
  if (loginResult) {
    localStorage.setItem('userId', loginResult.userId);
    localStorage.setItem('userToken', loginResult.token);
    LOGINSECTION.classList.add('hidden');
    STARTGAMESECTION.classList.remove('hidden');
  }
}
