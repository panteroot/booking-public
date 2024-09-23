import SearchRoomAdminRepository, {
  SearchPropertyDTO,
  SearchPropertyDataDTO,
} from "@repositories/SearchPropertyAdminRepository";

export interface SearchProperty {
  properties: SearchPropertyDataDTO[];
  totalPages: number;
  totalItems: number;
  currentPage: number;
}

export type SearchParamsType = {
  propertyName: string;
  page: string;
};

const parsePaginatedProperties = (
  response: SearchPropertyDTO
): Promise<SearchProperty> => {
  let result: SearchProperty;
  let properties: SearchPropertyDataDTO[] | [];

  if (response.data !== undefined) {
    properties = response.data;
  } else {
    properties = [];
  }

  if (response.data) {
    result = {
      properties: properties,
      totalPages: response.pagination.pages,
      totalItems: response.pagination.total,
      currentPage: response.pagination.page,
    };
  }

  return new Promise((resolve) => {
    resolve(result);
  });
};

const objRepository = new SearchRoomAdminRepository();

export const searchPropertiesForAdmin = (
  propertyName: string,
  page: number
) => {
  const queryParams = new URLSearchParams();
  queryParams.append("propertyName", propertyName);
  queryParams.append("page", page.toString());

  objRepository.endpoint = `/search?${queryParams}`;
  const data = objRepository.getPagination().then(parsePaginatedProperties);
  return data;
};
