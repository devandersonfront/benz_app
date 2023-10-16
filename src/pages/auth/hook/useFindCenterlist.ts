import axios from "axios";
import { API } from "config/auth";
import { useQuery } from "react-query";

interface CenterlistResponse {
  centerlist: string[];
}
function useFindCenterlist() {
  const {
    isLoading: isCenterLoading, // 추후 ui적 nofitication
    error: isCenterError, // 추후 ui적 nofitication
    data: centerData,
  } = useQuery({
    queryKey: ["centerlist"],
    queryFn: () => axios.get<CenterlistResponse>(API.centerlist),
    staleTime: 30 * 60 * 1000, //30m
    cacheTime: 24 * 60 * 60 * 1000, //1d
  });

  return {
    isCenterLoading,
    isCenterError,
    centerData,
  };
}

export default useFindCenterlist;
