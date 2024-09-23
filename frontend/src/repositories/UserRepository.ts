import { BaseRepository } from "@repositories/BaseRepository";

// used in Registration form
export interface UserDTO {
  _id: string;
  email: string;
  password: string;
  confirmPassword: string;
  firstName: string;
  lastName: string;
  contacts: {
    phone: string;
    mobile: string;
  };
  address: string;
  country: string;
  city: string;
  zipcode: string;

  userId: string;
  name: string;
  userType: UserType;
}

export type UserType = "ADMIN" | "USER";

// used in login params in  AuthApi
export interface AuthUserDTO {
  userId: string;
  email: string;
  name: string;
  userType: UserType;
  password: string;
}

// used in login params in  AuthApi for Admin
export interface AdminDTO {
  username: string;
  password: string;
  userId: string;
  name: string;
  userType: UserType;
}

class UserRepository<T> extends BaseRepository<T> {
  collection = "api";
  endpoint = "";
  options = {
    withCredentials: true,
    headers: { "Content-Type": "application/json" },
  };

  get(id: string) {
    return super.get(id);
  }

  getRow() {
    return super.getRow();
  }

  validateToken() {
    return super.getRow();
  }

  logout() {
    return super.logout();
  }

  register(data: T) {
    return super.post(data);
  }

  login(data: T) {
    return super.post(data);
  }
}

export default UserRepository;
