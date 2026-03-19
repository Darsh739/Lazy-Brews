import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

declare global {
  interface Window {
    google?: {
      accounts: {
        id: {
          initialize: (config: {
            client_id: string;
            callback: (response: { credential: string }) => void;
            auto_select?: boolean;
          }) => void;
          renderButton: (
            parent: HTMLElement,
            options: {
              theme?: string;
              size?: string;
              text?: string;
              shape?: string;
              width?: number;
            }
          ) => void;
        };
      };
    };
  }
}

interface User {
  name: string;
  email: string;
  picture: string | null;
}

export function SignIn() {
  const buttonRef = useRef<HTMLDivElement>(null);
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID as string;

  useEffect(() => {
    if (!clientId) return;

    const tryInit = () => {
      if (!window.google) {
        setTimeout(tryInit, 300);
        return;
      }
      window.google.accounts.id.initialize({
        client_id: clientId,
        callback: handleCredential,
      });
      if (buttonRef.current) {
        window.google.accounts.id.renderButton(buttonRef.current, {
          theme: "outline",
          size: "large",
          text: "signin_with",
          shape: "rectangular",
          width: 280,
        });
      }
    };

    tryInit();
  }, [clientId]);

  const handleCredential = async (response: { credential: string }) => {
    setLoading(true);
    setError(null);
    try {
      const apiBase = (import.meta.env.VITE_API_URL as string) || "";
      const res = await fetch(`${apiBase}/api/auth/google-verify`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ credential: response.credential }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Sign-in failed");
      setUser(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-20 bg-secondary/30">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          {user ? (
            <div className="flex flex-col items-center gap-4">
              {user.picture && (
                <img
                  src={user.picture}
                  alt={user.name}
                  className="w-16 h-16 rounded-full border-4 border-primary/30 shadow-md"
                />
              )}
              <h2 className="text-2xl font-display font-bold text-foreground">
                Welcome, {user.name.split(" ")[0]}!
              </h2>
              <p className="text-muted-foreground text-base leading-relaxed max-w-md">
                You're now a founding member of Lazy Brew's. We'll reach out to you with exclusive
                early access offers and sneak peeks at unreleased flavours.
              </p>
              <span className="inline-flex items-center gap-2 bg-primary/10 text-primary border border-primary/20 rounded-full px-5 py-2 text-sm font-semibold">
                ✓ Founding Member
              </span>
            </div>
          ) : (
            <>
              <h2 className="text-3xl lg:text-4xl font-display font-bold text-foreground mb-4">
                Become a Founding Member
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-8 max-w-lg mx-auto">
                Sign in to become a founding member and redeem early access to exclusive offers and
                unreleased flavours.
              </p>

              {!clientId ? (
                <p className="text-sm text-destructive">Google Sign-In is not configured yet.</p>
              ) : loading ? (
                <div className="flex items-center justify-center gap-2 text-muted-foreground">
                  <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                  </svg>
                  Signing you in…
                </div>
              ) : (
                <div className="flex flex-col items-center gap-3">
                  <div ref={buttonRef} />
                  {error && (
                    <p className="text-sm text-destructive mt-2">{error}</p>
                  )}
                </div>
              )}
            </>
          )}
        </motion.div>
      </div>
    </section>
  );
}
