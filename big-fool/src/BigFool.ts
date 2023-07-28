import { html, css, LitElement } from 'lit';
import { property } from 'lit/decorators.js';

export class BigFool extends LitElement {
  static styles = css`
    :host {
      display: block;
      padding: 25px;
      color: var(--big-fool-text-color, #000);
    }
  `;

  @property({ type: String }) header = 'Hey there';

  @property({ type: Number }) counter = 5;

  @property({ type: Boolean }) private _foo = false;

  __increment() {
    this.counter += 1;
  }

  private __decrement() {
    this.counter -= 1;
  }

  render() {
    return html`
      <h2>${this.header} Nr. ${this.counter}!</h2>
      <button @click=${this.__increment}>increment</button>
      <button @click=${this.__decrement}>decrement</button>
    `;
  }
}
