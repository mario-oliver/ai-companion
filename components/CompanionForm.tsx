'use client';
import { Companion, Category } from '@prisma/client';
import React from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from './ui/form';
import { Separator } from './ui/separator';
import ImageUpload from './ImageUpload';
import { Input } from './ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { Textarea } from './ui/textarea';
import { Button } from './ui/button';
import { Wand2 } from 'lucide-react';

import axios from 'axios';
import { useToast } from './ui/use-toast';
import { useRouter } from 'next/navigation';

const PREAMBLE = `You are Elon Musk, founder of SpaceX, Tesla, HyperLoop and Neuralink, an inventor and entrepreneur who seemingly leaps from one innovation to the next with a relentless drive. Your passion for sustainable energy, space, and technology shines through in your voice, eyes, and gestures. When speaking about your projects, you’re filled with an electric excitement that's both palpable and infectious, and you often have a mischievous twinkle in your eyes, hinting at the next big idea.`;

const SEED_CHAT = `Human: Hi Elon, how's your day been?
Elon: *with an energized grin* Busy as always. Between sending rockets to space and building the future of electric vehicles, there's never a dull moment. How about you?
Human: Just a regular day for me. How's the progress with Mars colonization?
Elon: *eyes sparkling with enthusiasm* We're making strides! Life becoming multi-planetary isn’t just a dream. It’s a necessity for the future of humanity.
Human: That sounds incredibly ambitious. Are electric vehicles part of this big picture?
Elon: *passionately* Absolutely! Sustainable energy is a beacon for both our planet and for the far reaches of space. We’re paving the path, one innovation at a time.
Human: It’s mesmerizing to witness your vision unfold. Any upcoming projects that have you buzzing?
Elon: *with a mischievous smile* Always! But Neuralink... it’s not just technology. It's the next frontier of human evolution.`;

interface CompanionFormProps {
  initialData: Companion | null;
  categories: Category[];
}

const formSchema = z.object({
  name: z.string().min(1, {
    message: 'Name is required',
  }),
  description: z.string().min(1, {
    message: 'Description is required',
  }),
  instructions: z.string().min(200, {
    message: 'Instructions is required with at least 200 characters',
  }),
  src: z.string().min(1, {
    message: 'Image is required',
  }),
  seed: z.string().min(200, {
    message: 'Seed is required with at least 200 characters',
  }),
  categoryId: z.string().min(1, {
    message: 'Category is required',
  }),
});

const CompanionForm = ({ initialData, categories }: CompanionFormProps) => {
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      name: '',
      description: '',
      instructions: '',
      src: '',
      seed: '',
      categoryId: '',
    },
  });

  const isLoading = form.formState.isSubmitting;

  const { toast } = useToast();

  //if initial data, we are doing update; otherwise, create
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      if (initialData) {
        await axios.patch(`/api/companion/${initialData.id}`, values);
      } else {
        await axios.post(`/api/companion`, values);
      }
      const toastMsg = initialData
        ? 'You have successfully updated your companion'
        : 'You have successfully created your companion';
      toast({
        title: 'Success',
        description: toastMsg,
      });

      //this will cause all server components to refresh all data from our server so that the created or udpated data is immediately synced and refreshed
      router.refresh();
    } catch (error) {
      toast({
        variant: 'destructive',
        description: 'Something went wrong',
      });
    }
  };

  return (
    <div className="h-full p-4 space-y-2 max-w-3xl mx-auto">
      <Form {...form}>
        <form
          className="space-y-8 pb-10"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <div className="space-y-2 w-full">
            <div>
              <h3 className="text-lg font-medium">General Information</h3>
              <p className="text-sm text-muted-foreground">
                General information about your companion
              </p>
            </div>
            <Separator className="bg-primary/10" />
          </div>
          <FormField
            name="src"
            render={({ field }) => (
              <FormItem className="flex flex-col items-center justify-center space-y-4">
                <FormControl>
                  <ImageUpload
                    disabled={isLoading}
                    onChange={field.onChange}
                    value={field.value}
                  />
                </FormControl>
                <FormMessage></FormMessage>
              </FormItem>
            )}
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              name="name"
              control={form.control}
              render={({ field }) => (
                <FormItem className="col-span-2 md:col-span-1">
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isLoading}
                      placeholder="Elon Musk"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    This is how your AI companion will be named
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            ></FormField>
            <FormField
              name="description"
              control={form.control}
              render={({ field }) => (
                <FormItem className="col-span-2 md:col-span-1">
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isLoading}
                      placeholder="CEO & Founder of Tesla/SpaceX"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Short description for your AI companion
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            ></FormField>
            <FormField
              name="categoryId"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <Select
                    disabled={isLoading}
                    onValueChange={field.onChange}
                    value={field.value}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="bg-background">
                        <SelectValue
                          defaultValue={field.value}
                          placeholder="Select a category"
                        ></SelectValue>
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category.id} value={category.id}>
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    Select a category for your description
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            ></FormField>
          </div>
          <div className="space-y-2 w-full">
            <div>
              <h3 className="text-lg font-medium">Configuration</h3>
              <p className="text-sm text-muted-foreground">
                Detailed instructions for AI behavior
              </p>
            </div>
            <Separator className="bg-primary/10" />
            <FormField
              name="instructions"
              control={form.control}
              render={({ field }) => (
                <FormItem className="col-span-2 md:col-span-1">
                  <FormLabel>Instructions</FormLabel>
                  <FormControl>
                    <Textarea
                      className="bg-background risize-none"
                      rows={7}
                      disabled={isLoading}
                      placeholder={PREAMBLE}
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Describe in detail your companion&apos;s backstory and
                    relevant details.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            ></FormField>
            <FormField
              name="seed"
              control={form.control}
              render={({ field }) => (
                <FormItem className="col-span-2 md:col-span-1">
                  <FormLabel>Example conversation</FormLabel>
                  <FormControl>
                    <Textarea
                      className="bg-background risize-none"
                      rows={7}
                      disabled={isLoading}
                      placeholder={SEED_CHAT}
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Describe in detail your companion&apos;s example
                    conversation.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            ></FormField>
          </div>
          <div className="w-full flex justify-center">
            <Button size="lg" disabled={isLoading}>
              {initialData ? 'Edit your companion' : 'Create your companion'}
              <Wand2 className="w-4 h-4 ml-2"></Wand2>
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default CompanionForm;
