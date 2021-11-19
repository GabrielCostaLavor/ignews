import { render, screen } from '@testing-library/react';
import { getSession } from 'next-auth/client';
import { mocked } from 'ts-jest/utils';
import Post, {getServerSideProps} from '../../pages/posts/[slug]';
import { getPrismicClient } from '../../services/prismic';

const slug = 'my-new-post';

const post = {
    slug: 'my-new-post',
    title: 'My New Post',
    content: '<p>Post excerpt</p>',
    updatedAt: '10 de abril'
};

 jest.mock('next-auth/client');
 jest.mock('../../services/prismic');

describe('Post Page', () => {
  it('renders correctly', () => {
    render(<Post post={post}/>);

    expect(screen.getByText("My New Post")).toBeInTheDocument();
    expect(screen.getByText("Post excerpt")).toBeInTheDocument();
  })
   it('redirects user if no subscription is found', async () => {
    const getSessionMocked = mocked(getSession);

    getSessionMocked.mockResolvedValueOnce({
      activeSubscription: false,
    } as any);

     const response = await getServerSideProps({ params: { slug } } as any);

     expect(response).toEqual(
       expect.objectContaining({
          redirect: expect.objectContaining({
              destination: `/posts/preview/${slug}`,
          })
       })
     );
   });
   it('loads initial data', async () => {
    const getSessionMocked = mocked(getSession);
    const getPrismicClientMocked = mocked(getPrismicClient);

    getPrismicClientMocked.mockReturnValueOnce({
      getByUID: jest.fn().mockResolvedValueOnce({
        data: {
          title: [
            { type: 'heading', text: 'My New Post' }
          ],
          content: [
           { type: 'paragraph', text: 'Post excerpt' }
         ],
        },
        last_publication_date: '04-01-2021'
      })
     } as any);

    getSessionMocked.mockResolvedValueOnce({
      activeSubscription: 'fake-active-subscription',
    } as any);

    const response = await getServerSideProps({ params: { slug } } as any);

     expect(response).toEqual(
       expect.objectContaining({
          props: {
            post: {
              slug: 'my-new-post',
              title: 'My New Post',
              content: '<p>Post excerpt</p>',
              updatedAt: '01 de abril de 2021'
            }
          }
       })
     );

   });
});