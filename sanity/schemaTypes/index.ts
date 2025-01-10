import { type SchemaTypeDefinition } from 'sanity'
import BlogSchema from './BlogSchema'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [BlogSchema],
}
