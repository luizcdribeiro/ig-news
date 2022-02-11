import { render, screen } from '@testing-library/react';
import { mocked } from 'ts-jest/utils';
import Posts from '../../pages/posts';
import { getStaticProps } from '../../pages/posts';
import { getPrismicClient } from '../../services/prismic'


const posts = [
  {
    slug: 'my-new-post',
    title: 'My new post',
    excerpt: 'Post excerpt',
    updatedAt: '02 de Fevereiro'
  }
]

jest.mock('../../services/prismic')

describe('Home page', () => {
  it('renders correctly', () => {
    render(<Posts posts={posts} />)

    expect(screen.getByText('My new post')).toBeInTheDocument();
  })

  it('loads initial data', async () => {
    const getPrismicClientMock = mocked(getPrismicClient);

    getPrismicClientMock.mockReturnValueOnce({
      query: jest.fn().mockResolvedValueOnce({
        results: [
          {
            uid: 'my-new-post',
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
          }
        ]
      })
    } as any);

    const response = getStaticProps({})

    expect(response).toEqual(
      expect.objectContaining({
        props: {
          posts: [{
            slug: 'my-new-post',
            title: 'My new post',
            excerpt: 'Post excerpt',
            updatedAt: '02 de fevereiro de 2021'
          }]
        }
      })
    )
  })
})