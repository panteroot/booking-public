import { object, string, number, TypeOf } from "zod";

export const createUserSchema = object({
  body: object({
    email: string({
      required_error: "Email is required!",
    }).email("Enter a valid email!"),

    password: string({ required_error: "Password is required!" }).min(
      6,
      "Password must be at least 6 characters!"
    ),
    confirmPassword: string({
      required_error: "Password confirmation is required!",
    }),
    firstName: string({
      required_error: "Firstname is required!",
    }),
    lastName: string({
      required_error: "Lastname is required!",
    }),
    contacts: object({
      phone: number({
        required_error: "Phone number is required!",
      }),
      mobile: number({ required_error: "Mobile number is required!" }),
    }),
    address: string({
      required_error: "Address is required!",
    }),
    city: string({
      required_error: "City is required!",
    }),
    country: string({
      required_error: "Country is required!",
    }),
    zipcode: string({
      required_error: "Zip code is required!",
    }),
  }).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match!",
    path: ["confirmPassword"],
  }),
});

export const updateUserSchema = object({
  body: object({
    firstName: string({
      required_error: "Firstname is required!",
    }),
    lastName: string({
      required_error: "Lastname is required!",
    }),
    contacts: object({
      phone: number({
        required_error: "Phone number is required!",
      }),
      mobile: number({ required_error: "Mobile number is required!" }),
    }),
    address: string({
      required_error: "Address is required!",
    }),
    city: string({
      required_error: "City is required!",
    }),
    country: string({
      required_error: "Country is required!",
    }),
    zipcode: string({
      required_error: "Zip code is required!",
    }),
  }),
});

export type CreateUserValidation = TypeOf<typeof createUserSchema>;
export type UpdateUserValidation = TypeOf<typeof updateUserSchema>;
