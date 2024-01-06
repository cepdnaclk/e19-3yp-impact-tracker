import JwtModel from "../db/jwt.schema";

export async function createJwt(
  email: string,
  token: string
): Promise<boolean> {
  try {
    // check jwt exists
    const jwtExists = await checkJwtExists(email);

    if (jwtExists) {
      deleteJwt(email);
    }

    // Create a new instance of the Jwt model
    const jwtInstance = new JwtModel({
      email: email,
      token: token,
    });

    // Save the jwt to the database
    await jwtInstance.save();

    // Return true if save was successful
    return true;
  } catch (error) {
    // Handle any errors (e.g., validation error, database error)
    console.error(error);
    // Return false indicating failure
    throw new Error("Error creating jwt");
  }

  return false;
}

export async function checkJwtExists(email: string): Promise<boolean> {
  try {
    const existingJwt = await JwtModel.findOne({ email });
    const jwtExists = !!existingJwt;
    return jwtExists;
  } catch (error) {
    console.error(error);
    throw new Error("Error checking jwt existence");
  }

  return false;
}

// delete jwt
export async function deleteJwt(email: string): Promise<boolean> {
  try {
    const existingJwt = await JwtModel.findOne({ email });
    const jwtExists = !!existingJwt;
    if (jwtExists) {
      await JwtModel.deleteOne({ email });
      return true;
    }

    return false;
  } catch (error) {
    console.error(error);
    throw new Error("Error deleting jwt");
  }

  return false;
}
