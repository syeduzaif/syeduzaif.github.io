"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { siteConfig } from "@/data/siteConfig";
import { buttonVariants } from "@/components/ui/Button";

/**
 * Full-screen mobile index — Radix Dialog handles focus trap, ESC, scroll
 * lock. Reads like the print index: mono numbers + big serif entries.
 */
export function MobileMenu() {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>
        <button
          type="button"
          aria-label="Open menu"
          className="flex h-10 w-10 items-center justify-center rounded-md text-ink md:hidden"
        >
          <Menu size={22} />
        </button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-ink/20 backdrop-blur-sm" />
        <Dialog.Content className="fixed inset-0 z-50 flex flex-col bg-paper">
          <Dialog.Title className="sr-only">Menu</Dialog.Title>
          <div className="flex items-center justify-between p-6">
            <span className="font-mono text-[0.78rem] font-semibold tracking-[0.14em] text-ink uppercase">
              {siteConfig.name}
              <span className="ml-1.5 font-normal text-grey">
                / {siteConfig.lab}
              </span>
            </span>
            <Dialog.Close
              aria-label="Close menu"
              className="flex h-10 w-10 items-center justify-center rounded-md text-ink"
            >
              <X size={24} />
            </Dialog.Close>
          </div>
          <nav
            aria-label="Primary"
            className="flex flex-1 flex-col justify-center gap-1 px-8 pb-24"
          >
            {siteConfig.nav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={close}
                className="group flex items-baseline gap-4 border-b border-ink/10 py-4"
              >
                <span className="font-mono text-xs text-orange-deep">
                  {item.n}
                </span>
                <span className="font-display text-3xl text-ink group-hover:text-orange-deep">
                  {item.label}
                </span>
              </a>
            ))}
            <a
              href={siteConfig.links.resume}
              download
              onClick={close}
              className={buttonVariants({
                variant: "secondary",
                size: "lg",
                className: "mt-8 self-start",
              })}
            >
              Résumé
            </a>
          </nav>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
