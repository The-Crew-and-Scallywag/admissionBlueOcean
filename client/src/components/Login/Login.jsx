import React, { useState, useEffect } from "react";
import Logo2 from "../../assets/Logo2.png";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [transition, setTransition] = useState(true);

  useEffect(() => {
    setInterval(() => {
      setTransition(false);
    }, 300);
  }, []);

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const transitionClassUp = transition
    ? "opacity-0 translate-y-[50px]"
    : "opacity-100";

  const transitionClassDown = transition
    ? "opacity-0 -translate-y-[50px]"
    : "opacity-100";

  return (
    <div className="w-full mx-auto my-12 h-full">
      <div className="h-[800px] w-[600px] my-[120px] mx-auto rounded-md bg-bg flex-col shadow-xl shadow-black">
        <div
          id="logo"
          className={`${transitionClassDown} w-full mx-auto relative transform transition-all duration-300 ease-in-out`}
        >
          <img src={Logo2} alt="Logo" className="w-[75px] mx-auto py-8 my-2" />
        </div>
        <h2
          className={`mx-auto w-full text-4xl font-bold tracking-wide text-center p-8 my-2 text-galv-orange ${transitionClassDown} transition-all duration-300 ease-in-out`}
        >
          Login
        </h2>
        <div
          id="form"
          className={`mx-auto w-full relative ${transitionClassUp} duration-300 transition-all ease-in-out`}
        >
          <form action="" className="flex-col flex w-full mx-auto text-center">
            <div className="relative my-1 p-2">
              <input
                type="text"
                value={username}
                className="my-4 py-2 px-2 text-white rounded-md focus:ring-2 focus:ring-accent focus:outline-none border-none w-1/2 bg-secondary"
                onChange={handleUsernameChange}
                autoComplete="none"
                autoFocus={true}
              />
              <label
                className={`absolute left-[160px] transition-all duration-300 ease-in-out pointer-events-none ${
                  username
                    ? "text-accent text-md font-bold -top-3"
                    : "text-white/50 top-8"
                }`}
              >
                Username
              </label>
            </div>
            <div className="relative my-1 p-2">
              <input
                type="password"
                value={password}
                className="my-4 py-2 px-2 text-white rounded-md focus:ring-2 focus:ring-accent focus:outline-none border-none w-1/2 bg-secondary"
                onChange={handlePasswordChange}
                autoComplete="none"
              />
              <label
                className={`absolute left-[160px] transition-all duration-300 ease-in-out pointer-events-none ${
                  password
                    ? "text-accent text-md font-bold -top-3"
                    : "text-white/50 top-8"
                }`}
              >
                Password
              </label>
            </div>
          </form>
        </div>
        <div id="help"></div>
      </div>
    </div>
  );
};

export default Login;
