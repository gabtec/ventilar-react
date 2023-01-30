import { useDispatch } from 'react-redux';
import { redirect } from 'react-router-dom';
import { authStoreActions } from '../store/auth/auth.store';

export function logoutAction() {
  console.log('will logout');

  // clear store.accessToken and refresh
  // ask backend to clear referesh token from db hash
  console.log('will logout 2');
  return redirect('/');
}
