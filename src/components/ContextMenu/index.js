import React, { useEffect, useRef, useState } from "react";
import "./ContextMenu.css";
import { IoAddCircle, IoArrowRedoCircle, IoArrowUndoCircle, IoCheckmarkCircle, IoColorPalette, IoSave, IoStar, IoTrash } from 'react-icons/io5';
import { useParams } from "react-router-dom";
import Database from "../../db";
import { AddCollectionPopup } from "../Popup";
import Popup from "reactjs-popup";
let db = new Database("db");

const ContextMenu = () => {
    const [visible, setVisible] = useState(false);
    const rootRef = useRef(null);
    const deleteRef = useRef(null);
    const colorRef = useRef(null);
    const checkRef = useRef(null);
    const starRef = useRef(null);
    const { collectionIndex } = useParams();

    // returns true if the element or one of its parents has the class classname
    function doesParentHasClass(element, classname) {
        if (element.tagName == "BODY") return false;
        if (element.classList.contains(classname)) return element;
        return element.parentNode && doesParentHasClass(element.parentNode, classname);
    }
    
    useEffect(() => {
        db = new Database("db");
        const handleContextMenu = (event) => {
            event.preventDefault();
            let out;
            if (doesParentHasClass(event.target, "noteCollectionNote")) {
                deleteRef.current.classList.remove("disabled");
                colorRef.current.classList.remove("disabled");
                checkRef.current.classList.remove("disabled");
                starRef.current.classList.remove("disabled");

                starRef.current.onclick = () => {
                    db.starNote(collectionIndex, db.data[collectionIndex].lastNoteIndex);
                    db.save();
                    window.location.assign(`/collection/${collectionIndex}`);
                }
                checkRef.current.onclick = () => {
                    db.checkNote(collectionIndex, db.data[collectionIndex].lastNoteIndex);
                    db.save();
                    window.location.assign(`/collection/${collectionIndex}`);
                }
                deleteRef.current.onclick = () => {
                    db.deleteNote(collectionIndex, db.data[collectionIndex].lastNoteIndex);
                    db.save();
                    window.location.assign(`/collection/${collectionIndex}`);
                }
                colorRef.current.onclick = () => {
                    document.getElementById("colorPicker").addEventListener("change", (e) => {
                        db.data[collectionIndex].notes[db.data[collectionIndex].lastNoteIndex].color = e.target.value;
                        db.save();
                        window.location.assign(`/collection/${collectionIndex}`);
                    });
                }
            } else if (out = doesParentHasClass(event.target, "collectionNavLink")) {
                deleteRef.current.classList.remove("disabled");
                colorRef.current.classList.add("disabled");
                checkRef.current.classList.add("disabled");
                starRef.current.classList.add("disabled");
                
                deleteRef.current.onclick = () => {
                    const colIndex = [...out.parentElement.children].indexOf(out);
                    db.deleteCollection(colIndex);
                    db.save();
                    window.location.assign(collectionIndex == colIndex ? `/` : `/collection/${collectionIndex}`);
                }
            } else {
                colorRef.current.classList.add("disabled");
                checkRef.current.classList.add("disabled");
                starRef.current.classList.add("disabled");
                deleteRef.current.classList.add("disabled");
            }


            setVisible(true);

            const clickX = event.clientX;
            const clickY = event.clientY;
            const screenW = window.innerWidth;
            const screenH = window.innerHeight;
            const rootW = rootRef.current.offsetWidth;
            const rootH = rootRef.current.offsetHeight;

            const right = (screenW - clickX) > rootW;
            const left = !right;
            const top = (screenH - clickY) > rootH;
            const bottom = !top;

            if (right) {
                rootRef.current.style.left = `${clickX + 5}px`;
            }

            if (left) {
                rootRef.current.style.left = `${clickX - rootW - 5}px`;
            }

            if (top) {
                rootRef.current.style.top = `${clickY + 5}px`;
            }

            if (bottom) {
                rootRef.current.style.top = `${clickY - rootH - 5}px`;
            }
        };

        const handleClick = (event) => {
            const wasOutside = !(event.target.contains === rootRef.current);

            if (wasOutside && visible) setVisible(false);
        };

        const handleScroll = () => {
            if (visible) setVisible(false);
        };

        document.addEventListener('contextmenu', handleContextMenu);
        document.addEventListener('click', handleClick);
        document.addEventListener('scroll', handleScroll);

        return () => {
            document.removeEventListener('contextmenu', handleContextMenu);
            document.removeEventListener('click', handleClick);
            document.removeEventListener('scroll', handleScroll);
        };
    }, [visible, collectionIndex]);

    return (
        <div ref={rootRef} className={`contextMenu ${visible ? "" : "hidden"}`}>
            <a className="contextMenu--option disabled"><IoArrowUndoCircle />Undo</a>
            <a className="contextMenu--option disabled"><IoArrowRedoCircle />Redo</a>
            <a ref={starRef} className="contextMenu--option disabled"><IoStar />Star</a>
            <a ref={checkRef} className="contextMenu--option disabled"><IoCheckmarkCircle />Mark Done</a>
            <label ref={colorRef} className="contextMenu--option" htmlFor="colorPicker"><IoColorPalette />Change Color<input id="colorPicker" type="color"/></label>
            <a ref={deleteRef} className="contextMenu--option"><IoTrash />Delete</a>
            <Popup trigger={open => {
                return <a className={`contextMenu--option ${open ? "hidden" : ""}`}><IoAddCircle />New Collection</a>
            }} modal nested>
                {close => (<AddCollectionPopup close={close} />)}
            </Popup>
            <a className="contextMenu--option" onClick={() => {
                db.createNewNote(collectionIndex);
                db.save(); 
                window.location.assign(`/collection/${collectionIndex}/${db.getCollectionData(collectionIndex).notes.length-1}`);
            }}><IoAddCircle />New Note</a>
            <a className="contextMenu--option" onClick={() => db.save()}><IoSave />Save</a>
            <a className="contextMenu--separator" />
            <a className="contextMenu--option" href="/">Go To My Dashboard</a>
            <a className="contextMenu--option" href="/account">Account</a>
            <a className="contextMenu--option" href="/settings">Settings</a>
        </div>
    );
};

export default ContextMenu;