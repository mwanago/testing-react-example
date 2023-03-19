import React from 'react';
import { Box, TableContainer, Table, TableRow, TableHead, TableCell, TableBody, CircularProgress } from '@mui/material';
import { usePostsList } from './usePostsList';
import { AddNewPost } from './AddNewPost';

export const PostsList = () => {
  const { posts, updatePostsWithNewPost } = usePostsList();
  return (<Box>
    <Box display='flex' justifyContent='flex-end'>
      <AddNewPost updatePostsWithNewPost={updatePostsWithNewPost} />
    </Box>
    <TableContainer>
      <Table sx={{ minWidth: 650 }} aria-label='simple table'>
        <TableHead>
          <TableRow>
            <TableCell>Title</TableCell>
            <TableCell>Body</TableCell>
            <TableCell>ID</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {posts
            ? posts.map((post) => (
              <TableRow
                key={post.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component='th'>
                  {post.title}
                </TableCell>
                <TableCell component='th'>
                  {post.body}
                </TableCell>
                <TableCell component='th'>
                  {post.id}
                </TableCell>
              </TableRow>
            ))
            : <CircularProgress />
          }
        </TableBody>
      </Table>
    </TableContainer>
  </Box>)
}
