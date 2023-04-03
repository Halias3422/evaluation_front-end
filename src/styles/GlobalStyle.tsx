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
width: 100%;
	}

	.mainTheme {
	background-color: ${colorscheme.darkGrey};
	color: ${colorscheme.white};
}

.link {
text-decoration: none;
color: ${colorscheme.white};
width: 60%;
text-align: center;
font-size: 20px;
font-weight: 400;
p {
padding: 15px 35px;
border: 1px solid transparent;
margin: 0px;
}
}

.pageContainer {
  width: 100%;
	min-height: 100vh;
  display: none;
  position: absolute;
}

.pageContentWrapper {
  width: 90%;
  max-width: 1400px;
  margin: 0 auto;
  margin-top: 150px;
  margin-bottom: 150px;
  @media screen and (min-width: 1024px) {
    gap: 1vw;
    display: flex;
    width: 70%;
    padding-left: 20vw;
  }
  @media screen and (min-width: 1625px) {
    width: 80%;
    padding-left: 18vw;
  }
  @media screen and (min-width: 2101px) {
    width: 90%;
    padding-left: 10vw;
  }
@media screen and (min-width: 2401px) {
		padding-left: 0px;
}
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

.appearingHeightObject {
	opacity: 0;
	animation: 1.8s ease-in-out appearing-height-object forwards;
}

@keyframes appearing-height-object {
	from {
height: 0px;
opacity: 0;
} to {
height: 100%;
opacity: 1;
}
}

.selectedMenuLink {
	border: 1px solid ${colorscheme.white} !important;
	border-radius: 8px;
}

.selectedCategoryMenu {
	background-color: ${colorscheme.white};
	border-radius: 8px;
	color: ${colorscheme.darkGrey};
}

.slideOutUp {
	animation: 1s ease-in slide-in-from-top reverse forwards;
}

.slideInUp {
	animation: 1s ease-out slide-in-from-top forwards;
}

.slideInDown {
animation: 1s ease-out slide-in-from-down forwards;
}

.slideOutDown {
animation: 1s ease-in slide-in-from-down reverse forwards;
}

.slideInLeft {
animation: 1s ease-out slide-in-from-left forwards;
}

.slideOutLeft {
animation: 1s ease-in slide-in-from-left reverse forwards;
}

.slideInRight {
animation: 1s ease-out slide-in-from-right forwards;
}

.slideOutRight {
animation: 1s ease-in slide-in-from-right reverse forwards;
}


@keyframes slide-in-from-down {
	from {
	opacity: 0;
	top: 100vh;
}
	to {
	opacity: 1;
  top: 0px;
}

}

@keyframes slide-in-from-top {
	from {
		opacity: 0;
		bottom: 100vh;
}
	to {
		opacity: 1;
		bottom: 0px;
}

}

@keyframes slide-in-from-left {
	from {
	opacity: 0;
	right: 100vw;
}
	to {
	opacity: 1;
	right: 0px;
}

}

@keyframes slide-in-from-right {
	from {
opacity: 0;
left: 100vw;
}
	to {
opacity: 1;
left: 0px;
}

}

@media screen and (min-width: 769px) {
}

@media screen and (min-width: 1024px) {
	.link {
	font-size: 22px;
	width: 100%;
}

@media screen and (min-width: 1200px) {
	.link {
	font-size: 24px;
}
@media screen and (min-width: 1800px) {
	.link {
	font-size: 26px;
	min-width: 100px;
}
}
}
}



`;

export default GlobalStyle;
