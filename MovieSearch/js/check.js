function check(position, lineCards) {
	if (lineCards.childElementCount === 3 || lineCards.childElementCount === 2 || lineCards.childElementCount === 1) {
		lineCards.style.left = '50%';
		lineCards.style.transform = `translate(-50%, 0%)`;
	} else {
		lineCards.style.left = position + 'px';
		lineCards.style.transform = `translate(0)`;
	}
}

export default check;
