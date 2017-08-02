//specifically operates on Mouse events, enabling user to "swipe" video

import { paginationValues } from "./index.js";

import { X_LIMIT, Y_LIMIT } from "./constants.js";

let touchstartX = 0;
let touchstartY = 0;
let touchendX = 0;
let touchendY = 0;

/**
 * tracks mouse movement and is being emitted on corresponding events
 * @function
 */
const handleGesture = function () {
    if (touchendY === touchstartY && touchendX === touchstartX) {
		return;
	}

	Array.from(document.querySelector(".buttonsWrapper").children).forEach((element) => {
		const inputInA = element.firstElementChild;
		inputInA.classList.remove("tooltipNum");
	});

	if ((Math.abs(touchendX - touchstartX) > X_LIMIT) && (Math.abs(touchendY - touchstartY) < Y_LIMIT)) {
		const clickEvent = new Event("click");
		if (touchstartX < touchendX) {
			document.querySelector(".btnPrevPage").dispatchEvent(clickEvent);
		} else {
			document.querySelector(".btnNextPage").dispatchEvent(clickEvent);
		}
	}

	paginationValues();
};

document.documentElement.addEventListener("mousedown", (event) => {
    touchstartX = event.screenX;
    touchstartY = event.screenY;
}, false);

document.documentElement.addEventListener("mouseup", (event) => {
    touchendX = event.screenX;
    touchendY = event.screenY;
    handleGesture();
}, false);

export { handleGesture };
