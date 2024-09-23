import Select, { SingleValue, StylesConfig } from "react-select";
import React, { useEffect, useState } from "react";
import styles from "./roomList.module.scss";
import { PropertyValueLabelFullProp } from "@api/PropertyApi";
import { useQueryGetPropertiesForNativeForm } from "@hooks/useProperty";

interface SearchFormProps {
  handleParentPropertyId: (id: string) => void;
  handleParentRoomType: (type: string) => void;
  handleParentPage: (type: number) => void;
  parentToggleRefresh: boolean;
  handleParentRefresh: () => void;
}

const Search: React.FC<SearchFormProps> = ({
  handleParentPropertyId,
  handleParentRoomType,
  handleParentPage,
  parentToggleRefresh,
  handleParentRefresh,
}) => {
  const [selectboxProperty, setSelectboxProperty] =
    useState<PropertyValueLabelFullProp | null>(null);
  const [roomType, setRoomType] = useState("");

  useEffect(() => {
    if (parentToggleRefresh) {
      handleParentRefresh();
      setSelectboxProperty(null);
      setRoomType("");
    }
  }, [parentToggleRefresh, handleParentRefresh]);

  const {
    data: properties = [],
    isLoading,
    isError,
    error,
  } = useQueryGetPropertiesForNativeForm();

  const handleSelectChange = (
    selectedOption: SingleValue<PropertyValueLabelFullProp>
  ) => {
    setSelectboxProperty(selectedOption as PropertyValueLabelFullProp);
    handleParentPropertyId(selectedOption?.fullProperty._id || "");
    handleParentPage(1);
  };

  const handleRoomTypeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setRoomType(newValue);
    handleParentRoomType(newValue);
    handleParentPage(1);
  };

  const customStyles: StylesConfig<PropertyValueLabelFullProp, false> = {
    container: (provided) => ({
      ...provided,
      width: "20%",
    }),
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error...{(error as Error).message}</div>;
  }

  return (
    <form>
      <div className={styles.search}>
        <Select
          name="property"
          value={selectboxProperty}
          onChange={handleSelectChange}
          options={properties}
          placeholder="Select a property"
          isClearable
          styles={customStyles}
        />
        <input
          type="text"
          name="roomType"
          placeholder="Enter room type"
          onChange={handleRoomTypeChange}
          value={roomType}
        />
      </div>
    </form>
  );
};

export default Search;
