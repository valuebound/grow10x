import { cleanup, render } from "@testing-library/react";
import FormBuilder from "../FormBuilder";

afterEach(cleanup);

it("renders FormBuilderCheckbox component", () => {
  let formItemsCheckbox = [
    {
      initialValue: "test",
      hidden: false,
      label: "Checkbox",
      name: "Name",
      rules: { some: jest.fn() },
      type: { name: "checkbox", props: {} },
    },
  ];
  render(<FormBuilder formItems={formItemsCheckbox} onFinishFailed={jest.fn()} />);
});

it("renders FormBuilderInput component", () => {
  let formItemsInput = [
    {
      type: { name: "input", props: {} },
    },
  ];
  render(<FormBuilder formItems={formItemsInput} onFinishFailed={jest.fn()} />);
});

it("renders FormBuilderNumber component", () => {
  let formItemsNumber = [
    {
      type: { name: "number", props: {} },
    },
  ];
  render(<FormBuilder formItems={formItemsNumber} onFinishFailed={jest.fn()} />);
});

it("renders FormBuilderPassword component", () => {
  let formItemsPassword = [
    {
      type: { name: "password", props: {} },
    },
  ];
  render(<FormBuilder formItems={formItemsPassword} onFinishFailed={jest.fn()} />);
});

it("renders FormBuilderSwitch component", () => {
  let formItemsSwitch = [
    {
      type: { name: "switch", props: {} },
    },
  ];
  render(<FormBuilder formItems={formItemsSwitch} onFinishFailed={jest.fn()} />);
});

it("renders FormBuilderSelect component", () => {
  let formItemsSelect = [
    {
      type: { name: "select", props: { options: [{ name: "test", value: "test" }] } },
    },
  ];
  render(<FormBuilder formItems={formItemsSelect} onFinishFailed={jest.fn()} />);
});

it("renders FormBuilderTextArea component", () => {
  let formItemsTextArea = [
    {
      type: { name: "textarea", props: {} },
    },
  ];
  render(<FormBuilder formItems={formItemsTextArea} onFinishFailed={jest.fn()} />);
});
it("renders FormBuilderRange component", () => {
  let formItemsRange = [
    {
      type: { name: "range", props: {} },
    },
  ];
  render(<FormBuilder formItems={formItemsRange} onFinishFailed={jest.fn()} />);
});
it("renders FormBuilderDefault component", () => {
  let formItemsDefault = [
    {
      type: { name: "default", props: {} },
    },
  ];
  render(<FormBuilder formItems={formItemsDefault} onFinishFailed={jest.fn()} />);
});
