import { createBrowserRouter } from "react-router-dom";

import EditorPage from "../pages/EditorPage";
import NotFoundPage from "../pages/NotFoundPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <EditorPage />,
    errorElement: <NotFoundPage />,
  },
]);
