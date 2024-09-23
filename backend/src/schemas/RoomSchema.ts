import { TypeOf, z } from "zod";

const dateStringSchema = z.string().refine(
  (dateStr) => {
    // Check if the string can be parsed into a valid date
    const date = new Date(dateStr);
    return !isNaN(date.getTime());
  },
  {
    message: "Invalid date string",
  }
);

const BookingSchema = z.object({
  bookingId: z.string(),
  checkinDate: dateStringSchema,
  checkoutDate: dateStringSchema,
  roomQty: z.number().int().positive(),
  pricePerNight: z.number().positive({
    message: "Price per night must be a positive number!",
  }),
});

const facilitiesSchema = z.object({
  "facilities.room": z.array(z.string()),
  "facilities.bathroom": z.array(z.string()),
  "facilities.view": z.string(),
  "facilities.meal": z.string(),
  "facilities.bed": z.array(z.string()),
});

export const RoomSchema = z.object({
  body: z.object({
    "refTo.property": z.string().length(24), // MongoDB ObjectId is typically a 24-character hex string
    name: z.string().min(1),
    type: z.string().min(1),
    roomStatus: z.string().min(1),
    description: z.string(),

    bookingData: z.array(BookingSchema).optional(),

    pricePerNight: z.string().transform((value) => {
      const numberValue = parseFloat(value);
      if (isNaN(numberValue) || numberValue <= 0) {
        throw new Error("Price per night must be a positive number");
      }
      return numberValue;
    }),

    roomSize: z.string().transform((value) => {
      const numberValue = parseFloat(value);
      if (isNaN(numberValue) || numberValue <= 0) {
        throw new Error("Room size must be a positive number");
      }
      return numberValue;
    }),

    noPhysicalRooms: z.string().transform((value) => {
      const numberValue = parseInt(value, 10);
      if (isNaN(numberValue) || numberValue < 0) {
        throw new Error(
          "Number of physical rooms must be a non-negative integer"
        );
      }
      return numberValue;
    }),

    noAvailableRooms: z.string().transform((value) => {
      const numberValue = parseInt(value, 10);
      if (isNaN(numberValue) || numberValue < 0) {
        throw new Error(
          "Number of available rooms must be a non-negative integer"
        );
      }
      return numberValue;
    }),

    adultCount: z.string().transform((value) => {
      const numberValue = parseInt(value, 10);
      if (isNaN(numberValue) || numberValue < 0) {
        throw new Error("Adult count must be a non-negative integer");
      }
      return numberValue;
    }),

    childCount: z.string().transform((value) => {
      const numberValue = parseInt(value, 10);
      if (isNaN(numberValue) || numberValue < 0) {
        throw new Error("Child count must be a non-negative integer");
      }
      return numberValue;
    }),

    "facilities.room": z.array(z.string()),
    "facilities.bathroom": z.array(z.string()),
    "facilities.view": z.string(),
    "facilities.meal": z.string(),
    "facilities.bed": z.array(z.string()),
  }),
});

export type RoomValidation = TypeOf<typeof RoomSchema>;
