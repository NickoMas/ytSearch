import { handleGesture } from "./swipe.js";

import { state } from "./state.js";

import { listenLoad } from "./eventListeners.js";

import { DomNode } from "./domNode.js";

import { CUR_OFFSET,
		NEXT_OFFSET,
		SCREEN_SMALL,
		SCREEN_MEDIUM,
		SCREEN_LARGE,
		LOWER_CACHELIMIT
		} from "./constants.js";

/**
 * builds core Node
 * @function
 */
const renderInitBlocks = function () {

    //let displayPage = new DomNode("div");
    //displayPage.addClassList("currDisplayPage");
    //displayPage.nestInto(document.body);

    const listCache = new DomNode("div");
    listCache.addClassList("list-cache");
    listCache.nestInto(document.body);

};

/**
 * builds Nodes for buttons
 * @function
 */
const renderPagination = function () {

    const buttonsWrapper = new DomNode("div");
    buttonsWrapper.addClassList("buttonsWrapper inactive");
    buttonsWrapper.nestInto(document.body);

    const linkForButton1 = new DomNode("a");
    const linkForButton2 = new DomNode("a");
    const linkForButton3 = new DomNode("a");

    [linkForButton1, linkForButton2, linkForButton3].forEach((element) => {
    	element.setAttributes({ "href": "#" });
    });

    const prevPage = new DomNode("input");
    prevPage.setAttributes({ "type": "button", "value": " ", "class": "btn btnPrevPage inactive" });

    const curPage = new DomNode("input");
    curPage.setAttributes({ "type": "button", "value": " ", "class": "btn btnCurPage" });

    const nextPage = new DomNode("input");
    nextPage.setAttributes({ "type": "button", "value": " ", "class": "btn btnNextPage" });

	//lodash function _.zipWith usage 
    //so that units from equal length arrays are correspondingly cooperated by pairs
    const inputsInLinks =
		_.zipWith([linkForButton1, linkForButton2, linkForButton3], [prevPage, curPage, nextPage],
			(linkEl, inputEl) => {
			linkEl.element.appendChild(inputEl.element);
			return linkEl;
        });

    inputsInLinks.forEach((element) => {
        buttonsWrapper.element.appendChild(element.element);
    });

};

/**
 * renders correct page numbers
 * @function
 */
const paginationValues = function () {

    const currentIndex = state.displayedItemsStartIndex / state.displayedItemsNum;


    document.querySelector(".btnPrevPage").value = (state.displayedItemsStartIndex / state.displayedItemsNum);
	document.querySelector(".btnCurPage").value = (state.displayedItemsStartIndex / state.displayedItemsNum + CUR_OFFSET);
    document.querySelector(".btnNextPage").value = (state.displayedItemsStartIndex / state.displayedItemsNum + NEXT_OFFSET);


    if (!currentIndex) {
        document.querySelector(".btnPrevPage").classList.add("inactive");
    } else {
        document.querySelector(".btnPrevPage").classList.remove("inactive");
    }
};

/**
 * builds Nodes containing video information
 * @function
 * @param {object} item - object containing general information for video
 */
const displayItem = function displayItem(item) {

	const mainBlock = document.querySelector(".list-cache");

    const videoBlock = new DomNode("div");
    videoBlock.addClassList("video");
    videoBlock.nestInto(mainBlock);

	if (state.displayedItems.includes(item)) {
		videoBlock.addClassList("displayed");
	}

    const videoTitle = new DomNode("div");
    const linkToVideo = new DomNode("a");

    linkToVideo.setAttributes({ "href": `https://youtube.com/watch?v=${item.id.videoId}` });
    linkToVideo.element.innerHTML = `${item.snippet.title}`;
    videoTitle.nestInto(videoBlock.element);
    linkToVideo.nestInto(videoTitle.element);

    const videoPreview = new DomNode("img");
    videoPreview.nestInto(videoBlock.element);
    videoPreview.setAttributes({ "src": item.snippet.thumbnails.medium.url, "class": "preview" });

	if (item.statistics) {

        // building video statistics block
        const videoInfo = new DomNode("div");
        videoInfo.nestInto(videoBlock.element);

        //how many views
        const views = new DomNode("div");
        const eyeIcon = new DomNode("i");
        const viewCount = new DomNode("p");

        eyeIcon.nestInto(views.element);
        viewCount.nestInto(views.element);

        views.addClassList("views videoInfo");
        eyeIcon.setAttributes({ "class": "fa fa-eye", "aria-hidden": "true" });
        viewCount.element.innerHTML += `${item.statistics.viewCount}`;

        //who is the author
        const authorV = new DomNode("div");
        const smileIcon = new DomNode("i");
        const channelTitle = new DomNode("p");

        smileIcon.nestInto(authorV.element);
        channelTitle.nestInto(authorV.element);

        authorV.addClassList("author videoInfo");
        smileIcon.setAttributes({ "class": "fa fa-smile-o", "aria-hidden": "true" });
        channelTitle.element.innerHTML = `${item.snippet.channelTitle}`;

        //when the video was loaded
        const dateV = new DomNode("div");
        const calendarIcon = new DomNode("i");
        const publishDate = new DomNode("p");

        calendarIcon.nestInto(dateV.element);
        publishDate.nestInto(dateV.element);

        dateV.addClassList("date videoInfo");
        calendarIcon.setAttributes({ "class": "fa fa-calendar", "aria-hidden": "true" });
        publishDate.element.innerHTML = `${item.snippet.publishedAt.slice(0, 10)}`;

        //video description
        const infoV = new DomNode("div");
        const descriptionV = new DomNode("p");

        descriptionV.nestInto(infoV.element);

        infoV.addClassList("description videoInfo");
        descriptionV.element.innerHTML = `${item.snippet.description}`;

        [views, authorV, dateV, infoV].forEach((element) => {
            element.nestInto(videoBlock.element);
        });

	}

};

