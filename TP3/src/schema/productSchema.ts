const ProductSchema = z.object({
  id: z.string(),
  name: z.string().min(2),
  price: z.number().positive(),
});
type Product = z.infer<typeof ProductSchema>;