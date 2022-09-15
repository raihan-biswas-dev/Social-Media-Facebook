const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    first_name: {
      type: String,
      required: [true, "First name is required "],
      trim: true,
      text: true,
    },

    last_name: {
      type: String,
      required: [true, "Last name is required "],
      trim: true,
      text: true,
    },

    username: {
      type: String,
      required: [true, "Username is required "],
      trim: true,
      text: true,
      uinque: true,
    },

    email: {
      type: String,
      required: [true, "Email is required "],
      trim: true,
      text: true,
    },

    password: {
      type: String,
      required: [true, "Password name is required "],
    },

    picture: {
      type: String,
      trim: true,
    },

    cover: {
      type: String,
      trim: true,
    },

    gender: {
      type: String,
      required: [true, "Gender name is required "],
      trim: true,
    },

    bYear: {
      type: Number,
      required: [true, "Year is required "],
      trim: true,
    },

    bMonth: {
      type: Number,
      required: [true, "Month is required "],
      trim: true,
    },

    bDay: {
      type: Number,
      required: [true, "Day is required "],
      trim: true,
    },

    verified: {
      type: Boolean,
      default: false,
    },

    friends: {
      type: Array,
      default: [],
    },

    following: {
      type: Array,
      default: [],
    },

    followers: {
      type: Array,
      default: [],
    },

    request: {
      type: Array,
      default: [],
    },

    search: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
      },
    ],

    details: {
      bio: {
        type: String,
      },
      otherName: {
        type: String,
      },
      job: {
        type: String,
      },
      workPlace: {
        type: String,
      },
      highSchool: {
        type: String,
      },
      currentCity: {
        type: String,
      },
      homeTown: {
        type: String,
      },
      relationship: {
        type: String,
        enum: [
          "Single",
          "In a relationship",
          "Engaged",
          "Married",
          "In a civil partnership",
          "In a domestic partnership",
          "in an open relationship",
          "Separated",
          "Divorced",
          "Widowed",
        ],
      },

      instagram: {
        type: String,
      },
    },

    savedPosts: [
      {
        post: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Post",
        },

        saveAt: {
          type: Date,
          default: new Date(),
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
