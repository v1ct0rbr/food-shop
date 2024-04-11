import { render } from '@testing-library/react'

import { OrderStatus } from './OrderStatus'
describe('OrderStatus', () => {
  it('should display the right text when order status is pending', () => {
    const wrapper = render(<OrderStatus status="pending" />)

    const statusText = wrapper.getByText('Pendente')
    const badgeElement = wrapper.getByTestId('badge')
    console.log(badgeElement.outerHTML)

    expect(statusText).toBeInTheDocument()
    expect(badgeElement).toHaveClass('bg-yellow-400')
  })

  /* Testando o status "canceled" */
  it('should display the right text when order sttaus is canceled ', () => {
    const wrapper = render(<OrderStatus status="canceled" />)
    wrapper.debug()
    const statusText = wrapper.getByText('Cancelado')

    const badgeElement = wrapper.getByTestId('badge')
    console.log(badgeElement.outerHTML)

    expect(statusText).toBeInTheDocument()
    expect(badgeElement).toHaveClass('bg-rose-500')
  })

  /* Testando o status "processing" */
  it('should display the right text when order sttaus is processing ', () => {
    const wrapper = render(<OrderStatus status="processing" />)
    wrapper.debug()
    const statusText = wrapper.getByText('Em preparo')

    const badgeElement = wrapper.getByTestId('badge')
    console.log(badgeElement.outerHTML)

    expect(statusText).toBeInTheDocument()
    expect(badgeElement).toHaveClass('bg-amber-500')
  })

  /* Testando o status "delivering" */
  it('should display the right text when order sttaus is delivering ', () => {
    const wrapper = render(<OrderStatus status="delivering" />)
    wrapper.debug()
    const statusText = wrapper.getByText('Entregando')

    const badgeElement = wrapper.getByTestId('badge')
    console.log(badgeElement.outerHTML)

    expect(statusText).toBeInTheDocument()
    expect(badgeElement).toHaveClass('bg-amber-500')
  })

  /* Testando o status "delivered" */
  it('should display the right text when order sttaus is delivered ', () => {
    const wrapper = render(<OrderStatus status="delivered" />)
    wrapper.debug()
    const statusText = wrapper.getByText('Entregue')

    const badgeElement = wrapper.getByTestId('badge')
    console.log(badgeElement.outerHTML)

    expect(statusText).toBeInTheDocument()
    expect(badgeElement).toHaveClass('bg-emerald-500')
  })
})
