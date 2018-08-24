from note import Note
import datetime


class note_service:

    saved_notes = []

    def new_note(self):
        note = Note("Title", "")
        note.lastUpdated = datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        note.id = len(self.saved_notes)
        print(f"generating note {note.id}")
        return note

    def save_note(self, title: str, body: str):
        note = Note(title, body)
        note.lastUpdated = datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        note.id = len(self.saved_notes)
        self.saved_notes.append(note)
        print(f"saving note {note.id}")
        return note

    def delete_note(self, noteId: int):
        print(f"noteid: {noteId}")
        print(f"array length: {len(self.saved_notes)}")
        self.saved_notes.pop(noteId)
        for index in range(len(self.saved_notes)):
            self.saved_notes[index].id = index
            
        return 202

    def save_update_note(self, title: str, body: str, noteId: int):
        if not self.saved_notes or noteId >= len(self.saved_notes):
            return self.save_note(title, body)

        note = self.saved_notes[noteId]
        note.title = title
        note.body = body
        note.lastUpdated = datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        self.saved_notes[note.id] = note

        return note

    def find_note(self, noteId: int):
        return self.saved_notes[noteId]

    def get_all_notes(self):
        json_notes = []
        for note in self.saved_notes:
            json_notes.append(
                {
                    "id": note.id,
                    "title": note.title,
                    "body": note.body,
                    "createdAt": note.createdAt,
                    "lastUpdated": note.lastUpdated
                }
            )
        return json_notes
