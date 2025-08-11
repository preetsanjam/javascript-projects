## DOM tree for notes app

html
└── head
    ├── meta
    ├── meta
    ├── title
    └── link (style.css)
└── body
    └── div.container
        ├── h1
        │   ├── img (notes.png)
        │   └── text: "Notes"
        │
        ├── button.btn
        │   ├── img (edit.png)
        │   └── text: "Create Notes"
        │
        └── div.notes-container
            └── p.input-box (contenteditable="true") ← parentElement
                ├── text: "My note text here"
                └── img (delete.png) ← e.target
