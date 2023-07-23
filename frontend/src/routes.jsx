import {
  HomeIcon,
  UserCircleIcon,
  TableCellsIcon,
  BellIcon,
  ArrowRightOnRectangleIcon,
  UserPlusIcon,
  UserIcon,
  ArrowLeftOnRectangleIcon,
  PhotoIcon,
  PlayCircleIcon,
  FolderOpenIcon,
  DocumentCheckIcon,
  EyeSlashIcon
} from "@heroicons/react/24/solid";
import { Home, Profile, Tables, Notifications } from "@/pages/dashboard";
import { SignIn, SignUp  } from "@/pages/auth";
import SignOut from "./pages/auth/sign-out";
import { ChangePassword } from "@/pages/auth"
import Posts from "./pages/dashboard/posts";
import { AllCourses } from "./pages/coursesNotes/allCourses";
import { Playlists } from "./pages/coursesNotes/playlists";
import { Notes } from "./pages/coursesNotes/notes";
const icon = {
  className: "w-5 h-5 text-inherit",
};


export const routes = [
  {
    layout: "dashboard",
    pages: [
      {
        icon: <HomeIcon {...icon} />,
        name: "dashboard",
        path: "/home",
        element: <Home />,
      },
      {
        icon: <UserCircleIcon {...icon} />,
        name: "profile",
        path: "/profile",
        element: <Profile />,
      },
      {
        icon: <PhotoIcon {...icon} />,
        name: "Posts",
        path: "/posts",
        element: <Posts />,
      },
      {
        icon: <FolderOpenIcon {...icon} />,
        name: "Courses",
        path: "/courses",
        element: <AllCourses />,
      },
      {
        icon: <PlayCircleIcon {...icon} />,
        name: "Playlists(full courses)",
        path: "/playlists",
        element: <Playlists/>,
      },
      {
        icon: <DocumentCheckIcon {...icon} />,
        name: "Notes",
        path: "/notes",
        element: <Notes />,
      },
      
      {
        icon: <EyeSlashIcon {...icon} />,
        name: "change password",
        path: "/change-password",
        element: <ChangePassword />,
      }
    ],
  },
  {
    title: "auth pages",
    layout: "auth",
    pages: [
      {
        icon: <ArrowRightOnRectangleIcon {...icon} />,
        name: "sign in",
        path: "/sign-in",
        element: <SignIn />,
      },
      {
        icon: <UserPlusIcon {...icon} />,
        name: "sign up",
        path: "/sign-up",
        element: <SignUp />,
      },
      {
        icon: <ArrowLeftOnRectangleIcon {...icon} />,
        name: "sign out",
        path: "/sign-out",
        element: <SignOut />,
      },
      
      
    ],
  },
];

export default routes;
