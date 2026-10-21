import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { buttonVariants } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <Container className="flex min-h-[70vh] flex-col justify-center py-24">
      <div className="border-t-2 border-ink pt-6">
        <Eyebrow>Experiment not found</Eyebrow>
      </div>
      <p
        aria-hidden
        className="mt-8 font-display text-hero leading-[0.8] font-bold [font-stretch:88%] text-orange"
      >
        404
      </p>
      <h1 className="mt-8 text-h3 [font-stretch:92%] text-ink">
        This page wandered off.
      </h1>
      <p className="mt-4 max-w-[44ch] text-grey">
        The page you&apos;re looking for doesn&apos;t exist or has moved.
      </p>
      <div className="mt-10 flex flex-wrap gap-3">
        <Link href="/" className={buttonVariants({ variant: "primary", size: "lg" })}>
          Back to the lab
        </Link>
        <Link
          href="/work/"
          className={buttonVariants({ variant: "secondary", size: "lg" })}
        >
          Index / all experiments
        </Link>
      </div>
    </Container>
  );
}
