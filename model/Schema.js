import { Schema, model, models } from "mongoose";

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: false,
  },
  password: {
    type: String,
    required: true,
  },
});

const Users = models.user || model("user", userSchema);

// const Users = mongoose.models && "user" in mongoose.models ? mongoose.models. Users : mongoose.model("user", userSchema);
// export default Product;

export default Users;
