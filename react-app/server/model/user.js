/*
* User schema, this file needs to be modified when needed for interacting with the user data
* when inputed on the web
*
*/

const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    createdAt: { type: Date, default: Date.now() }
});
  
// export model user with UserSchema
module.exports = mongoose.model("user", UserSchema); // export the module to be able to access it outside this path

