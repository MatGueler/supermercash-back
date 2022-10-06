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

  // it("Doesent create a repeated recomendation", async () => {
  //   const CreateRecommendationData = {
  //     name: "string",
  //     youtubeLink: "https://www.youtube.com/watch?v=lVTsBkLiTck",
  //   };

  //   // * Mock search recommendations by name
  //   jest
  //     .spyOn(recommendationRepository, "findByName")
  //     .mockImplementationOnce((): any => {
  //       return CreateRecommendationData;
  //     });

  //   // * Mock the function that create new recommendation on database
  //   jest
  //     .spyOn(recommendationRepository, "create")
  //     .mockImplementationOnce((): any => {
  //       return CreateRecommendationData;
  //     });

  //   const promise = recommendationService.insert(CreateRecommendationData);

  //   //  * Expected that second mock dont be called and exist conflict error
  //   expect(recommendationRepository.findByName).toBeCalled();
  //   expect(recommendationRepository.create).not.toBeCalled();
  //   expect(promise).rejects.toEqual({
  //     type: "conflict",
  //     message: "Recommendations names must be unique",
  //   });
  // });
});

//  DONE => TESTE 2
describe("Login User", () => {
  it("Login user passed", async () => {
    const body = await generateFactory.CreateRandomUser();
    const encryptedPassword = await generateFactory.EncryptPassword(body.password);
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

  // it("Doesent create a repeated recomendation", async () => {
  //   const CreateRecommendationData = {
  //     name: "string",
  //     youtubeLink: "https://www.youtube.com/watch?v=lVTsBkLiTck",
  //   };

  //   // * Mock search recommendations by name
  //   jest
  //     .spyOn(recommendationRepository, "findByName")
  //     .mockImplementationOnce((): any => {
  //       return CreateRecommendationData;
  //     });

  //   // * Mock the function that create new recommendation on database
  //   jest
  //     .spyOn(recommendationRepository, "create")
  //     .mockImplementationOnce((): any => {
  //       return CreateRecommendationData;
  //     });

  //   const promise = recommendationService.insert(CreateRecommendationData);

  //   //  * Expected that second mock dont be called and exist conflict error
  //   expect(recommendationRepository.findByName).toBeCalled();
  //   expect(recommendationRepository.create).not.toBeCalled();
  //   expect(promise).rejects.toEqual({
  //     type: "conflict",
  //     message: "Recommendations names must be unique",
  //   });
  // });
});
