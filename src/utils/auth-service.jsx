import { redirect } from 'react-router-dom';

export function getAcccessToken() {
  // load from store
  return 'this is a test at';
}

export function getRefreshToken() {
  // load from store
  return 'this is a test rt';
}

export function checkAuthLoader() {
  console.log('GT_LOG: on utils/checkAuthLoader');

  const isLoggedIn = localStorage.getItem('isIN');

  if (isLoggedIn !== 'true') {
    console.log('token NOT found');
    return redirect('/login');
  }
  console.log('token found');
  return true;
}

// export function getAuthData() {
//   // load from store
//   return {
//     isLoggedIn: true,
//     user: {
//       id: 1000,
//       mec: 9876,
//       name: 'Hard Coded User',
//       role: 'admin',
//       workplace: 'HDP_Urgência',
//     },
//     accessToken: 'AT-sjhdjkashdjksahdjksa',
//     refreshToken: 'RT-sjhdjkashdjksahdjksa',
//   };
// }
