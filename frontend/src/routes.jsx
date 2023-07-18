import {
  HomeIcon,
  UserCircleIcon,
  TableCellsIcon,
  BellIcon,
  ArrowRightOnRectangleIcon,
  UserPlusIcon,
  UserIcon,
  ArrowLeftOnRectangleIcon
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
        icon: <TableCellsIcon {...icon} />,
        name: "Posts",
        path: "/posts",
        element: <Posts />,
      },
      {
        icon: <BellIcon {...icon} />,
        name: "One shot courses",
        path: "/courses",
        element: <AllCourses />,
      },
      {
        icon: <UserIcon {...icon} />,
        name: "Playlists(full courses)",
        path: "/playlists",
        element: <Playlists/>,
      },
      {
        icon: <UserIcon {...icon} />,
        name: "Notes",
        path: "/notes",
        element: <Notes />,
      },
      {
        icon: <UserIcon {...icon} />,
        name: "Doubts and Discussions",
        path: "/doubts_and_discussions",
        element: <Notifications />,
      },
      {
        icon: <UserIcon {...icon} />,
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
