import User from "../models/User.js";

export const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(404).json({
      message: error.message,
    });
  }
};

export const getSingleUser = async (req, res) => {
    try {
      const { id: _id } = req.params;
      const user = await User.findById(_id);
      res.status(200).json(user);
    } catch (error) {
      res.status(404).json({
        message: error.message,
      });
    }
  };

export const createUser = async (req, res) => {
    const user = req.body;
    const newUser = new User(user);
    try {
      await newUser.save();
      res.status(201).json(newUser);
    } catch (error) {
      res.status(409).json({
        message: error.message,
      });
    }
  };

export const createImage = async (req, res) => {
    const { id: _id } = req.params;
    const user = req.body;
    try {
      const updatedImages = await User.findByIdAndUpdate(_id, {
        images: user.images,
      });
      res.status(201).json(updatedImages);
    } catch (error) {
      res.status(409).json({
        message: error.message,
      });
    }
};

export const changeAvatar = async (req, res) => {
  const { id: _id } = req.params;
  try{
    const updateAvatar = await User.findByIdAndUpdate(_id, {
      avatar: req.body.avatar
    });
    res.status(201).json(updateAvatar);
  } catch (error) {
    res.status(409).json({
      message: error.message,
    })
  }
}

export const getUsername = async (req, res) => {
  const { username: _username } = req.params;
  try {
    const users = await User.findOne({username: _username});
    res.status(200).json(users);
  } catch (error) {
    res.status(404).json({
      message: error.message,
    });
  }
}

export const getImages = async (req, res) => {
  const { id: _id } = req.params;
  try {
    const user = await User.findById(_id);
    res.status(200).json(user.images);
  } catch (error) {
    res.status(404).json({
      message: error.message,
    });
  }
}

export const getIsUser = async (req, res) => {
  const { username: _username } = req.params;
  try {
    const user = await User.findOne({username: _username});
    if(user === null){
      res.status(200).json(null);
    }else{
      res.status(200).json({_id:user._id, username: user.username, password: user.password});
    }
  } catch (error) {
    res.status(404).json({
      message: error.message,
    });
  }
}



export const queryUsername = async (req, res) => {
  const { username: _username } = req.params;
  try {
    const users = await User.findOne({username: _username},{projection:{username:1}});
    if(users === null){
      res.status(200).json(null);
    }else{
      res.status(200).json(true);
    }
  } catch (error) {
    res.status(404).json({
      message: error.message,
    });
  }
}

export const getId = async (req, res) => {
  const { username: _username } = req.params;
  try {
    const users = await User.findOne({username: _username});
    res.status(200).json(users._id);
  } catch (error) {
    res.status(404).json({
      message: error.message,
    });
  }
}

export const changeUsername = async (req, res) => {
  const { id: _id } = req.params;
  try{
    const updateUsername = await User.findByIdAndUpdate(_id, {
      username: req.body.username
    });
    res.status(201).json(updateUsername);
  } catch (error) {
    res.status(409).json({
      message: error.message,
    })
  }
}

export const changePassword = async (req, res) => {
  const { id: _id } = req.params;
  try{
    const updatePassword = await User.findByIdAndUpdate(_id, {
      password: req.body.password
    });
    res.status(201).json(updatePassword);
  } catch (error) {
    res.status(409).json({
      message: error.message,
    })
  }
}



export const changeFullname = async (req, res) => {
  const { id: _id } = req.params;
  try{
    const updateFullname = await User.findByIdAndUpdate(_id, {
      fullName: req.body.fullName
    });
    res.status(201).json(updateFullname);
  } catch (error) {
    res.status(409).json({
      message: error.message,
    })
  }
}

export const deletePhoto = async (req, res) => {
  const { id: _id } = req.params;
  try{
    const updateImages = await User.findByIdAndUpdate(_id, {
      images: req.body.images
    });
    res.status(201).json(updateImages);
  } catch (error) {
    res.status(409).json({
      message: error.message,
    })
  }
}

export const changePrivacy = async (req, res) => {
  const { id: _id } = req.params;
  try{
    const updatePrivacy = await User.findByIdAndUpdate(_id, {
      privacy: req.body.privacy
    });
    res.status(201).json(updatePrivacy);
  } catch (error) {
    res.status(409).json({
      message: error.message,
    })
  }
}

export const deleteUser = async (req, res) => {
  const { id: _id } = req.params;
  try{
    const deleteProfile = await User.findByIdAndRemove(_id);
    res.status(201).json(deleteProfile);
  } catch (error) {
    res.status(409).json({
      message: error.message,
    })
  }
}