import React, { useState, useRef } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Bold from "@tiptap/extension-bold";
import Italic from "@tiptap/extension-italic";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
import ListItem from "@tiptap/extension-list-item";
import BulletList from "@tiptap/extension-bullet-list";
import OrderedList from "@tiptap/extension-ordered-list";
import Image from "@tiptap/extension-image";
import { Box, IconButton, Divider, Popover, Tooltip } from "@mui/material";
import {
    FormatBold,
    FormatItalic,
    FormatUnderlined,
    FormatListBulleted,
    FormatListNumbered,
    FormatAlignLeft,
    FormatAlignCenter,
    FormatAlignRight,
    InsertEmoticon,
    AttachFile,
    Image as ImageIcon,
} from "@mui/icons-material";
import EmojiPicker, { EmojiClickData } from "emoji-picker-react";

type Props = {
    onContentChange?: (html: string) => void;
};

export const RichEditor: React.FC<Props> = ({ onContentChange }) => {
    const editor = useEditor({
        extensions: [
            StarterKit.configure({
                bulletList: false,
                orderedList: false,
            }),
            Bold,
            Italic,
            Underline,
            BulletList,
            OrderedList,
            ListItem,
            TextAlign.configure({
                types: ["heading", "paragraph"],
            }),
            Image.configure({
                inline: false,
                allowBase64: true,
            }),
        ],
        onUpdate: ({ editor }) => {
            const html = editor.getHTML();
            onContentChange?.(html);
        },
    });

    /* ---------------- emoji picker ---------------- */
    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
    const toggleEmoji = (e: React.MouseEvent<HTMLElement>) =>
        setAnchorEl(anchorEl ? null : e.currentTarget);
    const onEmojiClick = (emojiData: EmojiClickData) => {
        editor?.chain().focus().insertContent(emojiData.emoji).run();
        setAnchorEl(null);
    };

    /* ---------------- file & image ---------------- */
    const fileInputRef = useRef<HTMLInputElement>(null);
    const imageInputRef = useRef<HTMLInputElement>(null);

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const url = URL.createObjectURL(file);
        editor
            ?.chain()
            .focus()
            .insertContent(
                `<a href="${url}" target="_blank" rel="noreferrer">${file.name}</a>`
            )
            .run();
        e.target.value = "";
    };

    const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        const url = URL.createObjectURL(file);
        editor?.chain().focus().setImage({ src: url, alt: file.name }).run();
        e.target.value = "";
    };

    if (!editor) return null;

    const isActive = (name: string, attrs?: object) =>
        editor.isActive(name, attrs) ? "primary" : "default";

    return (
        <Box width={"100%"}>
            {/* Toolbar */}
            <Box
                display={"flex"}
                gap={"2px"}
                justifyContent={"flex-start"}
                flexDirection={"row-reverse"}
                padding={"12px"}
            >
                {/* basic */}
                <IconButton
                    size="small"
                    onClick={() => editor.chain().focus().toggleBold().run()}
                    color={isActive("bold")}
                >
                    <FormatBold fontSize="small" />
                </IconButton>
                <IconButton
                    size="small"
                    onClick={() => editor.chain().focus().toggleItalic().run()}
                    color={isActive("italic")}
                >
                    <FormatItalic fontSize="small" />
                </IconButton>
                <IconButton
                    size="small"
                    onClick={() => editor.chain().focus().toggleUnderline().run()}
                    color={isActive("underline")}
                >
                    <FormatUnderlined fontSize="small" />
                </IconButton>

                <Divider orientation="vertical" flexItem sx={{ mx: 0.5 }} />

                {/* list */}
                <IconButton
                    size="small"
                    onClick={() => editor.chain().focus().toggleBulletList().run()}
                    color={isActive("bulletList")}
                >
                    <FormatListBulleted fontSize="small" />
                </IconButton>
                <IconButton
                    size="small"
                    onClick={() => editor.chain().focus().toggleOrderedList().run()}
                    color={isActive("orderedList")}
                >
                    <FormatListNumbered fontSize="small" />
                </IconButton>

                <Divider orientation="vertical" flexItem sx={{ mx: 0.5 }} />

                {/* align */}
                <IconButton
                    size="small"
                    onClick={() => editor.chain().focus().setTextAlign("left").run()}
                    color={isActive("textAlign", { textAlign: "left" })}
                >
                    <FormatAlignLeft fontSize="small" />
                </IconButton>
                <IconButton
                    size="small"
                    onClick={() => editor.chain().focus().setTextAlign("center").run()}
                    color={isActive("textAlign", { textAlign: "center" })}
                >
                    <FormatAlignCenter fontSize="small" />
                </IconButton>
                <IconButton
                    size="small"
                    onClick={() => editor.chain().focus().setTextAlign("right").run()}
                    color={isActive("textAlign", { textAlign: "right" })}
                >
                    <FormatAlignRight fontSize="small" />
                </IconButton>

                <Divider orientation="vertical" flexItem sx={{ mx: 0.5 }} />

                {/* emoji */}
                <Tooltip title="ایموجی">
                    <IconButton size="small" onClick={toggleEmoji}>
                        <InsertEmoticon fontSize="small" />
                    </IconButton>
                </Tooltip>

                {/* file */}
                <Tooltip title="پیوست فایل">
                    <IconButton
                        size="small"
                        onClick={() => fileInputRef.current?.click()}
                    >
                        <AttachFile fontSize="small" />
                    </IconButton>
                </Tooltip>

                {/* image */}
                <Tooltip title="درج تصویر">
                    <IconButton
                        size="small"
                        onClick={() => imageInputRef.current?.click()}
                    >
                        <ImageIcon fontSize="small" />
                    </IconButton>
                </Tooltip>
            </Box>

            {/* hidden inputs */}
            <input
                ref={fileInputRef}
                type="file"
                hidden
                onChange={handleFileSelect}
            />
            <input
                ref={imageInputRef}
                type="file"
                accept="image/*"
                hidden
                onChange={handleImageSelect}
            />

            {/* emoji popover */}
            <Popover
                open={Boolean(anchorEl)}
                anchorEl={anchorEl}
                onClose={() => setAnchorEl(null)}
                anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
            >
                <EmojiPicker onEmojiClick={(_, e: any) => onEmojiClick(e)} />
            </Popover>

            {/* Editor area */}
            <Box
                sx={{
                    border: 1,
                    borderColor: "divider",
                    borderRadius: 3,
                    p: 1,
                    minHeight: 160,
                    "& .ProseMirror": { outline: "none", direction: "rtl" },
                }}
            >
                <EditorContent editor={editor} />
            </Box>
        </Box>
    );
};
