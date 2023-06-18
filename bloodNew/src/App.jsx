import React, { useEffect, useState } from "react";
import AuthContext from "./auth/context";
import AllComponet from "./AllComponet";
import jwtDecode from "jwt-decode";
import "./App.css";
export default function Sight() {
  const [user, setUser] = useState({});

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setUser(jwtDecode(token));
    }
  }, []);

  useEffect(() => {
    const user1 = localStorage.getItem("user");
    if (user1) {
      setUser(user1);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      <AllComponet />
    </AuthContext.Provider>
  );
}
