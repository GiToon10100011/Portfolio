import App from "./App";
import { createBrowserRouter } from "react-router-dom";
import Detail from "./routes/Detail";
import Profile from "./routes/Profile";
import NotFound from "./routes/NotFound";
import Comments from "./routes/Comments";
import Layout from "./components/Layout";

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
        path: "detail/:projectId",
        element: <Detail />,
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
