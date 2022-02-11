import { render, screen } from '@testing-library/react';
import { getSession, useSession } from 'next-auth/client';
import { useRouter } from 'next/router';
import { mocked } from 'ts-jest/utils';
import Post, { getStaticProps } from '../../pages/posts/preview/[slug]';

const post = {
  slug: 'my-new-post',
  title: 'My new post',
  content: '<p>Hello</p>',
  updatedAt: '02 de Fevereiro'
}

jest.mock('next-auth/client')
jest.mock('next/router')
jest.mock('../../services/prismic')

describe('Post preview page', () => {
  it('renders correctly', () => {

    const useSessionMocked = mocked(useSession);

    useSessionMocked.mockReturnValueOnce([null, false])

    render(<Post post={post} />)

    expect(screen.getByText('My new post')).toBeInTheDocument();
    expect(screen.getByText('Post Excerpt')).toBeInTheDocument();

  })

it('redirects user to full post when user is subscribed', async () => {
  const useSessionMocked = mocked(useSession);
  const useRouterMocked = mocked(useRouter)
  const pushMock = jest.fn();

    useSessionMocked.mockReturnValueOnce([
      {activeSubscription: 'fake-active-subscription'},
      false
    ] as any)

    useRouterMocked.mockReturnValueOnce({
      push: pushMock
    } as any)

    render(<Post post={post} />)


    expect(pushMock).toHaveBeenCalledWith('/posts/my-new-post')
})
})