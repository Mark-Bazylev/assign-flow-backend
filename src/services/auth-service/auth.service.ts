import { PrismaClient, User} from "@prisma/client";
import { comparePassword, hashPassword, signToken } from "../../utils/auth";
import { BadRequestError,UnauthenticatedError } from "../../errors";

const prisma = new PrismaClient();

class AuthService {
  public async register(registerParams: User) {
    const { email, password, name } = registerParams;

    if (password.length < 4) {
      throw new BadRequestError("Password is too short");
    }
    const hashedPassword = await hashPassword(password);

    const user = await prisma.user.create({
      data: { email, name, password: hashedPassword },
    });

    return signToken({
      id: user.id,
      email: user.email,
      name: user.name,
    });
  }

  public async login(loginParams: User) {
    const { email, password } = loginParams;
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      throw new UnauthenticatedError("Invalid credentials");
    }
    const isCorrectPassword = comparePassword(password, user.password);

    if (!isCorrectPassword) {
      throw new UnauthenticatedError("Invalid credentials");
    }

    return signToken({
      id: user.id,
      email: user.email,
      name: user.name,
    });
  }
}

export const authService = new AuthService();
