import { asyncHandler } from "@/utils/async-handler";
import { authService } from "@/services/user.service";
import { formattedResponse } from "@/utils/response";
import { User } from "@/models/user.model";
import { NotFoundError } from "@/utils/error";

/**
 * @description Registers a new user in the system.
 * @route POST /api/auth/register
 * @access Public
 */
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  const response = await authService.register(name, email, password);

  formattedResponse(res, response.user, 201);
});

/**
 * @description Login new user in the system.
 * @route POST /api/auth/login
 * @access Public
 */
const loginUser = asyncHandler(async (req, res) => {
  const { email, password }: { email: string; password: string } = req.body;

  const response = await authService.login({ email, pass: password });

  formattedResponse(res, response.user, 200);
});

export const getUserById = asyncHandler(async (req, res) => {
  const id = req.params.id as string | undefined;
  if(!id) throw new NotFoundError("This user not found")

  const response = await User.findById(id).select("-password -createdAt -updatedAt -__v").lean()
  if(!response) throw new NotFoundError("This user not found")

  formattedResponse(res, response, 200);
});


export { registerUser, loginUser };
