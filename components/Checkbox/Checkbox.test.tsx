import "@testing-library/jest-dom/extend-expect";

import { render } from "@testing-library/react";
import { Checkbox } from "./Checkbox";

describe("Checkbox", () => {
  const defaultProps = {
    checked: false,
    label: "Checkbox Label",
  };

  it("renders the label and checkbox", () => {
    const { getByLabelText, getByRole } = render(
      <Checkbox {...defaultProps} />
    );
    const checkbox = getByRole("checkbox");
    const label = getByLabelText("Checkbox Label");

    expect(checkbox).toBeInTheDocument();
    expect(label).toBeInTheDocument();
  });

  it("renders with a default checked state", () => {
    const { getByRole } = render(<Checkbox {...defaultProps} checked />);
    const checkbox = getByRole("checkbox");

    expect(checkbox).toBeChecked();
  });

  it("renders with a default disabled state", () => {
    const { getByRole } = render(<Checkbox {...defaultProps} disabled />);
    const checkbox = getByRole("checkbox");

    expect(checkbox).toBeDisabled();
  });

  it("does not render when label is not provided", () => {
    const { queryByRole } = render(<Checkbox {...defaultProps} label="" />);
    const checkbox = queryByRole("checkbox");

    expect(checkbox).not.toBeInTheDocument();
  });
});
