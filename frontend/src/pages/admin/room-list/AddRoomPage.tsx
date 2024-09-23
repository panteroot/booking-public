import RoomForm from "./room-form/RoomForm";
import LayoutAdmin from "@layouts/layout-admin/LayoutAdmin";
import { useMutationAddRoom } from "./useRoom";

const AddRoomPage = () => {
  const { mutate, isLoading } = useMutationAddRoom();

  const handleSave = (roomFormData: FormData) => {
    mutate(roomFormData);
  };
  return (
    <LayoutAdmin>
      <RoomForm onSave={handleSave} isLoading={isLoading} />
    </LayoutAdmin>
  );
};

export default AddRoomPage;
