import { createGlobalStyle } from "styled-components";
import colorscheme from "./colorscheme";

const GlobalStyle = createGlobalStyle`

	html,
	body,
	div#__next {
	margin: 0;
	background-color: ${colorscheme.darkGrey}
	}
`;

export default GlobalStyle;
