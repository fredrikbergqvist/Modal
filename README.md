# Nidhugg Modal

A basic web component for creating modals.

## Basic usage

1. Include the script in your HTML file:
2. Add the `nidhugg-modal` element to your HTML file.
3. Add content to the modal using the `header`, `content`, and `footer` slots.
    
 ```html
<nidhugg-modal id="modal-1" open>
  <h2 slot="header">Hello World</h2>
  <p slot="content">This is a test of the Nidhugg Modal</p>
  <button slot="footer" onclick="document.querySelector('#modal-1').close()">Close</button>
</nidhugg-modal>
```

## Styling

The modal can be styled using CSS custom variables. The following variables are available:

```css
:root{
  --nidhugg-base-100:#2A303C;
  --nidhugg-base-200:#242933;
  --nidhugg-base-300:#20252E;
  --nidhugg-base-content:#B2CCD6;
  --nidhugg-neutral:#1C212B;
  --nidhugg-neutral-content:#B2CCD6;
  --nidhugg-rounded: 0.5rem;
}
```

The modal will also add the `nidhugg-modal-open`-class to the body when it is open.

```css
/* Example: */
 .nidhugg-modal-open{
     overflow: hidden;
     filter: blur(2px);
     height: 100vh;
     width: 100vw;
 }
```
