import { useEffect, useState } from "react";

function Profile() {
  const [profile, setProfile] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const token = localStorage.getItem("access_token");

  // GET PROFILE
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch(
          "http://localhost:3000/auth/profile",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch profile");
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
          body: JSON.stringify({
            name,
            email,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update profile");
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
    return <p>{error}</p>;
  }

  return (
    <section className="profile-section">
      <h2>My Profile</h2>

      {message && <p>{message}</p>}
      {error && <p>{error}</p>}

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

          <button onClick={() => setEditing(true)}>
            Edit Profile
          </button>
        </div>
      ) : (
        <form onSubmit={handleUpdate}>
          <div>
            <label>Name</label>
            <input
              type="text"
              value={name}
              onChange={(event) => setName(event.target.value)}
              required
              minLength={2}
            />
          </div>

          <div>
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
            />
          </div>

          <button type="submit">
            Save Changes
          </button>

          <button
            type="button"
            onClick={() => {
              setEditing(false);
              setName(profile.name);
              setEmail(profile.email);
              setError("");
            }}
          >
            Cancel
          </button>
        </form>
      )}
    </section>
  );
}

export default Profile;