/**
 * operates with items being and about to be displayed
 * @function
 */
const displayItems = function () {

	state.displayedItems = [];

	state.cachedPages.forEach((page) => {

		page.items.forEach((item) => {
			if (item.searchResultIndex < state.displayedItemsStartIndex) {
                return;
            }
			if (item.searchResultIndex >= state.displayedItemsStartIndex + state.displayedItemsNum) {
                return;
            }
			state.displayedItems.push(item);
		});
	});

	const mainBlock = document.querySelector(".list-cache");

	mainBlock.innerHTML = "";

	state.cachedPages.forEach((page) => {
		page.items.forEach(item => displayItem(item));
	});
};

/**
* helping function for displayOnWidth to set parameters of video display
* @function
* @param {number} num1 - number of videos to be displayed
* @param {number} num2 - number of videos to be precached
*/	
const setPagingParams = function (num1, num2) {
	state.displayedItemsNum = num1;
	state.cachedPageSize = num2;
	cachePages(displayItems);
};

/**
* depending on screen width defines video displaying behaviour
* @function
*/
const displayOnWidth = function () {

	switch (true) {
		case (window.innerWidth >= SCREEN_LARGE) : setPagingParams(5, 11);
		break;

		case (window.innerWidth < SCREEN_LARGE && window.innerWidth >= SCREEN_MEDIUM) : setPagingParams(3, 5);
		break;

		case (window.innerWidth <= SCREEN_SMALL) : setPagingParams(1, 2);
		break;

		default: setPagingParams(5, 11);
	}
};

/**
* handles "search Button press" event
* @function
*/
const handleSearch = function () {
	state.searchTerm = document.querySelector(".searchBar").value;
	state.cachedPages = [];
	displayOnWidth();
    document.querySelector(".buttonsWrapper").classList.remove("inactive");
};

/**
* handles "next video Button press" event
* @function
*/
const handleNext = function () {
	state.displayedItemsStartIndex += state.displayedItemsNum;
	cachePages(displayItems);
};

/**
* handles "previous Button press" event
* @function
*/
const handlePrev = function () {
	state.displayedItemsStartIndex -= state.displayedItemsNum;
	cachePages(displayItems);
};


/**
 * gets one page of search results and calls cb(error, page)
 * @function
 * @param {function} cb - callback to be called after loading response
 * @param {string} q - query string
 * @param {string} pageToken - string with number of page
 */
const ytSearch = function (cb, q, pageToken) {

	const url = `https://www.googleapis.com/youtube/v3/search
	?key=${state.googleApiKey}${pageToken ? "&pageToken=" + pageToken : ""}
	&type=video
	&part=snippet
	&maxResults=${state.cachedPageSize}
	&q=${encodeURIComponent(q)}`;

	const xhr = new XMLHttpRequest();
	xhr.open("get", url, true);
	xhr.onload = function () {
		const page = JSON.parse(this.response);
		if (cb) {
			cb(null, page);
		}
	};
	xhr.onerror = function () {
		if (cb) {
			cb(new Error(":("));
		}
	};
	xhr.send();
};

/**
 * adds statistics object to each item in array
 * @function
 * @param {function} cb - callback to be called after loading response
 * @param {object} items - object with video data
 */
const ytStat = function (cb, items) {
	const ids = [];
	for (let item of items) {
		ids.push(item.id.videoId);
	}

	const url = `https://www.googleapis.com/youtube/v3/videos
	?key=${state.googleApiKey}
	&id=${ids.join()}
	&part=statistics`; //don"t ask for snippet since we already have it

	const xhr = new XMLHttpRequest();
	xhr.open("get", url, true);
	xhr.onload = function () {
		const res = JSON.parse(this.response);
		res.items.forEach((element) => {
			const found = items.find(find => find.id.videoId === element.id);

			if (!found) {
				return;
			}
			found.statistics = element.statistics;
		});
		if (cb) {
			cb(null, items);
		}
	};

	xhr.onerror = function () {
		if (cb) {
			cb(new Error(":("));
		}
	};
	xhr.send();
};

