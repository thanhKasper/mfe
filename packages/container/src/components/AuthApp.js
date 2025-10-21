import { mount } from "auth/AuthApp";
import { useEffect } from "react";
import { useRef } from "react";
import { useHistory } from "react-router-dom";
import React from "react";

export default function ({ onSignIn }) {
  const history = useHistory();
  const ref = useRef();

  useEffect(() => {
    const { onParentNavigate } = mount(ref.current, {
      initialPath: history.location.pathname,
      onNavigate: ({ pathname: nextPathname }) => {
        const { pathname } = history.location;
        if (nextPathname !== pathname) {
          history.push(nextPathname);
        }
      },
      onSignIn,
    });
    history.listen(onParentNavigate);
  }, []);

  return <div ref={ref} />;
}
