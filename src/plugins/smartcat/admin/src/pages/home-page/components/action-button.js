import React from "react";

import { Button } from "@strapi/design-system";

const ActionButton = ({
  action,
  children,
  submit = false,
  style = undefined,
  variant = "primary",
}) => {
  return (
    <Button
      style={style}
      onClick={action}
      variant={variant}
      type={submit ? "submit" : "button"}
    >
      {children}
    </Button>
  );
};

export default ActionButton;
