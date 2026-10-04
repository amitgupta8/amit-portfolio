"use client";

import { useState } from "react";
import {
  ArrowUpRight,
  Mail,
  MapPin,
  Send,
  CheckCircle2,
} from "lucide-react";
import toast from "react-hot-toast";
import { site } from "@/data/site";

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

const normalizeSpaces = (value: string): string => {
  return value.trim().replace(/\s+/g, " ");
};

function validateForm(form: ContactForm): FormErrors {
  const errors: FormErrors = {};

  const name = normalizeSpaces(form.name);
  const email = form.email.trim().toLowerCase();
  const message = form.message.trim();

  // NAME VALIDATION
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

  // EMAIL VALIDATION
  if (!email) {
    errors.email = "Email is required.";
  } else if (email.length > 254) {
    errors.email = "Email address is too long.";
  } else if (!EMAIL_REGEX.test(email)) {
    errors.email = "Please enter a valid email address.";
  }

  // MESSAGE VALIDATION
  if (!message) {
    errors.message = "Message is required.";
  } else if (message.length < 10) {
    errors.message = "Message must be at least 10 characters.";
  } else if (message.length > 1000) {
    errors.message = "Message must be less than 1000 characters.";
  }

  return errors;
}

export function Contact() {
  const [form, setForm] = useState<ContactForm>({
    name: "",
    email: "",
    message: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [busy, setBusy] = useState(false);

  // INPUT CHANGE
  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) {
    const { name, value } = e.target;

    const updatedForm: ContactForm = {
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

  // INPUT BLUR
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

  // SUBMIT
  async function submit(e: React.FormEvent<HTMLFormElement>) {
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

          // Honeypot
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
        error instanceof Error
          ? error.message
          : "Unable to send message.",
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
    <section
      id="contact"
      className="section-space relative overflow-hidden"
    >
      <div className="container-pro">
        <div className="contact-shell">
          {/* LEFT SIDE */}

          <div className="contact-copy">
            <span className="eyebrow">
              <span className="status-dot" />
              OPEN TO OPPORTUNITIES
            </span>

            <p className="mt-7 text-xs font-black tracking-[.25em] text-violet-600">
              LET&apos;S BUILD SOMETHING USEFUL
            </p>

            <h2 className="mt-4 max-w-3xl font-display text-5xl font-black leading-[.95] tracking-[-.05em] md:text-7xl">
              Have a product, idea, or role in mind?
            </h2>

            <p className="mt-6 max-w-xl text-base leading-8 text-black/55 dark:text-white/55">
              Tell me what you are working on. I&apos;ll bring a practical
              mix of frontend craft, backend engineering and AI integration.
            </p>

            {/* CONTACT INFO */}

            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              {/* EMAIL */}

              <a
                className="contact-mini"
                href={`mailto:${site.email}`}
              >
                <Mail size={17} />

                <span>
                  <b>Email</b>
                  <small>{site.email}</small>
                </span>
              </a>

              {/* LOCATION */}

              <div className="contact-mini">
                <MapPin size={17} />

                <span>
                  <b>Based in</b>
                  <small>{site.location}</small>
                </span>
              </div>
            </div>

            {/* RESUME */}

            <a
              href={site.resume}
              download
              className="mt-6 inline-flex items-center gap-2 text-sm font-black"
            >
              Download resume
              <ArrowUpRight size={15} />
            </a>
          </div>

          {/* FORM */}

          <form
            onSubmit={submit}
            className="contact-form"
            noValidate
          >
            {/* FORM HEADER */}

            <div className="form-label">
              PROJECT BRIEF
              <span>01</span>
            </div>

            {/* NAME */}

            <label>
              <div className="flex items-center justify-between">
                <span>Name</span>

                {touched.name &&
                  !errors.name &&
                  form.name.trim() && (
                    <CheckCircle2
                      size={16}
                      className="text-green-500"
                    />
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
                aria-describedby={
                  nameError ? "name-error" : undefined
                }
                className={
                  nameError
                    ? "input-error"
                    : touched.name &&
                        form.name.trim() &&
                        !errors.name
                      ? "input-success"
                      : ""
                }
              />

              {nameError && (
                <span
                  id="name-error"
                  className="field-error"
                >
                  {nameError}
                </span>
              )}
            </label>

            {/* EMAIL */}

            <label>
              <div className="flex items-center justify-between">
                <span>Email</span>

                {touched.email &&
                  !errors.email &&
                  form.email.trim() && (
                    <CheckCircle2
                      size={16}
                      className="text-green-500"
                    />
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
                aria-describedby={
                  emailError ? "email-error" : undefined
                }
                className={
                  emailError
                    ? "input-error"
                    : touched.email &&
                        form.email.trim() &&
                        !errors.email
                      ? "input-success"
                      : ""
                }
              />

              {emailError && (
                <span
                  id="email-error"
                  className="field-error"
                >
                  {emailError}
                </span>
              )}
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
                rows={6}
                minLength={10}
                maxLength={1000}
                aria-invalid={!!messageError}
                aria-describedby={
                  messageError
                    ? "message-error"
                    : undefined
                }
                className={
                  messageError
                    ? "input-error"
                    : touched.message &&
                        form.message.trim() &&
                        !errors.message
                      ? "input-success"
                      : ""
                }
              />

              {messageError && (
                <span
                  id="message-error"
                  className="field-error"
                >
                  {messageError}
                </span>
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
              disabled={busy}
              className="send-btn disabled:cursor-not-allowed disabled:opacity-60"
              type="submit"
            >
              {busy ? "Sending..." : "Send inquiry"}

              <Send size={17} />
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}