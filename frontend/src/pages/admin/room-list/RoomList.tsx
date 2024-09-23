import styles from "./roomList.module.scss";
import { useNavigate } from "react-router-dom";
import Search from "./Search";
import { useMutationDeleteRoom } from "./useRoom";
import TableList from "./TableList";
import { useState } from "react";

const RoomList = () => {
  const navigate = useNavigate();
  const [propertyId, setPropertyId] = useState("");
  const [roomType, setRoomType] = useState("");
  const [page, setPage] = useState(1);
  const [toggleRefresh, setToggleRefresh] = useState(false);

  const deleteRoom = useMutationDeleteRoom();

  const handlePropertyId = (id: string) => setPropertyId(id);
  const handleRoomType = (type: string) => setRoomType(type);
  const handlePage = (page: number) => setPage(page);

  const handleDelete = (id: string) => {
    const alertConfirm = confirm("Are you sure you want to proceed?");

    if (alertConfirm) {
      deleteRoom(id);
    }
  };

  const handleAdd = () => {
    navigate("/admin/rooms/add");
  };

  const handleRefresh = () => {
    setPropertyId("");
    setRoomType("");
    setPage(1);
    setToggleRefresh((prevState) => !prevState);
  };

  return (
    <div className={styles.roomList}>
      <div className={styles.card} style={{ paddingBlock: "1px" }}>
        <div className={styles.bodySection}>Room List</div>
      </div>

      <div className={styles.card}>
        <Search
          handleParentPropertyId={handlePropertyId}
          handleParentRoomType={handleRoomType}
          handleParentPage={handlePage}
          parentToggleRefresh={toggleRefresh}
          handleParentRefresh={handleRefresh}
        />

        <div className={styles.formButton}>
          <button className={styles.buttonAdd} onClick={handleAdd}>
            Add new room
          </button>
          <button onClick={handleRefresh}>Refresh</button>
        </div>

        <TableList
          parentPropertyId={propertyId}
          parentRoomType={roomType}
          parentPage={page}
          handleParentPage={handlePage}
          onDelete={handleDelete}
        />
      </div>
    </div>
  );
};

export default RoomList;
