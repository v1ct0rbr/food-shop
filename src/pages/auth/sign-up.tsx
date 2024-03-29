import { useMutation } from '@tanstack/react-query'
import { Helmet } from 'react-helmet-async'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { z } from 'zod'

import { registerRestaurant } from '@/api/register-restaurant'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

const SignUpForm = z.object({
  email: z.string().email('E-mail inválido'),
  restaurantName: z.string().min(3, 'Nome muito curto'),
  managerName: z.string().min(3, 'Nome muito curto'),
  phone: z.string().min(11, 'Telefone muito curto'),
})

type SignUpFormType = z.infer<typeof SignUpForm>

export function SignUp() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignUpFormType>()

  const navigate = useNavigate()

  const { mutateAsync: registerRestaurantFn } = useMutation({
    mutationFn: registerRestaurant,
  })

  async function handleSignUp(data: SignUpFormType) {
    try {
      await registerRestaurantFn({
        email: data.email,
        restaurantName: data.restaurantName,
        managerName: data.managerName,
        phone: data.phone,
      })

      toast.success('Restaurante cadastrado com sucesso!', {
        action: {
          label: 'login',
          onClick: () => {
            navigate(`/sign-in?email=${data.email}`)
          },
        },
      })
    } catch (error) {
      toast.error('Erro ao cadastrar restaurante')
    }
  }

  return (
    <>
      <Helmet title="SignUp" />
      <div className="p-8">
        <Button variant="ghost" asChild className="absolute right-8 top-8">
          <Link to="/sign-in">Já tem conta? Faça seu login</Link>
        </Button>
        <div className="flex w-[350px] flex-col justify-center gap-6">
          <div className="flex flex-col gap-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">
              Criar conta
            </h1>
            <p className="text-sm text-muted-foreground">
              Seja bem vindo a nossa loja. Preencha os campos abaixo para criar
              sua conta.
            </p>
          </div>

          <form className="space-y-4" onSubmit={handleSubmit(handleSignUp)}>
            <div className="space-y-2">
              <Label htmlFor="name">Restaurant Name:</Label>
              <Input id="name" type="text" {...register('restaurantName')} />
            </div>
            {errors.restaurantName && (
              <p className="text-xs text-red-400">
                {errors.restaurantName.message}
              </p>
            )}
            <div className="space-y-2">
              <Label htmlFor="name">Manager Name</Label>
              <Input id="name" type="text" {...register('managerName')} />
            </div>
            {errors.managerName && (
              <p className="text-xs text-red-400">
                {errors.managerName.message}
              </p>
            )}
            <div className="space-y-2">
              <Label htmlFor="phone">Phone</Label>
              <Input id="phone" type="tel" {...register('phone')} />
            </div>
            {errors.phone && (
              <p className="text-xs text-red-400">{errors.phone.message}</p>
            )}

            <div className="space-y-2">
              <Label htmlFor="email">E-mail</Label>
              <Input id="email" type="email" {...register('email')} />
            </div>
            {errors.email && (
              <p className="text-xs text-red-400">{errors.email.message}</p>
            )}

            <Button disabled={isSubmitting} className="w-full" type="submit">
              Criar conta
            </Button>
            <p className="px-6 text-center text-sm leading-relaxed text-muted-foreground">
              Ao continuar, você concorda com nossos{' '}
              <a href=""> Termos de serviço</a> e{' '}
              <a href="">políticas de privacidade</a>
            </p>
          </form>
        </div>
      </div>
    </>
  )
}
