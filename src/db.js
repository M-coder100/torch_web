class Database {
    constructor (dbName) {
        this.dbName = dbName;
        if (!localStorage.getItem(this.dbName)) {
            localStorage.setItem(this.dbName, JSON.stringify([]));
        }
        this.data = JSON.parse(localStorage.getItem(this.dbName));
    }

    getCollectionData (index) {
        return this?.data[index];
    }
    createNewCollection(collectionName, iconName) {
        let newCollection = {
            collectionName: collectionName,
            collectionIndex: this.data.length,
            lastNoteIndex: 0,
            iconName: iconName,
            notes: []
        }
        this.data.push(newCollection);
    }
    createNewNote(collectionIndex) {
        let index = this.data[collectionIndex].notes.length;
        let note = {
            noteIndex: index,
            heading: "",
            description: "",
            noteData: "",
            color: '#'+(Math.random() * 0xFFFFFF << 0).toString(16).padStart(6, '0'),
            lastEdited: this.getDate(),
            isStarred: false,
            isChecked: false,
        }
        this.data[collectionIndex].lastNoteIndex = index;
        this.data[collectionIndex].notes.push(note);
    }
    starNote (collectionIndex, noteIndex) {
        this.data[collectionIndex].notes[noteIndex].isStarred = !this.data[collectionIndex].notes[noteIndex].isStarred;
    }
    checkNote (collectionIndex, noteIndex) {
        this.data[collectionIndex].notes[noteIndex].isChecked = !this.data[collectionIndex].notes[noteIndex].isChecked;
    }
    deleteNote (collectionIndex, noteIndex) {
        const notes = this.data[collectionIndex].notes;
        notes.splice(noteIndex, 1);
        notes.forEach(note => note.noteIndex = notes.indexOf(note));
        this.data[collectionIndex].notes = notes;
    }
    deleteCollection (collectionIndex) {
        this.data.splice(collectionIndex, 1);
        this.data.forEach(collection => collection.collectionIndex = this.data.indexOf(collection));
    }
    save() {
        localStorage.setItem(this.dbName, JSON.stringify(this.data));
    }
    getDate() {
        const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

        const currentDate = new Date();
        const dayOfWeek = days[currentDate.getDay()];
        const month = months[currentDate.getMonth()];
        const dayOfMonth = currentDate.getDate();
        const year = currentDate.getFullYear();

        const formattedDate = `${dayOfWeek.slice(0, 3)}, ${month} ${dayOfMonth}, ${year}`;

        return formattedDate;
    }
}

export default Database;