import { zodResolver } from '@hookform/resolvers/zod'
import { useQuery } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { getManagedRestaurant } from '@/api/get-managed-restaurant'

import { Button } from './ui/button'
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from './ui/dialog'
import { Input } from './ui/input'
import { Label } from './ui/label'
import { Textarea } from './ui/textarea'

const storeProfileSchema = z.object({
  name: z.string().min(5, 'Name must be at least 5 characters'),
  description: z.string().min(5, 'Description is required'),
})

export type StoreProfile = z.infer<typeof storeProfileSchema>

export function StoreProfileDialog() {
  const { data: managedRestaurant } = useQuery({
    queryKey: ['managed-restaurant'],
    queryFn: getManagedRestaurant,
  })
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<StoreProfile>({
    resolver: zodResolver(storeProfileSchema),
    values: {
      name: managedRestaurant?.name ?? '',
      description: managedRestaurant?.description ?? '',
    },
  })

  function handleSave(data: StoreProfile) {
    console.log(data)
  }

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Store Profile</DialogTitle>
        <DialogDescription>
          Update your store profile information.
        </DialogDescription>
      </DialogHeader>
      <form>
        <div className="space-y-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right" htmlFor="name">
              Name
            </Label>
            <Input className="col-span-3" id="name" {...register('name')} />
            {errors.name && (
              <p className="col-span-4 text-sm text-destructive">
                {errors.name.message}
              </p>
            )}
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right" htmlFor="description">
              Description
            </Label>
            <Textarea
              className="col-span-3"
              id="description"
              {...register('description')}
            />
            {errors.description && (
              <p className="col-span-4 text-sm text-destructive">
                {errors.description.message}
              </p>
            )}
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" variant="success">
            Save
          </Button>
          <Button variant="ghost">Cancel</Button>
        </DialogFooter>
      </form>
    </DialogContent>
  )
}
