import axios from "axios";
import { API, authEnum } from "config/auth";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { authTokenAtom } from "recoil/authAtom";

interface AuthTokenResponse {
  token: string;
}
function useGetAuthToken() {
  const setRecoilAuthToken = useSetRecoilState(authTokenAtom);
  const navigate = useNavigate();
  const { isLoading: isLoginLoading, refetch: loginRefetch } = useQuery({
    queryKey: ["authToken"],
    queryFn: () => axios.get<AuthTokenResponse>(API.auth),
    staleTime: 0,
    cacheTime: 0,
    enabled: false,
    onSuccess(data) {
      const authToken = data.data?.token;
      setRecoilAuthToken(authToken);
      localStorage.setItem(authEnum.authToken, authToken);
      navigate("/qr");
    },
    onError() {},
  });
  return {
    isLoginLoading,
    loginRefetch,
  };
}

export default useGetAuthToken;
