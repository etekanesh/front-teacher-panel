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
import { Box, IconButton, Divider, Popover, Tooltip, useMediaQuery } from "@mui/material";
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
    const isMobile = useMediaQuery("(max-width:768px)");

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
                padding={isMobile ? "4px" : "12px"}
            >
                {/* basic */}
                <IconButton
                    size="small"
                    onClick={() => editor.chain().focus().toggleBold().run()}
                    color={isActive("bold")}
                    sx={{
                        padding: isMobile ? "0" : "2px"
                    }}
                >
                    <FormatBold fontSize="small" sx={{
                        width: isMobile ? 16 : 20
                    }} />
                </IconButton>
                <IconButton
                    size="small"
                    onClick={() => editor.chain().focus().toggleItalic().run()}
                    color={isActive("italic")} sx={{
                        padding: isMobile ? "0" : "2px"
                    }}
                >
                    <FormatItalic fontSize="small" sx={{
                        width: isMobile ? 16 : 20
                    }} />
                </IconButton>
                <IconButton
                    size="small"
                    onClick={() => editor.chain().focus().toggleUnderline().run()}
                    color={isActive("underline")} sx={{
                        padding: isMobile ? "0" : "2px"
                    }}
                >
                    <FormatUnderlined fontSize="small" sx={{
                        width: isMobile ? 16 : 20
                    }} />
                </IconButton>

                <Divider orientation="vertical" flexItem sx={{ mx: 0.5 }} />

                {/* list */}
                <IconButton
                    size="small"
                    onClick={() => editor.chain().focus().toggleBulletList().run()}
                    color={isActive("bulletList")} sx={{
                        padding: isMobile ? "0" : "2px"
                    }}
                >
                    <FormatListBulleted fontSize="small" sx={{
                        width: isMobile ? 14 : 20
                    }} />
                </IconButton>
                <IconButton
                    size="small"
                    onClick={() => editor.chain().focus().toggleOrderedList().run()}
                    color={isActive("orderedList")}
                    sx={{
                        padding: isMobile ? "0" : "2px"
                    }}
                >
                    <FormatListNumbered fontSize="small" sx={{
                        width: isMobile ? 14 : 20
                    }} />
                </IconButton>

                <Divider orientation="vertical" flexItem sx={{ mx: 0.5 }} />

                {/* align */}
                <IconButton
                    size="small"
                    onClick={() => editor.chain().focus().setTextAlign("left").run()}
                    color={isActive("textAlign", { textAlign: "left" })} sx={{
                        padding: isMobile ? "0" : "2px"
                    }}
                >
                    <FormatAlignLeft fontSize="small" sx={{
                        width: isMobile ? 14 : 20
                    }} />
                </IconButton>
                <IconButton
                    size="small"
                    onClick={() => editor.chain().focus().setTextAlign("center").run()}
                    color={isActive("textAlign", { textAlign: "center" })} sx={{
                        padding: isMobile ? "0" : "2px"
                    }}
                >
                    <FormatAlignCenter fontSize="small" sx={{
                        width: isMobile ? 14 : 20
                    }} />
                </IconButton>
                <IconButton
                    size="small"
                    onClick={() => editor.chain().focus().setTextAlign("right").run()}
                    color={isActive("textAlign", { textAlign: "right" })} sx={{
                        padding: isMobile ? "0" : "2px"
                    }}
                >
                    <FormatAlignRight fontSize="small" sx={{
                        width: isMobile ? 14 : 20
                    }} />
                </IconButton>

                <Divider orientation="vertical" flexItem sx={{ mx: 0.5 }} />

                {/* emoji */}
                <Tooltip title="ایموجی">
                    <IconButton size="small" onClick={toggleEmoji} sx={{
                        padding: isMobile ? "0" : "2px"
                    }}>
                        <InsertEmoticon fontSize="small" sx={{
                            width: isMobile ? 16 : 20
                        }} />
                    </IconButton>
                </Tooltip>

                {/* file */}
                <Tooltip title="پیوست فایل">
                    <IconButton
                        size="small"
                        onClick={() => fileInputRef.current?.click()} sx={{
                            padding: isMobile ? "0" : "2px"
                        }}
                    >
                        <AttachFile fontSize="small" sx={{
                            width: isMobile ? 16 : 20
                        }} />
                    </IconButton>
                </Tooltip>

                {/* image */}
                <Tooltip title="درج تصویر">
                    <IconButton
                        size="small"
                        onClick={() => imageInputRef.current?.click()} sx={{
                            padding: isMobile ? "0" : "2px"
                        }}
                    >
                        <ImageIcon fontSize="small" sx={{
                            width: isMobile ? 16 : 20
                        }} />
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
