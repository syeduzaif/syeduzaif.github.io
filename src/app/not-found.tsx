import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { buttonVariants } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <Container className="flex min-h-[70vh] flex-col items-center justify-center py-24 text-center">
      <p className="font-serif text-hero text-sand">404</p>
      <h1 className="mt-4 text-h3 text-cream">This page wandered off.</h1>
      <p className="mt-3 text-muted">
        The page you&apos;re looking for doesn&apos;t exist or has moved.
      </p>
      <Link href="/" className={buttonVariants({ variant: "primary", size: "lg" }) + " mt-8"}>
        Back to home
      </Link>
    </Container>
  );
}
