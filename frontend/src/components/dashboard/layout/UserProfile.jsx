import useAuth from "../../../hooks/useAuth";

const UserProfile = () => {
  const { user } = useAuth();

  const getInitials = (name) => {
    if (!name) return "U";
    const parts = name.split(" ");
    if (parts.length >= 2) {
      return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
  };

  return (
    <div className="user-profile">
      <div className="user-avatar">
        {getInitials(user?.username || "User")}
      </div>
      <div className="user-info">
        <div className="user-name">{user?.username || "User Name"}</div>
        <div className="user-company">Storfjord AS</div>
      </div>
    </div>
  );
};

export default UserProfile;
