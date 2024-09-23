import Pagination from "@components/common/pagination/Pagination";
import styles from "./propertyList.module.scss";
import { useQuerySearchPaginatedProperties } from "./useProperty";
import { NavLink } from "react-router-dom";
import { useMemo } from "react";
import axios from "axios";

type Props = {
  propertyName: string;
  parentPage: number;
  handleParentPage: (page: number) => void;
  onDelete: (id: string) => void;
};

const TableList = ({
  propertyName,
  parentPage,
  handleParentPage,
  onDelete,
}: Props) => {
  const {
    data: properties,
    isLoading,
    isError,
    error,
  } = useQuerySearchPaginatedProperties(propertyName, parentPage);

  const totalPages = properties?.totalPages || 1;
  const totalItems = properties?.totalItems || 0;
  const isPagesGreaterThan1 = typeof totalPages === "number" && totalPages > 1;

  const handleClickPagination = useMemo(
    () => (page: number) => {
      handleParentPage(page);
    },
    [handleParentPage]
  );

  const checkIfPropertyHasBookings = async (propertyId: string) => {
    const CURRENT_BASE_URL = import.meta.env.VITE_API_BASE_URL;
    const response = await axios.get(
      `${CURRENT_BASE_URL}/api/bookings/checkProperty/${propertyId}`
    );

    return response.data;
  };

  const handleDelete = async (id: string) => {
    if (await checkIfPropertyHasBookings(id))
      alert("Property has been booked. Sorry you cannot delete this.");
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
            <th>Property</th>
            <th>Address</th>

            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {properties?.properties.map((property) => (
            <tr key={property._id}>
              <td>{property.name}</td>
              <td>
                {property.address}, {property.city}, {property.country}
              </td>

              <td>
                <NavLink to={`/admin/properties/edit/${property._id}`}>
                  <button className={styles.button}>Edit</button>
                </NavLink>
                &nbsp; | &nbsp;
                <button
                  className={styles.button}
                  onClick={() => handleDelete(property._id)}
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
