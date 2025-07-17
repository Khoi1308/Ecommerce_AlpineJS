import { NOT_FOUND, SUCCESS } from "../../../config/http";
import { appAssert } from "../../../utils/appAssert";
import { catchErrors } from "../../../utils/catchErrors";
import { mapEntityToDto } from "../dtos/user.dto";
import { UserRepository } from "../repositories/user.repository";

const user_repository = new UserRepository();
export const getUserHandler = catchErrors(async (req, res) => {
  const user = await user_repository.findOne({
    where: { userId: req.userId },
    relations: ["role"],
  });
  appAssert(user, NOT_FOUND, "User not found");

  res.status(SUCCESS).json({
    user: mapEntityToDto(user),
  });
});
