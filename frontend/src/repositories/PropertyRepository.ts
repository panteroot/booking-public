import { BaseRepository } from "@repositories/BaseRepository";

export interface PropertyDTO {
  _id: string;
  name: string;
  propertyType: string;
  address: string;
  country: string;
  city: string;
  latitude: number;
  longitude: number;
  position?: string; // used in PropertyForm in admin to get position after mapSearch
  imageUrls: string[];
  imageFiles?: FileList; // used in PropertyForm in admin
  description: string;
  featuredFacilities: string[];
  totalPhysicalRooms: number;
  totalAvailableRooms: number;
  propertyStatus: string;
  facilities: {
    property: string[];
    view: string[];
    meal: string[];
  };
  rules: {
    checkin: string;
    checkout: string;
    damageDepositFee: string;
    pet: string;
    others: string;
  };
  pricesPerNight: [number];
}

class PropertyRepository extends BaseRepository<PropertyDTO> {
  collection = "api/properties";
  endpoint = "";
  options = {
    withCredentials: true,
    // headers: { "Content-Type": "application/json" },
  };

  get(id: string) {
    return super.get(id);
  }

  getMany() {
    return super.getMany();
  }

  create(data: PropertyDTO) {
    this.options.withCredentials = true;
    return super.post(data);
  }

  createWithFile(data: FormData) {
    this.options.withCredentials = true;
    return super.postWithFile(data);
  }

  updateWithFile(id: string, data: FormData) {
    return super.updateWithFile(id, data);
  }

  delete(id: string) {
    return super.delete(id);
  }
}

export default PropertyRepository;
