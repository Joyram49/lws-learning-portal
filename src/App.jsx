import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RootLayout from "./rootLayout/RootLayout";
import Login from "./pages/student/Login";
import Registration from "./pages/student/Registration";
import AdminLogin from "./pages/admin/AdminLogin";

import CoursePlayer from "./pages/student/CoursePlayer";
import Quizzes from "./pages/student/Quizzes";
import LeaderBoard from "./pages/student/LeaderBoard";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminQuizzes from "./pages/admin/AdminQuizzes";
import AdminVideos from "./pages/admin/AdminVideos";
import AssignmentMark from "./pages/admin/AssignmentMark";
import Assignment from "./pages/admin/Assignment";

import NotFound from "./pages/NotFound";
import useAuthCheck from "./hooks/useAuthCheck";
import PrivateRoute from "./routes/privateRoute";
import PublicRoute from "./routes/PublicRoute";
import AdminRoute from "./routes/AdminRoute";
import UserRoute from "./routes/UserRoute";
import EditAdminVideo from "./pages/admin/EditAdminVideo";
import EditAdminAssignment from "./pages/admin/EditAdminAssignment";
import EditAdminQuiz from "./pages/admin/EditAdminQuiz";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function App() {
  const authChecked = useAuthCheck();
  return !authChecked ? (
    <div>Checking Authentication....</div>
  ) : (
    <Router>
      <Routes>
        {/* public routes start */}
        <Route
          path='/'
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />
        <Route
          path='/registration'
          element={
            <PublicRoute>
              <Registration />
            </PublicRoute>
          }
        />
        <Route
          path='/admin/login'
          element={
            <PublicRoute>
              <AdminLogin />
            </PublicRoute>
          }
        />
        {/* public routes end */}

        {/* private route start */}
        <Route
          path='/'
          element={
            <PrivateRoute>
              <RootLayout />
            </PrivateRoute>
          }
        >
          {/* routes for user/student start */}
          <Route
            path='courseplayer'
            element={
              <UserRoute role='student'>
                <CoursePlayer />
              </UserRoute>
            }
          />
          <Route
            path='courseplayer/:id'
            element={
              <UserRoute role='student'>
                <CoursePlayer />
              </UserRoute>
            }
          />
          <Route
            path='courseplayer/:id/quizzes'
            element={
              <UserRoute role='student'>
                <Quizzes />
              </UserRoute>
            }
          />
          <Route
            path='leaderboard'
            element={
              <UserRoute role='student'>
                <LeaderBoard />
              </UserRoute>
            }
          />
          {/* routes for user/student end */}

          {/* rotes for admin start */}
          <Route path='admin'>
            <Route
              path='dashboard'
              element={
                <AdminRoute role='admin'>
                  <AdminDashboard />
                </AdminRoute>
              }
            />
            <Route
              path='quizzes'
              element={
                <AdminRoute role='admin'>
                  <AdminQuizzes />
                </AdminRoute>
              }
            />
            <Route
              path='quizzes/edit/:id'
              element={
                <AdminRoute role='admin'>
                  <EditAdminQuiz />
                </AdminRoute>
              }
            />
            <Route
              path='videos'
              element={
                <AdminRoute role='admin'>
                  <AdminVideos />
                </AdminRoute>
              }
            />
            <Route
              path='videos/edit/:videoId'
              element={
                <AdminRoute role='admin'>
                  <EditAdminVideo />
                </AdminRoute>
              }
            />
            <Route
              path='assignment'
              element={
                <AdminRoute role='admin'>
                  <Assignment />
                </AdminRoute>
              }
            />
            <Route
              path='assignment/edit/:id'
              element={
                <AdminRoute role='admin'>
                  <EditAdminAssignment />
                </AdminRoute>
              }
            />
            <Route
              path='assignmentmark'
              element={
                <AdminRoute role='admin'>
                  <AssignmentMark />
                </AdminRoute>
              }
            />
          </Route>
          {/* routes for admin end */}
        </Route>
        {/* private route end */}
        <Route path='*' element={<NotFound />} />
      </Routes>
      <ToastContainer />
    </Router>
  );
}
