import PropertyForm from "./property-form/PropertyForm";
import LayoutAdmin from "@layouts/layout-admin/LayoutAdmin";

import { useMutationAddProperty } from "./useProperty";

const AddPropertyPage = () => {
  const { mutate, isLoading } = useMutationAddProperty();

  const handleSave = (propertyFormData: FormData) => {
    mutate(propertyFormData);
  };

  return (
    <LayoutAdmin>
      <PropertyForm onSave={handleSave} isLoading={isLoading} />
    </LayoutAdmin>
  );
};

export default AddPropertyPage;
