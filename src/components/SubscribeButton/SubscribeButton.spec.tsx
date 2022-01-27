import { render, screen, fireEvent } from '@testing-library/react'
import { mocked } from 'ts-jest/utils'
import {signIn, useSession} from 'next-auth/client';
import {useRouter} from 'next/router'
import { SubscribeButton } from '.'

jest.mock('next-auth/client');

jest.mock('next/router')

describe('SignInButton component', () => {

  it('renders correctly when user is not authenticated', () => {

    const useSessionMocked = mocked(useSession);

    useSessionMocked.mockReturnValueOnce([null, false])

   render(
      <SubscribeButton />
    )
  
    expect(
      screen.getByText('Subscribe now')
    ).toBeInTheDocument();

  });

  it('redirects user to sign in when not authenticated', () => {
    const signinMocked = mocked(signIn);

    const useSessionMocked = mocked(useSession);

    useSessionMocked.mockReturnValueOnce([null, false])

    render(
      <SubscribeButton />
    );

    const subscribeButton = screen.getByText('Subscribe now')

    fireEvent.click(subscribeButton);

    expect(signinMocked).toHaveBeenCalled();
  });

  it('redirecs to post when user already has subscription', () => {

    const useRouterMocked = mocked(useRouter);
    const useSessionMocked = mocked(useSession)


    const pushMock = jest.fn()

    useSessionMocked.mockReturnValueOnce([
      {
        user: { 
          name: 'John Doe', 
          email: 'john.doe@example.com'
        },
        expires: 'fake-expires',
      },
      false
    ])

    useRouterMocked.mockReturnValueOnce({
      push: pushMock
    } as any)

    render(
      <SubscribeButton />
    );

    const subscribeButton = screen.getByText('Subscribe now')

    fireEvent.click(subscribeButton);

    expect(useRouterMocked).toHaveBeenCalled();

  })
})

