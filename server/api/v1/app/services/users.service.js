import Boom from '@hapi/boom';
import UserModel from '../../../../models/appUsers.model.js';
import Config from 'config';
import { flatObject, generateCustomerId } from '../../../../helper/util.js';
import Mongoose from 'mongoose';
;
import mailer from '../../../../helper/mailer.js';
export class userServices {
  async signUp(insertObj) {
    const { fullName, email, password,role } = insertObj;
    let user = await UserModel.findOne({ email });
    if (user) {
      throw Boom.conflict("User already exists with this email");
    }
    user = new UserModel({
      fullName,
      email,
      password,
      role
    });
    await user.save();
    return user;
  }

  async findUserByEmail(email) {
    let user = await UserModel.findOne({ email: email });
    if (!user) {
      throw new Error("User not found with this email");
    }
    return user;
  }

  async findUserByid(id) {
     const user = await UserModel.findById({_id:id});
     if (!user) {
       throw new Error("User not found");
     }
     return user;
  }

  

}

export default new userServices();
