import Property, { PropertyInput } from "../models/Property";
import { uploadImagesToCloudinary } from "../helpers/uploadImages";
import mongoose from "mongoose";

export const getProperties = async () => {
  const properties = await Property.find().sort({ name: 1 });
  return properties;
};

export const getLatestProperties = async (limit: number) => {
  const properties = await Property.aggregate([
    {
      $group: {
        _id: "$city",
        latestProperty: { $last: "$$ROOT" },
      },
    },
    {
      $project: {
        _id: "$latestProperty._id",
        name: "$latestProperty.name",
        city: "$latestProperty.city",
        country: "$latestProperty.country",
        imageUrls: "$latestProperty.imageUrls",
        createdAt: "$latestProperty.createdAt",
      },
    },
    {
      $sort: {
        createdAt: -1,
      },
    },
    {
      $limit: limit,
    },
  ]);

  return properties;
};

export const getProperyCities = async (skip: number, limit: number) => {
  const properties = await Property.aggregate([
    { $group: { _id: "$city", doc: { $first: "$$ROOT" } } },
    { $replaceRoot: { newRoot: "$doc" } },
    { $sort: { createdAt: -1 } },
    { $skip: skip },
    { $limit: limit },
  ]);

  return properties;
};

export const getProperty = async (propertyId: string) => {
  const property = await Property.findById(propertyId);
  return property;
};

export const createProperty = async (
  imageFiles: Express.Multer.File[],
  propertyFormData: PropertyInput
) => {
  try {
    //* upload images
    const imageUrls = await uploadImagesToCloudinary(imageFiles);

    propertyFormData.imageUrls = imageUrls;

    const property = new Property(propertyFormData);
    await property.save();
    return property;
  } catch (e: any) {
    throw new Error(e.message || "An error occurred during property creation!");
  }
};

export const updateProperty = async (
  id: string,
  imageFiles: Express.Multer.File[],
  propertyFormData: PropertyInput
) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) throw new Error("Invalid id!");

    // update text values first
    const property = await Property.findOneAndUpdate(
      { _id: id },
      propertyFormData,
      {
        new: true,
      }
    );

    if (!property) throw new Error("Property not found!");

    //* upload images
    const currentImageUrls = await uploadImagesToCloudinary(imageFiles);
    property.imageUrls = [
      ...currentImageUrls,
      ...(propertyFormData.imageUrls || []), // append the previous imageUrls, if deleted then just append empty array
    ];

    await property.save();

    return property;
  } catch (e: any) {
    throw new Error(
      e.message || "An error occurred during property modification!"
    );
  }
};

export const deleteProperty = async (id: string) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) throw new Error("Invalid id!");

    const property = await Property.findOneAndDelete({ _id: id });

    if (!property) throw new Error("Property not found!");

    return true;
  } catch (e: any) {
    throw new Error(
      e.message || "An error occurred during property deletetion!"
    );
  }
};
