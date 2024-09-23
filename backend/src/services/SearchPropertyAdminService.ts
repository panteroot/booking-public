import Property, { PropertyInput } from "../models/Property";

type PaginatedProperty = {
  data: PropertyInput[];
  pagination: {
    total: number;
    page: number;
    pages: number;
  };
};

export const searchPaginatedPropertiesForAdmin = async (
  propertyName: string,
  pageNumber: number,
  skip: number,
  limit: number
) => {
  try {
    let searchQuery: any = {};
    let queryProperty: any;
    let properties;
    let total = await Property.countDocuments();

    if (propertyName !== "" && propertyName !== undefined) {
      searchQuery.name = new RegExp(propertyName, "i");
    }

    queryProperty = [{ $skip: skip }, { $limit: limit }];

    // Conditionally add the $match stage if searchQuery is not empty
    if (Object.keys(searchQuery).length > 0) {
      queryProperty.unshift({ $match: searchQuery });
      total = await Property.countDocuments(searchQuery);
    }

    properties = await Property.aggregate(queryProperty);

    // remove the limit and skip
    queryProperty.pop();
    queryProperty.pop();

    const response: PaginatedProperty = {
      data: properties,
      pagination: {
        total,
        page: pageNumber,
        pages: Math.ceil(total / limit),
      },
    };

    return response;
  } catch (e: any) {
    throw new Error(e.message || "An error occurred during properties search!");
  }
};
