import { useNavigate, useLocation, Link } from "react-router-dom";
import { useState } from "react";
import api from "../api/axios";
import { useAuth } from "../context/AuthContext";
import Header from "../components/Header";
import BottomNav from "../components/BottomNav";

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage("");

    api
      .post("/login", {
        email: email,
        password: password,
      })
      .then((res) => {
        login(res.data.token, res.data.user);
        navigate(location.state?.from || "/");
      })
      .catch((err) => {
        setIsLoading(false);
        if (err.response && err.response.data && err.response.data.message) {
          setErrorMessage(err.response.data.message);
        } else {
          setErrorMessage("Something went wrong. Please try again.");
        }
      });
  };

  const testLoginAsOfficer = () => {
    setIsLoading(true);
    setErrorMessage("");

    api
      .post("/login", {
        email: "captain.erwin@gmail.com",
        password: "shinzousasageyo",
      })
      .then((res) => {
        login(res.data.token, res.data.user);
        navigate(location.state?.from || "/");
      })
      .catch((err) => {
        setIsLoading(false);
        if (err.response && err.response.data && err.response.data.message) {
          setErrorMessage(err.response.data.message);
        } else {
          setErrorMessage("Something went wrong. Please try again.");
        }
      });
  };

  return (
    <>
      <title>Login - DRRT Member Portal</title>

      <Header />

      {/* Main Wrapper with extra bottom padding on mobile to clear bottom navbar */}
      <div className="grow w-full flex items-center justify-center p-4 md:p-8 pb-24 md:pb-8">
        {/* Main Login Card Container */}
        <main className="max-w-md w-full mx-auto space-y-6">
          <div className="bg-white border border-blue-border rounded-2xl p-5 sm:p-6 md:p-8 shadow-sm relative overflow-hidden">
            {/* Card Header */}
            <div className="flex items-center gap-3.5 mb-6">
              <div className="w-10 h-10 rounded-xl bg-blue/10 flex items-center justify-center text-blue shrink-0">
                <span className="material-symbols-outlined text-[22px]! filled-icon">
                  lock
                </span>
              </div>
              <div>
                <h2 className="font-geist text-lg sm:text-xl font-bold text-text">
                  Member Access
                </h2>
                <p className="text-xs text-subtext">
                  Sign in to access your DRRT portal account.
                </p>
              </div>
            </div>
            {/* Error Message */}
            {errorMessage && (
              <div className="bg-red-bg text-red border border-red-border rounded-xl p-3 mb-4 text-sm font-medium">
                {errorMessage}
              </div>
            )}
            {/* Login Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label
                  htmlFor="email"
                  className="block font-geist text-xs font-bold text-text mb-1.5"
                >
                  Email Address
                </label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-subtext text-[20px]!">
                    mail
                  </span>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="student@lvcc.edu.ph"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 sm:py-2.5 min-h-11 bg-surface border border-blue-border rounded-xl text-sm text-text placeholder:text-subtext/50 focus:ring-2 focus:ring-blue/30 focus:border-blue outline-none transition-all"
                  />
                </div>
              </div>
              <div>
                <div className="flex justify-between items-center mb-1.5 gap-2">
                  <label
                    htmlFor="password"
                    className="font-geist text-xs font-bold text-text"
                  >
                    Password
                  </label>
                  <a
                    href="#"
                    className="text-xs font-bold text-blue hover:underline shrink-0"
                  >
                    Forgot Password?
                  </a>
                </div>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-subtext text-[20px]!">
                    key
                  </span>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    placeholder="********"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 sm:py-2.5 min-h-11 bg-surface border border-blue-border rounded-xl text-sm text-text placeholder:text-subtext/50 focus:ring-2 focus:ring-blue/30 focus:border-blue outline-none transition-all"
                  />
                </div>
              </div>
              <button type="submit" disabled={isLoading} className="w-full bg-blue text-white hover:bg-blue transition-all font-geist font-bold py-3 min-h-11 rounded-xl shadow-md flex items-center justify-center gap-2 active:scale-[0.98] mt-2 disabled:opacity-50 cursor-pointer">
                <span>{isLoading ? "Signing In..." : "Sign In"}</span>
                <span className="material-symbols-outlined text-[18px]!">login</span>
              </button>
            </form>
            {/* Test Login Button */}

            {/* Footer Prompt */}
            <div className="mt-6 pt-4 border-t border-blue-border/40 text-center">
              <p className="text-xs text-subtext">
                Not a member yet?{" "}
                <a href="/join" className="text-blue font-bold hover:underline inline-block py-1">
                  Apply for Membership
                </a>
              </p>
            </div>
          </div>

          <button onClick={testLoginAsOfficer} disabled={isLoading} className="w-full mt-3 bg-surface border border-blue-border text-subtext hover:bg-surface-container-highest transition-all font-geist font-bold py-2 rounded-xl flex items-center justify-center gap-2 cursor-pointer text-sm disabled:opacity-50">
            test: login as officer hehe
          </button>
          <Link to="/test-pages" className="w-full mt-3 bg-surface border border-blue-border text-subtext hover:bg-surface-container-highest transition-all font-geist font-bold py-2 rounded-xl flex items-center justify-center gap-2 cursor-pointer text-sm disabled:opacity-50">
            test: view all pages (no login)
          </Link>

        </main>
      </div>

      <BottomNav />
    </>
  );
}
