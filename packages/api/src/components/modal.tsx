export interface ModalCloseProps {
  children?: JSX.Element | JSX.Element[];
  closeEvent?: string;
}

export function ModalClose({ children, closeEvent }: ModalCloseProps) {
  const closeEventName = closeEvent ?? "closeModal";
  const hyperscript = `on click trigger ${closeEventName}`;
  return <span data-script={hyperscript}>{children}</span>;
}

export interface ModalTitleProps {
  center?: boolean;
  children?: JSX.Element | JSX.Element[];
}

export function ModalTitle({ children, center }: ModalTitleProps) {
  const classes = ["text-xl"];
  if (center) classes.push("text-center");

  return <h1 class={classes.join(" ")}>{children}</h1>;
}

export interface ModalProps {
  children?: JSX.Element | JSX.Element[];
  closeEvent?: string;
  id?: string;
}

export function Modal({ children, closeEvent, id }: ModalProps) {
  const closeEventName = closeEvent ?? "closeModal";
  const mainDivId = id ?? "modal";
  const contentId = `${mainDivId}-content`;
  const hyperscript = {
    close: `on ${closeEventName} remove me`,
    closeTrigger: `on click trigger ${closeEventName}`,
  };

  return (
    <div id={mainDivId} class="modal" data-script={hyperscript.close}>
      <div class="modal-underlay" data-script={hyperscript.closeTrigger} />
      <div id={contentId} class="modal-content">
        {children}
      </div>
    </div>
  );
}

export default Modal;
