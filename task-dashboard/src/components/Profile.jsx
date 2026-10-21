
import { useEffect, useState } from "react";

function Profile({ token, onLogout }) {
  const [profile, setProfile] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  // GET PROFILE
  useEffect(() => {
    const fetchProfile = async () => {
      if (!token) {
        setError("Please log in to view your profile.");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError("");

        const response = await fetch(
          "http://localhost:3000/auth/profile",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error(
            response.status === 401
              ? "Your session has expired. Please log in again."
              : "Failed to fetch profile."
          );
        }

        const data = await response.json();

        setProfile(data);
        setName(data.name);
        setEmail(data.email);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [token]);

  // UPDATE PROFILE
  const handleUpdate = async (event) => {
    event.preventDefault();

    setMessage("");
    setError("");

    try {
      const response = await fetch(
        "http://localhost:3000/auth/profile",
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ name, email }),
        }
      );

      if (!response.ok) {
        const data = await response.json().catch(() => ({}));

        throw new Error(
          Array.isArray(data.message)
            ? data.message.join(", ")
            : data.message || "Failed to update profile."
        );
      }

      const updatedProfile = await response.json();

      setProfile(updatedProfile);
      setName(updatedProfile.name);
      setEmail(updatedProfile.email);
      setEditing(false);
      setMessage("Profile updated successfully!");
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) {
    return <p>Loading profile...</p>;
  }

  if (error && !profile) {
    return (
      <section className="profile-section">
        <h2>My Profile</h2>
        <p className="error-message">{error}</p>
        <button type="button" onClick={onLogout}>
          Log Out
        </button>
      </section>
    );
  }

  if (!profile) {
    return <p>Profile information is unavailable.</p>;
  }

  return (
    <section className="profile-section">
      <h2>My Profile</h2>

      {message && <p className="success-message">{message}</p>}
      {error && <p className="error-message">{error}</p>}

      {!editing ? (
        <div>
          <p>
            <strong>Name:</strong> {profile.name}
          </p>

          <p>
            <strong>Email:</strong> {profile.email}
          </p>

          <p>
            <strong>Role:</strong> {profile.role}
          </p>

          <button
            type="button"
            onClick={() => {
              setEditing(true);
              setMessage("");
              setError("");
            }}
          >
            Edit Profile
          </button>
        </div>
      ) : (
        <form onSubmit={handleUpdate}>
          <div>
            <label htmlFor="profile-name">Name</label>
            <input
              id="profile-name"
              type="text"
              value={name}
              onChange={(event) => setName(event.target.value)}
              required
              minLength={2}
            />
          </div>

          <div>
            <label htmlFor="profile-email">Email</label>
            <input
              id="profile-email"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
            />
          </div>

          <button type="submit">Save Changes</button>

          <button
            type="button"
            onClick={() => {
              setEditing(false);
              setName(profile.name);
              setEmail(profile.email);
              setError("");
              setMessage("");
            }}
          >
            Cancel
          </button>
        </form>
      )}

      <button type="button" onClick={onLogout}>
        Log Out
      </button>
    </section>
  );
}

export default Profile;
