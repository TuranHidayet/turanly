"use client";

import { useState, type FormEvent } from "react";

export function ContactForm({ dict }: { dict: any }) {
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setStatus("success");
    setTimeout(() => setStatus("idle"), 3000);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="mb-2 block text-sm font-medium">{dict.contact.name}</label>
        <input
          type="text"
          required
          className="w-full rounded-xl border border-zinc-300 bg-white px-4 py-3 text-sm transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none dark:border-zinc-700 dark:bg-zinc-900"
        />
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium">{dict.contact.email}</label>
        <input
          type="email"
          required
          className="w-full rounded-xl border border-zinc-300 bg-white px-4 py-3 text-sm transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none dark:border-zinc-700 dark:bg-zinc-900"
        />
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium">{dict.contact.message}</label>
        <textarea
          required
          rows={5}
          className="w-full resize-none rounded-xl border border-zinc-300 bg-white px-4 py-3 text-sm transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none dark:border-zinc-700 dark:bg-zinc-900"
        />
      </div>

      <button type="submit" className="btn-primary w-full justify-center">
        {dict.contact.send}
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
