"use client";

import { useState } from "react";
import { ArrowLeft, CheckCircle2, Send } from "lucide-react";
import Link from "next/link";
import toast from "react-hot-toast";

type ContactForm = {
  name: string;
  email: string;
  message: string;
};

type FormErrors = {
  name?: string;
  email?: string;
  message?: string;
};

const NAME_REGEX = /^[\p{L}][\p{L}\s.'-]*$/u;

const EMAIL_REGEX =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;

const normalizeSpaces = (value: string) => value.trim().replace(/\s+/g, " ");

function validateForm(form: ContactForm): FormErrors {
  const errors: FormErrors = {};

  const name = normalizeSpaces(form.name);
  const email = form.email.trim().toLowerCase();
  const message = form.message.trim();

  // NAME
  if (!name) {
    errors.name = "Name is required.";
  } else if (name.length < 2) {
    errors.name = "Name must be at least 2 characters.";
  } else if (name.length > 60) {
    errors.name = "Name must be less than 60 characters.";
  } else if (!NAME_REGEX.test(name)) {
    errors.name =
      "Please enter a valid name. Numbers and special characters are not allowed.";
  }

  // EMAIL
  if (!email) {
    errors.email = "Email is required.";
  } else if (email.length > 254) {
    errors.email = "Email address is too long.";
  } else if (!EMAIL_REGEX.test(email)) {
    errors.email = "Please enter a valid email address.";
  }

  // MESSAGE
  if (!message) {
    errors.message = "Message is required.";
  } else if (message.length < 10) {
    errors.message = "Message must be at least 10 characters.";
  } else if (message.length > 1000) {
    errors.message = "Message must be less than 1000 characters.";
  }

  return errors;
}

export default function ContactPage() {
  const [form, setForm] = useState<ContactForm>({
    name: "",
    email: "",
    message: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});

  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const [busy, setBusy] = useState(false);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) {
    const { name, value } = e.target;

    const updatedForm = {
      ...form,
      [name]: value,
    };

    setForm(updatedForm);

    if (touched[name]) {
      const validationErrors = validateForm(updatedForm);

      setErrors((prev) => ({
        ...prev,
        [name]: validationErrors[name as keyof FormErrors],
      }));
    }
  }

  function handleBlur(
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) {
    const { name } = e.target;

    setTouched((prev) => ({
      ...prev,
      [name]: true,
    }));

    const validationErrors = validateForm(form);

    setErrors((prev) => ({
      ...prev,
      [name]: validationErrors[name as keyof FormErrors],
    }));
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (busy) return;

    const validationErrors = validateForm(form);

    setErrors(validationErrors);

    setTouched({
      name: true,
      email: true,
      message: true,
    });

    if (Object.keys(validationErrors).length > 0) {
  const firstError =
    validationErrors.name ||
    validationErrors.email ||
    validationErrors.message ||
    "Please check your information.";

  toast.error(firstError);

  return;
}

    setBusy(true);

    const loadingToast = toast.loading("Sending your message...");

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "");

      if (!apiUrl) {
        throw new Error("API URL is not configured.");
      }

      const response = await fetch(`${apiUrl}/api/contact`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: normalizeSpaces(form.name),
          email: form.email.trim().toLowerCase(),
          message: form.message.trim(),
          website: "",
        }),
      });

      let data: {
        success?: boolean;
        message?: string;
      } = {};

      try {
        data = await response.json();
      } catch {
        data = {};
      }

      if (!response.ok) {
        throw new Error(data.message || "Failed to send message.");
      }

      toast.success(data.message || "Message sent successfully.", {
        id: loadingToast,
      });

      setForm({
        name: "",
        email: "",
        message: "",
      });

      setErrors({});
      setTouched({});
    } catch (error) {
      console.error("Contact form error:", error);

      toast.error(
        error instanceof Error ? error.message : "Unable to send message.",
        {
          id: loadingToast,
        },
      );
    } finally {
      setBusy(false);
    }
  }

  const nameError = touched.name && errors.name;

  const emailError = touched.email && errors.email;

  const messageError = touched.message && errors.message;

  return (
    <main className="min-h-screen pt-28 pb-20">
      <div className="container-pro">
        {/* HEADER */}

        <div className="mb-10">
          <Link
            href="/"
            className="mb-6 inline-flex items-center gap-2 text-sm font-bold opacity-60 transition hover:opacity-100"
          >
            <ArrowLeft size={16} />
            Back to home
          </Link>

          <p className="text-xs font-black tracking-[0.25em] text-violet-600">
            GET IN TOUCH
          </p>

          <h1 className="mt-3 font-display text-5xl font-black tracking-[-0.05em] md:text-7xl">
            Let&apos;s work together.
          </h1>

          <p className="mt-5 max-w-2xl text-base leading-8 text-black/55 dark:text-white/55">
            Have a project, product idea, or opportunity? Send me a message and
            I&apos;ll get back to you.
          </p>
        </div>

        {/* FORM CARD */}

        <div className="mx-auto max-w-3xl">
          <form onSubmit={handleSubmit} noValidate className="contact-form">
            <div className="form-label">
              PROJECT BRIEF
              <span>01</span>
            </div>

            {/* NAME */}

            <label>
              <div className="flex items-center justify-between">
                <span>Name</span>

                {touched.name && !errors.name && form.name.trim() && (
                  <CheckCircle2 size={16} className="text-green-500" />
                )}
              </div>

              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Your name"
                autoComplete="name"
                maxLength={60}
                aria-invalid={!!nameError}
                className={
                  nameError
                    ? "input-error"
                    : touched.name && form.name.trim() && !errors.name
                      ? "input-success"
                      : ""
                }
              />

              {nameError && <span className="field-error">{nameError}</span>}
            </label>

            {/* EMAIL */}

            <label>
              <div className="flex items-center justify-between">
                <span>Email</span>

                {touched.email && !errors.email && form.email.trim() && (
                  <CheckCircle2 size={16} className="text-green-500" />
                )}
              </div>

              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="you@company.com"
                autoComplete="email"
                maxLength={254}
                aria-invalid={!!emailError}
                className={
                  emailError
                    ? "input-error"
                    : touched.email && form.email.trim() && !errors.email
                      ? "input-success"
                      : ""
                }
              />

              {emailError && <span className="field-error">{emailError}</span>}
            </label>

            {/* MESSAGE */}

            <label>
              <div className="flex items-center justify-between">
                <span>Message</span>

                <span className="text-[11px] font-semibold opacity-45">
                  {form.message.length}/1000
                </span>
              </div>

              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="What are you looking to build?"
                rows={7}
                minLength={10}
                maxLength={1000}
                aria-invalid={!!messageError}
                className={
                  messageError
                    ? "input-error"
                    : touched.message && form.message.trim() && !errors.message
                      ? "input-success"
                      : ""
                }
              />

              {messageError && (
                <span className="field-error">{messageError}</span>
              )}
            </label>

            {/* HONEYPOT */}

            <input
              type="text"
              name="website"
              tabIndex={-1}
              autoComplete="off"
              className="hidden"
            />

            {/* SUBMIT */}

            <button
              type="submit"
              disabled={busy}
              className="send-btn disabled:cursor-not-allowed disabled:opacity-60"
            >
              {busy ? "Sending..." : "Send inquiry"}

              <Send size={17} />
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}
