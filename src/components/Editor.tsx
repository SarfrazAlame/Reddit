"use client";
import React, { FC, useCallback, useEffect, useRef, useState } from "react";
import TextareaAutosize from "react-textarea-autosize";
import { useForm } from "react-hook-form";
import { PostCreationRequest, Postvalidators } from "@/lib/validators/post";
import { zodResolver } from "@hookform/resolvers/zod";
import EditorJS from "@editorjs/editorjs";
import LinkTool from "@editorjs/link";
import Header from "@editorjs/header";
import ImageTool from "@editorjs/image";
import List from "@editorjs/list";
import Code from "@editorjs/code";
import Inlinecode from "@editorjs/inline-code";
import Table from "@editorjs/table";
import Embed from "@editorjs/embed";

import { uploadFiles } from "@/lib/uploadthing";

interface EditorProps {
  subredditId: string;
}

const Editor: FC<EditorProps> = ({ subredditId }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PostCreationRequest>({
    resolver: zodResolver(Postvalidators),
    defaultValues: {
      subredditId,
      title: "",
      content: null,
    },
  });

  const ref = useRef<EditorJS>();
  const [isMounted, setIsMounted] = useState<boolean>();

  useEffect(()=>{
    if(typeof window !== 'undefined'){
      setIsMounted(true)
    }
  },[])

  const initializeEditor = useCallback(async () => {
    const EditorJS = (await import("@editorjs/editorjs")).default;
    const Header = (await import("@editorjs/header")).default;
    const Embed = (await import("@editorjs/embed")).default;
    const Table = (await import("@editorjs/table")).default;
    const List = (await import("@editorjs/list")).default;
    const Code = (await import("@editorjs/code")).default;
    const LinkTool = (await import("@editorjs/link")).default;
    const Inlinecode = (await import("@editorjs/inline-code")).default;
    const ImageTool = (await import("@editorjs/image")).default;
  }, []);

  if (!ref.current) {
    const editor = new EditorJS({
      holder: "editor",
      onReady() {
        ref.current = editor;
      },
      placeholder: "Type here to write your post",
      inlineToolbar: true,
      data: { blocks: [] },
      tools: {
        header: Header,
        linkTool: {
          class: LinkTool,
          config: {
            endpoint: "/api/link",
          },
        },
        image: {
          class: ImageTool,
          config: {
            uploader: {
              async uploadByFile(file: File) {
                const [res] = await uploadFiles([file], "imageUploader");

                return {
                  success: 1,
                  file: {
                    url: res.fileUrl,
                  },
                };
              },
            },
          },
        },
        list: List,
        code: Code,
        inlineCode: Inlinecode,
        table: Table,
        embed: Embed,
      },
    });
  }

  useEffect(()=>{
    const init = async () =>{
      await initializeEditor()

      setTimeout(()=>{

      })
    }

    if(isMounted){
      init()

      return () =>{}

    }
  },[isMounted, initializeEditor])

  return (
    <div className="w-full p-4 bg-zinc-50 rounded-lg border border-zinc-200">
      <form id="subreddit-post-form" onSubmit={() => {}} className="w-fit">
        <div className="prose prose-stone dark:prose-invert">
          <TextareaAutosize
            placeholder="Title"
            className="w-full resize-none appearance-none overflow-hidden bg-transparent text-5xl font-bold focus:outline-none"
          />
          <div id="editor" className="min-h-[500px]"/>
        </div>
      </form>
    </div>
  );
};

export default Editor;
