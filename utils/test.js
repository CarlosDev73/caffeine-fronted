import { fetchPostById } from '../api/posts'; // Adjust the path if necessary

const testFetchPostById = async () => {
  const hardcodedId = '6748f196b3f13705abfacd77'; // Replace with the specific post ID
  console.log('Testing fetchPostById with ID:', hardcodedId);

  try {
    const post = await fetchPostById(hardcodedId);
    console.log('Fetched Post:', post);
  } catch (error) {
    console.error('Error fetching post:', error.message || error);
  }
};

export default testFetchPostById;