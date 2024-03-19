import { useMutation, useQuery } from "@tanstack/react-query";
import { deletePostApi, fetchPostsApi } from "../../APIrequests/posts/postAPI";
import { Link } from "react-router-dom";
import parse from "html-react-parser";
import NoDataFound from "../Alerts/NoDataFound";
import AlertMessage from "../Alerts/AlertMessage";
import SkeletonPosts from "../skeleton/SkeletonPosts";

const FetchPost = () => {
  // const { isLoading, isSuccess, data, error, refetch } = useQuery({
  const { isLoading, data, error, refetch } = useQuery({
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
  // if (isLoading) return <AlertMessage type="loading" message="Loading" />;
  // if (isLoading) return [1, 2, 3, 4, 5].map((n) => <SkeletonPosts key={n} />);
  if (error) return <AlertMessage type="error" message={error.message} />;
  if (data?.posts?.length <= 0) return <NoDataFound text="No Post Found" />;
  return (
    <div className=" ">
      {isLoading && [1, 2, 3, 4, 5].map((n) => <SkeletonPosts key={n} />)}
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
