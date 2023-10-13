import { authEnum } from "config/auth";
import { useRecoilValue } from "recoil";
import { authTokenAtom } from "recoil/authAtom";

export function useCheckAuth() {
  const recoilValue = useRecoilValue(authTokenAtom);
  const localStorageValue = localStorage.getItem(authEnum.authToken);

  return !!recoilValue || !!localStorageValue;
}
