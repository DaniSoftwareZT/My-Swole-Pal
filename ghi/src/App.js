import { useEffect, useState } from "react";
import { useGetTokenQuery } from "./store/Api";
import Notification from "./Notification";
import Nav from "./Nav";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import MainPage from "./MainPage";
import SignupForm from "./SignupForm";
import LoginForm from "./LoginForm";
import { store } from "./store/store";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import Logout from "./Logout";
import ExerciseSearch from "./ExerciseSearch";
import WorkoutsList from "./WorkoutsList"
import WorkoutView from "./WorkoutView";
import { Background } from "react-parallax";

function App() {

	return (
    <BrowserRouter>
      <Provider store={store}>
        <Nav />
        <span className="container" >
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="signup">
              <Route path="new" element={<SignupForm />} />
            </Route>
            <Route path="login">
              <Route path="new" element={<LoginForm />} />
            </Route>
            <Route path="exercises" element={<ExerciseSearch />} />
            <Route path="workouts">
              <Route path="" element={<WorkoutsList />} />
              <Route path=":id" element={<WorkoutView />} />
            </Route>
          </Routes>
        </span>
      </Provider>
    </BrowserRouter>
  );
}

export default App;
