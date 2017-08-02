
/**
 * constructs main DOM Nodes
 * @constructor
 * @param {string} name - tag name
 */
class DomNode {

	constructor(name){
		this.element = document.createElement(name);
	}

	/**
	 * pins classes to node
	 * @param {string} classList - class List string
	 */
	addClassList(classList) {
		this.element.classList.value += (this.element.classList.length ? ` ${classList}` : `${classList}`);
	}

	/**
	 * pins attributes to node
	 * @param {object} attrsList - attributes List object
	 */
	setAttributes(attrsList) {

		for(let key in attrsList) {
			this.element.setAttribute(key, attrsList[key]);
		}

	}

	/**
	 * assigns parent to node and appends it
	 * @param {object} parent - parent node
	 */
	nestInto(parent) {
		parent.appendChild(this.element);
	}
}


export { DomNode };
