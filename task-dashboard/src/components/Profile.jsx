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
    return <p className="loading-message">Loading profile...</p>;
  }

  if (error && !profile) {
    return (
      <section className="profile-card">
        <h2>My Profile</h2>
        <p className="error-message">{error}</p>
        <button type="button" className="btn-logout" onClick={onLogout}>
          Log Out
        </button>
      </section>
    );
  }

  if (!profile) {
    return <p className="empty-message">Profile information is unavailable.</p>;
  }

  return (
    <section className="profile-card">
      <div className="profile-header">
        <h2>My Profile</h2>
      </div>

      {message && <p className="success-message">{message}</p>}
      {error && <p className="error-message">{error}</p>}

      {!editing ? (
        <div className="profile-details">
          <div className="profile-info-grid">
            <div className="info-item">
              <span className="info-label">Name</span>
              <span className="info-value">{profile.name}</span>
            </div>

            <div className="info-item">
              <span className="info-label">Email</span>
              <span className="info-value">{profile.email}</span>
            </div>

            <div className="info-item">
              <span className="info-label">Role</span>
              <span className="info-value badge-role">{profile.role}</span>
            </div>
          </div>

          <div className="profile-actions">
            <button
              type="button"
              className="btn-edit"
              onClick={() => {
                setEditing(true);
                setMessage("");
                setError("");
              }}
            >
              Edit Profile
            </button>

            <button type="button" className="btn-logout" onClick={onLogout}>
              Log Out
            </button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleUpdate} className="profile-edit-form">
          <div className="form-group">
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

          <div className="form-group">
            <label htmlFor="profile-email">Email</label>
            <input
              id="profile-email"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
            />
          </div>

          <div className="profile-actions">
            <button type="submit" className="btn-save">
              Save Changes
            </button>

            <button
              type="button"
              className="btn-cancel"
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
          </div>
        </form>
      )}
    </section>
  );
}

export default Profile;