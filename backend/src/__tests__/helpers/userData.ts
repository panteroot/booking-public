import { UserInput } from "models/User";

export const createDefaultUserInput = (
  overrides: Partial<UserInput> = {}
): UserInput => {
  const defaultInput: Partial<UserInput> = {
    email: "default.email@example.com",
    password: "defaultPassword",
  };

  return { ...defaultInput, ...overrides } as UserInput;
};

interface UserInputWithId extends UserInput {
  _id?: string;
}

export const createDefaultUserInputWithId = (
  overrides: Partial<UserInputWithId> = {}
): UserInputWithId => {
  const defaultInput: Partial<UserInputWithId> = {
    email: "default.email@example.com",
    password: "defaultPassword",
  };

  return { ...defaultInput, ...overrides } as UserInputWithId;
};
