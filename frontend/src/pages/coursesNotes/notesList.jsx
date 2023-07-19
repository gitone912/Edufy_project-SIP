import React, { useState, useEffect } from 'react';
import './style.css';
import { useGetOnnotesQuery } from '@/services/courseServiceApi';
import { useParams } from 'react-router-dom';
import { Navbar, Footer } from "@/widgets/layout";
import {
  ChartPieIcon,
  UserIcon,
  UserPlusIcon,
  ArrowRightOnRectangleIcon,
} from "@heroicons/react/24/solid";
import { Typography } from '@material-tailwind/react';

const NotesList = () => {
  const [notes, setNotes] = useState([]);

  const { notesId } = useParams();

  const Response = useGetOnnotesQuery(notesId);

  useEffect(() => {
    // Check if Response.data.all_notes is defined before setting the notes
    if (Response.data && Response.data.all_notes) {
      setNotes(Response.data.all_notes);
    }
  }, [Response.data]);

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
    }
  ];

  return (
    <>
      <div className="relative min-h-screen w-full">
        <div className="container relative z-40 mx-auto p-4">
          <Navbar routes={navbarRoutes} />

          <div className="grid grid-cols-1 gap-4 mt-4 md:grid-cols-2 lg:grid-cols-3">
            {notes?.map(({id,title,notes_link,notesNumber}) => (
              <div key={notesNumber} className="bg-white rounded-lg p-4 shadow-md">
                {/* Render the data from each note here */}
                <Typography>{title}</Typography>
                <a href={notes_link} target="_blank" rel="noreferrer">go</a>
                
              </div>
            ))}
          </div>

        </div>

        <div className="container absolute bottom-8 left-2/4 z-10 mx-auto -translate-x-2/4 text-black">
          <Footer />
        </div>
      </div>
    </>
  );
};

export { NotesList };
