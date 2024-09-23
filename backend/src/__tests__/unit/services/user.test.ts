import { vi, describe, it, expect } from "vitest";
import mongoose from "mongoose";
import createServer from "../../../utils/server";
import * as UserService from "../../../services/UserService";
import User from "../../../models/User";
import omit from "lodash/omit";
import {
  createDefaultUserInput,
  createDefaultUserInputWithId,
} from "../../helpers/userData";

const app = createServer();

const userId = new mongoose.Types.ObjectId().toString();

let input = createDefaultUserInput();

describe("UserService", () => {
  describe("createUser", () => {
    it("should register new user and return user details with omitted password", async () => {
      const mockUser = {
        toJSON: () => input,
      };

      vi.spyOn(User, "create").mockResolvedValue(mockUser as any);

      const result = await UserService.createUser(input);

      expect(result).toEqual(omit(mockUser.toJSON(), "password"));
      expect(User.create).toHaveBeenCalledWith(input);
    });

    it("should throw an error if user registration fails", async () => {
      const error = new Error("Creation failed");

      vi.spyOn(User, "create").mockRejectedValue(error);

      await expect(UserService.createUser(input)).rejects.toThrow(
        "Creation failed"
      );
    });
  });

  describe("updateUser", () => {
    input = createDefaultUserInputWithId({ _id: userId });
    it("should update a user and return updated user details with omitted password", async () => {
      const mockUser = {
        toJSON: () => input,
      };

      vi.spyOn(User, "findOneAndUpdate").mockResolvedValue(mockUser as any);

      const result = await UserService.updateUser(userId, input);

      expect(result).toEqual(omit(mockUser.toJSON(), "password"));
      expect(User.findOneAndUpdate).toHaveBeenCalledWith(
        { _id: userId },
        { ...input },
        { new: true }
      );
    });

    it("should return false if no user is found", async () => {
      vi.spyOn(User, "findOneAndUpdate").mockResolvedValue(null);

      const result = await UserService.updateUser(userId, input);

      expect(result).toBe(false);
      expect(User.findOneAndUpdate).toHaveBeenCalledWith(
        { _id: userId },
        { ...input },
        { new: true }
      );
    });

    it("should throw an error if user update fails", async () => {
      const error = new Error("Update failed");

      vi.spyOn(User, "findOneAndUpdate").mockRejectedValue(error);

      await expect(UserService.updateUser(userId, input)).rejects.toThrow(
        "Update failed"
      );
    });
  });

  describe("getUser", () => {
    it("should return the user  details with omitted password", async () => {
      input = createDefaultUserInputWithId({ _id: userId });
      const mockUser = {
        toJSON: () => input,
      };

      // mock the select in mongoose
      // vi.spyOn(User, "findById").mockResolvedValue({
      //   select: vi.fn().mockResolvedValueOnce(mockUser as any),
      // });

      vi.spyOn(User, "findById").mockResolvedValue(mockUser as any);

      const result = await UserService.getUser(userId);

      expect(result).toEqual(omit(mockUser.toJSON(), "password"));
      expect(User.findById).toHaveBeenCalledWith(userId);
    });

    it("should return false if no user is found", async () => {
      vi.spyOn(User, "findById").mockResolvedValue(null);

      const result = await UserService.getUser(userId);

      expect(result).toBe(false);
      expect(User.findById).toHaveBeenCalledWith(userId);
    });
  });
});
