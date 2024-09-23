import { BaseRepository } from "@repositories/BaseRepository";


export interface AdminDTO {
  _id?: string;
  username: string;
  password?: string;
  confirmPassword?: string;
 
}


class AdminRepository<T> extends BaseRepository<T> {
  collection = "api";
  endpoint = "";
  options = {
    withCredentials: true,
    headers: { "Content-Type": "application/json" },
  };

  get(id: string) {
    return super.get(id);
  }

  validateToken() {
    // this.options["headers"] = { "Content-Type": "application/json" };
    // !TODO debug delete
    // if (this.options.headers) {
    //   delete this.options.headers;
    // }

    return super.getRow();
  }

  logout() {
    // this.options["headers"] = { "Content-Type": "application/json" };
    return super.logout();
  }

  register(data: T) {
    // this.options["headers"] = { "Content-Type": "application/json" };
    return super.post(data);
  }

  login(data: T) {
    return super.post(data);
  }

  // update(id: string, data: IUser) {
  //   return super.update(id, data);
  // }

  // delete(id: string) {
  //   return super.delete(id);
  // }
}

export default AdminRepository;
