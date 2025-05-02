'use client'

import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { FormDescription, FormMessage } from "@camaras/ui/src/components/form"
import { Form, FormControl, FormField, FormLabel, FormItem } from "@camaras/ui/src/components/form"
import { Textarea } from "@camaras/ui/src/components/textarea"
import { Button } from "@camaras/ui/src/components/button"
import { Card, CardContent, CardTitle, CardHeader, CardDescription, CardFooter } from "@camaras/ui/src/components/card"
import { AvatarFallback, AvatarImage } from "@camaras/ui/src/components/avatar"
import { Avatar } from "@camaras/ui/src/components/avatar"

import { useProfile } from "@/hooks/use-profile"


const descriptionSchema = z.object({
  description: z.string().min(2).max(50),
})

export function MainInformationForm() {

  const { data } = useProfile()

  const form = useForm<z.infer<typeof descriptionSchema>>({
    resolver: zodResolver(descriptionSchema),
    defaultValues: {
      description: "",
    },
  })

  function onSubmit(values: z.infer<typeof descriptionSchema>) {
    console.log(values)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="h-full">
        <Card className="h-full py-8">
          <CardHeader className="flex flex-col items-center space-y-2">
            <Avatar className="h-24 w-24">
              <AvatarImage src={data?.user?.image || "/placeholder.svg"} alt={data?.user?.name} />
              <AvatarFallback className="text-lg">{data?.user?.name.substring(0, 2).toUpperCase()}</AvatarFallback>
            </Avatar>
            <div className="space-y-1 text-center">
              <CardTitle className="text-2xl">{data?.user?.name}</CardTitle>
              <CardDescription>{data?.user?.email}</CardDescription>
            </div>
          </CardHeader>
          <CardContent className="space-y-2">
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Descripción</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Escribe una breve descripción sobre ti" className="min-h-[100px] resize-none" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter className="flex justify-end">
            <Button>
              Guardar cambios
            </Button>
          </CardFooter>
        </Card>
      </form>

    </Form>


  )
}