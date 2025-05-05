import { createBrowserRouter, RouterProvider } from "react-router";
import Signin from "./views/auth/signin";
import Signup from "./views/auth/signup";
import MeetingScreen from "./views/meetings";

function App() {
  const router = createBrowserRouter([
    {
      path: "/signin",
      element: <Signin />,
    },
    {
      path: "/signup",
      element: <Signup />,
    },
    {
      path: "/meeting",
      element: <MeetingScreen />,
    },
    {
      path: "/",
      element: (
        <h1 className="text-3xl font-semibold">
          Welcome to online auction platform
        </h1>
      ),
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
