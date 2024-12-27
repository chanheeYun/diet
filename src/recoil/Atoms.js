import { atom } from 'recoil';

export const isLogined = atom({
  key: 'isLogined',
  default: () => {
    const token = sessionStorage.getItem('JWT');
    return token !== null;
  },
});