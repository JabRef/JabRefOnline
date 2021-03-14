declare module '@tailwindcss/forms'

interface HTMLInputEvent extends Event {
  target: HTMLInputElement & EventTarget
}
