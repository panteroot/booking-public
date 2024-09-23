import { BaseRepository } from "@repositories/BaseRepository";

export interface SearchPropertyDTO {
  data: SearchPropertyDataDTO[];
  pagination: {
    total: number;
    page: number;
    pages: number;
  };
}

export interface SearchPropertyDataDTO {
  _id: string;
  name: string;
  propertyType: string;
  address: string;
  country: string;
  city: string;
}

class SearchPropertyAdminRepository extends BaseRepository<SearchPropertyDTO> {
  collection = "api/properties";
  endpoint = "";
  options = {
    withCredentials: true,
  };

  getPagination() {
    return super.getPagination();
  }
}

export default SearchPropertyAdminRepository;
