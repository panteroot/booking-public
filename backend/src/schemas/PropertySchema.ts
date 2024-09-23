import { TypeOf, z } from "zod";

export const PropertySchema = z.object({
  body: z.object({
    name: z.string({
      required_error: "Name is required!",
    }),
    propertyType: z.string({
      required_error: "Property type is required!",
    }),
    address: z.string({
      required_error: "Address is required!",
    }),
    country: z.string({
      required_error: "Country is required!",
    }),
    city: z.string({
      required_error: "City is required!",
    }),

    latitude: z.string().transform((value) => {
      const numberValue = parseFloat(value);
      if (isNaN(numberValue)) {
        throw new Error("Latitude must be a valid number");
      }
      return numberValue;
    }),
    longitude: z.string().transform((value) => {
      const numberValue = parseFloat(value);
      if (isNaN(numberValue)) {
        throw new Error("Longitude must be a valid number");
      }
      return numberValue;
    }),

    description: z.string({
      required_error: "Description is required!",
    }),

    totalPhysicalRooms: z.string().transform((value) => {
      const numberValue = parseFloat(value);
      if (isNaN(numberValue)) {
        throw new Error("Total Physical Rooms must be a valid number");
      }
      return numberValue;
    }),
    totalAvailableRooms: z.string().transform((value) => {
      const numberValue = parseFloat(value);
      if (isNaN(numberValue)) {
        throw new Error("Total Available Rooms must be a valid number");
      }
      return numberValue;
    }),

    propertyStatus: z.string({
      required_error: "Property status is required!",
    }),

    featuredFacilities: z.array(z.string()).nonempty({
      message: "Featured facilities are required!",
    }),

    // Facilities fields
    "facilities.property": z
      .array(z.string())
      .nonempty({ message: "Property facilities are required!" }),
    "facilities.view": z
      .array(z.string())
      .nonempty({ message: "View facilities are required!" }),
    "facilities.meal": z
      .array(z.string())
      .nonempty({ message: "Meal facilities are required!" }),

    // Rules fields
    "rules.checkin": z.string({ required_error: "Check-in rule is required!" }),
    "rules.checkout": z.string({
      required_error: "Checkout rule is required!",
    }),
    "rules.damageDepositFee": z.string({
      required_error: "Damage deposit fee rule is required!",
    }),
    "rules.pet": z.string({ required_error: "Pet policy rule is required!" }),
    "rules.others": z.string({ required_error: "Other rules are required!" }),
  }),
});

export type PropertyValidation = TypeOf<typeof PropertySchema>;
