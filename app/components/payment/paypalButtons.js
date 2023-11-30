import React, { useEffect, useRef, useState } from "react";
import { loadScript } from "@paypal/paypal-js";

export default function PayPalButton() {
  const paypalRef = useRef(null);
  const [isSdkReady, setSdkReady] = useState(false);

  useEffect(() => {
    loadPayPalScript();
  }, []);

  const loadPayPalScript = async () => {
    const paypalScriptOptions = {
      "client-id": process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID_SB,
      //   "client-id": process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID,
      vault: true,
      intent: "subscription",
    };

    try {
      await loadScript(paypalScriptOptions);
      setSdkReady(true);
    } catch (error) {
      console.error("PayPal SDK could not be loaded.", error);
    }
  };

  useEffect(() => {
    if (isSdkReady && paypalRef.current) {
      window.paypal
        .Buttons({
          style: {
            shape: "rect",
            color: "blue",
            layout: "vertical",
            label: "subscribe",
          },
          createSubscription: function (data, actions) {
            return actions.subscription.create({
              //   plan_id: "P-5LT450540U875971WMVEEHTA",

              plan_id: "P-8KE365463W975783AMVEHMIA",
            });
          },

          onApprove: function (data, actions) {
            alert(`Subscription successful! ID: ${data.subscriptionID}`);
          },
        })
        .render(paypalRef.current);
    }
  }, [isSdkReady]);

  // Render the PayPal button container
  return (
    <div>
      <div ref={paypalRef} />
    </div>
  );
}
