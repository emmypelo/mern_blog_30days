import { useMutation, useQuery } from "@tanstack/react-query";
import { deletePostApi, fetchPostsApi } from "../../APIrequests/posts/postAPI";
import { Link } from "react-router-dom";
import parse from "html-react-parser";

const FetchPost = () => {
  const { isLoading, isSuccess, data, error, refetch } = useQuery({
    queryKey: ["fetchPost"],
    queryFn: fetchPostsApi,
  });
  // console.log(data);

  // Delete mutation
  const deleteMutation = useMutation({
    mutationKey: ["deletePost"],
    mutationFn: deletePostApi,
  });
  const handleDelete = async (postId) => {
    deleteMutation
      .mutateAsync(postId)
      .then(() => {
        refetch();
      })
      .catch((error) => console.log(error));
  };

  return (
    <div>
      {isLoading && <p>Loading...</p>}
      {isSuccess && <p>Posts Fetched</p>}
      {error && <p>{error.message}</p>}
      {data?.posts.map((post) => {
        return (
          <div key={post._id}>
            <h2>{post.title}</h2>
            <div> {parse(post?.description)}</div>
            <button>
              <Link to={`/posts/${post?._id}`}>View</Link>
            </button>
            <button onClick={() => handleDelete(post?._id)}>DELETE</button>
          </div>
        );
      })}
    </div>
  );
};

export default FetchPost;
