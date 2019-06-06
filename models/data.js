// /backend/data.js
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// this will be our data base's data structure
const DataSchema = new Schema(
    {
        id: Number,
        message: String
    },
    { timestamps: true }
);

// export the new Schema so we could modify it using Node.js
module.exports = mongoose.model("Data", DataSchema);

// If set timestamps, mongoose assigns createdAt and updatedAt fields to your schema, the type assigned is Date.
// By default, the name of two fields are createdAt and updatedAt, customize the field name by setting timestamps.createdAt and timestamps.updatedAt.