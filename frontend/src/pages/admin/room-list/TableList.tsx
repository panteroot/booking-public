import styles from "./roomList.module.scss";
import { NavLink } from "react-router-dom";
import { useQuerySearchPaginatedRooms } from "./useRoom";
import Pagination from "@components/common/pagination/Pagination";
import { useMemo } from "react";
import axios from "axios";

type Props = {
  parentPropertyId: string;
  parentRoomType: string;
  parentPage: number;
  handleParentPage: (page: number) => void;
  onDelete: (id: string) => void;
};

const TableList = ({
  parentPropertyId,
  parentRoomType,
  parentPage,
  handleParentPage,
  onDelete,
}: Props) => {
  const {
    data: rooms,
    isLoading,
    isError,
    error,
  } = useQuerySearchPaginatedRooms(
    parentPropertyId,
    parentRoomType,
    parentPage
  );

  const totalPages = rooms?.totalPages || 1;
  const totalItems = rooms?.totalItems || 0;
  const isPagesGreaterThan1 = typeof totalPages === "number" && totalPages > 1;

  // memoize to prevent flicker in pagination div as table data refetches
  const handleClickPagination = useMemo(
    () => (page: number) => {
      handleParentPage(page);
    },
    [handleParentPage]
  );

  const checkIfRoomHasBookings = async (roomId: string) => {
    const CURRENT_BASE_URL = import.meta.env.VITE_API_BASE_URL;
    const response = await axios.get(
      `${CURRENT_BASE_URL}/api/bookings/checkRoom/${roomId}`
    );
    return response.data;
  };

  const handleDelete = async (id: string) => {
    if (await checkIfRoomHasBookings(id))
      alert("Room has been booked. Sorry you cannot delete this.");
    else onDelete(id);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error...{(error as Error).message}</div>;
  }

  return (
    <div className={styles.formRow}>
      <table>
        <thead>
          <tr>
            <th>Room Type/Name</th>
            <th>Under Property</th>
            <th>Size (sqm)</th>
            <th>Price per night</th>

            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {rooms !== undefined &&
            rooms.rooms.map((room) => (
              <tr key={room._id}>
                <td> {room.type !== "N/A" ? room.type : room.name}</td>
                <td>{room.propertyName}</td>
                <td>{room.roomSize}</td>
                <td>₱ {room.pricePerNight}</td>

                <td>
                  <NavLink to={`/admin/rooms/edit/${room._id}`}>
                    <button className={styles.button}>Edit</button>
                  </NavLink>
                  &nbsp; | &nbsp;
                  <button
                    className={styles.button}
                    onClick={() => handleDelete(room._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>

      <p className={styles.total}>{totalItems} rooms(s) found</p>
      {isPagesGreaterThan1 && (
        <Pagination
          page={parentPage}
          pages={totalPages}
          handleClickPagination={handleClickPagination}
        />
      )}
    </div>
  );
};

export default TableList;
