/**
 * Vismart AI Suite - 1-Line Embeddable Website Live Chat & WhatsApp Widget
 * Version: 1.0.0
 * Embed snippet: <script src="https://vismart.cloud/widget.js" data-org-id="YOUR_ORG_ID" async></script>
 */
(function () {
  const currentScript = document.currentScript || document.querySelector('script[src*="widget.js"]');
  const orgId = currentScript ? currentScript.getAttribute("data-org-id") : "";
  const brandColor = currentScript ? currentScript.getAttribute("data-color") || "#25D366" : "#25D366";
  const position = currentScript ? currentScript.getAttribute("data-position") || "bottom-right" : "bottom-right";

  // Create Container
  const container = document.createElement("div");
  container.id = "vismart-chat-widget";
  container.style.position = "fixed";
  container.style.zIndex = "999999";
  container.style.bottom = "20px";
  if (position === "bottom-left") {
    container.style.left = "20px";
  } else {
    container.style.right = "20px";
  }
  container.style.fontFamily = "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif";

  // Floating WhatsApp Button
  const button = document.createElement("button");
  button.id = "vismart-floating-btn";
  button.style.backgroundColor = brandColor;
  button.style.color = "#ffffff";
  button.style.border = "none";
  button.style.borderRadius = "50%";
  button.style.width = "60px";
  button.style.height = "60px";
  button.style.boxShadow = "0 4px 14px rgba(0, 0, 0, 0.25)";
  button.style.cursor = "pointer";
  button.style.display = "flex";
  button.style.alignItems = "center";
  button.style.justifyContent = "center";
  button.style.transition = "transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1)";
  button.innerHTML = `
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
    </svg>
  `;

  button.onmouseover = function () {
    button.style.transform = "scale(1.08)";
  };
  button.onmouseout = function () {
    button.style.transform = "scale(1)";
  };

  // Popup Modal
  const popup = document.createElement("div");
  popup.id = "vismart-chat-popup";
  popup.style.display = "none";
  popup.style.position = "absolute";
  popup.style.bottom = "75px";
  if (position === "bottom-left") {
    popup.style.left = "0";
  } else {
    popup.style.right = "0";
  }
  popup.style.width = "320px";
  popup.style.backgroundColor = "#ffffff";
  popup.style.borderRadius = "16px";
  popup.style.boxShadow = "0 10px 30px rgba(0,0,0,0.15)";
  popup.style.overflow = "hidden";
  popup.style.border = "1px solid #e5e7eb";

  popup.innerHTML = `
    <div style="background-color: ${brandColor}; padding: 16px; color: #ffffff;">
      <h4 style="margin: 0; font-size: 16px; font-weight: 600;">Chat with Us on WhatsApp</h4>
      <p style="margin: 4px 0 0 0; font-size: 12px; opacity: 0.9;">24/7 Instant AI Assistance</p>
    </div>
    <div style="padding: 16px; background-color: #f9fafb;">
      <p style="font-size: 13px; color: #374151; margin: 0 0 12px 0;">Have questions about our products or pricing? Chat with our team right now!</p>
      <a id="vismart-wa-link" href="https://wa.me/?text=Hi%2C%20I%20have%20an%20inquiry" target="_blank" style="display: block; text-align: center; background-color: ${brandColor}; color: #ffffff; padding: 10px 16px; border-radius: 8px; text-decoration: none; font-weight: 600; font-size: 14px;">
        Open WhatsApp Chat
      </a>
    </div>
  `;

  button.onclick = function () {
    popup.style.display = popup.style.display === "none" ? "block" : "none";
  };

  container.appendChild(popup);
  container.appendChild(button);
  document.body.appendChild(container);
})();
