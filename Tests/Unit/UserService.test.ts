import dotenv from "dotenv";
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

    await userService.registerUser(body);

    // *
    expect(userRepository.getUserByEmail).toBeCalled();
    expect(userRepository.insertUser).toBeCalled();
  });

  it("Try register if a user already exist", async () => {
    const body = await generateFactory.CreateRandomUser();
    const encryptedPassword = await generateFactory.EncryptPassword(
      body.password
    );

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
      .spyOn(userRepository, "insertUser")
      .mockImplementationOnce((): any => {});

    const promise = userService.registerUser(body);

    // *
    expect(userRepository.getUserByEmail).toBeCalled();
    expect(userRepository.insertUser).not.toBeCalled();
    expect(promise).rejects.toEqual({
      type: "unauthorized",
      message: "Unable to create account",
    });
  });
});

//  DONE => TESTE 2
describe("Login User", () => {
  it("Login user passed", async () => {
    const body = await generateFactory.CreateRandomUser();
    const encryptedPassword = await generateFactory.EncryptPassword(
      body.password
    );

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

  it("Login user passed", async () => {
    const body = await generateFactory.CreateRandomUser();

    // *
    jest
      .spyOn(userRepository, "getUserByEmail")
      .mockImplementationOnce((): any => {});

    // *
    jest
      .spyOn(userRepository, "loginUser")
      .mockImplementationOnce((): any => {});

    const promise = userService.loginUser(body);

    // *
    expect(userRepository.getUserByEmail).toBeCalled();
    expect(userRepository.loginUser).not.toBeCalled();
    expect(promise).rejects.toEqual({
      type: "not_found",
      message: "User not found",
    });
  });
});

//  DONE => TESTE 3
describe("Get user infos", () => {
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

//  DONE => TESTE 4
describe("Update user infos", () => {
  it("Update user infos", async () => {
    const body = await generateFactory.CreateRandomUserInfos();
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

    // *
    jest
      .spyOn(userRepository, "updateUserInfo")
      .mockImplementationOnce((): any => {});

    // *
    jest
      .spyOn(userRepository, "updateUserAdress")
      .mockImplementationOnce((): any => {});

    // *
    jest
      .spyOn(userRepository, "updateUserPhone")
      .mockImplementationOnce((): any => {});

    await userService.updateUserInfo(body, id);

    // *
    expect(userRepository.getUserById).toBeCalled();
    expect(userRepository.updateUserInfo).toBeCalled();
    expect(userRepository.updateUserAdress).toBeCalled();
    expect(userRepository.updateUserPhone).toBeCalled();
  });
});

//  DONE => TESTE 5
describe("Update user image", () => {
  it("Update user image", async () => {
    const body = await generateFactory.CreateRandomUser();
    const urlImage = await generateFactory.CreateUrlImage();
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

    // *
    jest
      .spyOn(userRepository, "updateUserImage")
      .mockImplementationOnce((): any => {});

    await userService.updateUserImage(urlImage, id);

    // *
    expect(userRepository.getUserById).toBeCalled();
    expect(userRepository.updateUserImage).toBeCalled();
  });
});
