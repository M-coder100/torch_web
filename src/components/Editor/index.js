import React, { useEffect, useState, useRef, useMemo } from 'react';
import './Editor.css';
import '../../fonts/fontawesome-free-6.4.2-web/css/all.min.css';

function Editor({ dbID }) {

	let fontSizeRef;
	let allButtons;

	const writingAreaRef = useRef(null);
	const [fontNameOptions, setFontNameOptions] = useState([]);

	// Initial Settings 
	function initialize() {
		fontSizeRef = document.getElementById('fontSize');
		allButtons = Array.from(document.querySelector('.options').children).filter(element => element.tagName !== 'HR');
		writingAreaRef.current = document.getElementById("text-input");

		// List of fontlist
		let fontList = [
			'Poppins',
			'Arial',
			'Verdana',
			'Times New Roman',
			'Garamond',
			'Georgia',
			'Courier New',
			'Cursive',
		];

		// create options for font names
		const fontNameOptions = fontList.map(value => ({
			value,
			label: value,
		}));
		setFontNameOptions(fontNameOptions);

		// Default size
		fontSizeRef.value = 3;
	}

	function diableOptionsBasedOnTextareaType(event) {
		const elm = event.target;

		// check if the focus is only on the contentEditable textareas
		if (elm.tagName !== 'BUTTON' && elm.tagName !== 'A') {
			switch (elm.getAttribute('eenabled')) {
				case 'full': // full control over the features (eg: editor)
					allButtons.forEach(opt => enable(opt));
					break;

				case 'inlineOnly': // (eg: description)
					allButtons.forEach(opt => (opt.classList.contains('inlineDisabled') ? disable(opt) : enable(opt)));
					break;

				default:
					// if returns null then all options will be disabled (eg: heading)
					allButtons.forEach(opt => disable(opt));
					break;
			}
		}
	}
	function handleLinkBtnClick(event) {
		let userLink = prompt("Enter a URL");
		//if link has http then pass directly else add https
		if (/http/i.test(userLink)) {
			modifyText(event, userLink);
		} else {
			userLink = "http://" + userLink;
			modifyText(event, userLink);
		}
	}
	function disable(option) { option.disabled = true };
	function enable(option) { option.disabled = false };

	// main logic
	const modifyText = useMemo(() => (event, input = null) => {
		const commandName = event.target.id; // the element's id is a command itself
		const selection = window.getSelection();
		// Check if any text is selected and commandName = createLink
		if (commandName === "createLink" && selection.type === "Caret" && input) {
			// If no text is selected, use the input as both href and text content
			const newLink = document.createElement('a');
			newLink.href = input;
			newLink.spellcheck = false;
			newLink.textContent = input;

			// Insert the new link at the current selection
			const range = selection.getRangeAt(0);
			range.deleteContents();
			range.insertNode(newLink);
			return;
		} 
		
		if (commandName === 'indent') { // for indentation
			let childElements = writingAreaRef.current.children;
			if (childElements[childElements.length - 1].tagName === 'BLOCKQUOTE' && writingAreaRef.current) {
				writingAreaRef.current.innerHTML += '<div></div>';
			}
			return;
		}
		writingAreaRef.current.focus();
		document.execCommand('styleWithCSS', false, true);	
		document.execCommand(commandName, false, input || event?.target?.value); // execCommand executes command on selected text
	}, [])

	useEffect(() => {

		initialize();

		const handleMouseOver = (e) => {
			// initially the anchor link element will be unclickable as its parent {writingArea.contentEditable = true}
			// so when the mouse is hovering the anchor element then the {writingArea.contentEditable = false} so that
			// the anchor element will be clickable and if the mouse in NOT hovering on the A element then default {writingArea.contentEditable = true}
			// e => e.target.tagName === "A" ? writingAreaRef.current.contentEditable = false : writingAreaRef.current.contentEditable = true
			const isAnchor = e.target.tagName === 'A';
			writingAreaRef.current.contentEditable = !isAnchor;
		};

		document.body.addEventListener('focusin', diableOptionsBasedOnTextareaType);
		writingAreaRef.current.addEventListener("mouseover", handleMouseOver);

		return () => {
			document.body.removeEventListener('focusin', diableOptionsBasedOnTextareaType);
			writingAreaRef.current.removeEventListener("mouseover", handleMouseOver);
		};
	}, []);

	return (
		<div className="editor">
			<h1 className="sherif" contentEditable>
				New Product Launch
			</h1>
			<p contentEditable eenabled="inlineOnly">Introducing our latest innovation, the "Conduent CTM pro" – a revolutionary addition to the world of technology.</p>

			<div className="options">
				{/* <!-- Text Format --> */}
				<button id="bold" className="option-button format fa-solid fa-bold" onClick={modifyText}></button>
				<button id="italic" className="option-button format fa-solid fa-italic" onClick={modifyText}></button>
				<button id="underline" className="option-button format fa-solid fa-underline" onClick={modifyText}></button>
				<button id="strikethrough" className="option-button format fa-solid fa-strikethrough" onClick={modifyText}></button>
				<button id="superscript" className="option-button script fa-solid fa-superscript" onClick={modifyText}></button>
				<button id="subscript" className="option-button script fa-solid fa-subscript" onClick={modifyText}></button>
				<hr />
				{/* <!-- List --> */}
				<button id="insertOrderedList" className="option-button fa-solid fa-list-ol inlineDisabled" onClick={modifyText}></button>
				<button id="insertUnorderedList" className="option-button fa-solid fa-list inlineDisabled" onClick={modifyText}></button>
				<hr />
				{/* <!-- Undo/Redo --> */}
				<button id="undo" className="option-button fa-solid fa-rotate-left" onClick={modifyText}></button>
				<button id="redo" className="option-button fa-solid fa-rotate-right" onClick={modifyText}></button>
				<hr />
				{/* <!-- Link --> */}
				<button id="createLink" className="adv-option-button fa fa-link" onClick={handleLinkBtnClick}></button>
				<button id="unlink" className="option-button fa fa-unlink" onClick={modifyText}></button>
				<hr />

				{/* <!-- Alignment --> */}
				<button id="justifyLeft" className="option-button align fa-solid fa-align-left inlineDisabled" onClick={modifyText}></button>
				<button id="justifyCenter" className="option-button align fa-solid fa-align-center inlineDisabled" onClick={modifyText}></button>
				<button id="justifyRight" className="option-button align fa-solid fa-align-right inlineDisabled" onClick={modifyText}></button>
				<button id="justifyFull" className="option-button align fa-solid fa-align-justify inlineDisabled" onClick={modifyText}></button>
				<button id="indent" className="option-button spacing fa-solid fa-indent inlineDisabled" onClick={modifyText}></button>
				<button id="outdent" className="option-button spacing fa-solid fa-outdent inlineDisabled" onClick={modifyText}></button>
				<hr />
				{/* <!-- Headings --> */}
				<select id="formatBlock" className="adv-option-button inlineDisabled" onChange={modifyText}>
					<option value="">𝕋</option>
					<option value="H1">H1</option>
					<option value="H2">H2</option>
					<option value="H3">H3</option>
					<option value="H4">H4</option>
					<option value="H5">H5</option>
					<option value="H6">H6</option>
				</select>
				{/* <!-- Font --> */}
				<select id="fontName" className="adv-option-button" onChange={modifyText}>
					{fontNameOptions.map((option) => (
						<option key={option.value} value={option.value}>{option.label}</option>
					))}
				</select>
				<select id="fontSize" className="adv-option-button inlineDisabled" onChange={modifyText}>
					{[1, 2, 3, 4, 5, 6, 7].map(i => (
						<option key={i} value={i}>{i}</option>
					))}
				</select>
				<hr />
				{/* <!-- Color --> */}
				<div className="input-wrapper">
					<input type="color" id="foreColor" className="adv-option-button" onInput={modifyText} value="#ffffff"/>
					<label htmlFor="foreColor"><i className="fa-solid fa-font"></i></label>
				</div>
				<div className="input-wrapper">
					<input type="color" id="backColor" className="adv-option-button" onInput={modifyText} value="#eff57a"/>
					<label htmlFor="backColor"><i className="fa-solid fa-highlighter"></i></label>
				</div>
				<hr />
				<button id="removeFormat" className="option-button fa-solid fa-text-slash" onClick={modifyText}></button>
			</div>
			<hr className='horizontal' />
			<div id="text-input" contentEditable eenabled="full" autoFocus={true}></div>
		</div>
	);
};

export default Editor;