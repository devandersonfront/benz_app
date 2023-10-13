import { authEnum } from "config/auth";
import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { authTokenAtom } from "recoil/authAtom";

export function useLogout() {
  const navigate = useNavigate();
  const setAuthTokenAtom = useSetRecoilState(authTokenAtom);

  return () => {
    setAuthTokenAtom("");
    localStorage?.removeItem(authEnum.authToken);
    navigate("/");
  };
}

// todo
// web 쪽도 라우팅 outlet으로 변경. (추후 기능적 유지보수 위함)
