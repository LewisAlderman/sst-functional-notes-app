/// <reference types="vite/client" />

interface Note {
	content: string;
	attachment: string;
	createdAt: string;
	noteId: string;
	userId: string;
}
type NewNote = Pick<Note, "content" | "attachment">