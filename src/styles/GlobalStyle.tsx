import { createGlobalStyle } from "styled-components";
import colorscheme from "./colorscheme";

const GlobalStyle = createGlobalStyle`

	html,
	body,
	div#__next,
	main {
	margin: 0;
	background-color: ${colorscheme.darkGrey};
	height: 100%;
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
font-size: 20px;
}

.textHoverEffect, .objectHoverEffect {
position: relative;
top: 0px;
text-shadow: 0;
transition: box-shadow 0.4s;
transition: top 0.4s;

}

.textHoverEffect:hover {
top: -10px;
text-shadow: 10px 10px 15px black;
}

.objectHoverEffect:hover {
top: -10px;
box-shadow: 0px 10px 10px black;
}

.appearingObject {
	opacity: 0;
animation: 1s ease-in 0.5s appearingObject forwards;
@keyframes appearingObject {
	from {
	opacity: 0;
} to {
	opacity: 1;
}
}
}

@media screen and (min-width: 769px) {
}

@media screen and (min-width: 1024px) {
	.link {
	font-size: 22px;
}

@media screen and (min-width: 1200px) {
	.link {
	font-size: 24px;
}
}
}



`;

export default GlobalStyle;
