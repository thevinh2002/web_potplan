"use client";

import { useState, useTransition } from "react";
import { motion } from "framer-motion";
import Map from "@/src/components/common/Map";
import { useTranslations } from "next-intl";
import { subscribeNewsletter } from "@/src/server/actions/email";

export default function Newsletter() {
  const t = useTranslations("home.newsletter");
  const [email, setEmail] = useState("");
  const [isPending, startTransition] = useTransition();
  const [status, setStatus] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({
    type: null,
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus({ type: null, message: "" });

    startTransition(async () => {
      const result = await subscribeNewsletter(email);

      if (result.success) {
        setStatus({
          type: "success",
          message: "Đăng ký thành công! Cảm ơn bạn.",
        });
        setEmail("");
      } else {
        setStatus({ type: "error", message: result.error || "Có lỗi xảy ra." });
      }
    });
  };

  return (
    <section className="py-12 bg-[#8b6914] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={{
            visible: { transition: { staggerChildren: 0.2 } },
          }}
          className="grid lg:grid-cols-2 gap-10 items-center"
        >
          <motion.div
            variants={{
              hidden: { opacity: 0, x: -30 },
              visible: { opacity: 1, x: 0, transition: { duration: 0.6 } },
            }}
            className="text-left text-white"
          >
            <h2 className="text-3xl font-bold mb-4">{t("title")}</h2>
            <p className="text-white/80 mb-6 text-lg">{t("description")}</p>

            <form
              onSubmit={handleSubmit}
              className="flex flex-col max-w-md gap-2"
            >
              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={isPending}
                  placeholder={t("placeholder")}
                  className="flex-1 w-full px-4 py-3 rounded-lg border-0 focus:ring-2 focus:ring-[#c9a87c] outline-none disabled:opacity-70"
                />
                <button
                  type="submit"
                  disabled={isPending}
                  className="w-full sm:w-auto bg-[#5c4a3d] text-white px-6 py-3 rounded-lg font-bold hover:bg-[#4a3d32] transition-colors whitespace-nowrap disabled:opacity-70 flex items-center justify-center min-w-[120px]"
                >
                  {isPending ? (
                    <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                  ) : (
                    t("button")
                  )}
                </button>
              </div>

              {status.message && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`text-sm font-medium ${
                    status.type === "success"
                      ? "text-green-300"
                      : "text-red-300"
                  }`}
                >
                  {status.message}
                </motion.p>
              )}
            </form>
          </motion.div>

          <motion.div
            variants={{
              hidden: { opacity: 0, x: 30, scale: 0.95 },
              visible: {
                opacity: 1,
                x: 0,
                scale: 1,
                transition: { type: "spring", bounce: 0.3, duration: 0.8 },
              },
            }}
            className="h-[300px] w-full rounded-xl overflow-hidden shadow-2xl border-4 border-white/20"
          >
            <Map />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
