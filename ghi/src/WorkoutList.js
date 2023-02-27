import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext} from "./Accounts/Auth";
import { getTokenInternal } from "./Accounts/Auth";

function WorkoutList () {
    const [token, setToken] = useState(null);
    const [workouts, setWorkouts] = useState([])
    const [username, setUsername] = useState(null);
    const fetchData = async () => {
        const url = `${process.env.REACT_APP_API_API_HOST}/api/workouts`;
        const response = await fetch(url, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (response.ok) {
            const data = await response.json();
            setWorkouts(data.workouts)
        }
    }


useEffect(() => {
  async function fetchToken() {
    const token = await getTokenInternal();
    setToken(token);
  }
  if (!token) {
    fetchToken();
  }
}, [token]);

        return <>
        <br />
        <h1>Workout List</h1>
        <br />
        <div id="workouts_list">
        <table className="table table-striped">
            <thead>
                <tr>
                    <th>name</th>
                    <th></th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {workouts.map(workout => {
                    return (
                        <tr >
                            <td>{ workout.name }</td>

                        </tr>
                    )
                })}
            </tbody>
        </table>
        </div>
        </>
}

export default WorkoutList;
