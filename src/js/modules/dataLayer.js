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
  const currentTime = new Date();
  klaviyo.push([
    "track",
    "Page View",
    { ...obj, ...item, products: titles, pagepath: window.location.pathname, pageurl: window.location.href, time: currentTime.getTime() },
  ]);
};

const dataLayerRedirect = (data) => {
  const titles = data.map((items) => items.title);
  const item = { event: "offerview", action: "viewaction", value: 0 };
  setDataLayer(item);
  const currentTime = new Date();
  klaviyo.push([
    "track",
    "User Redirect Engagement",
    { ...obj, ...item, products: titles, pagepath: window.location.pathname, pageurl: window.location.href, time: currentTime.getTime() },
  ]);
};

export { dataLayerStart, dataLayerRedirect };
