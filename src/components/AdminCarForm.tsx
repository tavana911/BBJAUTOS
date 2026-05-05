import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { supabase } from '@/lib/supabase';
import { useToast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Loader2, Upload } from 'lucide-react';
import { cn } from '@/lib/utils';

const formSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  rentalPrice: z.coerce.number().positive('Price must be positive'),
  tagCategory: z.string().min(1, 'Tag category is required'),
  year: z.coerce.number().min(1900).max(2030, 'Invalid year'),
  mileage: z.coerce.number().min(0, 'Mileage cannot be negative'),
  fuelType: z.enum(['Gasoline', 'Diesel', 'Electric', 'Hybrid']),
  transmission: z.enum(['Automatic', 'Manual']),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  image: z.any().optional(),
});

export type FormValues = z.infer<typeof formSchema>;

const AdminCarForm: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      rentalPrice: 0,
      tagCategory: '',
      year: new Date().getFullYear(),
      mileage: 0,
      fuelType: 'Gasoline',
      transmission: 'Automatic',
      description: '',
    },
  });

  const onSubmit = async (values: FormValues) => {
    setLoading(true);
    try {
      // Debug: Log form values
      console.log('Form values:', values);

      const imageFile = form.getValues('image') as File | null;
      console.log('Image file:', imageFile);

      let imageUrl = '';

      if (imageFile) {
        const fileExt = imageFile.name.split('.').pop();
        const fileName = `${crypto.randomUUID()}.${fileExt}`;
        console.log('Uploading file:', fileName);
        const { data, error: uploadError } = await supabase.storage
          .from('car-images')
          .upload(fileName, imageFile, { upsert: true });

        if (uploadError) {
          console.error('Upload error:', uploadError);
          throw uploadError;
        }
        const { data: { publicUrl } } = supabase.storage
          .from('car-images')
          .getPublicUrl(data.path);
        imageUrl = publicUrl;
        console.log('Image URL:', imageUrl);
      }

      const payload = {
        name: values.name,
        rental_price: Number(values.rentalPrice),
        tag_category: values.tagCategory,
        year: Number(values.year),
        mileage: Number(values.mileage),
        fuel_type: values.fuelType,
        transmission: values.transmission,
        description: values.description,
        image_url: imageUrl,
      };
      console.log('Insert payload:', payload);

      const { error: insertError } = await supabase
        .from('cars')
        .insert(payload);

      console.log('Insert error:', insertError);

      if (insertError) throw insertError;

      toast({
        title: 'Success',
        description: 'Car added successfully!',
      });
      form.reset();
    } catch (error) {
      console.error('Submit error:', error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: error instanceof Error ? error.message : 'Failed to add car.',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Add New Car</CardTitle>
        <CardDescription>Fill in the details to add a new vehicle to the inventory.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Mercedes GLE 63" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="rentalPrice"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Rental Price ($/day)</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="250" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="year"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Year</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="2023" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="mileage"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Mileage (miles)</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="15000" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="tagCategory"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tag Category</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., SUV" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="fuelType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Fuel Type</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Gasoline">Gasoline</SelectItem>
                      <SelectItem value="Diesel">Diesel</SelectItem>
                      <SelectItem value="Electric">Electric</SelectItem>
                      <SelectItem value="Hybrid">Hybrid</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="transmission"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Transmission</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Automatic">Automatic</SelectItem>
                      <SelectItem value="Manual">Manual</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Describe the vehicle..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="image"
              render={() => (
                <FormItem>
                  <FormLabel>Image</FormLabel>
                  <FormControl>
                    <Input type="file" accept="image/*" onChange={(e) => {
                      const file = e.target.files?.[0];
                      form.setValue('image', file || null);
                    }} />
                  </FormControl>
                  <FormDescription>Upload a high-quality image (max 5MB recommended).</FormDescription>
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Adding Car...
                </>
              ) : (
                <>
                  <Upload className="mr-2 h-4 w-4" />
                  Add Car
                </>
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default AdminCarForm;

