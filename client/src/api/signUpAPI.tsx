import type { UserLogin } from '../interfaces/UserLogin';

const signUp = async (userInfo: UserLogin) => {
  try {
    const response = await fetch('/auth/signUp', { // created new route here server side
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userInfo),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error('User information not stored, check network tab!');
    }

    return data;
  } catch (err) {
    console.log('Error from user login: ', err);
    return Promise.reject('Could not store user info');
  }
};

export { signUp };
