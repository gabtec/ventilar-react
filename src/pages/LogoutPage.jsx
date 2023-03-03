import { redirect } from 'react-router-dom';

export function logoutAction() {
  // clear store.accessToken and refresh
  // TODO: ask backend to clear referesh token from db hash
  return redirect('/');
}
