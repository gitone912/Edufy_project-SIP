import React, { useState  , useEffect} from 'react';
import './style.css';
import { useGetOnePlaylistQuery } from '@/services/courseServiceApi';
import { useParams } from 'react-router-dom';
const VideoList = () => {
  const [videos, setVideos] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(videos[0]);

  const handleVideoClick = (video) => {
    setSelectedVideo(video);
  };
  const { playlistId } = useParams();
  const Response = useGetOnePlaylistQuery(playlistId);
  const res = Response.data;
  useEffect(() => {
    if (res) {
      setVideos(res.all_videos);
    }
  }, [res]);
  console.log('videos', videos);
  console.log('selectedVideo', selectedVideo);
  return (
    <>
      <main className="container">
        <section className="main-video">
          <iframe
            title={selectedVideo?.title}
            width="560"
            height="315"
            src={`${selectedVideo?.id}`}
            
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
          <h3 className="title">{selectedVideo?.title}</h3>
        </section>

        <section className="video-playlist">
          <h3 className="title text-black">Title of Video Playlist</h3>
          <p>10 lessons &nbsp; . &nbsp; 50m 48s</p>
          <div className="videos">
            {videos?.map((video, i) => (
              <div
                key={video.id}
                className={`video ${selectedVideo.id === video.id ? 'active' : ''}`}
                onClick={() => handleVideoClick(video)}
              >
                <img src="/images/play.svg" alt="" />
                <p>{i + 1 > 9 ? i + 1 : '0' + (i + 1)}. </p>
                <h3 className="title">{video.title}</h3>
                <p className="time">{video.duration}</p>
              </div>
            ))}
          </div>
        </section>
      </main>
    </>
  );
};

export { VideoList };
