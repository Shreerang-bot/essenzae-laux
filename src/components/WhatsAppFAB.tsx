"use client";

import { useState } from "react";

const WHATSAPP_NUMBER = "919999999999";
const DEFAULT_MESSAGE = encodeURIComponent(
  "Hi! I'm interested in Essenzae Laux products. Can you help me?"
);

export default function WhatsAppFAB() {
  const [hovered, setHovered] = useState(false);

  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${DEFAULT_MESSAGE}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      id="whatsapp-fab"
      aria-label="Chat on WhatsApp"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="whatsapp-fab"
    >
      {/* Tooltip */}
      <span
        className={`whatsapp-fab__tooltip ${hovered ? "whatsapp-fab__tooltip--visible" : ""}`}
      >
        Chat with us
      </span>

      {/* Pulse rings */}
      <span className="whatsapp-fab__pulse whatsapp-fab__pulse--1" />
      <span className="whatsapp-fab__pulse whatsapp-fab__pulse--2" />

      {/* WhatsApp SVG Logo */}
      <svg
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="whatsapp-fab__icon"
      >
        <path
          d="M16.004 2.002C8.28 2.002 2.004 8.278 2.004 15.998c0 2.494.656 4.926 1.902 7.072L2 30l7.14-1.87A13.94 13.94 0 0 0 16.004 30c7.72 0 13.996-6.276 13.996-13.998 0-3.74-1.456-7.254-4.1-9.898a13.92 13.92 0 0 0-9.896-4.102Zm0 2.56c3.08 0 5.974 1.2 8.152 3.378a11.42 11.42 0 0 1 3.384 8.158c-.004 6.31-5.138 11.44-11.452 11.44a11.38 11.38 0 0 1-5.812-1.592l-.416-.248-4.314 1.132 1.152-4.206-.272-.432a11.36 11.36 0 0 1-1.746-6.072c.004-6.31 5.14-11.44 11.452-11.44l-.128-.118Zm-3.146 6.14c-.238 0-.626.09-.954.446-.326.358-1.248 1.22-1.248 2.974 0 1.754 1.278 3.45 1.456 3.688.178.238 2.514 3.838 6.094 5.382.852.368 1.516.588 2.034.752.854.272 1.632.234 2.248.142.686-.102 2.114-.864 2.412-1.7.298-.834.298-1.55.208-1.7-.088-.148-.328-.238-.686-.416-.358-.178-2.114-1.044-2.442-1.162-.328-.12-.566-.178-.804.178-.238.356-.922 1.162-1.13 1.4-.208.24-.416.27-.774.09-.358-.178-1.51-.556-2.876-1.774-1.064-.948-1.782-2.12-1.99-2.478-.21-.358-.024-.552.156-.73.16-.16.358-.416.536-.624.178-.21.238-.358.356-.596.12-.238.06-.446-.03-.624-.088-.178-.804-1.938-1.1-2.654-.292-.698-.586-.604-.804-.614-.208-.01-.446-.012-.684-.012Z"
          fill="white"
        />
      </svg>
    </a>
  );
}
