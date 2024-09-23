import UserRepository, { UserDTO } from "@repositories/UserRepository";

// used in BookingDetailForm
export interface User {
  _id?: string;
  email?: string;
  password?: string;
  firstName?: string;
  lastName?: string;
  phoneContact?: number;
  mobileContact?: number;
  address?: string;
  country?: string;
  city?: string;
  zipcode?: string;
}

const objUserRepository = new UserRepository<UserDTO>();
objUserRepository.collection = "api/users";

export const register = (userFormData: UserDTO) => {
  objUserRepository.endpoint = "";
  const data = objUserRepository.register(userFormData);
  return data;
};

export const getUserDetails = (userId: string) => {
  const data = objUserRepository.get(userId);
  return data;
};

export const getLoggedUserDetails = () => {
  objUserRepository.endpoint = "me";
  const data = objUserRepository.getRow();
  return data;
};
