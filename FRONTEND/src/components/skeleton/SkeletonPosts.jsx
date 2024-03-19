import Shimmer from "./Shimmer";
import SkeletonElement from "./Skeleton";

const SkeletonPosts = () => {
  return (
    <div className="relative bg-gray-400 my-2   w-[98%]  mx-auto rounded-[4px]">
      <div className=" flex items-center gap-2 p-2 relative">
        <div>
          <SkeletonElement type="thumbnail" />
        </div>
        <div className="w-full">
          <SkeletonElement type="title" />
          <SkeletonElement type="text" />
          <SkeletonElement type="text" />
          <SkeletonElement type="text" />
        </div>
      </div>
      <Shimmer />
    </div>
  );
};

export default SkeletonPosts;
