import { createBrowserRouter, RouterProvider } from 'react-router-dom';

// import  { loader as postsLoader } from './pages/Blog';
import HomePage from './pages/Home';
// import PostPage, { loader as postLoader } from './pages/Post';
import RootLayout from './pages/Root';
import { lazy, Suspense } from 'react';
const BlogPage = lazy(() => import('./pages/Blog'));
const PostPage = lazy(() => import('./pages/Post'));
const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: 'posts',
        children: [
          //lazy loading
          {
            index: true, element: (<Suspense fallback={<p>Loading...</p>}> <BlogPage /></Suspense>),
            loader: () => import('./pages/Blog').then(m => m.loader())
          },

          {
            path: ':id', element: (<Suspense fallback={<p>Loading....</p>}><PostPage /></Suspense>),
            loader: (meta) => import('./pages/Post').then(m => m.loader(meta))
          },
        ],
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
