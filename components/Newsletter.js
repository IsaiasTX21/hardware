"use client";

import { useState } from "react";
import { t } from "@/lib/i18n";

// mode "shopify": envia o e-mail ao formulário de cliente da loja (cria o cliente com a tag "newsletter")
// mode "external": formulário do seu provedor (Mailchimp, Klaviyo...) em action
export default function Newsletter({ mode, shopDomain, action, emailField }) {
  const [state, setState] = useState("idle");
  if (mode === "off") return null;

  async function onSubmit(e) {
    e.preventDefault();
    const email = new FormData(e.currentTarget).get("email");
    setState("sending");
    try {
      await fetch(`https://${shopDomain}/contact`, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({ form_type: "customer", utf8: "✓", "contact[email]": email, "contact[tags]": "newsletter" }),
      });
      setState("done");
    } catch {
      setState("error");
    }
  }

  const external = mode === "external";
  return (
    <div className="news">
      <h4>{t("newsletter.title")}</h4>
      <p>{t("newsletter.text")}</p>
      {state === "done" ? (
        <p className="news-ok" role="status">{t("newsletter.thanks")}</p>
      ) : (
        <form className="news-form" {...(external ? { action, method: "post", target: "_blank" } : { onSubmit })}>
          <input type="email" name={external ? emailField : "email"} required placeholder={t("newsletter.placeholder")} aria-label={t("newsletter.placeholder")} />
          <button type="submit" disabled={state === "sending"}>{t("newsletter.button")}</button>
        </form>
      )}
      {state === "error" && <p className="alert" role="alert">{t("newsletter.error")}</p>}
    </div>
  );
}
