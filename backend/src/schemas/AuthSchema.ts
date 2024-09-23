import { object, string, number, TypeOf } from "zod";

export const loginUserSchema = object({
  body: object({
    email: string({
      required_error: "Email is required!",
    }).email("Enter a valid email!"),

    password: string({ required_error: "Password is required!" }).min(
      6,
      "Password must be at least 6 characters!"
    ),
  }),
});

export const loginAdminSchema = object({
  body: object({
    username: string({
      required_error: "Username is required!",
    }),

    password: string({ required_error: "Password is required!" }).min(
      6,
      "Password must be at least 6 characters!"
    ),
  }),
});

export type LoginValidation = TypeOf<typeof loginUserSchema>;
export type LoginAdminValidation = TypeOf<typeof loginAdminSchema>;
