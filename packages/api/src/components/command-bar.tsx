import Modal from "./modal";

export function CommandBar() {
  return (
    <Modal id="command-bar" closeEvent="closeCommandBar">
      <input
        id="command-bar-input"
        type="search"
        name="query"
        class="command-bar-input"
        placeholder="Search for a command..."
        data-script="on keydown[key is 'Escape'] trigger closeCommandBar"
        autofocus="true"
        hx-post="/client/command/search"
        hx-trigger="keyup changed delay:300ms, search"
        hx-target="#command-bar-results"
      />
      <div id="command-bar-results" class="py-4">
        <p class="command-bar-placeholder">Results will appear here</p>
      </div>
    </Modal>
  );
}
