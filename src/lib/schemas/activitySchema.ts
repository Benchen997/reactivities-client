import {z} from 'zod';

const requiredString = (fieldName: string) =>
    z.string({required_error:`${fieldName} is required`})
        .min(1, {message: `${fieldName} is required`});


export const activitySchema = z.object({
    id: z.string().optional(),
    title: requiredString('Title'),
    description: z.string({required_error: 'Description is required'}).min(50, {message: 'Description must be at least 50 characters'}),
    category: requiredString('Category'),
    date: z.coerce.date({required_error: 'Date is required'}),
    city: requiredString('City'),
    venue: requiredString('Venue'),
})


export type ActivitySchema = z.infer<typeof activitySchema>;