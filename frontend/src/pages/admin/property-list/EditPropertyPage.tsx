import PropertyForm from "./property-form/PropertyForm";
import LayoutAdmin from "@layouts/layout-admin/LayoutAdmin";
import { useParams } from "react-router-dom";
import { useMutationEditProperty } from "./useProperty";
import { useQueryGetProperty } from "@hooks/useProperty";

const EditPropertyPage = () => {
  const { id } = useParams();

  // TODO fix or empty string
  const {
    data: property,
    isLoading,
    isError,
    error,
  } = useQueryGetProperty(id || "");

  const { mutate, isLoading: isLoadingProperty } = useMutationEditProperty();

  const handleSave = (propertyFormData: FormData) => {
    mutate(propertyFormData);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error...{(error as Error).message}</div>;
  }

  return (
    <LayoutAdmin>
      <PropertyForm
        onSave={handleSave}
        isLoading={isLoadingProperty}
        property={property}
      />
    </LayoutAdmin>
  );
};

export default EditPropertyPage;
