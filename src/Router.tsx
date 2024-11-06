import App from "./App";
import { createBrowserRouter } from "react-router-dom";
import Profile from "./routes/Profile";
import NotFound from "./routes/NotFound";
import Comments from "./routes/Comments";
import Layout from "./components/Layout";
import GameLoading from "./components/GameLoading";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <App />,
      },
      {
        path: "redirect/:gameId",
        element: <GameLoading />,
      },
      {
        path: "profile",
        element: <Profile />,
      },
      {
        path: "comments",
        element: <Comments />,
      },
    ],
    errorElement: <NotFound />,
  },
]);

export default router;
