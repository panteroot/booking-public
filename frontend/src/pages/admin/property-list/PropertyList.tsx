import styles from "./propertyList.module.scss";
import { useNavigate } from "react-router-dom";
import { useMutationDeleteProperty } from "./useProperty";
import { useState } from "react";
import TableList from "./TableList";

const PropertyList = () => {
  const navigate = useNavigate();
  const [propertyName, setPropertyName] = useState("");
  const [page, setPage] = useState(1);

  const deleteProperty = useMutationDeleteProperty();

  const handleDelete = (id: string) => {
    const alertConfirm = confirm("Are you sure you want to proceed?");

    if (alertConfirm) {
      deleteProperty(id);
    }
  };

  const handleAdd = () => {
    navigate("/admin/properties/add");
  };

  const handleRefresh = () => {
    setPropertyName("");
    setPage(1);
  };
  const handlePage = (page: number) => setPage(page);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPropertyName(e.target.value);
    setPage(1);
  };

  return (
    <div className={styles.propertyList}>
      <div className={styles.card} style={{ paddingBlock: "1px" }}>
        <div className={styles.bodySection}>Property List</div>
      </div>
      <div className={styles.card}>
        <form>
          <div className={styles.search}>
            <input
              type="text"
              name="propertyName"
              placeholder="Enter property name"
              onChange={handleInputChange}
              value={propertyName}
            />
          </div>
        </form>

        <div className={styles.formButton}>
          <button className={styles.buttonAdd} onClick={handleAdd}>
            Add new property
          </button>
          <button onClick={handleRefresh}>Refresh</button>
        </div>

        <TableList
          propertyName={propertyName}
          onDelete={handleDelete}
          parentPage={page}
          handleParentPage={handlePage}
        />
      </div>
    </div>
  );
};

export default PropertyList;
