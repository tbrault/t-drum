import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import App from "./App";

describe("App", () => {
	it("affiche le titre T-Drum", () => {
		render(<App />);
		expect(screen.getByText("T-Drum")).toBeInTheDocument();
	});
});
