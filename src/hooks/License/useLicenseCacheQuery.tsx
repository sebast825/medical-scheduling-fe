import {
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
import useToastit from "../useToastit";
import { ExecOptions } from "child_process";
import { genericMessages } from "../../constants/genericMessages";

function useLicenseCacheQuery() {
  const queryClient = useQueryClient();
  const user = useUserInfo();
  const { error ,success} = useToastit();
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
    mutationFn: async (license: LicenseCreateRequestDto) => {
      try {
      if (user == null) {
        throw new Error("User is not authenticated.");
      }
        var newLicense =  await fetchCreateLicenses(user, license);
        success("Licensia creada correctamente")
        return newLicense;
      } catch (ex: any) {
        error(genericMessages.standardError);        
        return null;
      }
    },
    onSuccess: (newLicense) => {
      if (newLicense === null) {
        return;
      }
      queryClient.invalidateQueries({ queryKey: ["licenseList"] });
    },
    onError: (error) => {
      //this block is not been used || console.error("Error creating license:", error);
    },
  });
  

  function CreateLicense(license: LicenseCreateRequestDto) {
       createLicenseMutation.mutateAsync(license);
   
  }

  return { CreateLicense };
}

export default useLicenseCacheQuery;
