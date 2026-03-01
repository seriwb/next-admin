import Link from "@/components/link";

export default function NotFound() {
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center">
      <h1 className="text-4xl font-bold">404</h1>
      <p className="mt-4 text-xl">Page not found</p>
      <Link href="/">Return Home</Link>
    </div>
  );
}
