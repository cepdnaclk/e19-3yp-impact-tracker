import {
  Manager,
  ManagerRequestBody,
  ManagerExistsResponse,
  ManagerResponse,
} from "../models/manager.model";
import { Request, Response } from "express";
import managerService from "../services/manager.service";

export async function createManager(
  manager: Manager
): Promise<ManagerResponse | undefined> {
  try {
    const managerResponse = await managerService.createManager(manager);
    return managerResponse;
  } catch (error) {
    console.error(error);
  }
  return;
}

export async function getManager(
  managerId: string
): Promise<ManagerResponse> {
  try {
    const managerResponse = await managerService.getManager(managerId);
    return managerResponse;
  } catch (error) {
    console.error(error);
    // Handle the error, either by returning a default value or throwing an error
    throw new Error("Failed to get manager");
  }
}

export async function checkManagerExists(email: string): Promise<boolean> {
  try {
    // const email = req.params.email;
    // Call the function in service
    const managerExists = await managerService.checkManagerExists(email);
    // res.status(200).json(managerExists);
    return managerExists.managerExists;
  } catch (error) {
    console.error(error);
    throw new Error("Internal Server Error");
  }
}


