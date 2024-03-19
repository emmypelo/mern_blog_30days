/* eslint-disable react/prop-types */

function SkeletonElement({ type }) {
  let skeletonClass;
  switch (type) {
    case "text":
      skeletonClass = "w-full h-2 ";
      break;
    case "title":
      skeletonClass = "w-full h-4 mb-2";
      break;
    case "avatar":
      skeletonClass = "w-[50px] h-[50px] rounded-full";
      break;
    case "thumbnail":
      skeletonClass = "w-[100px] h-[100px] rounded-[50%]";
      break;
    default:
      skeletonClass = null;
  }
  return (
    <div
      className={`bg-[#bbb8b8]  flex  my-2 mx-0 border  ${skeletonClass}  `}
    ></div>
  );
}
export default SkeletonElement;
