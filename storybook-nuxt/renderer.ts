function renderToCanvas(
  { storyFn, kind, name, showMain, showError, forceRemount },
  canvasElement
) {
  const element = storyFn()
  showMain()
  if (typeof element === 'string') {
    canvasElement.innerHTML = element
    simulatePageLoad(canvasElement)
  } else if (element instanceof Node) {
    if (canvasElement.firstChild === element && forceRemount === false) {
      return
    }

    canvasElement.innerHTML = ''
    canvasElement.appendChild(element)
    simulateDOMContentLoaded()
  } else {
    showError({
      title: `Expecting an HTML snippet or DOM node from the story: "${name}" of "${kind}", but got ${JSON.stringify(
        element
      )}.`,
      description: `
            Did you forget to return the HTML snippet from the story?
            Use "() => <your snippet or node>" or when defining the story.
          `,
    })
  }
}

export { renderToCanvas }
