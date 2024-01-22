import { ReactNode } from 'react';
import { atom, selector } from 'recoil';

//Recoil Atom 선언
export const userInfoState = atom({
  key: 'userInfoState',
  default: {
    profileImage: '',
    name: '',
    email: '',
  },
});

export const loginStateDefaultSelector = selector({
  key: 'loginStateDefaultSelector',
  get: ({ get }) => {
    const accessToken = localStorage.getItem('accessToken');
    return accessToken !== null && accessToken !== undefined;
  },
});

export const loginState = atom<boolean>({
  key: 'loginState',
  default: loginStateDefaultSelector,
});
