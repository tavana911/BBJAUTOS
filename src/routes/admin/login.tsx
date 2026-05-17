import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { KeyRound, Mail, Loader2 } from "lucide-react";

export const Route = createFileRoute("/admin/login")({
  component: AdminLogin,
});

export function AdminLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  // If the owner is already logged in, skip this page and send them to the dashboard
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        navigate({ to: "/admin/dashboard" });
      }
    });
  }, [navigate]);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setLoading(false);

    if (error) {
      toast.error(error.message || "Invalid security credentials.");
    } else if (data.session) {
      toast.success("Terminal access granted. Welcome back.");
      navigate({ to: "/admin/dashboard" });
    }
  }

  return (
    <div className="min-h-screen pt-28 pb-16 flex items-center justify-center bg-obsidian px-4">
      <div className="w-full max-w-md bg-card border border-white/5 p-8 rounded-3xl space-y-6 shadow-2xl">
        <div className="text-center">
          <div className="h-12 w-12 rounded-2xl bg-ember/10 border border-ember/20 flex items-center justify-center mx-auto text-ember shadow-ember/20 shadow-md">
            <KeyRound className="h-5 w-5" />
          </div>
          <h1 className="mt-4 text-2xl font-display font-bold text-ice tracking-tight">
            HQ Terminal Access
          </h1>
          <p className="mt-1.5 text-xs text-muted-foreground uppercase tracking-wider">
            BBJ Autos Admin Authorization
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="text-xs text-muted-foreground flex items-center gap-1.5">
              <Mail className="h-3.5 w-3.5 text-ember/60" /> Operator Email
            </label>
            <input
              type="email"
              required
              placeholder="admin@bbjautos.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1.5 w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-sm text-ice focus:outline-none focus:border-ember/60 transition"
            />
          </div>

          <div>
            <label className="text-xs text-muted-foreground flex items-center gap-1.5">
              <KeyRound className="h-3.5 w-3.5 text-ember/60" /> Security Passkey
            </label>
            <input
              type="password"
              required
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1.5 w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-sm text-ice focus:outline-none focus:border-ember/60 transition"
            />
          </div>

          <button
            disabled={loading}
            className="w-full mt-2 rounded-full bg-ember px-6 py-3.5 text-sm font-medium text-ice hover:brightness-110 transition flex items-center justify-center gap-2 disabled:opacity-50 shadow-ember"
          >
            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Authenticate Identity"}
          </button>
        </form>
      </div>
    </div>
  );
}