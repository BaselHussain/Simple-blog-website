import { defineType,defineField,defineArrayMember } from "sanity";
export default defineType({
    name: 'blog',
    title: 'Blog',
    type: 'document',
    fields: [
      defineField({
        name: 'title',
        title: 'Title',
        type: 'string',
        description: 'The title of the blog post',
        validation: (Rule:any) => Rule.required().min(10).max(100), 
      }),
      defineField({
        name: 'summary',
        title: 'Summary',
        type: 'text',
        description: 'The summary of blog which will be shown first',
        validation: (Rule:any) => Rule.required().min(10).max(1000), 
      }),
      defineField({
        name: 'slug',
        title: 'Slug',
        type: 'slug',
        description: 'A unique identifier for the blog, used in the URL',
        options: {
          source: 'title',
          maxLength: 96, 
        },
      }),
     defineField({
        name: 'content',
        title: 'Content',
        type: 'array',
        of:[
            defineArrayMember({
                type:'block'
            })
            ],
        description: 'The body content of the blog post',
        validation: (Rule:any) => Rule.required().min(1), 
      }),
      defineField({
        name: 'image',
        type: 'image',
        title: 'Image',
        description: 'Image for the blog post',
        options: {
          hotspot: true, 
        },
      }),
      defineField({
        name: 'author',
        title: 'Author',
        type: 'string',
        description: 'Name of the blog author',
        validation: (Rule:any) => Rule.required().min(3).max(50), // Optional validation
      }),
    ],
  });
  