"use client";

import { useState, type FormEvent, useRef } from "react";

export function ContactForm({ dict }: { dict: any }) {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    const form = new FormData(e.target as HTMLFormElement);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.get("name"),
          email: form.get("email"),
          message: form.get("message"),
        }),
      });

      if (!res.ok) throw new Error();

      setStatus("success");
      formRef.current?.reset();
      setTimeout(() => setStatus("idle"), 3000);
    } catch {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 3000);
    }
  };

  return (
    <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="mb-2 block text-sm font-medium">{dict.contact.name}</label>
        <input
          type="text"
          name="name"
          required
          className="w-full rounded-xl border border-zinc-300 bg-white px-4 py-3 text-base transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none dark:border-zinc-700 dark:bg-zinc-900"
        />
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium">{dict.contact.email}</label>
        <input
          type="email"
          name="email"
          required
          className="w-full rounded-xl border border-zinc-300 bg-white px-4 py-3 text-base transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none dark:border-zinc-700 dark:bg-zinc-900"
        />
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium">{dict.contact.message}</label>
        <textarea
          name="message"
          required
          rows={5}
          className="w-full resize-none rounded-xl border border-zinc-300 bg-white px-4 py-3 text-base transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none dark:border-zinc-700 dark:bg-zinc-900"
        />
      </div>

      <button
        type="submit"
        disabled={status === "loading"}
        className="btn-primary w-full justify-center disabled:opacity-50"
      >
        {status === "loading" ? "..." : dict.contact.send}
      </button>

      {status === "success" && (
        <p className="text-center text-sm text-emerald-600 dark:text-emerald-400">
          {dict.contact.success}
        </p>
      )}
      {status === "error" && (
        <p className="text-center text-sm text-red-600 dark:text-red-400">
          {dict.contact.error}
        </p>
      )}
    </form>
  );
}
