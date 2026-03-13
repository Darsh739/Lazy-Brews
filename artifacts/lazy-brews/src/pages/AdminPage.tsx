import React, { useState, useEffect } from "react";
import { Coffee, LogOut, Users, Calendar, Mail } from "lucide-react";

interface Member {
  id: number;
  name: string;
  email: string;
  picture: string | null;
  createdAt: string;
}

export default function AdminPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState<string | null>(() => sessionStorage.getItem("admin_token"));
  const [members, setMembers] = useState<Member[]>([]);
  const [loginError, setLoginError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (token) {
      fetchMembers(token);
    }
  }, [token]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setLoginError("");
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (res.ok && data.token) {
        sessionStorage.setItem("admin_token", data.token);
        setToken(data.token);
      } else {
        setLoginError(data.error || "Invalid credentials");
      }
    } catch {
      setLoginError("Connection error. Try again.");
    } finally {
      setLoading(false);
    }
  };

  const fetchMembers = async (t: string) => {
    try {
      const res = await fetch("/api/admin/members", {
        headers: { Authorization: `Bearer ${t}` },
      });
      if (res.ok) {
        const data = await res.json();
        setMembers(data.members);
      } else if (res.status === 401) {
        handleLogout();
      }
    } catch {
      console.error("Failed to fetch members");
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem("admin_token");
    setToken(null);
    setMembers([]);
  };

  if (!token) {
    return (
      <div className="min-h-screen bg-[#f5f0e8] flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl shadow-xl p-10 w-full max-w-md">
          <div className="flex items-center gap-3 mb-8">
            <div className="bg-sky-500 text-white p-2.5 rounded-xl">
              <Coffee className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Lazy Brew's</h1>
              <p className="text-sm text-gray-500">Admin Dashboard</p>
            </div>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-sky-400 focus:border-transparent transition"
                placeholder="admin@example.com"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-sky-400 focus:border-transparent transition"
                placeholder="••••••••"
              />
            </div>

            {loginError && (
              <p className="text-sm text-red-600 bg-red-50 rounded-xl px-4 py-3">{loginError}</p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-sky-500 hover:bg-sky-600 text-white font-semibold py-3 rounded-xl transition-colors disabled:opacity-60"
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f5f0e8] p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="bg-sky-500 text-white p-2.5 rounded-xl">
              <Coffee className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Lazy Brew's</h1>
              <p className="text-sm text-gray-500">Admin Dashboard</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 text-sm text-gray-600 hover:text-red-600 border border-gray-200 hover:border-red-300 bg-white px-4 py-2 rounded-xl transition-colors"
          >
            <LogOut className="w-4 h-4" /> Sign Out
          </button>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center gap-3 mb-1">
              <Users className="w-5 h-5 text-sky-500" />
              <span className="text-sm font-medium text-gray-500">Total Members</span>
            </div>
            <p className="text-3xl font-bold text-gray-900">{members.length}</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100 flex items-center gap-2">
            <Users className="w-5 h-5 text-sky-500" />
            <h2 className="text-lg font-bold text-gray-900">Founding Members</h2>
          </div>

          {members.length === 0 ? (
            <div className="py-16 text-center text-gray-400">
              <Users className="w-10 h-10 mx-auto mb-3 opacity-40" />
              <p className="text-sm">No members yet. Share the website to get sign-ups!</p>
            </div>
          ) : (
            <div className="divide-y divide-gray-50">
              {members.map((member) => (
                <div key={member.id} className="flex items-center gap-4 px-6 py-4 hover:bg-gray-50 transition-colors">
                  {member.picture ? (
                    <img src={member.picture} alt={member.name} className="w-10 h-10 rounded-full object-cover" />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-sky-100 text-sky-600 flex items-center justify-center font-bold text-sm">
                      {member.name[0]?.toUpperCase()}
                    </div>
                  )}
                  <div className="flex-grow min-w-0">
                    <p className="font-semibold text-gray-900 truncate">{member.name}</p>
                    <p className="text-sm text-gray-500 flex items-center gap-1">
                      <Mail className="w-3.5 h-3.5" /> {member.email}
                    </p>
                  </div>
                  <div className="text-right text-xs text-gray-400 flex items-center gap-1 flex-shrink-0">
                    <Calendar className="w-3.5 h-3.5" />
                    {new Date(member.createdAt).toLocaleDateString("en-IN", {
                      day: "numeric", month: "short", year: "numeric"
                    })}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
