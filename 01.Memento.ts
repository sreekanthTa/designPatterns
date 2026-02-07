class TextEditor {
      content: string = '';

      type(words: string) {
            this.content = this.content + words;
      }

      getValue() {
            return this.content;
      }
    
}

const editor = new TextEditor();

editor.type("Hello ");
console.log(editor.getValue()); // Hello

editor.type("World!");
console.log(editor.getValue());

//Here We can store but not redo redo previous value

// SOL: memento pattern

class MeMento{
    private content: string;
    
    constructor(content: string) {
        this.content = content;
    }
}

class MeMentoTextEditor {
    content: string = '';

    type(words: string) {
        this.content = this.content + words;
    }

    getValue() {
        return this.content;
    }

    save(): MeMento{
        return new MeMento(this.content);
    }

    restore(memento: MeMento) {
        this.content = memento['content']
    }   

}

const history_: MeMento[] = [];

const editor2 = new MeMentoTextEditor();

editor2.type("Hello ");
history_.push(editor2.save());
console.log(editor2.getValue()); // Hello

editor2.type("World!");
history_.push(editor2.save());
console.log(editor2.getValue()); // Hello World!

editor2.restore(history_.pop()!);
console.log(editor2.getValue()); // Hello