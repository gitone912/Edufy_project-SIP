import React, { useState, useEffect } from 'react';
import './style.css';
import { useGetOnePlaylistQuery } from '@/services/courseServiceApi';
import { useParams } from 'react-router-dom';
import { Navbar, Footer } from "@/widgets/layout";
import {
  ChartPieIcon,
  UserIcon,
  UserPlusIcon,
  ArrowRightOnRectangleIcon,
} from "@heroicons/react/24/solid";
const VideoList = () => {
  const [videos, setVideos] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(); // Initialize to undefined

  const { playlistId } = useParams();
  const Response = useGetOnePlaylistQuery(playlistId);
  const res = Response.data;

  useEffect(() => {
    if (res) {
      // Create a new array copy and sort it by videoNumber
      const sortedVideos = [...res.all_videos].sort((a, b) => a.videoNumber - b.videoNumber);
      setVideos(sortedVideos);
      setSelectedVideo(sortedVideos[0]); // Set the first video as selected
    }
  }, [res]);

  const handleVideoClick = (video) => {
    setSelectedVideo(video);
  };

  console.log('videos', videos);
  const navbarRoutes = [
    {
      name: "dashboard",
      path: "/dashboard/home",
      icon: ChartPieIcon,
    },
    {
      name: "profile",
      path: "/dashboard/home",
      icon: UserIcon,
    }];
  return (
    <> <div className="relative min-h-screen w-full">
    <div className="container relative z-40 mx-auto p-4">
      <Navbar routes={navbarRoutes} />
    </div>
      <main className="videocontainer">
        <section className="main-video">
          {selectedVideo && (
            <iframe
              title={selectedVideo.title}
              width="560"
              height="315"
              src={`${selectedVideo.video_link}`}
              allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          )}
          {selectedVideo && <h3 className="title">{selectedVideo.title}</h3>}
        </section>

        <section className="video-playlist">
          {selectedVideo && <p>{selectedVideo.description}</p>}
          <div className="videos">
            {videos.map((video, i) => (
              <div
                key={video.id}
                className={`video ${selectedVideo?.id === video.id ? 'active' : ''}`}
                onClick={() => handleVideoClick(video)}
              >
                <img src="/images/play.svg" alt="" />
                <p>{video.videoNumber > 9 ? video.videoNumber : '0' + video.videoNumber}. </p>
                <h3 className="title">{video.title}</h3>
                <p className="time">{video.duration}</p>
              </div>
            ))}
          </div>
        </section>
      </main>
      <div className="container absolute bottom-8 left-2/4 z-10 mx-auto -translate-x-2/4 text-black">
        <Footer />
      </div>
    </div>
    </>
  );
};

export { VideoList };