/**
 * operates with pages to be cached and defines state of cache behaviour
 * @function
 * @param {function} cb - callback to be called after loading response
 */
const cachePages = function cachePages(cb) {

	/**
	* loads and caches first page
	* @function
	*/
	const getFirstPage = function getFirstPage() {
		if (state.isGettingPage) {
			return;
		}

		state.displayedItemsStartIndex = 0;
		state.isGettingPage = true;

		ytSearch((error, page) => {
			state.isGettingPage = false;
			if (error) {
				console.log(error); //just for logging possible faults
				return;
			}

			ytStat(cb, page.items);

			for (let i = 0; i < page.items.length; i++) {
				page.items[i].searchResultIndex = i;
			}

			state.cachedPages.push(page);
			cachePages(cb); //call cachePages again to see if more pages needed
		}, state.searchTerm);
	};

	/**
	* loads and caches next page
	* @function
	*/
	const getNextPage = function getNextPage() {

		if (!state.lastPage.nextPageToken || state.isGettingPage) {
			return;
		}

		state.isGettingPage = true;

		ytSearch((error, page) => {
			state.isGettingPage = false;
			if (error) {
				console.log(error);
				return;
			}

			ytStat(cb, page.items);

			for (let i = 0; i < page.items.length; i++) {
				page.items[i].searchResultIndex = i + state.cachedLast + LOWER_CACHELIMIT;
			}

			state.cachedPages.push(page);
			cachePages(cb);
		}, state.searchTerm, state.lastPage.nextPageToken);

		while (state.cachedFirst < (state.neededFirst - state.cachedHysteresis)) {
			if (state.cachedPages.length <= LOWER_CACHELIMIT) {
				break;
			} //keep last page

			state.cachedPages.shift();
			state.firstPage = state.cachedPages[0];
			state.cachedFirst = state.cachedPages[0].items[0].searchResultIndex;
		}
	};

	/**
	* loads and caches previous page
	* @function
	*/
	const getPrevPage = function getPrevPage() {

		if (!state.cachedPages[0].prevPageToken || state.isGettingPage) {
			return;
		}

		state.isGettingPage = true;

		ytSearch((error, page) => {
			state.isGettingPage = false;

			if (error) {
				console.log(error);
				return;
			}

			ytStat(cb, page.items);

			for (let i = 0; i < page.items.length; i++) {
				page.items[i].searchResultIndex = i + state.cachedFirst - page.items.length;
			}

			state.cachedPages.unshift(page);
			cachePages(cb);
		}, state.searchTerm, state.firstPage.prevPageToken);

		while (state.cachedLast > (state.neededLast + state.cachedHysteresis)) {
			if (state.cachedPages.length <= LOWER_CACHELIMIT) {
				break;
			}

			state.cachedPages.pop();
			state.lastPage = state.cachedPages[state.cachedPages.length - LOWER_CACHELIMIT];
			state.cachedLast = state.lastPage.items[state.lastPage.items.length - LOWER_CACHELIMIT].searchResultIndex;
		}
	};

	if (state.displayedItemsStartIndex < 0) {
		state.displayedItemsStartIndex = 0;
	}

	if (cb) {
		cb();
	}

	if (state.cachedPages.length === 0) {
		getFirstPage();
		return;
	}

	//more state variables
	state.firstPage = state.cachedPages[0];
	state.lastPage = state.cachedPages[state.cachedPages.length - LOWER_CACHELIMIT];
	state.cachedFirst = state.firstPage.items[0].searchResultIndex;
	state.cachedLast = state.lastPage.items[state.lastPage.items.length - LOWER_CACHELIMIT].searchResultIndex;
	state.neededBefore = Math.max(0, 
		Math.floor((state.cachedItemsNum - state.displayedItemsNum) / 2));
	state.neededAfter = Math.max(0, 
		Math.ceil((state.cachedItemsNum - state.displayedItemsNum) / 2));
	state.neededFirst = Math.max(0, state.displayedItemsStartIndex - state.neededBefore);
	state.neededLast = state.displayedItemsStartIndex + state.displayedItemsNum - LOWER_CACHELIMIT + state.neededAfter;

	if (state.neededFirst < state.cachedFirst) {
		return getPrevPage(); 
	}

	if (state.neededLast > state.cachedLast) {
		return getNextPage();
	}
};

export { renderInitBlocks,
		renderPagination,
		paginationValues,
		displayOnWidth,
		handleSearch,
		handleNext,
		handlePrev
	};
