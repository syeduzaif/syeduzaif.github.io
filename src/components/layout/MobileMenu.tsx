"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { siteConfig } from "@/data/siteConfig";
import { buttonVariants } from "@/components/ui/Button";

/** Full-screen mobile menu — Radix Dialog handles focus trap, ESC, scroll lock. */
export function MobileMenu() {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>
        <button
          type="button"
          aria-label="Open menu"
          className="flex h-10 w-10 items-center justify-center rounded-md text-cream md:hidden"
        >
          <Menu size={22} />
        </button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-bg/80 backdrop-blur-sm" />
        <Dialog.Content className="fixed inset-0 z-50 flex flex-col bg-bg">
          <Dialog.Title className="sr-only">Menu</Dialog.Title>
          <div className="flex justify-end p-6">
            <Dialog.Close
              aria-label="Close menu"
              className="flex h-10 w-10 items-center justify-center rounded-md text-cream"
            >
              <X size={24} />
            </Dialog.Close>
          </div>
          <nav
            aria-label="Primary"
            className="flex flex-1 flex-col items-center justify-center gap-8 pb-24"
          >
            {siteConfig.nav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={close}
                className="font-serif text-3xl text-cream"
              >
                {item.label}
              </a>
            ))}
            <a
              href={siteConfig.links.resume}
              download
              onClick={close}
              className={buttonVariants({ variant: "secondary", size: "lg" })}
            >
              Résumé
            </a>
          </nav>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
