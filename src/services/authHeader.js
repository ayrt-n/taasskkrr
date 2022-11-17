// Gets user authorization token from localStorage and returns correct Auth header
export default function authHeader() {
  const user = JSON.parse(localStorage.getItem('user'));

  if (user && user.authorization) {
    return user.authorization;
  } else {
    return '';
  }
}
