import React from "react";

interface Props
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > {}

const Wrapper = ({
  children,
  className,
  ...rest
}: React.PropsWithChildren<Props>) => {
  return (
    <div className={`max-w-screen-xl px-6 mx-auto ${className}`} {...rest}>
      {children}
    </div>
  );
};

export default Wrapper;
