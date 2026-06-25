import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-center">
        <h1 className="mb-4 text-8xl font-bold gradient-text">404</h1>
        <p className="mb-8 text-lg text-zinc-500">Page not found</p>
        <Link href="/" className="btn-primary">
          Go Home
        </Link>
      </div>
    </div>
  );
}
