import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import TextAlign from '@tiptap/extension-text-align';
import Underline from '@tiptap/extension-underline';
import Link from '@tiptap/extension-link';
import { 
  Bold, 
  Italic, 
  Underline as UnderlineIcon, 
  List, 
  ListOrdered, 
  AlignLeft, 
  AlignCenter, 
  AlignRight,
  Link as LinkIcon,
  Heading1,
  Heading2,
  Code
} from 'lucide-react';

interface RichTextEditorProps {
  content: string;
  onChange: (html: string) => void;
  placeholder?: string;
}

export default function RichTextEditor({ content, onChange, placeholder = 'Start writing...' }: RichTextEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: 'text-[#BF9B30] underline hover:text-[#D8C08E]',
        },
      }),
    ],
    content,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class: 'prose prose-invert max-w-none focus:outline-none min-h-[200px] px-4 py-3',
      },
    },
  });

  if (!editor) {
    return null;
  }

  const addLink = () => {
    const url = window.prompt('Enter URL:');
    if (url) {
      editor.chain().focus().setLink({ href: url }).run();
    }
  };

  return (
    <div className="border border-[#BF9B30]/30 rounded-xl overflow-hidden bg-[#1A1A2F]">
      {/* Toolbar */}
      <div className="border-b border-[#BF9B30]/30 p-2 flex flex-wrap gap-1 bg-[#0A0A1F]">
        {/* Headings */}
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
          className={`p-2 rounded hover:bg-[#BF9B30]/20 transition-colors ${
            editor.isActive('heading', { level: 1 }) ? 'bg-[#BF9B30] text-[#0A0A1F]' : 'text-[#D8C08E]'
          }`}
          title="Heading 1"
        >
          <Heading1 className="w-4 h-4" />
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          className={`p-2 rounded hover:bg-[#BF9B30]/20 transition-colors ${
            editor.isActive('heading', { level: 2 }) ? 'bg-[#BF9B30] text-[#0A0A1F]' : 'text-[#D8C08E]'
          }`}
          title="Heading 2"
        >
          <Heading2 className="w-4 h-4" />
        </button>

        <div className="w-px h-6 bg-[#BF9B30]/30 mx-1" />

        {/* Text Formatting */}
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={`p-2 rounded hover:bg-[#BF9B30]/20 transition-colors ${
            editor.isActive('bold') ? 'bg-[#BF9B30] text-[#0A0A1F]' : 'text-[#D8C08E]'
          }`}
          title="Bold"
        >
          <Bold className="w-4 h-4" />
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={`p-2 rounded hover:bg-[#BF9B30]/20 transition-colors ${
            editor.isActive('italic') ? 'bg-[#BF9B30] text-[#0A0A1F]' : 'text-[#D8C08E]'
          }`}
          title="Italic"
        >
          <Italic className="w-4 h-4" />
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          className={`p-2 rounded hover:bg-[#BF9B30]/20 transition-colors ${
            editor.isActive('underline') ? 'bg-[#BF9B30] text-[#0A0A1F]' : 'text-[#D8C08E]'
          }`}
          title="Underline"
        >
          <UnderlineIcon className="w-4 h-4" />
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleCode().run()}
          className={`p-2 rounded hover:bg-[#BF9B30]/20 transition-colors ${
            editor.isActive('code') ? 'bg-[#BF9B30] text-[#0A0A1F]' : 'text-[#D8C08E]'
          }`}
          title="Inline Code"
        >
          <Code className="w-4 h-4" />
        </button>

        <div className="w-px h-6 bg-[#BF9B30]/30 mx-1" />

        {/* Lists */}
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={`p-2 rounded hover:bg-[#BF9B30]/20 transition-colors ${
            editor.isActive('bulletList') ? 'bg-[#BF9B30] text-[#0A0A1F]' : 'text-[#D8C08E]'
          }`}
          title="Bullet List"
        >
          <List className="w-4 h-4" />
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={`p-2 rounded hover:bg-[#BF9B30]/20 transition-colors ${
            editor.isActive('orderedList') ? 'bg-[#BF9B30] text-[#0A0A1F]' : 'text-[#D8C08E]'
          }`}
          title="Numbered List"
        >
          <ListOrdered className="w-4 h-4" />
        </button>

        <div className="w-px h-6 bg-[#BF9B30]/30 mx-1" />

        {/* Text Alignment */}
        <button
          type="button"
          onClick={() => editor.chain().focus().setTextAlign('left').run()}
          className={`p-2 rounded hover:bg-[#BF9B30]/20 transition-colors ${
            editor.isActive({ textAlign: 'left' }) ? 'bg-[#BF9B30] text-[#0A0A1F]' : 'text-[#D8C08E]'
          }`}
          title="Align Left"
        >
          <AlignLeft className="w-4 h-4" />
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().setTextAlign('center').run()}
          className={`p-2 rounded hover:bg-[#BF9B30]/20 transition-colors ${
            editor.isActive({ textAlign: 'center' }) ? 'bg-[#BF9B30] text-[#0A0A1F]' : 'text-[#D8C08E]'
          }`}
          title="Align Center"
        >
          <AlignCenter className="w-4 h-4" />
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().setTextAlign('right').run()}
          className={`p-2 rounded hover:bg-[#BF9B30]/20 transition-colors ${
            editor.isActive({ textAlign: 'right' }) ? 'bg-[#BF9B30] text-[#0A0A1F]' : 'text-[#D8C08E]'
          }`}
          title="Align Right"
        >
          <AlignRight className="w-4 h-4" />
        </button>

        <div className="w-px h-6 bg-[#BF9B30]/30 mx-1" />

        {/* Link */}
        <button
          type="button"
          onClick={addLink}
          className={`p-2 rounded hover:bg-[#BF9B30]/20 transition-colors ${
            editor.isActive('link') ? 'bg-[#BF9B30] text-[#0A0A1F]' : 'text-[#D8C08E]'
          }`}
          title="Add Link"
        >
          <LinkIcon className="w-4 h-4" />
        </button>
      </div>

      {/* Editor Content */}
      <div className="text-white">
        <EditorContent editor={editor} placeholder={placeholder} />
      </div>
    </div>
  );
}
