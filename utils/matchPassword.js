import bcrypt from "bcryptjs";

export const matchPassword = async (password, enteredpassword) => {
  return await bcrypt.compare(password, enteredpassword);
};
