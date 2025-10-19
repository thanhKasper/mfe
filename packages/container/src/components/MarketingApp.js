import { mount } from "marketing/MarketingApp";
import { useEffect, useRef } from "react";
import { useHistory } from "react-router-dom";
import React from "react";

const MarketingApp = () => {
  const ref = useRef(null);
  const history = useHistory();

  useEffect(() => {
    const { onParentNavigate } = mount(ref.current, {
      initialPath: history.location.pathname,
      onNavigate: ({ pathname: nextPathname }) => {
        const { pathname } = history.location;
        if (pathname !== nextPathname) history.push(nextPathname);
      },
    });
    history.listen(onParentNavigate);
  }, [history]);

  return <div ref={ref} />;
};

export default MarketingApp;
