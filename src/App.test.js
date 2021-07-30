import { render, screen } from "@testing-library/react";
import App from "./App.js";

// test("Checks for 'Hi' on page", () => {
//   render(<App />);
//   const linkElement = screen.getByText("Email");
//   expect(linkElement).toBeInTheDocument();
// });

test("Average of [1, 3] is 2", () => {
  expect((1 + 3) / 2).toBe(2);
});

// test("data is loaded correctly", () => {
//   App.prototype.getStudentProfiles();
// });
