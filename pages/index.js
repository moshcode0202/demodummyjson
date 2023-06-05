import { useState } from "react";
import styles from "../styles/Home.module.css";
import { useRouter } from "next/router";

export default function Home() {
  const [userName, setUserName] = useState();
  const [password, setPassword] = useState();
  const router = useRouter();
  const formSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("https://dummyjson.com/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: userName,
        password: password,
        // kminchelle
        //  0lelplR
      }),
    });
    const data = res.json();
    console.log(data);
    if (data) {
      router.push("/crud");
    }
  };
  return (
    <div className={styles.container}>
      <form onSubmit={formSubmit}>
        <div className="flex flex-col">
          <div>
            <label className="form-label">Username</label>
            <input
              type="text"
              name="username"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            />
          </div>
          <div>
            <label className="form-label">Password</label>
            <input
              type="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit">login </button>
        </div>
      </form>
    </div>
  );
}
