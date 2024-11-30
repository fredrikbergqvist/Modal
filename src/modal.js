const modalStyles = `
<style>
  .nidhugg-modal__dialog{
    display: none;
    transition: all 0.3s ease-in-out;
    opacity: 1;
    transform: scale(1);
    position: fixed;
    z-index: 10;
    width: max-content;
    padding: 0;
    background-color: var(--nidhugg-base-100, #2A303C);
    color: var(--nidhugg-base-content, #B2CCD6);
    border-radius: var(--nidhugg-rounded, 0.5rem);
    border: 2px solid var(--nidhugg-neutral, #1C212B);
    box-shadow: 0 0 1rem rgba(0, 0, 0, 0.5);
  }
  .nidhugg-modal__dialog[open]::backdrop {
    opacity: 0.6;
    background-color: #111;
  }
  .nidhugg-modal__dialog[open] {
    @starting-style{
      opacity: 0;
      transform: scale(0);
    }
    display: block;
  }
  .nidhugg-modal__dialog header {
    background-color: var(--nidhugg-base-300, #20252E);
    display: flex;
    flex-direction: row-reverse;
    justify-content: space-between;
    align-items: flex-start;
    padding: 1rem;
  }
  .nidhugg-modal__dialog button {
    background-color: var(--nidhugg-base-100, #2A303C);
    color: var(--nidhugg-base-content, #B2CCD6);
    transition: background-color, color 0.3s ease-in-out;
    border:none;
    border-radius: 50%;
    width: 2rem;
    height: 2rem;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: -0.5rem;
    margin-right: -0.5rem;
    cursor: pointer;
    &:hover {
      color: var(--nidhugg-base-200, #242933);
      background-color: var(--nidhugg-base-content, #B2CCD6);
    }
  }

  .nidhugg-modal__dialog main {
    background-color: var(--nidhugg-base-100, #2A303C);
    padding: 0 1rem 1rem;
  }
  .nidhugg-modal__dialog footer {
    background-color: var(--nidhugg-base-100, #2A303C);
    padding: 0 1rem 1rem;
  }
</style>
`;

/**
 * @class NidhuggModal
 * @extends HTMLElement
 * @description Custom element for creating a modal dialog
 * @example
 * <nidhugg-modal>
 *   <h2 slot="header">Modal Header</h2>
 *   <p slot="content">Modal Content</p>
 *   <button slot="footer">Close</button>
 * </nidhugg-modal>
 *
 * @public
 * @method open - Opens the modal dialog
 * @method showModal - Displays the modal dialog
 * @method close - Closes the modal dialog
 *
 */
class NidhuggModal extends HTMLElement {
	static observedAttributes = ["open"];

	constructor() {
		super();
		this.close = this.close.bind(this);
	}

	open() {
		this.showModal();
	}

	showModal() {
		const dialog = this.shadowRoot?.querySelector("dialog");
		if (dialog) {
			dialog.showModal();
			document.body.classList.add("nidhugg-modal-open");
		}
	}

	close() {
		const dialog = this.shadowRoot?.querySelector("dialog");
		if (dialog) {
			dialog.style.opacity = "0";
			dialog.style.transform = "scale(0)";
			setTimeout(() => {
				dialog.close();
				document.body.classList.remove("nidhugg-modal-open");
				dialog.style.opacity = "";
				dialog.style.transform = "";
			}, 300);
		}
	}

	populateElements() {
		const headerTemplate = document.createElement("template");

		headerTemplate.innerHTML = `${modalStyles}
    <dialog class="nidhugg-modal__dialog">
    	<div>
				<header>
					<button id="nidhugg-modal-close-btn" type="button" title="Close modal" autofocus>x</button>
					<slot name="header"></slot>
				</header>
				<main class="nid-modal__main">
					<slot name="content"></slot>
				</main>
				<footer class="nid-modal__footer">
					<slot name="footer"></slot>
				</footer>
      </div>
    </dialog>`;

		this.shadowRoot?.appendChild(headerTemplate.content.cloneNode(true));
		if (this.hasAttribute("open")) {
			this.showModal();
		}
	}

	connectedCallback() {
		this.attachShadow({ mode: "open" });
		this.populateElements();

		const dialogCloseBtn = this.shadowRoot?.querySelector("#nidhugg-modal-close-btn");
		dialogCloseBtn?.addEventListener("click", (e) => {
			this.close();
		});
		const dialogEl = this.shadowRoot?.querySelector(".nidhugg-modal__dialog");
		dialogEl?.addEventListener("cancel", (event) => {
			event.preventDefault();
			this.close();
		});
		dialogEl?.addEventListener("close", (event) => {
			event.preventDefault();
			this.close();
		});
		dialogEl?.addEventListener("mousedown", (event) => {
			event.preventDefault();
			if (event.target === dialogEl) {
				this.close();
			}
		});
	}

	attributeChangedCallback(name, oldValue, newValue) {
		const dialog = this.shadowRoot && this.shadowRoot.querySelector(".nidhugg-modal__dialog");
		if (!dialog) {
			return;
		}
		if (name === "open") {
			if (this.hasAttribute("open")) {
				return dialog.showModal();
			}

			dialog.close();
		}
	}

	dispatchEvent(event) {
		return false;
	}
}

customElements.define("nidhugg-modal", NidhuggModal);
