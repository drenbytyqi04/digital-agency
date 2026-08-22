"use client";

import { useRef, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { projectNeeds, budgetRanges, timelines } from "@/config/content";
import { cn, motionTokens } from "@/lib/utils";
import { MagneticButton } from "@/components/ui/MagneticButton";

type Data = {
  name: string;
  company: string;
  email: string;
  phone: string;
  needs: string[];
  budget: string;
  timeline: string;
  details: string;
};

const STEPS = ["Your Information", "What Do You Need?", "Project Details", "Review & Send"];
const empty: Data = {
  name: "", company: "", email: "", phone: "",
  needs: [], budget: "", timeline: "", details: "",
};

/**
 * Multi-step project inquiry.
 *
 * Accessibility decisions:
 *  - Visible <label> on every field (never placeholder-as-label).
 *  - Errors render inline, wired via aria-describedby + aria-invalid,
 *    AND as a focusable summary at the top of the step. On a failed
 *    advance, focus moves to that summary (WCAG error-identification).
 *  - Validation runs on submit/advance, not on keystroke.
 *  - A live region announces step changes without stealing focus.
 *  - Draft state is kept in memory across steps so going back never
 *    loses input.
 */
export function ProjectForm() {
  const [step, setStep] = useState(0);
  const [data, setData] = useState<Data>(empty);
  const [errors, setErrors] = useState<Partial<Record<keyof Data, string>>>({});
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const summaryRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  const set = <K extends keyof Data>(key: K, value: Data[K]) => {
    setData((d) => ({ ...d, [key]: value }));
    setErrors((e) => ({ ...e, [key]: undefined }));
  };

  const validate = (s: number) => {
    const e: Partial<Record<keyof Data, string>> = {};
    if (s === 0) {
      if (!data.name.trim()) e.name = "Enter your name so we know who we're replying to.";
      if (!data.email.trim()) e.email = "Enter an email address so we can reply.";
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email))
        e.email = "That email address doesn't look complete.";
    }
    if (s === 1 && data.needs.length === 0) {
      e.needs = "Select at least one service so we can route your enquiry.";
    }
    if (s === 2) {
      if (!data.budget) e.budget = "Choose a budget range, or select “Not sure yet”.";
      if (!data.details.trim()) e.details = "Tell us briefly what you're planning to build.";
    }
    return e;
  };

  const advance = () => {
    const e = validate(step);
    setErrors(e);
    if (Object.keys(e).length) {
      requestAnimationFrame(() => summaryRef.current?.focus());
      return;
    }
    setStep((s) => Math.min(s + 1, STEPS.length - 1));
  };

  const submit = async () => {
    setStatus("sending");
    try {
      const res = await fetch("/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      setStatus(res.ok ? "sent" : "error");
    } catch {
      setStatus("error");
    }
  };

  if (status === "sent") {
    return (
      <div role="status" className="flex flex-col items-start gap-6 py-16">
        <span className="accent-gradient h-1 w-16 rounded-full" />
        <h2 className="display-md text-ink">Thanks. We&apos;ll be in touch shortly.</h2>
        <p className="pretty max-w-md text-sm leading-relaxed text-ink-dim">
          Your enquiry is with us. We reply to every project request, usually within one working
          day.
        </p>
      </div>
    );
  }

  const errorList = Object.entries(errors).filter(([, v]) => v) as [string, string][];

  return (
    <div>
      {/* Progress */}
      <ol className="mb-12 flex flex-wrap gap-x-3 gap-y-2" aria-label="Form progress">
        {STEPS.map((label, i) => (
          <li key={label} className="flex items-center gap-3">
            <span
              className={cn(
                "flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest transition-colors",
                i === step ? "text-ink" : i < step ? "text-volt-soft" : "text-ink-faint"
              )}
            >
              <span
                aria-hidden="true"
                className={cn(
                  "inline-block h-1.5 w-1.5 rounded-full",
                  i === step ? "bg-ink" : i < step ? "bg-volt" : "bg-line-strong"
                )}
              />
              {label}
              {i === step && <span className="sr-only">(current step)</span>}
            </span>
            {i < STEPS.length - 1 && (
              <span aria-hidden="true" className="h-px w-6 bg-line-strong" />
            )}
          </li>
        ))}
      </ol>

      <div aria-live="polite" className="sr-only">
        Step {step + 1} of {STEPS.length}: {STEPS[step]}
      </div>

      {/* Error summary — focus target on failed advance */}
      {errorList.length > 0 && (
        <div
          ref={summaryRef}
          tabIndex={-1}
          role="alert"
          className="mb-8 rounded-lg border border-[#DC2626]/40 bg-[#DC2626]/10 p-5"
        >
          <h3 className="text-sm font-medium text-[#FCA5A5]">
            {errorList.length === 1
              ? "One field needs attention"
              : `${errorList.length} fields need attention`}
          </h3>
          <ul className="mt-2 flex flex-col gap-1">
            {errorList.map(([key, msg]) => (
              <li key={key}>
                <a href={`#f-${key}`} className="text-sm text-[#FCA5A5] underline underline-offset-2">
                  {msg}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}

      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={reduce ? false : { opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          exit={reduce ? { opacity: 0 } : { opacity: 0, x: -18 }}
          transition={{ duration: reduce ? 0.01 : motionTokens.base, ease: motionTokens.ease }}
        >
          {step === 0 && (
            <fieldset className="grid gap-6 md:grid-cols-2">
              <legend className="sr-only">Your information</legend>
              <Field id="f-name" label="Name" required error={errors.name}>
                <input
                  id="f-name" name="name" type="text" autoComplete="name"
                  value={data.name} onChange={(e) => set("name", e.target.value)}
                  aria-invalid={!!errors.name}
                  aria-describedby={errors.name ? "f-name-err" : undefined}
                  className={inputCls}
                />
              </Field>
              <Field id="f-company" label="Company" hint="Optional">
                <input
                  id="f-company" name="company" type="text" autoComplete="organization"
                  value={data.company} onChange={(e) => set("company", e.target.value)}
                  className={inputCls}
                />
              </Field>
              <Field id="f-email" label="Email" required error={errors.email}>
                <input
                  id="f-email" name="email" type="email" autoComplete="email" inputMode="email"
                  value={data.email} onChange={(e) => set("email", e.target.value)}
                  aria-invalid={!!errors.email}
                  aria-describedby={errors.email ? "f-email-err" : undefined}
                  className={inputCls}
                />
              </Field>
              <Field id="f-phone" label="Phone" hint="Optional">
                <input
                  id="f-phone" name="phone" type="tel" autoComplete="tel" inputMode="tel"
                  value={data.phone} onChange={(e) => set("phone", e.target.value)}
                  className={inputCls}
                />
              </Field>
            </fieldset>
          )}

          {step === 1 && (
            <fieldset>
              <legend className="mb-5 text-sm text-ink">
                What do you need?{" "}
                <span className="text-ink-faint">(select all that apply)</span>
              </legend>
              {errors.needs && (
                <p id="f-needs-err" className="mb-4 text-sm text-[#FCA5A5]">
                  {errors.needs}
                </p>
              )}
              <div id="f-needs" className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                {projectNeeds.map((need) => {
                  const checked = data.needs.includes(need);
                  return (
                    <label
                      key={need}
                      className={cn(
                        "flex min-h-11 cursor-pointer items-center gap-3 rounded-lg border px-4 py-3.5 text-sm transition-colors",
                        checked
                          ? "border-volt bg-volt/10 text-ink"
                          : "border-line text-ink-dim hover:border-line-strong hover:text-ink"
                      )}
                    >
                      <input
                        type="checkbox" checked={checked}
                        onChange={() =>
                          set(
                            "needs",
                            checked ? data.needs.filter((n) => n !== need) : [...data.needs, need]
                          )
                        }
                        className="h-4 w-4 accent-[#4d7cfe]"
                      />
                      {need}
                    </label>
                  );
                })}
              </div>
            </fieldset>
          )}

          {step === 2 && (
            <fieldset className="flex flex-col gap-6">
              <legend className="sr-only">Project details</legend>
              <Field id="f-budget" label="Budget" required error={errors.budget}>
                <select
                  id="f-budget" value={data.budget}
                  onChange={(e) => set("budget", e.target.value)}
                  aria-invalid={!!errors.budget}
                  aria-describedby={errors.budget ? "f-budget-err" : undefined}
                  className={inputCls}
                >
                  <option value="">Select a range</option>
                  {budgetRanges.map((b) => (
                    <option key={b} value={b}>{b}</option>
                  ))}
                </select>
              </Field>
              <Field id="f-timeline" label="Timeline" hint="Optional">
                <select
                  id="f-timeline" value={data.timeline}
                  onChange={(e) => set("timeline", e.target.value)}
                  className={inputCls}
                >
                  <option value="">Select a timeline</option>
                  {timelines.map((t) => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
              </Field>
              <Field
                id="f-details" label="Project description" required error={errors.details}
                hint="What are you building, and what does success look like?"
              >
                <textarea
                  id="f-details" rows={5} value={data.details}
                  onChange={(e) => set("details", e.target.value)}
                  aria-invalid={!!errors.details}
                  aria-describedby={errors.details ? "f-details-err" : "f-details-hint"}
                  className={cn(inputCls, "resize-y")}
                />
              </Field>
            </fieldset>
          )}

          {step === 3 && (
            <div className="flex flex-col gap-6">
              <h3 className="font-display text-2xl text-ink">Review your enquiry</h3>
              <dl className="grid gap-x-8 gap-y-4 sm:grid-cols-2">
                {[
                  ["Name", data.name],
                  ["Company", data.company || "—"],
                  ["Email", data.email],
                  ["Phone", data.phone || "—"],
                  ["Needs", data.needs.join(", ") || "—"],
                  ["Budget", data.budget || "—"],
                  ["Timeline", data.timeline || "—"],
                ].map(([k, v]) => (
                  <div key={k} className="border-b border-line pb-3">
                    <dt className="font-mono text-[10px] uppercase tracking-widest text-ink-faint">
                      {k}
                    </dt>
                    <dd className="wrap-anywhere mt-1 text-sm text-ink">{v}</dd>
                  </div>
                ))}
              </dl>
              <div>
                <p className="font-mono text-[10px] uppercase tracking-widest text-ink-faint">
                  Description
                </p>
                <p className="pretty mt-1 text-sm leading-relaxed text-ink">{data.details}</p>
              </div>
              {status === "error" && (
                <p role="alert" className="text-sm text-[#FCA5A5]">
                  We couldn&apos;t send that. Check your connection and try again, or email us
                  directly.
                </p>
              )}
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      <div className="mt-12 flex flex-wrap items-center gap-4 border-t border-line pt-8">
        {step > 0 && (
          <MagneticButton variant="outline" onClick={() => setStep((s) => s - 1)}>
            Back
          </MagneticButton>
        )}
        {step < STEPS.length - 1 ? (
          <MagneticButton onClick={advance}>Continue</MagneticButton>
        ) : (
          <MagneticButton onClick={submit} disabled={status === "sending"}>
            {status === "sending" ? "Sending…" : "Let's Build Something Great"}
          </MagneticButton>
        )}
      </div>
    </div>
  );
}

const inputCls =
  "w-full min-h-11 rounded-lg border border-line bg-surface px-4 py-3 text-sm text-ink " +
  "placeholder:text-ink-faint transition-colors focus:border-volt-soft outline-none";

function Field({
  id, label, children, error, hint, required,
}: {
  id: string;
  label: string;
  children: React.ReactNode;
  error?: string;
  hint?: string;
  required?: boolean;
}) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="flex items-center gap-2 text-sm text-ink">
        {label}
        {required && (
          <span className="text-[#FCA5A5]" aria-hidden="true">
            *
          </span>
        )}
        {required && <span className="sr-only">(required)</span>}
        {hint && !error && <span className="text-xs text-ink-faint">{hint}</span>}
      </label>
      {children}
      {error && (
        <p id={`${id}-err`} className="text-sm text-[#FCA5A5]">
          {error}
        </p>
      )}
    </div>
  );
}
