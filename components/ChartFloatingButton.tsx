"use client";

import { useRouter } from "next/navigation";

export function ChartFloatingButton() {
  const router = useRouter();

  const openAIAnalytics = () => {
    router.push("/ai-portfolio");
  };

  return (
    <button
      type="button"
      onClick={openAIAnalytics}
      aria-label="Open AI Portfolio Analytics"
      className="chart-floating-button"
    >
      {/* WhatsApp-style Chat + Chart Icon */}
      <svg
        className="chart-floating-icon"
        width="29"
        height="29"
        viewBox="0 0 29 29"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        {/* Chat Bubble */}
        <path
          d="
            M14.5 3.5
            C8.42 3.5 3.5 7.72 3.5 13
            C3.5 15.72 4.78 18.17 6.87 19.82
            L5.45 24
            L9.72 21.86
            C11.15 22.4 12.76 22.5 14.5 22.5
            C20.58 22.5 25.5 18.28 25.5 13
            C25.5 7.72 20.58 3.5 14.5 3.5Z
          "
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Chart baseline */}
        <path
          d="M8.5 17.5H20.5"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
        />

        {/* Chart bars */}
        <rect
          x="9"
          y="13.2"
          width="2.3"
          height="4.3"
          rx="0.7"
          fill="currentColor"
        />

        <rect
          x="13.35"
          y="10.8"
          width="2.3"
          height="6.7"
          rx="0.7"
          fill="currentColor"
        />

        <rect
          x="17.7"
          y="8"
          width="2.3"
          height="9.5"
          rx="0.7"
          fill="currentColor"
        />

        {/* Growth line */}
        <path
          d="M9.4 11.7L12.1 9.8L14.6 11L19.5 7.5"
          stroke="currentColor"
          strokeWidth="1.55"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Growth arrow */}
        <path
          d="M17.4 7.5H19.5V9.6"
          stroke="currentColor"
          strokeWidth="1.45"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>

      {/* Hover Content */}
      <span className="chart-floating-tooltip">
        <strong>AI Portfolio Analytics</strong>
        <small>View insights & performance</small>
      </span>
    </button>
  );
}