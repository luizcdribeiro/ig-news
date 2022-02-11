import { render, screen } from '@testing-library/react';
import { getSession } from 'next-auth/client';
import { mocked } from 'ts-jest/utils';
import Post, { getServerSideProps } from '../../pages/posts/[slug]';
import { getPrismicClient } from '../../services/prismic';


const post = {
  slug: 'my-new-post',
  title: 'My new post',
  content: '<p>Hello</p>',
  updatedAt: '02 de Fevereiro'
}

jest.mock('next-auth/client')

jest.mock('../../services/prismic')

describe('Post page', () => {
  it('renders correctly', () => {
    render(<Post post={post} />)

    expect(screen.getByText('My new post')).toBeInTheDocument();
    expect(screen.getByText('Post Excerpt')).toBeInTheDocument();

  })

 it('redirects user if no subscription is found', async () => {
   const getSessionMocked = mocked(getSession)
   
   getSessionMocked.mockResolvedValueOnce(null)
   
   

   const response = getServerSideProps({ 
     params: {slug: 'my-new-post'}
    } as any)

   expect(response).toEqual(
     expect.objectContaining({
       redirect: expect.objectContaining({
         destination: '/'
       })
     })
   )
 })

 it('loads initial data', async () => {
  const getPrismicClientMocked = mocked(getPrismicClient)
  getPrismicClientMocked.mockReturnValueOnce({
    getByUID: jest.fn().mockResolvedValueOnce({
      data: {
        title: [
          {
            type: 'heading',
            text: 'my new post'
          }
        ],
        content: [
          {
            type: 'paragraph',
            text: 'my new post'
          }
        ],
      },
      last_publication_date: '02-02-2022'
    })
  } as any)

    const getSessionMocked = mocked(getSession)

    getSessionMocked.mockResolvedValueOnce({
      activeSubscription: 'fake-active-subscription'
    } as any)
  })
})