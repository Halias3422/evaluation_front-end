import { createGlobalStyle } from "styled-components";
import colorscheme from "./colorscheme";

const GlobalStyle = createGlobalStyle`

	html,
	body,
	div#__next {
	margin: 0;
	background-color: ${colorscheme.darkGrey};
	}

	.mainTheme {
	background-color: ${colorscheme.darkGrey};
	color: ${colorscheme.white};
}

.link {
text-decoration: none;
color: ${colorscheme.white};
width: fit-content;
text-align: center;
font-size: 24px;
}



`;

export default GlobalStyle;
