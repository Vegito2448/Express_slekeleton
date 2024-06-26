const { Schema, model } = require("mongoose");

const uniqueValidator = require("mongoose-unique-validator");

const topicSchema = Schema({
  name: { type: String, required: true, unique: true },
  allowedContentTypes: [
    {
      type: String,
      required: true,
      enum: ["image", "video", "txt", "document", "audio"],
    },
  ],
  status: { type: Boolean, default: true },
  createdBy: { type: Schema.Types.ObjectId, ref: "User" },
  updatedBy: { type: Schema.Types.ObjectId, ref: "User" },
  deletedBy: { type: Schema.Types.ObjectId, ref: "User" },
});

topicSchema.methods.toJSON = function () {
  const { __v, ...data } = this.toObject();
  return data;
};

topicSchema.plugin(uniqueValidator, { message: "{PATH} must be unique" });

module.exports = model("Topic", topicSchema);
