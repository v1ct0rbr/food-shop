import { render } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'

import { NavLink } from './NavLink'

const onPageChangeCallback = vi.fn()
describe('NavLink', () => {
  beforeEach(() => {
    onPageChangeCallback.mockClear()
  })

  it('should have text-foreground class if data-current property is true', () => {
    const wrapper = render(
      <>
        <NavLink to="/about">About</NavLink>
        <NavLink to="/test2">test2</NavLink>
      </>,
      {
        wrapper: ({ children }) => {
          return (
            <MemoryRouter initialEntries={['/about']}>{children}</MemoryRouter>
          )
        },
      },
    )
    const linkElement = wrapper.getByText('About')
    const linkElement2 = wrapper.getByText('test2')
    wrapper.debug()

    expect(linkElement.dataset.current).toEqual('true')
    expect(linkElement2.dataset.current).toEqual('false')
  })
})
