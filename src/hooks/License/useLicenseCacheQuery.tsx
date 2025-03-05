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
  //currently this function is not been used, because the refetch cuse unnecesary calls to the api, the code was added in tablelICENSE
  const { data: licenses, isLoading,refetch } = useQuery({
    queryFn: () => {return user ? fetchGetAllLicenses(user) : [];
  
    },
    queryKey: ["licenseList", user],
    enabled: false, // No se llama automáticamente
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
  const handleReloadLicenses = () => {
    console.log("llamaa")
    refetch(); 
  };

   function CreateLicense(license: LicenseCreateRequestDto) {
       return createLicenseMutation.mutateAsync(license);
   
  }

  return { CreateLicense};
}

export default useLicenseCacheQuery;
