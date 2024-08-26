import usersModels from "../models/users.models.js";
import videosModels from "../models/videos.models.js";

export const getVideo = async (req, res) => {
  try {
    const videos = await videosModels.find().sort({ sequence: 1 });
    res.status(200).json(videos);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

export const getVideoById = async (req, res) => {
  try {
    const video = await videosModels.findById(req.params.id);
    if (!video) {
      return res.status(404).json({ message: "Video not found" });
    }
    res.status(200).json(video);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

export const createVideo = async (req, res) => {
  const { title, description, url, sequence, duration } = req.body;

  try {
    let video = new videosModels({
      title,
      description,
      url,
      sequence,
      duration,
    });
    await video.save();
    return res.status(200).json(video);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateVideo = async (req, res) => {
  const { title, description, url, sequence, duration } = req.body;
  try {
    let video = await videosModels.findById(req.params.id);
    if (!video) {
      return res.status(404).json({ message: "Video not found" });
    }

    (video.title = title || video.title),
      (video.description = description || video.description),
      (video.url = url || video.url),
      (video.sequence = sequence || video.sequence);
    video.duration = duration || video.duration;

    await video.save();
    res.status(200).json(video);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

export const deleteVideo = async (req, res) => {
  try {
    let video = await videosModels.findById(req.params.id);
    if (!video) {
      return res.status(404).json({ message: "Video not found" });
    }
    await video.remove();
    res.status(200).json({ message: "Video removed" });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};
