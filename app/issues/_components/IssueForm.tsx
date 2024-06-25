"use client"
import dynamic from "next/dynamic";
import "easymde/dist/easymde.min.css";
import {Button, Callout, TextField} from "@radix-ui/themes";
import {useForm, Controller} from "react-hook-form";
import axios from "axios";
import {useState} from "react";
import {zodResolver} from "@hookform/resolvers/zod";
import {issueSchema} from "@/app/validationSchemas";
import {z} from "zod"
import ErrorMessage from "@/components/ErrorMessage";
import {ClockLoader} from "react-spinners";
import {Issue} from "@prisma/client";
import {useRouter} from "next/navigation";

type IssueFormData = z.infer<typeof issueSchema>
const SimpleMDE = dynamic(
    () => import("react-simplemde-editor"),
    {
        ssr: false
    })


export default function IssueForm({issue}: { issue?: Issue }) {


    const router = useRouter();
    const [error, setError] = useState("")
    const {register, control, handleSubmit, formState: {errors}} = useForm<IssueFormData>({
        resolver: zodResolver(issueSchema)
    })
    const [isSubmitting, setIsSubmitting] = useState(false)


    const onSubmit = handleSubmit(async (data) => {
        try {
            if (issue) {
                await axios.patch(`/api/issues/${issue.id}`, data)

            } else {
                await axios.post("/api/issues", data);
            }
            router.push("/issues")

        } catch (error) {
            setIsSubmitting(false)
            setError("Unexpected error occurred")
        }
    })


    return (
        <>
            <div className={"max-w-xl"}>

                {
                    error && (
                        <Callout.Root color={"red"} className={"mb-5"}>
                            <Callout.Text>
                                {error}
                            </Callout.Text>
                        </Callout.Root>
                    )
                }

                <form className={"space-y-3"} onSubmit={onSubmit}>
                    <TextField.Root defaultValue={issue?.title} placeholder="Title" {...register("title")}>
                        <TextField.Slot>
                        </TextField.Slot>
                    </TextField.Root>
                    <ErrorMessage>
                        {errors.title?.message}
                    </ErrorMessage>

                    <Controller
                        defaultValue={issue?.description}
                        name={"description"}
                        control={control}
                        render={({field}) => <SimpleMDE placeholder="Description" {...field}/>
                        }/>
                    <ErrorMessage>
                        {errors.description?.message}
                    </ErrorMessage>

                    <Button disabled={isSubmitting}>
                        {issue ? "Update Issue" : "Submit New Issue"}
                        {isSubmitting && <ClockLoader size={25} color="gray"/>}
                    </Button>
                </form>
            </div>
        </>
    )
}