import { useState, useEffect } from "react";
import axios from "axios";

const Profile = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        axios.get("http://localhost:5000/user-profile", {
            headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
        })
        .then(res => {
            setUser(res.data);
            setLoading(false);
        })
        .catch(err => {
            setError("Error fetching profile.");
            setLoading(false);
        });
    }, []);

    return (
        <div style={{ textAlign: "center", marginTop: "50px" }}>
            <h2>User Profile</h2>
            {loading ? <p>Loading...</p> : error ? <p style={{ color: "red" }}>{error}</p> : (
                <div>
                    <p><strong>Name:</strong> {user.name}</p>
                    <p><strong>Email:</strong> {user.email}</p>
                    <p><strong>Joined:</strong> {user.joinedDate}</p>
                    <button>Edit Profile</button>
                </div>
            )}
        </div>
    );
};

export default Profile;

