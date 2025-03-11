import { styled } from "styled-components";

const HorizontalMargin: React.FC<{ margin: string | number }> = ({ margin }) => {
  const width = typeof margin === "string" ? margin : `${margin}px`;
  return <span style={{ display: "flex", width }} />;
};

const VerticalMargin: React.FC<{ margin: string | number }> = ({ margin }) => {
  const height = typeof margin === "string" ? margin : `${margin}px`;
  return <span style={{ display: "flex", height }} />;
};

function Marginer(props: Readonly<{ direction: "horizontal" | "vertical"; margin: string | number }>) {
  const { direction } = props;

  if (direction === "horizontal") return <HorizontalMargin {...props} />;
  else {
    return <VerticalMargin {...props} />;
  }
}

Marginer.defaultProps = {
  direction: "horizontal",
};

export { Marginer };