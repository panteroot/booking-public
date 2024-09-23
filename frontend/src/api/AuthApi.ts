import UserRepository, {
  AdminDTO,
  AuthUserDTO,
} from "@repositories/UserRepository";

const objUserRepository = new UserRepository<AuthUserDTO>();

export const login = async (userFormData: AuthUserDTO) => {
  // force logout admin
  objUserRepository.endpoint = "auth/admin/logout";
  await objUserRepository.logout();

  objUserRepository.endpoint = "auth/login";
  const data = await objUserRepository.login(userFormData);
  return data;
};

export const loginAsAdmin = async (userFormData: AdminDTO) => {
  // force logout user
  objUserRepository.endpoint = "auth/logout";
  await objUserRepository.logout();

  const objUserAdminRepository = new UserRepository<AdminDTO>();
  objUserAdminRepository.endpoint = "auth/admin/login";
  const data = await objUserAdminRepository.login(userFormData);
  return data;
};

export const validateToken = () => {
  objUserRepository.endpoint = "auth/validate-token";
  const data = objUserRepository.validateToken();
  return data;
};

export const validateAdminToken = () => {
  objUserRepository.endpoint = "auth/validate-admin-token";
  const data = objUserRepository.validateToken();
  return data;
};

export const logout = () => {
  // force logout admin
  objUserRepository.endpoint = "auth/admin/logout";
  objUserRepository.logout();

  objUserRepository.endpoint = "auth/logout";
  const data = objUserRepository.logout();
  return data;
};

export const logoutAsAdmin = () => {
  // force logout user
  objUserRepository.endpoint = "auth/logout";
  objUserRepository.logout();

  objUserRepository.endpoint = "auth/admin/logout";
  const data = objUserRepository.logout();
  return data;
};
