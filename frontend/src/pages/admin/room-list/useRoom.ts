import { useMutation, useQuery, useQueryClient } from "react-query";
import * as apiRoom from "@api/RoomApi";
import * as apiSearchRoom from "@api/SearchRoomAdminApi";
import { useAppContext } from "@hooks/useAppContext";
import { useMemo } from "react";

export function useQueryGetRoom(roomId: string) {
  const { data, isLoading, isError, error } = useQuery(
    "room",
    () => apiRoom.getRoomForAdmin(roomId),
    { enabled: !!roomId }
  );
  return { data, isLoading, isError, error };
}

export const useQuerySearchPaginatedRooms = (
  propertyId: string,
  roomType: string,
  page: number
) => {
  const { data, isLoading, isError, error } = useQuery(
    ["searchRoomsForAdmin", propertyId, roomType, page],
    () => apiSearchRoom.searchRoomsForAdmin(propertyId, roomType, page)
  );

  const memoizedValue = useMemo(() => {
    return {
      data,
      isLoading,
      isError,
      error,
    };
  }, [data, isLoading, isError, error]);

  return memoizedValue;
};

export function useMutationAddRoom() {
  const { showToast } = useAppContext();

  const { mutate, isLoading } = useMutation(apiRoom.createRoomWithFile, {
    onSuccess: () =>
      showToast({
        message: "Added room successfully!",
        type: "SUCCESS",
      }),
    onError: (error: any) => {
      const errorMessage =
        error.response?.data || error.message || "Error during room creation!";
      showToast({ message: errorMessage, type: "ERROR" });
    },
  });

  const memoizedValue = useMemo(() => {
    return { mutate, isLoading };
  }, [mutate, isLoading]);

  return memoizedValue;
}

export function useMutationEditRoom() {
  const { showToast } = useAppContext();

  const { mutate, isLoading } = useMutation(apiRoom.updateRoomWithFile, {
    onSuccess: () =>
      showToast({
        message: "Updated room successfully!",
        type: "SUCCESS",
      }),
    onError: (error: any) => {
      const errorMessage =
        error.response?.data ||
        error.message ||
        "Error during room modification!";
      showToast({ message: errorMessage, type: "ERROR" });
    },
  });

  const memoizedValue = useMemo(() => {
    return { mutate, isLoading };
  }, [mutate, isLoading]);

  return memoizedValue;
}

export function useMutationDeleteRoom() {
  const queryClient = useQueryClient();
  const { showToast } = useAppContext();

  const { mutate } = useMutation(apiRoom.deleteRoom, {
    onSuccess: () => {
      showToast({
        message: "Deleted room successfully!",
        type: "SUCCESS",
      });
      queryClient.refetchQueries("searchRoomsForAdmin");
    },
    onError: (error: any) => {
      const errorMessage =
        error.response?.data ||
        error.message ||
        "Error during property deletion!";
      showToast({ message: errorMessage, type: "ERROR" });
    },
  });

  const memoizedValue = useMemo(() => {
    return mutate;
  }, [mutate]);

  return memoizedValue;
}
