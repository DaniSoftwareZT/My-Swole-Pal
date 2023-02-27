import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import Construct from "./Construct.js";
import ErrorNotification from "./ErrorNotification";
import MainPage from "./MainPage";
import Nav from "./Nav";
import WorkoutList from "./WorkoutList.js";
import SignupForm from "./SignupForm.js";
import LoginForm from "./LoginForm";
import { AuthProvider, useToken } from "./Accounts/Auth.js";
// import { LogoutComponent } from "./Accounts/Logout"

import "./App.css";

function GetToken() {
  useToken();
  return null;
}

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <GetToken />
        <Nav />
        <div className="container">
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="signup">
              <Route path="new" element={<SignupForm />} />
            </Route>
            <Route path="login">
              <Route path="new" element={<LoginForm />} />
            </Route>
            {/* <Route path="logout">
              <Route path="new" element={<LogoutComponent />} />
            </Route> */}
            {/* <Route path="login">
						<Route path="new" element={<LoginForm />} />
					</Route> */}
            <Route path="workouts">
              <Route index element={<WorkoutList />} />
              {/* <Route path="new" element={<AppointmentForm />} /> */}
            </Route>
          </Routes>
        </div>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
