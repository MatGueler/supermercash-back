import joi from "joi";

const UpdateUserImageSchema = joi.object({
  userImage: joi.string().uri(),
});

export default UpdateUserImageSchema;
