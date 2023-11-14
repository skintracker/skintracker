export interface ModalCloseProps {
  children?: JSX.Element | JSX.Element[];
  closeEvent?: string;
}

export function ModalClose({ children, closeEvent }: ModalCloseProps) {
  const closeEventName = closeEvent ?? "closeModal";
  return (
    <span data-script={`on click trigger ${closeEventName}`}>{children}</span>
  );
}

export interface ModalTitleProps {
  center?: boolean;
  children?: JSX.Element | JSX.Element[];
}

export function ModalTitle({ children, center }: ModalTitleProps) {
  return <h1 class={`text-xl${center ? " text-center" : ""}`}>{children}</h1>;
}

export interface ModalProps {
  children?: JSX.Element | JSX.Element[];
  closeEvent?: string;
  id?: string;
}

export function Modal({ children, closeEvent, id }: ModalProps) {
  const closeEventName = closeEvent ?? "closeModal";
  const mainDivId = id ?? "modal";
  return (
    <div
      id={mainDivId}
      class="flex flex-col items-center fixed top-0 bottom-0 left-0 right-0 z-50"
      data-script={`on ${closeEventName} remove me`}
    >
      <div
        class="modal-underlay absolute -z-10 top-0 bottom-0 left-0 right-0 bg-slate-950/30"
        data-script={`on click trigger ${closeEventName}`}
      />
      <div
        id={`${mainDivId}-content`}
        class="modal-content mt-24 w-4/5 max-w-xl border border-solid rounded bg-white p-2"
      >
        {children}
      </div>
    </div>
  );
}

export default Modal;
