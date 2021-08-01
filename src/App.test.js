import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import App from "./App";

test("Expand button color changes on hover", async () => {
  render(<App />);
  const expandButton = await waitFor(() => screen.getAllByRole("img")[0]);
  console.log(expandButton);
  //expect(expandButton.firstElementChild.style.color).toBe("darkgray");
  //const first = container.querySelector(".btnExpand");
  //console.log(first);
});
