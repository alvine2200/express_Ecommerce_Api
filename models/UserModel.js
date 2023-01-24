const mongoose = require("mongoose");
const validate = require("mongoose-validator");

const emailValidator = [
  validate({
    validator: "isEmail",
    message: "Invalid email Provided",
  }),
];
const phoneValidator = [
  validate({
    validator: "isMobilePhone",
    arguments: "en-US",
    message: "Invalid phone number",
  }),
];

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      maxlength: [50, "Name should be less than 50 characters"],
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      validate: emailValidator,
      maxlength: [50, "Name should be less than 50 characters"],
    },
    phone: {
      type: String,
      validate: {
        validator: function (v) {
          return /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im.test(
            v
          );
        },
        message: (props) => `${props.value} is not a valid phone number!`,
      },
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
