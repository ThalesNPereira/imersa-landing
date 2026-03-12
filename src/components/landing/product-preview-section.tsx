"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import type { ProductPreviewContent } from "@/content/landing";
import { Container } from "./shared";

type ProductPreviewSectionProps = {
  content: ProductPreviewContent;
};

export function ProductPreviewSection({
  content,
}: ProductPreviewSectionProps) {
  const [activeItemId, setActiveItemId] = useState(content.items[0]?.id ?? "");

  const activeItem =
    content.items.find((item) => item.id === activeItemId) ?? content.items[0];

  return (
    <section
      id="preview-produto"
      data-section="product-preview"
      className="py-20 sm:py-24"
    >
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="overflow-hidden rounded-[2.4rem] border border-black/8 bg-[linear-gradient(180deg,rgba(255,255,255,0.78),rgba(246,242,235,0.92))] shadow-[0_28px_70px_rgba(17,20,24,0.07)] backdrop-blur"
        >
          <div className="flex items-center gap-3 border-b border-black/6 px-4 py-4 sm:px-5">
            <span className="h-2.5 w-2.5 rounded-full bg-[#d7b8b1]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#ddd1ad]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#b8ceb8]" />
            <div className="ml-2 flex h-9 flex-1 items-center justify-center rounded-full border border-black/7 bg-white/70 px-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.65)]">
              <span className="truncate text-[11px] uppercase tracking-[0.24em] text-[#7b848d]">
                imersa.app / preview
              </span>
            </div>
          </div>

          <div className="grid gap-4 p-4 sm:p-5 lg:grid-cols-[248px_1fr] lg:gap-5 xl:grid-cols-[272px_1fr]">
            <aside className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
              {content.items.map((item, index) => {
                const isActive = item.id === activeItem?.id;

                return (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, x: -22 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{
                      duration: 0.5,
                      delay: 0.18 + index * 0.08,
                      ease: "easeOut",
                    }}
                  >
                    <button
                      type="button"
                      onClick={() => setActiveItemId(item.id)}
                      aria-pressed={isActive}
                      aria-label={`Selecionar preview ${item.title}`}
                      className={`group w-full overflow-hidden rounded-[1.55rem] border p-2 text-left transition duration-300 ${
                        isActive
                          ? "border-black/12 bg-white/92 shadow-[0_18px_44px_rgba(17,20,24,0.08)]"
                          : "border-black/8 bg-white/62 hover:border-black/12 hover:bg-white/78"
                      }`}
                    >
                      <div className="relative aspect-[4/3] overflow-hidden rounded-[1.15rem]">
                        <Image
                          src={item.imageSrc}
                          alt={item.title}
                          fill
                          sizes="(min-width: 1280px) 272px, (min-width: 1024px) 248px, (min-width: 640px) 33vw, 100vw"
                          className={`object-cover transition duration-500 ${
                            isActive ? "scale-[1.02]" : "group-hover:scale-[1.03]"
                          }`}
                        />
                        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.03)_0%,rgba(12,16,20,0.1)_48%,rgba(12,16,20,0.56)_100%)]" />
                        <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-4">
                          <div>
                            <p className="text-[11px] uppercase tracking-[0.26em] text-white/76">
                              Ambiente {index + 1}
                            </p>
                            <p className="mt-2 font-display text-xl tracking-[-0.04em] text-white">
                              {item.title}
                            </p>
                          </div>
                          <span
                            className={`h-3 w-3 rounded-full border transition ${
                              isActive
                                ? "border-[#1e252c] bg-[#1e252c]"
                                : "border-white/50 bg-white/26"
                            }`}
                          />
                        </div>
                      </div>
                    </button>
                  </motion.div>
                );
              })}
            </aside>

            <div className="relative min-h-[24rem] overflow-hidden rounded-[1.9rem] border border-black/8 bg-[linear-gradient(180deg,#fbfaf7_0%,#f2ede4_100%)] p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.62)] sm:min-h-[28rem] sm:p-6">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.75),transparent_36%)]" />
              <div className="absolute inset-0 opacity-[0.16] [background-image:linear-gradient(to_right,rgba(17,20,24,0.08)_1px,transparent_1px),linear-gradient(to_bottom,rgba(17,20,24,0.08)_1px,transparent_1px)] [background-size:36px_36px]" />
              <div className="relative flex h-full flex-col rounded-[1.5rem] border border-black/6 bg-white/58 p-5 sm:p-6">
                <div className="flex items-center justify-between gap-3">
                  <span className="text-[11px] uppercase tracking-[0.26em] text-[#79828b]">
                    Embedded viewer
                  </span>
                  <span className="h-2.5 w-2.5 rounded-full bg-[#b9c5cf]" />
                </div>

                <div className="mt-5 flex flex-1 items-center justify-center rounded-[1.35rem] border border-black/6 bg-[linear-gradient(180deg,rgba(255,255,255,0.42),rgba(243,238,229,0.82))] px-6 py-10 text-center">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeItem?.id ?? "empty"}
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -12 }}
                      transition={{ duration: 0.22, ease: "easeOut" }}
                      className="flex flex-col items-center"
                    >
                      <p className="text-[11px] uppercase tracking-[0.3em] text-[#88919a]">
                        Placeholder
                      </p>
                      <p className="mt-4 font-display text-3xl tracking-[-0.05em] text-[#1a232b] sm:text-4xl lg:text-[3.1rem]">
                        {activeItem?.viewerLabel}
                      </p>
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
