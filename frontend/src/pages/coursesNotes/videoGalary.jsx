import React, { useState } from "react";

const VideoGallery = ({ videos }) => {
  const [activeVideo, setActiveVideo] = useState(videos[0]);

  const handleVideoClick = (video) => {
    setActiveVideo(video);
  };

  return (
    <div className="container">
      <div className="main-video-container">
        <video src={activeVideo.video_link} loop controls className="main-video"></video>
        <h3 className="main-vid-title">{activeVideo.title}</h3>
      </div>

      <div className="video-list-container">
        {videos.map((video, index) => (
          <div
            key={index}
            className={`list ${activeVideo.id === video.id ? "active" : ""}`}
            onClick={() => handleVideoClick(video)}
          >
            <video src={video.video_link} className="list-video" />
            <h3 className="list-title">{video.title}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VideoGallery;
