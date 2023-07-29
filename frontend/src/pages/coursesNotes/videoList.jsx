import React, { useState, useEffect } from 'react';
import './style.css';
import { useGetOnePlaylistQuery } from '@/services/courseServiceApi';
import { useParams } from 'react-router-dom';
import { Navbar, Footer } from '@/widgets/layout';
import { ChartPieIcon, UserIcon, BackspaceIcon } from '@heroicons/react/24/solid';
import { Typography, Button } from '@material-tailwind/react';
import { useGetLoggedUserQuery } from '@/services/userAuthApi';
import { getToken } from '../../services/LocalStorageService';
import {
  useUpdateWeeklyUpdateMutation,
  useUpdateMonthlyUpdateMutation,
} from '@/services/courseServiceApi';

const VideoList = () => {
  const [videos, setVideos] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState();
  const { playlistId } = useParams();
  const Response = useGetOnePlaylistQuery(playlistId);
  const res = Response.data;
  const [totalVideoHours, setTotalVideoHours] = useState(0);

  const { access_token } = getToken();
  const { data: loggedUser, isLoading } = useGetLoggedUserQuery(access_token);
  const [updateWeeklyUpdate] = useUpdateWeeklyUpdateMutation();
  const [updateMonthlyUpdate] = useUpdateMonthlyUpdateMutation();

  useEffect(() => {
    if (res) {
      const sortedVideos = [...res.all_videos].sort((a, b) => a.videoNumber - b.videoNumber);
      setVideos(sortedVideos);
      setSelectedVideo(sortedVideos[0]);

      const totalHours = sortedVideos.reduce((acc, video) => acc + video.videoDurationInHours, 0);
      setTotalVideoHours(totalHours);
    }
  }, [res]);

  const handleVideoClick = (video) => {
    setSelectedVideo(video);
  };

  const handleEmailFetch = async (videoDurationInHours) => {
    try {
      if (loggedUser && loggedUser.data && loggedUser.data.email) {
        const email = loggedUser.data.email;
        console.log("Email", email);
        const weeklyUpdateData = {
          user_email: email,
          hours_spent: videoDurationInHours,
          playlists_completed: 1,
        };
        const monthlyUpdateData = {
          user_email: email,
          hours_spent: videoDurationInHours,
        };
        console.log("weeklyUpdateData", weeklyUpdateData);
        console.log("monthlyUpdateData", monthlyUpdateData);

        sendWeeklyUpdate(weeklyUpdateData);
        sendMonthlyUpdate(monthlyUpdateData);

        console.log("Weekly Update Data:", weeklyUpdateData);
        console.log("Monthly Update Data:", monthlyUpdateData);
      } else {
        console.error("Logged user or email not available.");
      }
    } catch (error) {
      console.error("Failed to fetch profile details:", error);
    }
  };

  const sendWeeklyUpdate = (data) => {
    try {
      const response = updateWeeklyUpdate(data);
      console.log("Weekly Update Mutation Response:", response);
    } catch (error) {
      console.error("Failed to update weekly data:", error);
    }
  };

  const sendMonthlyUpdate = (data) => {
    try {
      const response = updateMonthlyUpdate(data);
      console.log("Monthly Update Mutation Response:", response);
    } catch (error) {
      console.error("Failed to update monthly data:", error);
    }
    window.location.href = "/dashboard/home";
  };

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
    },
    {
      name: "Back to Playlists",
      path: "/dashboard/playlists",
      icon: BackspaceIcon,
    }
  ];

  return (
    <>
    {/* ... (existing code) */}
    <div className="relative min-h-screen w-full">
      <div className="container relative z-40 mx-auto p-4">
        <Navbar routes={navbarRoutes} />
      </div>

      <main className="grid gap-4 grid-cols-1 md:grid-cols-2">
        <div className="embed-responsive embed-responsive-16by9 relative w-full overflow-hidden " style={{ paddingTop: '56.25%' }}>
          {selectedVideo && (
            <iframe
              className="embed-responsive-item absolute bottom-0 left-0 right-0 top-0 h-full w-full"
              title={selectedVideo.title}
              width="100%" // Change width to 100% for responsiveness
              height="100%" // Maintain aspect ratio
              src={`${selectedVideo.video_link}`}
              allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          )}
          {selectedVideo && <h3 className="title">{selectedVideo.title}</h3>}
        </div>

        <div className="flex flex-col rounded-lg bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700 md:order-1">
          <section className="video-playlist overflow-y-auto h-80 md:h-auto bg-white-900">
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
                  <p className="time">{video.videoDurationInHours} Minutes</p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>

      <div className="container mx-auto p-4">
        <Typography color="gray" className="text-lg font-semibold">
          {selectedVideo && selectedVideo.title}
        </Typography>
        <Typography color="gray" className="text-sm">
          {selectedVideo && <p>Description: {selectedVideo.description}</p>}
          {selectedVideo && <p>{selectedVideo.codes}</p>}
          {selectedVideo && <p>Duration: {selectedVideo.videoDurationInHours} Minutes</p>}
        </Typography>
      </div>

      <div className="container mx-auto p-4">
        <Button
          color="lightBlue"
          buttonType="filled"
          size="regular"
          rounded={false}
          iconOnly={false}
          ripple="light"
          className="mt-4"
          onClick={() => handleEmailFetch(totalVideoHours)}
        >
          Click if completed {totalVideoHours} Minutes
        </Button>
      </div>
    </div>
  </>
);
};

export { VideoList };