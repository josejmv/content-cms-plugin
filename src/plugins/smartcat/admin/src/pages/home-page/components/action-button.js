import React from "react";

import { Button } from "@strapi/design-system";

const ActionButton = ({
  action,
  children,
  submit = false,
  variant = "primary",
}) => {
  return (
    <Button
      onClick={action}
      variant={variant}
      type={submit ? "submit" : "button"}
    >
      {children}
    </Button>
  );
};

export default ActionButton;
