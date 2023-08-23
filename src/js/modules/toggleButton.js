const toggleButton = (buttons) => {
  buttons.forEach((btn) => {
    btn.classList.toggle("btn-lock");
    btn.toggleAttribute("btn-lock");
    btn.toggleAttribute("disabled");
  });
};

export default toggleButton;
