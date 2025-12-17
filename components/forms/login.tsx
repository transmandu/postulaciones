"use client";
import { signIn } from "next-auth/react";
import { useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = await signIn("credentials", {
      email,
      password,
      redirect: true,
      callbackUrl: "/dashboard",
    });
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 p-8">
      <input type="email" placeholder="Email" onChange={e => setEmail(e.target.value)} className="border p-2" />
      <input type="password" placeholder="Contraseña" onChange={e => setPassword(e.target.value)} className="border p-2" />
      <button type="submit" className="bg-blue-500 text-white p-2">Entrar</button>
    </form>
  );
}
