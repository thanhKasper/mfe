import ReactDOM from "react-dom";
import React from "react";
import App from "./App";
import { createMemoryHistory, createBrowserHistory } from "history";

function mount(el, { onNavigate, defaultHistory, initialPath }) {
  const history =
    defaultHistory ??
    createMemoryHistory({
      initialEntries: [initialPath],
    });

  if (onNavigate) {
    history.listen(onNavigate);
  }

  ReactDOM.render(<App history={history} />, el);

  return {
    onParentNavigate({ pathname: nextPathname }) {
      console.log("In Marketing sub component");
      console.log("Detect the path to go: ", nextPathname);
      const { pathname } = history.location;
      console.log("current Pathname", pathname);
      if (pathname !== nextPathname) {
        history.push(nextPathname);
      }
    },
  };
}

if (process.env.NODE_ENV == "development") {
  const devRoot = document.querySelector("#_marketing-dev-root");
  if (devRoot) mount(devRoot, { defaultHistory: createBrowserHistory() });
}

export { mount };
