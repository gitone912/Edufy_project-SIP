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
  EyeSlashIcon,
  PrinterIcon
} from "@heroicons/react/24/solid";
import { Home, Profile, Tables, Notifications } from "@/pages/dashboard";
import { SignIn, SignUp  } from "@/pages/auth";
import SignOut from "./pages/auth/sign-out";
import { ChangePassword } from "@/pages/auth"
import Posts from "./pages/dashboard/posts";
import { AllCourses } from "./pages/coursesNotes/allCourses";
import { Playlists } from "./pages/coursesNotes/playlists";
import { Notes } from "./pages/coursesNotes/notes";
import { getToken } from "./services/LocalStorageService";
import GenNotesPage from "@/pages/coursesNotes/generatenotes";
const icon = {
  className: "w-5 h-5 text-inherit",
};
const { access_token } = getToken();
const authOptions = access_token
  ? [{
    icon: <ArrowLeftOnRectangleIcon {...icon} />,
    name: "sign out",
    path: "/sign-out",
    element: <SignOut />,
  },
  ]
  : [
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
    ];

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
      // <Route path="/generate-notes/" element={<GenNotesPage />} />
      {
        icon: <PrinterIcon {...icon} />,
        name: "Generate Notes from Link",
        path: "/generate-notes",
        element: <GenNotesPage />,
      }
      
     
    ],
  },
  {
    title: "auth pages",
    layout: "auth",
    pages:  [
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
      }
      ],
  },
];

export default routes;
