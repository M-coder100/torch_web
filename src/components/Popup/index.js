import React from 'react';
import "./Popup.css"
import Database from '../../db';
import {IconMapper} from '../../iconMapper.js';

const db = new Database("db");

function AddCollectionPopup ({close}) {
    const icons = Object.keys(IconMapper).map(iconKey => {
        const IconComponent = IconMapper[iconKey];
        return <div key={iconKey} onClick={handleClick} data-name={iconKey}>{<IconComponent/>}</div>
    });
    
    function handleClick (e) {
        const icons = [...e.currentTarget.parentElement.children];
        icons.forEach(icon => icon.classList.remove("active"));
        e.currentTarget.classList.add("active");
    }
    function saveCollectionData() {
        let collectionName = document.getElementById("collectionNamePlaceholder")?.value;
        let iconName = document.querySelector(".modal .content .iconList .active")?.getAttribute("data-name");

        if (collectionName && iconName) {
            console.log(collectionName, iconName);
            db.createNewCollection(collectionName, iconName);
            db.save();
            window.location.assign(`/collection/${db.data.length-1}`);
        }
    }

    return (
        <div className='modal'>
            <div className='content'>
                <h1>Create New Collection</h1>
                <input type='text' placeholder='Collection Name' id='collectionNamePlaceholder'/>
                <h4>Choose an icon</h4>
                <div className='iconList'>
                    {icons}
                </div>
            </div>
            <div className='footer'>
                <button onClick={() => close()}>
                    Cancel
                </button>
                <button onClick={() => saveCollectionData()} className='preferable'>
                    Create
                </button>
            </div>
        </div>
    )
}

export {AddCollectionPopup};