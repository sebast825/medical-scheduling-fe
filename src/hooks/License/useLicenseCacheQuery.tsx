import {
  QueryClient,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { useUserInfo } from "../../context/authContext";
import {
  fetchCreateLicenses,
  fetchGetAllLicenses,
} from "../../services/apiService";
import { LicenseCreateRequestDto } from "../../types/Licenses/LicenseCreateRequestDto.type";

function useLicenseCacheQuery() {
  const queryClient = useQueryClient();
  const user = useUserInfo();

  const { data: pacienteList, isLoading } = useQuery({
    queryFn: () => {
      if (user) {
        return fetchGetAllLicenses(user);
      } else {
        return [];
      }
    },
    queryKey: ["licenseList", user],
    staleTime: Infinity,
  });
    const createLicenseMutation = useMutation({
      mutationFn: (license: LicenseCreateRequestDto) =>{

        if (user == null) {

          console.log("hello")
          throw new Error;
        }
        return fetchCreateLicenses(user, license)},
      onSuccess: (newLicense) => {
        queryClient.invalidateQueries({ queryKey: ["licenseList"] });
      },
      onError: (error) => {
        console.log("hay un error", error);
      },
    });
    function CreateLicense(license: LicenseCreateRequestDto) {
      return createLicenseMutation.mutateAsync(license)
    }
  


  return { CreateLicense };
}

export default useLicenseCacheQuery;
