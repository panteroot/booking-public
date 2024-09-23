import { useMutation, useQuery, useQueryClient } from "react-query";
import * as apiProperty from "@api/PropertyApi";
import * as apiSearchProperty from "@api/SearchPropertyAdminApi";
import * as apiCountry from "@api/CountryApi";
import * as apiCity from "@api/CityApi";
import { useAppContext } from "@hooks/useAppContext";

export function useQuerySearchPaginatedProperties(
  propertyName: string,
  page: number
) {
  const { data, isLoading, isError, error } = useQuery(
    ["searchPropertiesForAdmin", propertyName, page],
    () => apiSearchProperty.searchPropertiesForAdmin(propertyName, page)
  );

  return {
    data,
    isLoading,
    isError,
    error,
  };
}

export function useQueryGetCountries() {
  const { data, isLoading, isError, error } = useQuery(["countries"], () =>
    apiCountry.getCountries()
  );
  return { data, isLoading, isError, error };
}

export function useQueryGetCitiesByCountry(country: string) {
  const { data, isLoading, isError, error } = useQuery(["cities"], () =>
    apiCity.getCitiesByCountry(country)
  );

  return { data, isLoading, isError, error };
}

export function useMutationAddProperty() {
  const { showToast } = useAppContext();

  const { mutate, isLoading } = useMutation(
    apiProperty.createPropertyWithFile,
    {
      onSuccess: () =>
        showToast({
          message: "Added property successfully!",
          type: "SUCCESS",
        }),
      // TODO add navigate after testing
      onError: (error: any) => {
        const errorMessage =
          error.response?.data ||
          error.message ||
          "Error during property creation!";
        showToast({ message: errorMessage, type: "ERROR" });
      },
    }
  );

  return { mutate, isLoading };
}

export function useMutationEditProperty() {
  const { showToast } = useAppContext();

  const { mutate, isLoading } = useMutation(
    apiProperty.updatePropertyWithFile,
    {
      onSuccess: () =>
        showToast({
          message: "Updated property successfully!",
          type: "SUCCESS",
        }),
      onError: (error: any) => {
        const errorMessage =
          error.response?.data ||
          error.message ||
          "Error during property modification!";
        showToast({ message: errorMessage, type: "ERROR" });
      },
    }
  );

  return { mutate, isLoading };
}

export function useMutationDeleteProperty() {
  const queryClient = useQueryClient();
  const { showToast } = useAppContext();

  const { mutate } = useMutation(apiProperty.deleteProperty, {
    onSuccess: () => {
      showToast({
        message: "Deleted property successfully!",
        type: "SUCCESS",
      });
      queryClient.refetchQueries("searchPropertiesForAdmin");
    },
    onError: (error: any) => {
      const errorMessage =
        error.response?.data ||
        error.message ||
        "Error during property deletion!";
      showToast({ message: errorMessage, type: "ERROR" });
    },
  });

  return mutate;
}
