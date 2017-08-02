const googleApiKey = "AIzaSyCTWC75i70moJLzyNh3tt4jzCljZcRkU8Y";
const searchTerm = "";

const displayedItemsNum = 3;
const displayedItems = [];
const displayedItemsStartIndex = 0;

//hysteresis should be not less than cachedPageSize to avoid infinite loop
//cachedItemsNum should be at least displayedItemsNum*3 to ensure caching of
//curr, prev and next display pages
const cachedPageSize = 5;
const cachedPages = [];
const cachedItemsNum = displayedItemsNum * 3;
const cachedHysteresis = cachedPageSize * 1;

//to avoid multiple requests of the same page
const isGettingPage = false;

const state = {
	googleApiKey,
	searchTerm,
	displayedItemsNum,
	displayedItems,
	displayedItemsStartIndex,
	cachedPageSize,
	cachedPages,
	cachedItemsNum,
	cachedHysteresis,
	isGettingPage
};

export { state };

//useful regex for sublime search of variables names 
//after "const " and before " =" : /(?<=const ).*?(?=\s)/
//not available in js though
