import PropertyRepository, {
  PropertyDTO,
} from "@repositories/PropertyRepository";
import createUrlParams from "@helpers/createUrlParams";

// used in PropertyDetail view
export interface Property {
  _id: string;
  name: string;
  propertyType: string;
  description: string;
  address: string;
  country: string;
  city: string;
  imageUrls: string[];
  featuredFacilities: string[];
  totalPhysicalRooms: number;
  totalAvailableRooms: number;
  propertyFacilities: string[]; // | undefined;
  viewFacilities: string[]; //| undefined;
  mealFacilities: string[]; //| undefined;
  rules: {
    checkin: string;
    checkout: string;
    damageDepositFee: string;
    pet: string;
    others: string;
  };
}

export type SearchParamsType = {
  propertyName?: string;
  page?: string;
};

export interface SearchPaginatedPropertiesDTO {
  data: PropertyDTO[];
  pagination: {
    total: number;
    page: number;
    pages: number;
  };
}

export interface SearchPaginatedProperties {
  rooms: Property[];
  totalPages: number;
  totalItems: number;
  currentPage: number;
}

export interface PropertyValueLabelPair {
  value: string;
  label: string;
}

export interface PropertyValueLabelFullProp {
  value: string;
  label: string;
  fullProperty: PropertyDTO;
}

// uses rhf, where rhf i believe handles the mapping to id, so we should supply the name
const parsePropertiesToValueLabel = (
  response: PropertyDTO[]
): Promise<PropertyValueLabelPair[]> => {
  let result: PropertyValueLabelPair[];

  if (response !== undefined) {
    result = response.map((property) => ({
      value: property._id,
      label: property.name,
    }));
  }

  return new Promise((resolve) => {
    resolve(result);
  });
};

// this is for native html form
const parsePropertiesToValueLabelFullProp = (
  response: PropertyDTO[]
): Promise<PropertyValueLabelFullProp[]> => {
  let result: PropertyValueLabelFullProp[];

  if (response !== undefined) {
    result = response.map((property) => ({
      value: property._id,
      label: property.name,
      fullProperty: property,
    }));
  }

  return new Promise((resolve) => {
    resolve(result);
  });
};

const objPropertyRepository = new PropertyRepository();

export const getLatestProperties = async (limit: number) => {
  const queryParams = createUrlParams({ limit });
  objPropertyRepository.endpoint = `latest?${queryParams}`;
  const data = objPropertyRepository.getMany();
  return data;
};

// order by name
export const getPropertiesForRHF = async () => {
  const data = objPropertyRepository
    .getMany()
    .then(parsePropertiesToValueLabel);
  return data;
};

// using native form
export const getPropertiesForNativeForm = async () => {
  const data = objPropertyRepository
    .getMany()
    .then(parsePropertiesToValueLabelFullProp);
  return data;
};

// returns just the PropertyDTO
export const getProperties = async () => {
  const data = objPropertyRepository.getMany();
  return data;
};

export const getProperty = async (id: string) => {
  const data = objPropertyRepository.get(id);
  return data;
};

// FOR ADMIN

export const createPropertyWithFile = (formData: FormData) => {
  const data = objPropertyRepository.createWithFile(formData);
  return data;
};

export const updatePropertyWithFile = (formData: FormData) => {
  const id = `${formData.get("id")}`;
  const data = objPropertyRepository.updateWithFile(id, formData);
  return data;
};

export const deleteProperty = (id: string) => {
  const data = objPropertyRepository.delete(id);
  return data;
};
