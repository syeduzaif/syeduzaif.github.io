import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { buttonVariants } from "@/components/ui/Button";
import { EditorialLabel } from "@/components/lab/EditorialLabel";

export default function NotFound() {
  return (
    <Container className="flex min-h-[70vh] flex-col items-center justify-center py-24 text-center">
      <EditorialLabel className="text-orange-deep">
        Experiment not found
      </EditorialLabel>
      <p className="mt-4 font-display text-hero text-ink">404</p>
      <h1 className="mt-4 text-h3 text-ink">This page wandered off.</h1>
      <p className="mt-3 text-grey">
        The page you&apos;re looking for doesn&apos;t exist or has moved.
      </p>
      <Link
        href="/"
        className={buttonVariants({ variant: "primary", size: "lg" }) + " mt-8"}
      >
        Back to the lab
      </Link>
    </Container>
  );
}
