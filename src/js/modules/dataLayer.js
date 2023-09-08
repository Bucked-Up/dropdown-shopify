const setDataLayer = ({event, action, value, currency}) => {
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    step_count: step_count,
    page_id: page_id,
    version_id: version_id,
    event: event,
    action: action,
    value: value,
    currency: currency,
    transaction_id: undefined,
  });
};

const dataLayerStart = () => {
  
  setDataLayer({event: "pageview", action: "load", value: 0});
};

const dataLayerRedirect = () => {
  
  setDataLayer({event: "offerview", action: "viewaction", value: 0});
};

export {dataLayerStart, dataLayerRedirect}