import { useMutation, useQuery } from "@tanstack/react-query";
import { deletePostApi, fetchPostsApi } from "../../APIrequests/posts/postAPI";
import { Link, useNavigate } from "react-router-dom";
import parse from "html-react-parser";
import NoDataFound from "../Alerts/NoDataFound";
import AlertMessage from "../Alerts/AlertMessage";
import SkeletonPosts from "../skeleton/SkeletonPosts";
import { IoMdHeartEmpty } from "react-icons/io";
import { GoComment } from "react-icons/go";
import { CiRead } from "react-icons/ci";
import { RiDeleteBin6Line } from "react-icons/ri";

const FetchPost = () => {
  const navigate = useNavigate();

  const { isLoading, data, error, refetch } = useQuery({
    queryKey: ["fetchPost"],
    queryFn: fetchPostsApi,
  });

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
  const handleClick = (url) => {
    navigate(url);
  };

  // if (isLoading) return [1, 2, 3, 4, 5].map((n) => <SkeletonPosts key={n} />);
  if (error) return <AlertMessage type="error" message={error.message} />;
  if (data?.posts?.length <= 0) return <NoDataFound text="No Post Found" />;
  return (
    <div className=" ">
      {isLoading && [1, 2, 3, 4, 5].map((n) => <SkeletonPosts key={n} />)}
      {data?.posts.map((post) => {
        return (
          // post container
          <div
            key={post._id}
            className="post-fetch flex h-[100px] w-full justify-between gap-2 items-center self-center border-2 my-1 border-gray-300 bg-gray-100 "
          >
            {/* post image container */}
            <div className="basis-1/4 flex items-center h-[100px] w-full">
              <img
                className="h-[90px] cursor-pointer w-[90px]  mx-1 rounded-[50%] border-2 border-blue-400"
                src={post?.image?.path}
                alt="post image"
                onClick={() => handleClick(`/posts/${post?._id}`)}
              />
            </div>
            {/* Text and button container */}
            <div className="h-[90%] flex flex-col justify-between items-start basis-3/4  pr-1  mr-1 py-1  rounded-[8px] bg-slate-200">
              {/* Post texts */}
              <div className=" p-2 relative">
                <span className="text-[8px] absolute top-0">category</span>
                <h2
                  className="cursor-pointer"
                  onClick={() => handleClick(`/posts/${post?._id}`)}
                >
                  {post.title}
                </h2>

                <span className="post-body text-xs">
                  {parse(post?.description)}
                </span>
              </div>
              {/* buttons container */}
              <div className=" flex  justify-between w-full h-[10px] items-center mb-1 p-2 gap-4">
                {/* Likes, comments and view */}
                <div className=" flex  justify-between w-1/2 mb-1 h-[10px] items-center text-gray-900">
                  <p className="flex h-[6px] items-center gap-1">
                    <IoMdHeartEmpty className="text-blue-700" />{" "}
                    <span className="text-[10px]">10</span>
                  </p>
                  <p className="flex h-[6px] items-center gap-1">
                    <GoComment className="text-blue-700" />{" "}
                    <span className="text-[10px]">120</span>
                  </p>
                  <p className="flex h-[6px] items-center gap-1">
                    <CiRead className="text-blue-700" />
                    <span className="text-[10px]">100</span>
                  </p>
                </div>
                {/* Read and delete */}
                <div className="flex w-1/2 justify-around h-6 items-center ">
                  <button
                    className="bg-blue-700 text-[white] w-[5rem] h-full rounded-[12px] "
                    onClick={() => handleClick(`/posts/${post?._id}`)}
                  >
                    View
                  </button>
                  <button onClick={() => handleDelete(post?._id)}>
                    <RiDeleteBin6Line className="text-red-500" h-full />
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default FetchPost;
