import React, { useState } from "react";
import { auth } from "@/lib/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignup = async () => {
    if (!email || !password) {
      toast({ title: "Error", description: "Email & Password required", variant: "destructive" });
      return;
    }
    setLoading(true);
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      toast({ title: "Success", description: "Account created successfully!" });
    } catch (err: any) {
      toast({ title: "Error", description: err.message, variant: "destructive" });
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background relative">
      <div className="glass-premium p-10 rounded-3xl shadow-xl w-full max-w-md">
        <h2 className="text-3xl font-bold mb-6 text-center">Sign Up</h2>
        <input
          type="email"
          placeholder="Email"
          className="input input-bordered w-full mb-4"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="input input-bordered w-full mb-6"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button
          className="w-full py-4 text-lg font-semibold bg-gradient-to-r from-primary via-tertiary to-secondary hover:shadow-glow-primary transition-all"
          onClick={handleSignup}
          disabled={loading}
        >
          {loading ? "Signing up..." : "Sign Up"}
        </Button>
        <p className="text-sm text-muted-foreground mt-4 text-center">
          Already have an account? <a href="/login" className="text-primary font-semibold">Login</a>
        </p>
      </div>
    </div>
  );
};

export default Signup;
