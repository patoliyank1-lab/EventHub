import { User } from "@/models/user.model";
import { BadRequestError, ConflictError, NotFoundError } from "@/utils/error";

export const authService = {
  register: async (name: string, email: string, password: string) => {
    const emailUser = await User.findOne({ email });
    if (emailUser) {
      throw new ConflictError("This email is already resister");
    }

    const newUser = new User({ email, name, password });
    const resUser = (await newUser.save()).toObject();

    const { password: _password, createdAt: _c, updatedAt: _y, __v: _v, ...otherValue } = resUser;

    const response = {
      user: otherValue,
    };
    return response;
  },

  login: async ({ email, pass }: { email: string; pass: string }) => {
    const user = await User.findOne({ email });
    if (!user) {
      throw new NotFoundError("Email is not register.");
    }

    if (pass !== user.password) {
      throw new BadRequestError("email or password incorrect.");
    }

    const userObj = user.toObject();

    const { password: _password, createdAt: _c, updatedAt: _y, __v: _v, ...otherValue } = userObj;

    const response = {
      user: otherValue,
    };
    return response;
  },
};
