import { render, screen } from '@testing-library/react';
import { mocked } from 'ts-jest/utils';
import Home, { getStaticProps } from '../../pages';
import { stripe } from '../../services/stripes';

jest.mock('next/router');
jest.mock('next-auth/client', () => {
  return {
    useSession: () => [null, false]
  }
})
jest.mock('../../services/stripes')

describe('Home page', () => {
  it('renders correctly', () => {
    render(<Home product={{
      priceId: 'fake-price-id',
      amount: 'R$10,00',
    }} />)

    expect(screen.getByText('for R$10,00 month')).toBeInTheDocument();
  })

  it('loads initial data', async () => {
    const retrieveStripePricesMocked =  mocked(stripe.prices.retrieve);

    await retrieveStripePricesMocked.mockResolvedValueOnce({
      id: 'fake-price-id',
      unit_amount: 1000,
    
    } as any)

    const response = getStaticProps({})

    expect(response).toEqual(
      expect.objectContaining({
        props: {
          product: {
            priceId: 'fake-price-id',
            amout: '$10.00'
          }
        }
      })
    )
  })
})