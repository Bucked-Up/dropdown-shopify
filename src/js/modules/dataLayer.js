const obj = {
  step_count: step_count,
  page_id: page_id,
  version_id: version_id,
};

const setDataLayer = ({ event, action, value, currency }) => {
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    ...obj,
    event: event,
    action: action,
    value: value,
    currency: currency,
    transaction_id: undefined,
  });
};

const dataLayerStart = (data) => {
  const titles = data.map((items) => items.title);
  const item = { event: "pageview", action: "load", value: 0 };
  setDataLayer(item);
  klaviyo.push(["track", "Page View", { ...obj, ...item, products: titles }]);
};

const dataLayerRedirect = (data) => {
  const titles = data.map((items) => items.title);
  const item = { event: "offerview", action: "viewaction", value: 0 };
  setDataLayer(item);
  klaviyo.push(["track", "User Redirect Engagement", { ...obj, ...item, products: titles }]);
};

export { dataLayerStart, dataLayerRedirect };
