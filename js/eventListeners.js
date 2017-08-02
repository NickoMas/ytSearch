import { renderInitBlocks, renderPagination, paginationValues, displayOnWidth, handleSearch, handleNext, handlePrev } from "./index.js";

const listenLoad = (function () {

    //general listener, which loads the core elements
	addEventListener("load", () => {

        renderInitBlocks();

        renderPagination();

        let pressedButton = null;

        document.querySelector(".buttonsWrapper").addEventListener("mousedown", (event) => {

            if (event.target.type === "button") {

                event.target.classList.add("tooltipNum");

                if (pressedButton && pressedButton !== event.target) {
                    event.target.classList.add("tooltipNum");
                    pressedButton.classList.remove("tooltipNum");
                }

                pressedButton = event.target;

                paginationValues();
            }

        }, true);

        document.querySelector(".btnSearch").addEventListener("click", handleSearch);

        document.querySelector(".btnNextPage").addEventListener("click", handleNext);

        document.querySelector(".btnPrevPage").addEventListener("click", handlePrev);

	});

    //listens resizes of screen
	addEventListener("resize", () => {
        displayOnWidth();
    });

}());

export { listenLoad };
