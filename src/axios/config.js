import axios from 'axios';
// import store ...

// const token = store.get(accessToken)
const token = 'jskdjaskljdalkjfklsajdkljasdkl';

const apiCall = axios.create({
  baseUrl: 'http://localhost:3002/api',
  headers: {
    'Content-Type': 'application/json; charset=UTF-8',
    Authorization: `Bearer ${token}`,
  },
});

export default apiCall;

// Then the components import this apiCall and not axios
