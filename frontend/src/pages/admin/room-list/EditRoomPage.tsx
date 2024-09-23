import RoomForm from "./room-form/RoomForm";
import LayoutAdmin from "@layouts/layout-admin/LayoutAdmin";
import { useParams } from "react-router-dom";
import { useMutationEditRoom, useQueryGetRoom } from "./useRoom";

const EditRoomPage = () => {
  const { id } = useParams();
  const { data: room, isLoading, isError, error } = useQueryGetRoom(id || "");
  const { mutate, isLoading: isLoadingRoom } = useMutationEditRoom();

  const handleSave = (roomFormData: FormData) => {
    mutate(roomFormData);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error...{(error as Error).message}</div>;
  }

  return (
    <LayoutAdmin>
      <RoomForm onSave={handleSave} isLoading={isLoadingRoom} room={room} />
    </LayoutAdmin>
  );
};

export default EditRoomPage;
