import React, { useRef } from 'react'
import { Editor } from '@tinymce/tinymce-react';
import { Controller } from 'react-hook-form';
import axios from 'axios';

export default function RTE({ name, control, label, defaultValue = "" }) {

    const editorRef = useRef(null) // Reference to access the editor instance

    const handleGenerate = async () => {
        if (editorRef.current) {
            const e = editorRef.current.getContent()
            const cleanedContent = e.replace(/<\/?p>/g, '');
            const ediorContent = `Write a detailed article on ${cleanedContent}, including its importance, current trends, and best practices in protecting data. Context: ${cleanedContent}`

            console.log(ediorContent)

            // console.log(editorRef.current.getContent())
            try {
                const response = await axios.post(
                    'https://api-inference.huggingface.co/models/gpt2', //model gpt
                    {
                        inputs: ediorContent,
                        parameters: {
                            max_length: 2000,
                            num_return_sequences: 1,
                        },
                    },
                    {
                        headers: {
                            'Authorization': `Bearer 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`,
                            'Content-Type': 'application/json'
                        },
                    }
                );
                const generatedText = response.data[0].generated_text
                console.log(generatedText)

                editorRef.current.setContent(generatedText.replace(/^.*?Context:.*/, '').trim())
            }
            catch (error) {
                console.error('Error generating text:', error);
                if (error.response) {
                    console.error('Response status:', error.response.status);
                    console.error('Response data:', error.response.data);
                } else {
                    console.error('Error message:', error.message);
                }
            }
        }
    }

    return (
        <div className='w-full'>
            {label && <label className='inline-block mb-1 pl-1'>{label}</label>}

            <Controller
                name={name || "content"}
                control={control}
                render={({ field: { onChange } }) => (
                    <Editor
                        apiKey='wr1346s97nayq4b11lgu1vguo601ilv7k81v674tex33sfr4'
                        initialValue="Use Generative AI , Add Title And Hit Generate Button"
                        onInit={(evt, editor) => editorRef.current = editor} // Set editor reference
                        init={{
                            initialValue: defaultValue,
                            height: 500,
                            menubar: true,
                            plugins: [
                                "image",
                                "advlist",
                                "autolink",
                                "lists",
                                "link",
                                "image",
                                "charmap",
                                "preview",
                                "anchor",
                                "searchreplace",
                                "visualblocks",
                                "code",
                                "fullscreen",
                                "insertdatetime",
                                "media",
                                "table",
                                "code",
                                "help",
                                "wordcount",
                                "anchor",
                            ],
                            toolbar:
                                "undo redo | blocks | image | bold italic forecolor | alignleft aligncenter bold italic forecolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent |removeformat | help",
                            content_style: "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }"
                        }}
                        onEditorChange={onChange}
                    />
                )}
            />
            <button
                type="button"
                className="mt-2 p-2 bg-blue-500 text-white rounded"
                onClick={handleGenerate}
            >
                Generate
            </button>
        </div>
    )
}
