import usersModels from "../models/users.models.js";

export const getProgress = async (req, res) => {
  try {
    const user = await usersModels
      .findById(req.user.userId)
      .populate("progress.videoId", "title sequence duration");
    res.status(200).json(user.progress);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateProgress = async (req, res) => {
  const { videoId, watchedDuration, completed } = req.body;
  try {
    const user = await usersModels.findById(req.user.userId);

    const progress = user.progress.find((p) => p.videoId.toString() == videoId);
    if (progress) {
      progress.watchedDuration = watchedDuration;
      progress.completed = completed || progress.completed;
      progress.lastAccessed = Date.now();
    } else {
      user.progress.push({
        videoId,
        watchedDuration,
        completed: completed || false,
      });
    }

    await user.save();
    res.status(200).json({ message: "Progress updated" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
