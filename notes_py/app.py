from flask import Flask, jsonify, request, redirect
from flask_cors import CORS, cross_origin
from note import Note
from note_service import note_service
import pprint

app = Flask(__name__)
CORS(app)

note_service = note_service()


@app.route("/findNote", methods=["GET"])
def find_note():
    noteId = int(request.args.get("id"))
    print(f"getting note {noteId}")
    note = note_service.find_note(noteId)
    return jsonify_note(note)


@app.route("/newNote", methods=["GET"])
def new_note():
    note = note_service.new_note()
    return jsonify_note(note)

@app.route("/deleteNote", methods=["POST"])
def delete_note():
    request_body = request.get_json()
    if request_body:
        noteId = request_body["id"]
    note_service.delete_note(noteId)

    return "202"


@app.route("/saveNote", methods=["POST"])
def save_note():
    request_body = request.get_json()
    if request_body:
        body = request_body["body"]
        title = request_body["title"]
        noteId = request_body["id"]
    else:
        body = request.form["body"]
        title = request.form["title"]
        noteId = request.form["id"]

    return jsonify_note(note_service.save_update_note(title, body, noteId))


@app.route("/getNotes", methods=["GET"])
def get_all_notes():
    return jsonify(results=note_service.get_all_notes())


def jsonify_note(note: Note):
    return jsonify(
        id=note.id,
        title=note.title,
        body=note.body,
        createdAt=note.createdAt,
        lastUpdated=note.lastUpdated
    )
