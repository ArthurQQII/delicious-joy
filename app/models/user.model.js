const { Schema } = require("mongoose");

module.exports = mongoose => {
    var schema = mongoose.Schema(
        {
            username: String,
            email: String, 
            password: String, 
            role: String
        },
        { timestamps: true }
    )


    // Override toJSON method that map default object to a custom object.
    schema.method("toJSON", function() { // function() {}
        const { __v, _id, ...object } = this.toObject();
        object.id = _id;
        return object;
    });

    const User = mongoose.model("user", schema);
    return User;
};