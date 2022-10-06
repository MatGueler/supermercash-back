import dotenv from "dotenv";
import { registerUser } from "../../src/Service/UserService";
import { getUserByEmail } from "../../src/Repository/UserRepository";
import { generateFactory } from "../Factories/User/CreateUserFactory";
import * as userRepository from "../../src/Repository/UserRepository";
import * as userService from "../../src/Service/UserService";

dotenv.config();

beforeEach(() => {
  jest.resetAllMocks();
  jest.clearAllMocks();
});

//  DONE => TESTE 1
describe("Register User", () => {
  it("Register a new user", async () => {
    const body = await generateFactory.CreateRandomUser();

    // *
    jest
      .spyOn(userRepository, "getUserByEmail")
      .mockImplementationOnce((): any => {});

    // *
    jest
      .spyOn(userRepository, "insertUser")
      .mockImplementationOnce((): any => {});

    await registerUser(body);

    // *
    expect(userRepository.getUserByEmail).toBeCalled();
    expect(userRepository.insertUser).toBeCalled();
  });
});

//  DONE => TESTE 2
describe("Login User", () => {
  it("Login user passed", async () => {
    const body = await generateFactory.CreateRandomUser();
    const encryptedPassword = await generateFactory.EncryptPassword(
      body.password
    );
    console.log({
      ...body,
      password: encryptedPassword,
      id: 1,
    });

    // *
    jest
      .spyOn(userRepository, "getUserByEmail")
      .mockImplementationOnce((): any => {
        return {
          ...body,
          password: encryptedPassword,
          id: 1,
        };
      });

    // *
    jest
      .spyOn(userRepository, "loginUser")
      .mockImplementationOnce((): any => {});

    await userService.loginUser(body);

    // *
    expect(userRepository.getUserByEmail).toBeCalled();
    expect(userRepository.loginUser).toBeCalled();
  });
});

//  DONE => TESTE 3
describe("Ger user infos", () => {
  it("Get all user infos", async () => {
    const body = await generateFactory.CreateRandomUser();
    const id = await generateFactory.CreateRandomId();

    // *
    jest
      .spyOn(userRepository, "getUserById")
      .mockImplementationOnce((): any => {
        return {
          ...body,
          id,
        };
      });

    await userService.GetUserInfos(id);

    // *
    expect(userRepository.getUserById).toBeCalled();
  });
});
