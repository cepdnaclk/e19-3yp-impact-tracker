import AuthModel from "../db/auth.schema";
import bcrypt from "bcryptjs";

async function createAuth(email: string, password: string): Promise<boolean> {
  try {
    // check auth exists
    const authExists = await checkAuthExists(email);

    if (authExists) {
      throw new Error("Auth already exists");
    }

    const salt = await bcrypt.genSalt(10);
    const new_password = await bcrypt.hash(password, salt);

    // Create a new instance of the Auth model
    const authInstance = new AuthModel({
      email: email,
      password: new_password,
    });

    // Save the auth to the database
    await authInstance.save();

    // Return true if save was successful
    return true;
  } catch (error) {
    // Handle any errors (e.g., validation error, database error)
    console.error(error);
    // Return false indicating failure
    throw new Error("Error creating auth");
  }

  return false;
}

async function checkAuthExists(email: string): Promise<boolean> {
  try {
    const existingAuth = await AuthModel.findOne({ email });
    const authExists = !!existingAuth;
    return authExists;
  } catch (error) {
    console.error(error);
    throw new Error("Error checking auth existence");
  }

  return false;
}

async function checkAuth(email: string, password: string): Promise<boolean> {
  try {
    const existingAuth = await AuthModel.findOne({ email });
    const authExists = !!existingAuth;
    if (authExists) {
      const isMatch = await bcrypt.compare(password, existingAuth.password);
      return isMatch;
    }
  } catch (error) {
    console.error(error);
    throw new Error("Error checking auth existence");
  }
  return false;
}

export { createAuth, checkAuthExists, checkAuth };
