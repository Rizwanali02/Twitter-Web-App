import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./Home";
import Profile from "../pages/Profile";
import Login from "../pages/Login";
import Feed from "./Feed";
import BookMark from "../pages/BookMark";
import Register from "../pages/Register";
import MyTweets from "../pages/MyTweets";
import ChatSection from "../chat/ChatSection";
import ChatUsers from "../chat/ChatUsers";

const Routes = () => {
  const appRouter = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
      children: [
        {
          path: "/",
          element: <Feed />,
        },
        {
          path: "/profile/:id",
          element: <Profile />,
        },
        {
          path: "/bookmark",
          element: <BookMark />,
        },
        {
          path: "/chat",
          element: <ChatUsers />,
        },
        {
          path: "/chat/:id",
          element: <ChatSection />,
        },
      ],
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/register",
      element: <Register />,
    },
    // {
    //   path: "/mytweets",
    //   element: <MyTweets />,
    // },
  ]);

  return (
    <div>
      <RouterProvider router={appRouter} />
    </div>
  );
};

export default Routes;
