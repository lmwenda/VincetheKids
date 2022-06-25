import Joi, { Schema } from "@hapi/joi";

export default function ValidateUser(body: Body): Schema{
    const schema: Schema = Joi.object({
        email: Joi.string().min(3).required().email(),
        password: Joi.string().min(6).required(),
  });
  return schema.validate(body);
}
  
