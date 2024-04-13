import { QueryClientProvider } from '@tanstack/react-query'
import { render } from '@testing-library/react'
import { HelmetProvider } from 'react-helmet-async'
import { MemoryRouter } from 'react-router-dom'
import { describe } from 'vitest'

import { queryClient } from '@/lib/react-query'

import { SignIn } from './sign-in'

describe('SignIn', async () => {
  it('should set default email input value if email is present on search params', () => {
    const email = 'johndoe@example.com'

    const wrapper = render(
      <HelmetProvider>
        <MemoryRouter initialEntries={[`/sign-in?email=${email}`]}>
          <QueryClientProvider client={queryClient}>
            <SignIn />
          </QueryClientProvider>
        </MemoryRouter>
      </HelmetProvider>,
    )

    const emailInput = wrapper.getByLabelText('E-mail')

    expect(emailInput).toHaveValue(email)
    wrapper.debug()
  })
})
