import { useQuery } from "react-query";
import * as apiProperty from "@api/PropertyApi";
import * as apiRoom from "@api/RoomApi";
import { SearchParamsType } from "@api/RoomApi";

export function useQueryPropertyDetail(propertyId: string) {
  const { data, isLoading, isError, error } = useQuery(
    "property",
    () => apiProperty.getProperty(propertyId),
    { enabled: !!propertyId }
  );

  return { data, isLoading, isError, error };
}

type Props = {
  searchParams: SearchParamsType;
};

// show available rooms when user is in  propertyDetail page
export function useQueryPropertyRooms({ searchParams }: Props) {
  const { data, isLoading, isError, error } = useQuery("availableRooms", () =>
    apiRoom.searchAvailableRoomsByPropertyId(searchParams)
  );

  return { data, isLoading, isError, error };
}

export function useQueryGetPropertiesForRHF() {
  const { data, isLoading, isError, error } = useQuery("properties", () =>
    apiProperty.getPropertiesForRHF()
  );

  return { data, isLoading, isError, error };
}

export function useQueryGetPropertiesForNativeForm() {
  const { data, isLoading, isError, error } = useQuery("properties", () =>
    apiProperty.getPropertiesForNativeForm()
  );

  return { data, isLoading, isError, error };
}

export function useQueryGetProperties() {
  const { data, isLoading, isError, error } = useQuery("properties", () =>
    apiProperty.getProperties()
  );

  return { data, isLoading, isError, error };
}

export function useQueryGetProperty(propertyId: string) {
  const { data, isLoading, isError, error } = useQuery(
    "property",
    () => apiProperty.getProperty(propertyId),
    { enabled: !!propertyId }
  );
  return { data, isLoading, isError, error };
}
