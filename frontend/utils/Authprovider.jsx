import React, { createContext, useState, useEffect } from "react";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [authToken, setAuthToken] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchUser = async () => {
    try {
      const response = await fetch("/api/user", {
        credentials: "include",
      });

      if (response.ok) {
        const data = await response.json();
        setUser(data);
        setAuthToken(true);
      } else {
        setUser(null);
        setAuthToken(null);
      }
    } catch (error) {
      console.log("Fetch user error:", error);
      setUser(null);
      setAuthToken(null);
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    const response = await fetch("/api/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Login failed");
    }

    const data = await response.json();
    setUser(data.user);
    setAuthToken(true);
  };

  const logout = async () => {
    try {
      await fetch("/api/logout", {
        method: "POST",
        credentials: "include",
      });
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      setAuthToken(null);
      setUser(null);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <AuthContext.Provider value={{ authToken, user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
